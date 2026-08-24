// 📁 src/app/api/modbus/read/route.ts
export const runtime = "nodejs";

import { NextResponse } from "next/server";
import net from "net";
const Modbus = require("jsmodbus");

function valuesToRaw(values: number[]) {
  const raw: number[] = [];
  for (const val of values) {
    raw.push((val >> 8) & 0xff);
    raw.push(val & 0xff);
  }
  return raw;
}

function valuesToBits(values: any[], quantity: number) {
  return values
    .slice(0, quantity)
    .map((value) => (value === true || Number(value) !== 0 ? 1 : 0));
}

export async function POST(req: Request): Promise<Response> {
  let jsonBody = null;

  // JSON parse kontrolü
  try {
    jsonBody = await req.json();
  } catch (e) {
    return NextResponse.json(
      { success: false, error: "Geçersiz veya boş JSON", code: 0 },
      { status: 400 }
    );
  }

  const { ip, port, slaveId, func, address, quantity } = jsonBody;

  // SOCKET + MODBUS async wrapper
  const result = await new Promise<{ success: boolean; raw?: number[]; bits?: number[]; values?: any; error?: string; code?: number; }>(
    (resolve) => {
      const socket = new net.Socket();
      const client = new Modbus.client.TCP(socket, slaveId || 1);

      socket.setTimeout(3000);

      socket.on("connect", async () => {
        try {
          let resp;

          switch (Number(func)) {
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
            default:
              throw new Error("Desteklenmeyen Function Code");
          }

        const body = resp.response?._body;

        const values =
          body?.valuesAsArray ||
          body?._valuesAsArray ||
          [];

        const functionCode = Number(func);

        // FC01 / FC02 = bit verisi
        if (functionCode === 1 || functionCode === 2) {
          const bits = valuesToBits(values, Number(quantity));

          if (bits.length === 0 && Number(quantity) > 0) {
            throw new Error("Cihazdan geçerli bit verisi alınamadı.");
          }

          resolve({
            success: true,
            bits,
            values: bits,
          });
        }

        // FC03 / FC04 = register verisi
        else {
          const raw = valuesToRaw(values.map((v: any) => Number(v)));

          if (raw.length === 0 && Number(quantity) > 0) {
            throw new Error("Cihazdan geçerli register verisi alınamadı.");
          }

          resolve({
            success: true,
            raw,
            values,
          });
        }
        } catch (err: any) {
          let code: number | undefined;

          if (err.response?._body?._code !== undefined) {
            code = err.response._body._code;
          }

          if (!code) {
            const m = String(err.message).match(/Code\s*(\d+)/i);
            if (m) code = Number(m[1]);
          }

          const map: Record<number, string> = {
            1: "Illegal Function",
            2: "Illegal Data Address",
            3: "Illegal Data Value",
            4: "Slave Device Failure",
          };

          const pretty = code
            ? `Modbus Exception (Code ${code}) - ${map[code] || "Unknown Exception"}`
            : err.message;

          resolve({ success: false, error: pretty, code: code ?? 0 });
        }

        socket.destroy();
      });

      socket.on("error", (err) => {
        resolve({
          success: false,
          error: "Bağlantı hatası: " + err.message,
          code: 0,
        });
        socket.destroy();
      });

      socket.on("timeout", () => {
        resolve({
          success: false,
          error: "Zaman aşımı: cihaz yanıt vermedi.",
          code: 0,
        });
        socket.destroy();
      });

      socket.connect(Number(port), ip);
    }
  );

  return NextResponse.json(result);
}
