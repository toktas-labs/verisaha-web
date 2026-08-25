import Link from "next/link";
import { localizedPath, type Locale } from "@/lib/i18n";

export function CtaBand({ locale = "tr" }: { locale?: Locale }) {
  const en = locale === "en";

  return (
    <section className="bg-brand-navy text-white py-16">
      <div className="mx-auto max-w-6xl px-4 text-center">
        <h4 className="text-2xl md:text-3xl font-semibold mb-4">
          {en ? "Let’s digitalize your field — 30-minute discovery call" : "Sahanızı dijitalleştirelim — 30 dakikalık keşif görüşmesi"}
        </h4>
        <p className="mb-6 text-slate-100">
          {en
            ? "Let’s define your requirements together and start with the module that delivers value fastest."
            : "Gereksinimleri birlikte netleştirelim, en hızlı değer üreten modülden başlayalım."}
        </p>
        <Link
          href={localizedPath(locale, "/iletisim")}
          className="inline-block bg-white text-brand-navy font-semibold px-6 py-3 rounded-xl shadow hover:bg-slate-100 transition"
        >
          {en ? "Schedule a Discovery Call" : "Keşif Görüşmesi Planla"}
        </Link>
      </div>
    </section>
  );
}
