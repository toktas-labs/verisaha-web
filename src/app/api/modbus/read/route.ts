// 📁 src/app/api/modbus/read/route.ts
export const runtime = "nodejs";

import { NextResponse } from "next/server";
import net from "net";
const Modbus = require("jsmodbus");

// --- RAW BYTE ÜRETİCİ FONKSİYON ÖNCE TANIMLANMALI ---
function valuesToRaw(values: number[]) {
  const raw: number[] = [];
  for (const val of values) {
    raw.push((val >> 8) & 0xff); // high byte
    raw.push(val & 0xff);        // low byte
  }
  return raw;
}

export async function POST(req: Request) {
  let body: any = null;

  try {
    body = await req.json();
  } catch (e) {
    return NextResponse.json({
      success: false,
      error: "Boş veya geçersiz JSON gönderildi.",
      code: 0,
    });
  }

  const { ip, port, slaveId, func, address, quantity } = body;

  return new Promise((resolve) => {
    const socket = new net.Socket();
    const client = new Modbus.client.TCP(socket, slaveId || 1);
    const options = { host: ip, port: Number(port) };

    let responded = false;

    socket.on("connect", async () => {
      try {
        let resp;

        // Function code’a göre doğru okuma fonksiyonunu seçelim
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

        // 🔥 Artık TCP tarafında raw byte garantili oluşuyor!
        const raw = valuesToRaw(values);

        responded = true;

        resolve(
          NextResponse.json({
            success: true,
            values,
            raw,
          })
        );
	} catch (err: any) {
	  responded = true;
	
	  let code: number | undefined;
	
	  // 1) jsmodbus exception body (en garanti yöntem)
	  if (err.response?._body?._code !== undefined) {
	    code = err.response._body._code;
	  }
	
	  // 2) fallback regex
	  if (!code) {
	    const match = String(err.message).match(/Code\s*(\d+)/i);
	    if (match) code = Number(match[1]);
	  }
	
	  // 3) pretty mapping
	  const map: Record<number, string> = {
	    1: "Illegal Function",
	    2: "Illegal Data Address",
	    3: "Illegal Data Value",
	    4: "Slave Device Failure",
	  };
	
	  const pretty = code
	    ? `Modbus Exception (Code ${code}) - ${map[code] || "Unknown Exception"}`
	    : err.message;
	
	  resolve(
	    NextResponse.json({
	      success: false,
	      error: pretty,
	      code: code || null,
	    })
	  );
	} finally {
        setTimeout(() => socket.destroy(), 200);
      }
    });

    socket.on("error", (err) => {
      if (!responded) {
        responded = true;
        resolve(
          NextResponse.json({
            success: false,
            error: "Bağlantı hatası: " + String(err.message),
            code: 0 
          })
        );
      }
      socket.destroy();
    });

    socket.setTimeout(3000, () => {
      if (!responded) {
        responded = true;
        resolve(
          NextResponse.json({
            success: false,
            error: "Zaman aşımı: cihaz yanıt vermedi.",
            code: 0
          })
        );
      }
      socket.destroy();
    });

    socket.connect(options);
  });
}
