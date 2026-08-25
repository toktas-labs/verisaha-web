export const runtime = "nodejs";

import { NextResponse } from "next/server";
import net from "node:net";
import {
  getClientIp,
  maskIp,
  parseJsonBody,
  rateLimit,
  rateLimitHeaders,
  securityLog,
  validateModbusTarget,
} from "@/lib/request-security";

const PING_RATE_LIMIT = 20;
const PING_RATE_WINDOW_MS = 60_000;
const MAX_BODY_BYTES = 2_048;
const SOCKET_TIMEOUT_MS = 3_000;

function jsonResponse(
  body: unknown,
  init: ResponseInit = {},
  extraHeaders: HeadersInit = {}
): Response {
  const headers = new Headers(init.headers);
  headers.set("Cache-Control", "no-store");

  const additions = new Headers(extraHeaders);
  additions.forEach((value, key) => headers.set(key, value));

  return NextResponse.json(body, {
    ...init,
    headers,
  });
}

export async function POST(req: Request): Promise<Response> {
  const clientIp = getClientIp(req);
  const limit = rateLimit(
    `modbus-ping:${clientIp}`,
    PING_RATE_LIMIT,
    PING_RATE_WINDOW_MS
  );

  if (!limit.allowed) {
    securityLog(req, "modbus_ping_rate_limited");

    return jsonResponse(
      {
        success: false,
        error:
          "Çok fazla bağlantı denemesi yapıldı. Lütfen kısa süre sonra tekrar deneyin.",
      },
      { status: 429 },
      {
        ...rateLimitHeaders(limit),
        "Retry-After": String(limit.retryAfterSeconds),
      }
    );
  }

  const parsed = await parseJsonBody(req, MAX_BODY_BYTES);
  if (!parsed.ok) {
    securityLog(req, "modbus_ping_invalid_request", {
      status: parsed.status,
      reason: parsed.error,
    });

    return jsonResponse(
      { success: false, error: parsed.error },
      { status: parsed.status },
      rateLimitHeaders(limit)
    );
  }

  if (!parsed.body || typeof parsed.body !== "object" || Array.isArray(parsed.body)) {
    securityLog(req, "modbus_ping_invalid_body");

    return jsonResponse(
      { success: false, error: "Geçersiz istek gövdesi." },
      { status: 400 },
      rateLimitHeaders(limit)
    );
  }

  const { ip, port } = parsed.body as Record<string, unknown>;
  const target = validateModbusTarget(ip, port);

  if (!target.ok) {
    securityLog(req, "modbus_ping_rejected", {
      targetIp: typeof ip === "string" ? maskIp(ip.trim()) : undefined,
      targetPort:
        typeof port === "number" || typeof port === "string"
          ? String(port)
          : undefined,
      reason: target.error,
    });

    return jsonResponse(
      { success: false, error: target.error },
      { status: 400 },
      rateLimitHeaders(limit)
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

  return jsonResponse(result, {}, rateLimitHeaders(limit));
}
