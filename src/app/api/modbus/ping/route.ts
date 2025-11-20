// 📁 src/app/api/modbus/ping/route.ts
export const runtime = "nodejs";

import { NextResponse } from "next/server";
import net from "net";

export async function POST(req: Request): Promise<Response> {
  let body = null;

  try {
    body = await req.json();
  } catch (e) {
    return NextResponse.json(
      { success: false, error: "Geçersiz JSON" },
      { status: 400 }
    );
  }

  const { ip, port } = body;

  const result = await new Promise<{ success: boolean; error?: string }>(
    (resolve) => {
      const socket = new net.Socket();

      socket.setTimeout(3000);

      socket.on("connect", () => {
        resolve({ success: true });
        socket.destroy();
      });

      socket.on("error", (err) => {
        resolve({ success: false, error: "Bağlantı hatası: " + err.message });
        socket.destroy();
      });

      socket.on("timeout", () => {
        resolve({ success: false, error: "Zaman aşımı" });
        socket.destroy();
      });

      socket.connect(Number(port), ip);
    }
  );

  return NextResponse.json(result);
}
