export const runtime = "nodejs";

import { NextResponse } from "next/server";
import net from "net";
import * as Modbus from "jsmodbus";
import {
  getClientIp,
  isRequestBodyTooLarge,
  maskIp,
  rateLimit,
  rateLimitHeaders,
  securityLog,
  validateModbusReadRequest,
} from "@/lib/request-security";


const READ_RATE_LIMIT = 240;
const READ_RATE_WINDOW_MS = 60_000;
const MAX_BODY_BYTES = 4_096;
const SOCKET_TIMEOUT_MS = 3_000;

function shouldLogReadSuccess(): boolean {
  const explicitSetting = process.env.SECURITY_LOG_READ_SUCCESS;

  if (explicitSetting === "true") return true;
  if (explicitSetting === "false") return false;

  // Development'ta test için görünür, production'da varsayılan olarak sessiz.
  return process.env.NODE_ENV !== "production";
}

function valuesToRaw(values: number[]) {
  const raw: number[] = [];
  for (const val of values) {
    raw.push((val >> 8) & 0xff);
    raw.push(val & 0xff);
  }
  return raw;
}

function valuesToBits(values: unknown[], quantity: number) {
  return values
    .slice(0, quantity)
    .map((value) => (value === true || Number(value) !== 0 ? 1 : 0));
}

export async function POST(req: Request): Promise<Response> {
  const clientIp = getClientIp(req);
  const limit = rateLimit(
    `modbus-read:${clientIp}`,
    READ_RATE_LIMIT,
    READ_RATE_WINDOW_MS
  );

  if (!limit.allowed) {
    securityLog(req, "modbus_read_rate_limited");

    return NextResponse.json(
      {
        success: false,
        error: "Çok fazla Modbus sorgusu gönderildi. Lütfen kısa süre sonra tekrar deneyin.",
        code: 0,
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
    securityLog(req, "modbus_read_body_too_large");

    return NextResponse.json(
      { success: false, error: "İstek boyutu çok büyük.", code: 0 },
      { status: 413 }
    );
  }

  let body: unknown;

  try {
    body = await req.json();
  } catch {
    securityLog(req, "modbus_read_invalid_json");

    return NextResponse.json(
      { success: false, error: "Geçersiz veya boş JSON.", code: 0 },
      { status: 400 }
    );
  }

  const requestData = validateModbusReadRequest(body);

  if (!requestData.ok) {
    securityLog(req, "modbus_read_rejected", {
      reason: requestData.error,
    });

    return NextResponse.json(
      { success: false, error: requestData.error, code: 0 },
      { status: 400 }
    );
  }

  const { ip, port, slaveId, func, address, quantity } = requestData;

  const result = await new Promise<{
    success: boolean;
    raw?: number[];
    bits?: number[];
    values?: unknown;
    error?: string;
    code?: number;
  }>((resolve) => {
    const socket = new net.Socket();
    const client = new Modbus.client.TCP(socket, slaveId);
    let settled = false;

    const finish = (value: {
      success: boolean;
      raw?: number[];
      bits?: number[];
      values?: unknown;
      error?: string;
      code?: number;
    }) => {
      if (settled) return;
      settled = true;
      resolve(value);
      socket.destroy();
    };

    socket.setTimeout(SOCKET_TIMEOUT_MS);

    socket.once("connect", async () => {
      try {
        let resp;

        switch (func) {
          case 1:
            resp = await client.readCoils(address, quantity);
            break;
          case 2:
            resp = await client.readDiscreteInputs(address, quantity);
            break;
          case 3:
            resp = await client.readHoldingRegisters(address, quantity);
            break;
          case 4:
            resp = await client.readInputRegisters(address, quantity);
            break;
        }

        const responseBody = resp?.response?._body;
        const values = responseBody?.valuesAsArray ?? responseBody?._valuesAsArray ?? [];

        if (func === 1 || func === 2) {
          const bits = valuesToBits(values, quantity);

          if (bits.length === 0 && quantity > 0) {
            throw new Error("Cihazdan geçerli bit verisi alınamadı.");
          }

          finish({ success: true, bits, values: bits });
          return;
        }

        const numericValues = values.map((value: unknown) => Number(value));
        const raw = valuesToRaw(numericValues);

        if (raw.length === 0 && quantity > 0) {
          throw new Error("Cihazdan geçerli register verisi alınamadı.");
        }

        finish({ success: true, raw, values: numericValues });
      } catch (err: unknown) {
        const error = err as {
          message?: string;
          response?: { _body?: { _code?: number } };
        };

        let code: number | undefined;

        if (error.response?._body?._code !== undefined) {
          code = Number(error.response._body._code);
        }

        if (!code && error.message) {
          const match = error.message.match(/Code\s*(\d+)/i);
          if (match) code = Number(match[1]);
        }

        const exceptionMap: Record<number, string> = {
          1: "Illegal Function",
          2: "Illegal Data Address",
          3: "Illegal Data Value",
          4: "Slave Device Failure",
        };

        securityLog(req, "modbus_read_device_error", {
          targetIp: maskIp(ip),
          targetPort: port,
          slaveId,
          func,
          address,
          quantity,
          modbusCode: code ?? 0,
          internalError: error.message?.slice(0, 160),
        });

        const publicError = code
          ? `Modbus Exception (Code ${code}) - ${exceptionMap[code] || "Unknown Exception"}`
          : "Modbus okuma işlemi başarısız oldu.";

        finish({ success: false, error: publicError, code: code ?? 0 });
      }
    });

    socket.once("error", (err) => {
      securityLog(req, "modbus_read_connection_error", {
        targetIp: maskIp(ip),
        targetPort: port,
        internalError: err.message.slice(0, 160),
      });

      finish({
        success: false,
        error: "Bağlantı kurulamadı.",
        code: 0,
      });
    });

    socket.once("timeout", () => {
      securityLog(req, "modbus_read_timeout", {
        targetIp: maskIp(ip),
        targetPort: port,
      });

      finish({
        success: false,
        error: "Zaman aşımı: cihaz yanıt vermedi.",
        code: 0,
      });
    });

    socket.connect(port, ip);
  });

  if (result.success && shouldLogReadSuccess()) {
    securityLog(req, "modbus_read_success", {
      targetIp: maskIp(ip),
      targetPort: port,
      slaveId,
      func,
      address,
      quantity,
    });
  }

  return NextResponse.json(result, {
    headers: {
      ...rateLimitHeaders(limit),
      "Cache-Control": "no-store",
    },
  });
}
