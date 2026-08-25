import Link from "next/link";
import { Button } from "@/components/ui/button";
import type { Locale } from "@/lib/i18n";

export default function Hero({ locale = "tr" }: { locale?: Locale }) {
  const en = locale === "en";

  return (
    <section
      className="relative overflow-hidden min-h-[400px] md:min-h-[500px] lg:min-h-[560px]"
      style={{
        backgroundImage:
          "linear-gradient(rgba(27,59,95,0.85), rgba(47,168,155,0.85)), url(/hero.jpg)",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="relative z-10 mx-auto max-w-6xl px-4 py-12 md:py-20 text-white text-left">
        <h1 className="max-w-3xl text-3xl md:text-5xl font-bold leading-tight md:leading-[1.15]">
          {en ? (
            <>
              Secure monitoring and automation <br />
              for your industrial data
            </>
          ) : (
            <>
              Endüstriyel veriniz için <br />
              güvenli izleme ve otomasyon
            </>
          )}
        </h1>

        <p className="mt-4 max-w-2xl text-white/90 md:text-lg leading-relaxed">
          {en
            ? "Monitor all process parameters (flow, level, temperature, etc.) and batch operations in real time. Accelerate production with remote control and automated reporting."
            : "Tüm proses parametrelerinizi (akış, seviye, sıcaklık vb.) ve batch süreçlerinizi gerçek zamanlı takip edin. Uzaktan kontrol ve otomatik raporlama ile üretimi hızlandırın."}
        </p>
        <p className="mt-4 max-w-2xl text-white/90 md:text-lg leading-relaxed">
          {en
            ? "In addition to standard monitoring solutions, we design, integrate and commission turnkey project-based systems tailored to your requirements."
            : "Standart izleme çözümlerinin yanı sıra, ihtiyacınıza özel proje bazlı sistemleri tasarlıyor, entegre ediyor ve anahtar teslim devreye alıyoruz."}
        </p>

        <div className="mt-6 flex flex-wrap gap-2">
          <span className="rounded-full bg-white/10 px-2.5 py-1 text-xs md:px-3 md:py-1.5 md:text-sm">
            {en ? "PLC/SCADA Compatibility" : "PLC/SCADA Uyumluluğu"}
          </span>
          <span className="rounded-full bg-white/10 px-2.5 py-1 text-xs md:px-3 md:py-1.5 md:text-sm">
            {en ? "Historical Data & Analysis" : "Geçmiş Kayıt & Analiz"}
          </span>
          <span className="rounded-full bg-white/10 px-2.5 py-1 text-xs md:px-3 md:py-1.5 md:text-sm">
            {en ? "Trends & Charts" : "Trend & Grafikler"}
          </span>
          <span className="rounded-full bg-white/10 px-2.5 py-1 text-xs md:px-3 md:py-1.5 md:text-sm">PDF / Excel</span>
        </div>

        <div className="mt-7 flex flex-wrap items-center gap-4">
          <Button asChild className="rounded-full bg-white text-brand-navy hover:bg-white/90">
            <Link href="#solutions">{en ? "Explore Our Solutions →" : "Çözümlerimizi Keşfedin →"}</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
