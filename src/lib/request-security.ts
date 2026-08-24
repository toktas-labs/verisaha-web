import crypto from "crypto";
import net from "net";

type RateLimitEntry = {
  count: number;
  resetAt: number;
};

type RateLimitResult = {
  allowed: boolean;
  limit: number;
  remaining: number;
  retryAfterSeconds: number;
};

type SecurityLogDetails = Record<
  string,
  string | number | boolean | null | undefined
>;

type GlobalWithRateLimit = typeof globalThis & {
  __verisahaRateLimitStore?: Map<string, RateLimitEntry>;
};

const globalForRateLimit = globalThis as GlobalWithRateLimit;
const rateLimitStore =
  globalForRateLimit.__verisahaRateLimitStore ?? new Map<string, RateLimitEntry>();

globalForRateLimit.__verisahaRateLimitStore = rateLimitStore;

function firstHeaderIp(value: string | null): string | null {
  if (!value) return null;
  const first = value.split(",")[0]?.trim();
  return first || null;
}

export function getClientIp(req: Request): string {
  const candidates = [
    firstHeaderIp(req.headers.get("x-vercel-forwarded-for")),
    firstHeaderIp(req.headers.get("x-forwarded-for")),
    firstHeaderIp(req.headers.get("x-real-ip")),
  ];

  for (const candidate of candidates) {
    if (candidate && net.isIP(candidate)) return candidate;
  }

  return "unknown";
}

export function maskIp(ip: string): string {
  if (net.isIPv4(ip)) {
    const parts = ip.split(".");
    return `${parts[0]}.${parts[1]}.xxx.xxx`;
  }

  if (net.isIPv6(ip)) {
    const parts = ip.split(":").filter(Boolean);
    return `${parts.slice(0, 2).join(":")}::xxxx`;
  }

  return "unknown";
}

export function hashIp(ip: string): string | null {
  const secret = process.env.SECURITY_LOG_SECRET;
  if (!secret || ip === "unknown") return null;

  return crypto.createHmac("sha256", secret).update(ip).digest("hex").slice(0, 16);
}

export function securityLog(
  req: Request,
  event: string,
  details: SecurityLogDetails = {}
): void {
  const ip = getClientIp(req);
  const rawIpEnabled = process.env.SECURITY_LOG_RAW_IP === "true";

  const payload = {
    event,
    timestamp: new Date().toISOString(),
    ip: rawIpEnabled ? ip : maskIp(ip),
    ipHash: hashIp(ip),
    country: req.headers.get("x-vercel-ip-country") ?? undefined,
    userAgent: (req.headers.get("user-agent") ?? "").slice(0, 160) || undefined,
    ...details,
  };

  console.info("[SECURITY]", JSON.stringify(payload));
}

export function rateLimit(
  key: string,
  limit: number,
  windowMs: number
): RateLimitResult {
  const now = Date.now();
  const existing = rateLimitStore.get(key);

  if (!existing || existing.resetAt <= now) {
    rateLimitStore.set(key, {
      count: 1,
      resetAt: now + windowMs,
    });

    return {
      allowed: true,
      limit,
      remaining: Math.max(0, limit - 1),
      retryAfterSeconds: Math.ceil(windowMs / 1000),
    };
  }

  existing.count += 1;
  rateLimitStore.set(key, existing);

  return {
    allowed: existing.count <= limit,
    limit,
    remaining: Math.max(0, limit - existing.count),
    retryAfterSeconds: Math.max(1, Math.ceil((existing.resetAt - now) / 1000)),
  };
}

export function rateLimitHeaders(result: RateLimitResult): HeadersInit {
  return {
    "X-RateLimit-Limit": String(result.limit),
    "X-RateLimit-Remaining": String(result.remaining),
  };
}

function ipv4ToNumber(ip: string): number {
  return ip
    .split(".")
    .map(Number)
    .reduce((acc, octet) => ((acc << 8) | octet) >>> 0, 0);
}

function inCidr(ip: number, base: string, prefix: number): boolean {
  const baseNumber = ipv4ToNumber(base);
  const mask = prefix === 0 ? 0 : (0xffffffff << (32 - prefix)) >>> 0;
  return (ip & mask) === (baseNumber & mask);
}

