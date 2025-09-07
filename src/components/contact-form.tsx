"use client";

import { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
// import { Label } from "@/components/ui/label"; // yoksa native <label> kullan

export default function ContactForm() {
  const [submitting, setSubmitting] = useState(false);
  const [ok, setOk] = useState<string | null>(null);
  const [err, setErr] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);

    const name = String(fd.get("name") || "").trim();
    const email = String(fd.get("email") || "").trim();
    const message = String(fd.get("message") || "").trim();

    if (!name || !email || !message) {
      setErr("Lütfen ad, e-posta ve mesaj alanlarını doldurun.");
      setOk(null);
      return;
    }

    try {
      setSubmitting(true);
      setErr(null);

      const subject = encodeURIComponent(`Web İletişim: ${fd.get("subject") || "Genel"}`);
      const body = encodeURIComponent(
        `Ad Soyad: ${name}\nFirma: ${fd.get("company") || "-"}\nE-posta: ${email}\nTelefon: ${fd.get("phone") || "-"}\n\nMesaj:\n${message}`
      );
      window.location.href = `mailto:info@verisaha.com?subject=${subject}&body=${body}`;

      setOk("E-posta istemciniz açıldı. Mesajınızı gönderebilirsiniz.");
      (e.currentTarget as HTMLFormElement).reset();
    } catch {
      setErr("Mesaj gönderilemedi. Lütfen daha sonra tekrar deneyin.");
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
        <CardTitle>İletişim Formu</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={onSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="name" className="text-sm font-medium text-slate-700">Ad Soyad *</label>
              <Input id="name" name="name" placeholder="Adınız Soyadınız" required />
            </div>
            <div>
              <label htmlFor="email" className="text-sm font-medium text-slate-700">E-posta *</label>
              <Input id="email" type="email" name="email" placeholder="ornek@verisaha.com" required />
            </div>
            <div>
              <label htmlFor="phone" className="text-sm font-medium text-slate-700">Telefon</label>
              <Input id="phone" name="phone" placeholder="+90 ..." />
            </div>
            <div>
              <label htmlFor="company" className="text-sm font-medium text-slate-700">Firma</label>
              <Input id="company" name="company" placeholder="Şirket Adı" />
            </div>
          </div>

          <div>
            <label htmlFor="subject" className="text-sm font-medium text-slate-700">Konu</label>
            <Input id="subject" name="subject" placeholder="Örn: Saha keşif talebi" />
          </div>

          <div>
            <label htmlFor="message" className="text-sm font-medium text-slate-700">Mesaj *</label>
            <Textarea id="message" name="message" placeholder="Kısaca ihtiyacınızı anlatın..." rows={6} required />
          </div>

          <div className="flex items-center justify-between gap-4">
            <span className="text-sm text-slate-500">* Zorunlu alanlar</span>
            <Button type="submit" disabled={submitting} className="min-w-36 bg-brand-teal text-white hover:opacity-90">
              {submitting ? "Gönderiliyor..." : "Gönder"}
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
