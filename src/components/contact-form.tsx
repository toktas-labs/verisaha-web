"use client";

import { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import type { Locale } from "@/lib/i18n";

export default function ContactForm({ locale = "tr" }: { locale?: Locale }) {
  const en = locale === "en";
  const [submitting, setSubmitting] = useState(false);
  const [ok, setOk] = useState<string | null>(null);
  const [err, setErr] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);

    const name = String(fd.get("name") || "").trim();
    const email = String(fd.get("email") || "").trim();
    const phone = String(fd.get("phone") || "").trim();
    const company = String(fd.get("company") || "").trim();
    const subject = String(fd.get("subject") || "").trim();
    const message = String(fd.get("message") || "").trim();
    const website = String(fd.get("website") || "").trim();

    if (!name || !email || !message) {
      setErr(en ? "Please complete the name, email and message fields." : "Lütfen ad, e-posta ve mesaj alanlarını doldurun.");
      setOk(null);
      return;
    }

    try {
      setSubmitting(true);
      setErr(null);
      setOk(null);

      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, phone, company, subject, message, website }),
      });

      const data = await res.json();
      if (data?.success) {
        setOk(en ? "Your message was sent successfully ✅" : "Mesajınız başarıyla gönderildi ✅");
        setErr(null);
        form.reset();
      } else {
        setErr(en ? "Your message could not be sent. Please try again. ❌" : data?.error || "Mail gönderilemedi ❌");
        setOk(null);
      }
    } catch (error) {
      console.error("Contact form submission error:", error);
      setErr(en ? "An error occurred. Please try again later." : "Bir hata oluştu, lütfen daha sonra tekrar deneyin.");
      setOk(null);
    } finally {
      setSubmitting(false);
    }
  }

  useEffect(() => {
    if (!ok && !err) return;
    const t = setTimeout(() => {
      setOk(null);
      setErr(null);
    }, 5000);
    return () => clearTimeout(t);
  }, [ok, err]);

  return (
    <Card className="shadow-sm">
      <CardHeader>
        <CardTitle>{en ? "Contact Form" : "İletişim Formu"}</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={onSubmit} className="space-y-4">
          <div className="hidden" aria-hidden="true">
            <label htmlFor="website">Website</label>
            <input
              id="website"
              name="website"
              type="text"
              tabIndex={-1}
              autoComplete="off"
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="name" className="text-sm font-medium text-slate-700">
                {en ? "Full Name *" : "Ad Soyad *"}
              </label>
              <Input id="name" name="name" placeholder={en ? "Your full name" : "Adınız Soyadınız"} required />
            </div>
            <div>
              <label htmlFor="email" className="text-sm font-medium text-slate-700">
                {en ? "Email *" : "E-posta *"}
              </label>
              <Input id="email" type="email" name="email" placeholder="example@company.com" required />
            </div>
            <div>
              <label htmlFor="phone" className="text-sm font-medium text-slate-700">
                {en ? "Phone" : "Telefon"}
              </label>
              <Input id="phone" name="phone" placeholder="+90 ..." />
            </div>
            <div>
              <label htmlFor="company" className="text-sm font-medium text-slate-700">
                {en ? "Company" : "Firma"}
              </label>
              <Input id="company" name="company" placeholder={en ? "Company name" : "Şirket Adı"} />
            </div>
          </div>

          <div>
            <label htmlFor="subject" className="text-sm font-medium text-slate-700">
              {en ? "Subject" : "Konu"}
            </label>
            <Input id="subject" name="subject" placeholder={en ? "e.g. Site survey request" : "Örn: Saha keşif talebi"} />
          </div>

          <div>
            <label htmlFor="message" className="text-sm font-medium text-slate-700">
              {en ? "Message *" : "Mesaj *"}
            </label>
            <Textarea
              id="message"
              name="message"
              placeholder={en ? "Briefly describe your requirements..." : "Kısaca ihtiyacınızı anlatın..."}
              rows={6}
              required
            />
          </div>

          <div className="flex items-center justify-between gap-4">
            <span className="text-sm text-slate-500">{en ? "* Required fields" : "* Zorunlu alanlar"}</span>
            <Button type="submit" disabled={submitting} className="min-w-36 bg-brand-teal text-white hover:opacity-90">
              {submitting ? (en ? "Sending..." : "Gönderiliyor...") : en ? "Send" : "Gönder"}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>

          {ok && <p className="text-sm text-emerald-600">{ok}</p>}
          {err && <p className="text-sm text-red-600">{err}</p>}
        </form>
      </CardContent>
    </Card>
  );
}
