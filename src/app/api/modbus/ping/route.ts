export const runtime = "nodejs";

import { NextResponse } from "next/server";
import net from "net";
import {
  getClientIp,
  isRequestBodyTooLarge,
  maskIp,
  rateLimit,
  rateLimitHeaders,
  securityLog,
  validateModbusTarget,
} from "@/lib/request-security";

const PING_RATE_LIMIT = 20;
const PING_RATE_WINDOW_MS = 60_000;
const MAX_BODY_BYTES = 2_048;
const SOCKET_TIMEOUT_MS = 3_000;

export async function POST(req: Request): Promise<Response> {
  const clientIp = getClientIp(req);
  const limit = rateLimit(
    `modbus-ping:${clientIp}`,
    PING_RATE_LIMIT,
    PING_RATE_WINDOW_MS
  );

  if (!limit.allowed) {
    securityLog(req, "modbus_ping_rate_limited");

    return NextResponse.json(
      {
        success: false,
        error: "Çok fazla bağlantı denemesi yapıldı. Lütfen kısa süre sonra tekrar deneyin.",
      },
      {
        status: 429,
        headers: {
          ...rateLimitHeaders(limit),
          "Retry-After": String(limit.retryAfterSeconds),
        },
      }
    );
  }

  if (isRequestBodyTooLarge(req, MAX_BODY_BYTES)) {
    securityLog(req, "modbus_ping_body_too_large");

    return NextResponse.json(
      { success: false, error: "İstek boyutu çok büyük." },
      { status: 413 }
    );
  }

  let body: unknown;

  try {
    body = await req.json();
  } catch {
    securityLog(req, "modbus_ping_invalid_json");

    return NextResponse.json(
      { success: false, error: "Geçersiz JSON." },
      { status: 400 }
    );
  }

  if (!body || typeof body !== "object" || Array.isArray(body)) {
    securityLog(req, "modbus_ping_invalid_body");

    return NextResponse.json(
      { success: false, error: "Geçersiz istek gövdesi." },
      { status: 400 }
    );
  }

  const { ip, port } = body as Record<string, unknown>;
  const target = validateModbusTarget(ip, port);

  if (!target.ok) {
    securityLog(req, "modbus_ping_rejected", {
      targetIp: typeof ip === "string" ? maskIp(ip.trim()) : undefined,
      targetPort: typeof port === "number" || typeof port === "string" ? String(port) : undefined,
      reason: target.error,
    });

    return NextResponse.json(
      { success: false, error: target.error },
      { status: 400 }
    );
  }

  securityLog(req, "modbus_ping_started", {
    targetIp: maskIp(target.ip),
    targetPort: target.port,
  });

  const result = await new Promise<{ success: boolean; error?: string }>(
    (resolve) => {
      const socket = new net.Socket();
      let settled = false;

      const finish = (value: { success: boolean; error?: string }) => {
        if (settled) return;
        settled = true;
        resolve(value);
        socket.destroy();
      };

      socket.setTimeout(SOCKET_TIMEOUT_MS);

      socket.once("connect", () => {
        finish({ success: true });
      });

      socket.once("error", () => {
        // İç ağ/topoloji ayrıntılarını kullanıcıya sızdırmamak için
        // Node.js hata mesajını doğrudan döndürmüyoruz.
        finish({ success: false, error: "Bağlantı kurulamadı." });
      });

      socket.once("timeout", () => {
        finish({ success: false, error: "Zaman aşımı: cihaz yanıt vermedi." });
      });

      socket.connect(target.port, target.ip);
    }
  );

  securityLog(req, result.success ? "modbus_ping_success" : "modbus_ping_failed", {
    targetIp: maskIp(target.ip),
    targetPort: target.port,
  });

  return NextResponse.json(result, {
    headers: {
      ...rateLimitHeaders(limit),
      "Cache-Control": "no-store",
    },
  });
}
