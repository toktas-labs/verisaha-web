"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

export default function ContactMini() {
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    // Şimdilik mock — ileride API route / formspree / email ekleriz
    setTimeout(() => {
      alert("Mesajınız alındı. Teşekkürler!");
      setLoading(false);
      (e.target as HTMLFormElement).reset();
    }, 600);
  }

  return (
    <section className="py-14">
      <div className="mx-auto max-w-3xl px-6">
        <h2 className="text-2xl md:text-3xl font-bold text-brand-navy mb-4">
          Hızlı İletişim
        </h2>
        <form onSubmit={onSubmit} className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <Input required name="name" placeholder="Ad Soyad" />
            <Input required type="email" name="email" placeholder="E-posta" />
          </div>
          <Input name="phone" placeholder="Telefon (opsiyonel)" />
          <Textarea required name="message" rows={5} placeholder="Mesajınız..." />
          <Button type="submit" disabled={loading}>
            {loading ? "Gönderiliyor..." : "Gönder"}
          </Button>
        </form>
      </div>
    </section>
  );
}
