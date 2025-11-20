// 📁 src/app/api/modbus/ping/route.ts
export const runtime = "nodejs";

import { NextResponse } from "next/server";
import net from "net";

export async function POST(req: Request) {
  const { ip, port } = await req.json();

  return new Promise((resolve) => {
    const socket = new net.Socket();
    let responded = false;

    // 🔹 3 saniyelik timeout
    socket.setTimeout(3000, () => {
      if (!responded) {
        responded = true;
        resolve(
          NextResponse.json({
            success: false,
            error: "Zaman aşımı: Cihaz yanıt vermedi.",
          })
        );
        socket.destroy();
      }
    });

    // 🔹 Bağlantı başarılı
    socket.on("connect", () => {
      if (!responded) {
        responded = true;
        resolve(NextResponse.json({ success: true }));
        socket.destroy();
      }
    });

    // 🔹 Bağlantı hatası
    socket.on("error", (err) => {
      if (!responded) {
        responded = true;
        resolve(
          NextResponse.json({
            success: false,
            error: "Bağlantı hatası: " + String(err.message),
          })
        );
      }
      socket.destroy();
    });

    // 🔹 Bağlanmayı dene
    socket.connect(Number(port), ip);
  });
}
