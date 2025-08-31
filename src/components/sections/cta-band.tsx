import { Button } from "@/components/ui/button";
import Link from "next/link";

export function CtaBand() {
  return (
    <section className="relative overflow-hidden bg-brand-navy">
      <div className="mx-auto max-w-6xl px-4 py-12 md:py-16">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
          
          {/* Sol taraf - Başlık & Açıklama */}
          <div>
            <h4 className="text-xl font-semibold text-white md:text-2xl">
              Sahanızı dijitalleştirelim — 30 dakikalık keşif görüşmesi
            </h4>
            <p className="mt-2 max-w-2xl text-white/80">
              Gereksinimleri birlikte netleştirelim, 
              en hızlı değer üreten modülden başlayalım.
            </p>
          </div>

          {/* Sağ taraf - Buton */}
          <Button
            asChild
            size="lg"
            className="bg-brand-teal text-white hover:bg-brand-teal/90"
          >
            <Link href="/iletisim">Keşif Görüşmesi Planla</Link>
          </Button>

        </div>
      </div>
    </section>
  );
}
