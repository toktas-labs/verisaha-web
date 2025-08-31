// src/components/sections/hero.tsx
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Hero() {
  return (
    <section
      className="relative overflow-hidden text-white"
      style={{
        backgroundImage:
          "linear-gradient(rgba(27,59,95,0.85), rgba(47,168,155,0.85)), url(/hero.jpg)",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Content */}
      <div className="mx-auto flex max-w-6xl flex-col items-start px-8 lg:px-16 py-14 md:py-18">
        <h1 className="max-w-3xl text-3xl md:text-5xl font-bold leading-snug text-white">
          Endüstriyel veriniz için <br />
          güvenli izleme ve otomasyon
        </h1>

        <p className="max-w-2xl text-white/80 md:text-lg leading-relaxed mt-6">
          Tüm proses parametrelerinizi (akış, seviye, sıcaklık vb.) ve batch süreçlerinizi gerçek zamanlı takip edin. <br />
          Modbus/S7 entegrasyonları ve raporlama otomasyonu ile üretimi hızlandırın.
        </p>

        <div className="flex flex-wrap items-center gap-4 mt-8">
          <Button
            asChild
            className="rounded-full bg-white text-brand-navy hover:bg-white/90"
          >
            <Link href="/cozumler">Çözümlerimizi Keşfedin</Link>
          </Button>
          <Button
            asChild
            variant="outline"
            className="rounded-full border-white/70 bg-transparent text-white hover:bg-white/10 hover:text-white"
          >
            <Link href="/iletisim">İletişim</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}

