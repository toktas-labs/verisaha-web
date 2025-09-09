import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {
    const { name, email, phone, company, subject, message } = await req.json();

    // ✅ SMTP transporter
    const transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      port: Number(process.env.MAIL_PORT) || 465,
      secure: Number(process.env.MAIL_PORT) === 465, // 465 için true
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });

    // ✅ Mail gönder
    await transporter.sendMail({
      from: `"${name}" <${process.env.MAIL_USER}>`,
      to: "info@verisaha.com",
      subject: subject || "Yeni İletişim Formu Mesajı",
      replyTo: email,
      html: `
        <h2>Yeni İletişim Formu Mesajı</h2>
        <p><b>İsim:</b> ${name}</p>
        <p><b>Email:</b> ${email}</p>
        <p><b>Telefon:</b> ${phone}</p>
        <p><b>Firma:</b> ${company}</p>
        <p><b>Konu:</b> ${subject}</p>
        <p><b>Mesaj:</b> ${message}</p>
      `,
    });

    // ✅ frontend için net success cevabı
    return NextResponse.json({ success: true });
  } catch (err: unknown) {
    console.error("Mail gönderme hatası:", err);

    const errorMessage =
      err instanceof Error ? err.message : "Bilinmeyen hata";

    return NextResponse.json(
      { success: false, error: errorMessage },
      { status: 500 }
    );
  }
}