export function isPublicIpv4(ip: string): boolean {
  if (!net.isIPv4(ip)) return false;

  const value = ipv4ToNumber(ip);

  const blockedRanges: Array<[string, number]> = [
    ["0.0.0.0", 8],
    ["10.0.0.0", 8],
    ["100.64.0.0", 10],
    ["127.0.0.0", 8],
    ["169.254.0.0", 16],
    ["172.16.0.0", 12],
    ["192.0.0.0", 24],
    ["192.0.2.0", 24],
    ["192.168.0.0", 16],
    ["198.18.0.0", 15],
    ["198.51.100.0", 24],
    ["203.0.113.0", 24],
    ["224.0.0.0", 4],
    ["240.0.0.0", 4],
  ];

  return !blockedRanges.some(([base, prefix]) => inCidr(value, base, prefix));
}

export function getAllowedModbusPorts(): Set<number> {
  const raw = process.env.MODBUS_ALLOWED_PORTS ?? "502,1502";

  const ports = raw
    .split(",")
    .map((item) => Number(item.trim()))
    .filter((port) => Number.isInteger(port) && port >= 1 && port <= 65535);

  return new Set(ports.length > 0 ? ports : [502, 1502]);
}

export function validateModbusTarget(
  ipInput: unknown,
  portInput: unknown
):
  | { ok: true; ip: string; port: number }
  | { ok: false; error: string } {
  if (typeof ipInput !== "string") {
    return { ok: false, error: "IP adresi zorunludur." };
  }

  const ip = ipInput.trim();
  if (!net.isIPv4(ip)) {
    return {
      ok: false,
      error: "Geçerli bir IPv4 adresi girin.",
    };
  }

  const port = Number(portInput);
  if (!Number.isInteger(port) || port < 1 || port > 65535) {
    return {
      ok: false,
      error: "Port 1-65535 arasında tam sayı olmalıdır.",
    };
  }

  // Geliştirme ortamında yerel cihazlarla test yapılabilsin.
  // Production'da private/reserved hedefleri engelleyerek SSRF riskini azaltıyoruz.
  if (process.env.NODE_ENV === "production" && !isPublicIpv4(ip)) {
    return {
      ok: false,
      error: "Yerel, özel veya rezerve IP adreslerine sunucu üzerinden bağlantı açılamaz.",
    };
  }

  const allowedPorts = getAllowedModbusPorts();
  if (process.env.NODE_ENV === "production" && !allowedPorts.has(port)) {
    return {
      ok: false,
      error: `Bu port güvenlik nedeniyle izinli değil. İzinli Modbus portları: ${[
        ...allowedPorts,
      ].join(", ")}`,
    };
  }

  return { ok: true, ip, port };
}


export function validateModbusReadRequest(body: unknown):
  | {
      ok: true;
      ip: string;
      port: number;
      slaveId: number;
      func: 1 | 2 | 3 | 4;
      address: number;
      quantity: number;
    }
  | { ok: false; error: string } {
  if (!body || typeof body !== "object" || Array.isArray(body)) {
    return { ok: false, error: "Geçersiz istek gövdesi." };
  }

  const input = body as Record<string, unknown>;
  const target = validateModbusTarget(input.ip, input.port);
  if (!target.ok) return { ok: false, error: target.error };

  const slaveId = Number(input.slaveId);
  if (!Number.isInteger(slaveId) || slaveId < 1 || slaveId > 247) {
    return { ok: false, error: "Slave ID 1-247 arasında olmalıdır." };
  }

  const func = Number(input.func);
  if (![1, 2, 3, 4].includes(func)) {
    return { ok: false, error: "Yalnızca Function Code 01, 02, 03 ve 04 desteklenir." };
  }

  const address = Number(input.address);
  if (!Number.isInteger(address) || address < 0 || address > 65535) {
    return { ok: false, error: "Adres 0-65535 arasında tam sayı olmalıdır." };
  }

  const quantity = Number(input.quantity);
  const maxQuantity = func === 1 || func === 2 ? 2000 : 125;

  if (!Number.isInteger(quantity) || quantity < 1 || quantity > maxQuantity) {
    return {
      ok: false,
      error: `Quantity bu Function Code için 1-${maxQuantity} arasında olmalıdır.`,
    };
  }

  if (address + quantity - 1 > 65535) {
    return {
      ok: false,
      error: "Adres + quantity Modbus adres alanını aşıyor.",
    };
  }

  return {
    ok: true,
    ip: target.ip,
    port: target.port,
    slaveId,
    func: func as 1 | 2 | 3 | 4,
    address,
    quantity,
  };
}

export function isRequestBodyTooLarge(req: Request, maxBytes: number): boolean {
  const contentLength = req.headers.get("content-length");
  if (!contentLength) return false;

  const length = Number(contentLength);
  return Number.isFinite(length) && length > maxBytes;
}
