export const runtime = "nodejs";

import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import {
  getClientIp,
  isRequestBodyTooLarge,
  rateLimit,
  rateLimitHeaders,
  securityLog,
} from "@/lib/request-security";

const CONTACT_RATE_LIMIT = 5;
const CONTACT_RATE_WINDOW_MS = 60 * 60 * 1000;
const MAX_BODY_BYTES = 16_384;

function cleanText(value: unknown, maxLength: number): string {
  if (typeof value !== "string") return "";
  return value.trim().slice(0, maxLength);
}

function cleanSubject(value: unknown): string {
  return cleanText(value, 120).replace(/[\r\n]+/g, " ");
}

function isValidEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) && value.length <= 254;
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

export async function POST(req: Request) {
  const clientIp = getClientIp(req);
  const limit = rateLimit(
    `contact:${clientIp}`,
    CONTACT_RATE_LIMIT,
    CONTACT_RATE_WINDOW_MS
  );

  if (!limit.allowed) {
    securityLog(req, "contact_rate_limited");

    return NextResponse.json(
      {
        success: false,
        error: "Çok fazla mesaj gönderme denemesi yapıldı. Lütfen daha sonra tekrar deneyin.",
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
    securityLog(req, "contact_body_too_large");

    return NextResponse.json(
      { success: false, error: "İstek boyutu çok büyük." },
      { status: 413 }
    );
  }

  try {
    const body = await req.json();

    if (!body || typeof body !== "object" || Array.isArray(body)) {
      return NextResponse.json(
        { success: false, error: "Geçersiz istek." },
        { status: 400 }
      );
    }

    const input = body as Record<string, unknown>;
    const name = cleanText(input.name, 100);
    const email = cleanText(input.email, 254).toLowerCase();
    const phone = cleanText(input.phone, 50);
    const company = cleanText(input.company, 120);
    const subject = cleanSubject(input.subject);
    const message = cleanText(input.message, 5000);

    if (!name || !email || !message) {
      return NextResponse.json(
        { success: false, error: "Ad, e-posta ve mesaj alanları zorunludur." },
        { status: 400 }
      );
    }

    if (!isValidEmail(email)) {
      return NextResponse.json(
        { success: false, error: "Geçerli bir e-posta adresi girin." },
        { status: 400 }
      );
    }

    const mailHost = process.env.MAIL_HOST;
    const mailUser = process.env.MAIL_USER;
    const mailPass = process.env.MAIL_PASS;
    const mailPort = Number(process.env.MAIL_PORT) || 465;

    if (!mailHost || !mailUser || !mailPass) {
      console.error("Mail yapılandırması eksik.");
      return NextResponse.json(
        { success: false, error: "Mesaj şu anda gönderilemiyor. Lütfen daha sonra tekrar deneyin." },
        { status: 503 }
      );
    }

    const transporter = nodemailer.createTransport({
      host: mailHost,
      port: mailPort,
      secure: mailPort === 465,
      auth: {
        user: mailUser,
        pass: mailPass,
      },
    });

    const safeName = escapeHtml(name);
    const safeEmail = escapeHtml(email);
    const safePhone = escapeHtml(phone || "-");
    const safeCompany = escapeHtml(company || "-");
    const safeSubject = escapeHtml(subject || "Genel İletişim");
    const safeMessage = escapeHtml(message).replace(/\n/g, "<br />");

    await transporter.sendMail({
      from: `"VeriSaha Web" <${mailUser}>`,
      to: process.env.MAIL_TO || "info@verisaha.com",
      subject: `[VeriSaha Web] ${subject || "Yeni İletişim Formu Mesajı"}`,
      replyTo: email,
      text: [
        `İsim: ${name}`,
        `E-posta: ${email}`,
        `Telefon: ${phone || "-"}`,
        `Firma: ${company || "-"}`,
        `Konu: ${subject || "Genel İletişim"}`,
        "",
        message,
      ].join("\n"),
      html: `
        <h2>Yeni İletişim Formu Mesajı</h2>
        <p><b>İsim:</b> ${safeName}</p>
        <p><b>E-posta:</b> ${safeEmail}</p>
        <p><b>Telefon:</b> ${safePhone}</p>
        <p><b>Firma:</b> ${safeCompany}</p>
        <p><b>Konu:</b> ${safeSubject}</p>
        <p><b>Mesaj:</b><br />${safeMessage}</p>
      `,
    });

    securityLog(req, "contact_sent", {
      hasPhone: Boolean(phone),
      hasCompany: Boolean(company),
    });

    return NextResponse.json(
      { success: true },
      {
        headers: {
          ...rateLimitHeaders(limit),
          "Cache-Control": "no-store",
        },
      }
    );
  } catch (err: unknown) {
    const internalError = err instanceof Error ? err.message : "Unknown error";

    console.error("Mail gönderme hatası:", internalError);
    securityLog(req, "contact_send_failed");

    return NextResponse.json(
      {
        success: false,
        error: "Mesaj gönderilemedi. Lütfen daha sonra tekrar deneyin.",
      },
      { status: 500 }
    );
  }
}
