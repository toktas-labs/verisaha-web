import { Button } from "@/components/ui/button";
import Link from "next/link";

export function CtaBand() {
  return (
    <section className="bg-brand-navy text-white py-16">
      <div className="mx-auto max-w-6xl px-4 text-center">
        {/* Başlık & Açıklama */}
        <h4 className="text-2xl md:text-3xl font-semibold mb-4">
          Sahanızı dijitalleştirelim — 30 dakikalık keşif görüşmesi
        </h4>
        <p className="mb-6 text-slate-100">
          Gereksinimleri birlikte netleştirelim, en hızlı değer üreten modülden başlayalım.
        </p>
          <Link
            href="/iletisim"
            className="inline-block bg-white text-brand-navy font-semibold px-6 py-3 rounded-xl shadow hover:bg-slate-100 transition"
          >
            Keşif Görüşmesi Planla
          </Link>
      </div>
    </section>
  );
}
