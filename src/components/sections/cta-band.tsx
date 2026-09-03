import Link from "next/link";
import { localizedPath, type Locale } from "@/lib/i18n";

export function CtaBand({ locale = "tr" }: { locale?: Locale }) {
  const en = locale === "en";

  return (
    <section className="bg-brand-navy py-16 text-white md:py-20">
      <div className="mx-auto max-w-6xl px-4 text-center">
        <h4 className="mx-auto max-w-4xl text-2xl font-semibold leading-tight md:text-3xl">
          {en
            ? "Let’s digitalize your field — 30-minute discovery call"
            : "Sahanızı dijitalleştirelim — 30 dakikalık keşif görüşmesi"}
        </h4>

        <p className="mx-auto mt-4 max-w-3xl text-sm leading-relaxed text-slate-100 md:text-base">
          {en
            ? "Let’s define your requirements together and start with the module that delivers value fastest."
            : "Gereksinimleri birlikte netleştirelim, en hızlı değer üreten modülden başlayalım."}
        </p>

        <Link
          href={localizedPath(locale, "/iletisim")}
          className="mt-7 inline-flex rounded-xl bg-white px-6 py-3 font-semibold text-brand-navy shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:bg-slate-100 hover:shadow-md"
        >
          {en ? "Schedule a Discovery Call" : "Keşif Görüşmesi Planla"}
        </Link>
      </div>
    </section>
  );
}
