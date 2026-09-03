"use client";

import Image from "next/image";
import Link from "next/link";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import type { Locale } from "@/lib/i18n";

export default function Hero({ locale = "tr" }: { locale?: Locale }) {
  const en = locale === "en";

  return (
    <section
      className="relative overflow-hidden"
      style={{
        backgroundImage: `
          radial-gradient(
            circle at 16% 72%,
            rgba(47,168,155,0.24) 0%,
            rgba(47,168,155,0.10) 22%,
            rgba(47,168,155,0.00) 43%
          ),
          radial-gradient(
            circle at 82% 78%,
            rgba(47,168,155,0.42) 0%,
            rgba(47,168,155,0.18) 22%,
            rgba(47,168,155,0.00) 44%
          ),
          linear-gradient(
            90deg,
            rgba(24,67,86,0.94) 0%,
            rgba(25,73,96,0.90) 35%,
            rgba(25,91,111,0.80) 62%,
            rgba(37,139,137,0.68) 100%
          ),
          url(/hero.jpg)
        `,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Hafif üst-alt derinlik */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-b from-black/[0.02] via-transparent to-black/[0.08]"
      />

      {/* Sağ tarafta hafif turkuaz ışık */}
      <div
        aria-hidden="true"
        className="absolute right-[7%] top-1/2 h-[520px] w-[520px] -translate-y-1/2 rounded-full bg-brand-teal/15 blur-3xl"
      />

      <div className="relative z-10 mx-auto grid max-w-7xl items-center gap-10 px-4 py-12 text-white sm:px-6 md:py-16 lg:min-h-[600px] lg:grid-cols-[0.95fr_1.05fr] lg:gap-8 lg:px-8 lg:py-14">
        {/* SOL TARAF */}
        <div className="relative z-20">
          <h1 className="max-w-2xl text-3xl font-bold leading-tight sm:text-4xl md:text-5xl md:leading-[1.15]">
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

          <p className="mt-5 max-w-xl text-sm leading-relaxed text-white/90 sm:text-base md:text-lg">
            {en
              ? "Monitor all process parameters (flow, level, temperature, etc.) and batch operations in real time. Accelerate production with remote control and automated reporting."
              : "Tüm proses parametrelerinizi (akış, seviye, sıcaklık vb.) ve batch süreçlerinizi gerçek zamanlı takip edin. Uzaktan kontrol ve otomatik raporlama ile üretimi hızlandırın."}
          </p>

          <p className="mt-4 max-w-xl text-sm leading-relaxed text-white/90 sm:text-base md:text-lg">
            {en
              ? "In addition to standard monitoring solutions, we design, integrate and commission turnkey project-based systems tailored to your requirements."
              : "Standart izleme çözümlerinin yanı sıra, ihtiyacınıza özel proje bazlı sistemleri tasarlıyor, entegre ediyor ve anahtar teslim devreye alıyoruz."}
          </p>

          <div className="mt-6 flex max-w-xl flex-wrap gap-2">
            <span className="rounded-full border border-white/10 bg-white/10 px-3 py-1.5 text-xs backdrop-blur-sm md:text-sm">
              {en ? "PLC/SCADA Compatibility" : "PLC/SCADA Uyumluluğu"}
            </span>

            <span className="rounded-full border border-white/10 bg-white/10 px-3 py-1.5 text-xs backdrop-blur-sm md:text-sm">
              {en
                ? "Historical Data & Analysis"
                : "Geçmiş Kayıt & Analiz"}
            </span>

            <span className="rounded-full border border-white/10 bg-white/10 px-3 py-1.5 text-xs backdrop-blur-sm md:text-sm">
              {en ? "Trends & Charts" : "Trend & Grafikler"}
            </span>

            <span className="rounded-full border border-white/10 bg-white/10 px-3 py-1.5 text-xs backdrop-blur-sm md:text-sm">
              PDF / Excel
            </span>
          </div>

          <div className="mt-7">
            <Button
              asChild
              className="rounded-full bg-white px-6 text-brand-navy shadow-lg shadow-black/10 transition-all duration-300 hover:-translate-y-0.5 hover:bg-white/95 hover:shadow-xl"
            >
              <Link href="#solutions">
                {en
                  ? "Explore Our Solutions →"
                  : "Çözümlerimizi Keşfedin →"}
              </Link>
            </Button>
          </div>
        </div>

        {/* SAĞ TARAF — YAZILIM EKRANLARI */}
        <div className="relative mx-auto h-[300px] w-full max-w-[760px] sm:h-[390px] lg:h-[500px]">
          <div
            aria-hidden="true"
            className="absolute left-[62%] top-1/2 h-[78%] w-[82%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/10 blur-3xl"
          />

          {/* ======================================================
              TANK İZLEME
          ====================================================== */}
          <Dialog>
            <DialogTrigger asChild>
              <button
                type="button"
                aria-label={
                  en
                    ? "Enlarge tank monitoring image"
                    : "Tank izleme görselini büyüt"
                }
                className="absolute left-[8%] top-0 z-10 w-[67%] -rotate-[6deg] cursor-zoom-in overflow-hidden rounded-xl border border-white/25 bg-white p-0 shadow-2xl shadow-black/30 transition-all duration-500 ease-out hover:z-[60] hover:-translate-y-2 hover:scale-[1.12] hover:rotate-0 hover:shadow-[0_34px_90px_rgba(0,0,0,0.45)] focus:outline-none focus-visible:ring-2 focus-visible:ring-white sm:left-[10%]"
              >
                <div className="relative aspect-[2.02/1] w-full">
                  <Image
                    src="/hero-tank-izleme.png"
                    alt={
                      en
                        ? "VeriSaha tank monitoring software"
                        : "VeriSaha tank izleme yazılımı"
                    }
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 65vw, 34vw"
                  />
                </div>
              </button>
            </DialogTrigger>

            <DialogContent className="max-w-5xl [&>button:not(.custom-close)]:hidden">
              <DialogTitle className="sr-only">
                {en ? "Tank Monitoring" : "Tank İzleme"}
              </DialogTitle>

              <DialogClose className="custom-close absolute right-3 top-3 z-20 rounded-full bg-white/90 p-2 shadow transition hover:bg-white">
                <X className="h-5 w-5 text-brand-navy" />
              </DialogClose>

              <Image
                src="/hero-tank-izleme.png"
                alt={
                  en
                    ? "VeriSaha tank monitoring software enlarged"
                    : "VeriSaha tank izleme yazılımı büyük görünüm"
                }
                width={1800}
                height={900}
                className="h-auto w-full rounded-lg"
              />
            </DialogContent>
          </Dialog>

          {/* ======================================================
              RAPORLAR
          ====================================================== */}
          <Dialog>
            <DialogTrigger asChild>
              <button
                type="button"
                aria-label={
                  en
                    ? "Enlarge production reports image"
                    : "Üretim raporları görselini büyüt"
                }
                className="absolute bottom-0 right-[-1%] z-20 w-[69%] rotate-[6deg] cursor-zoom-in overflow-hidden rounded-xl border border-white/25 bg-white p-0 shadow-2xl shadow-black/30 transition-all duration-500 ease-out hover:z-[60] hover:-translate-y-2 hover:scale-[1.12] hover:rotate-0 hover:shadow-[0_34px_90px_rgba(0,0,0,0.45)] focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
              >
                <div className="relative aspect-[2.02/1] w-full">
                  <Image
                    src="/hero-raporlar.png"
                    alt={
                      en
                        ? "VeriSaha industrial reporting software"
                        : "VeriSaha endüstriyel raporlama yazılımı"
                    }
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 65vw, 35vw"
                  />
                </div>
              </button>
            </DialogTrigger>

            <DialogContent className="max-w-5xl [&>button:not(.custom-close)]:hidden">
              <DialogTitle className="sr-only">
                {en ? "Production Reports" : "Üretim Raporları"}
              </DialogTitle>

              <DialogClose className="custom-close absolute right-3 top-3 z-20 rounded-full bg-white/90 p-2 shadow transition hover:bg-white">
                <X className="h-5 w-5 text-brand-navy" />
              </DialogClose>

              <Image
                src="/hero-raporlar.png"
                alt={
                  en
                    ? "VeriSaha production reports enlarged"
                    : "VeriSaha üretim raporları büyük görünüm"
                }
                width={1800}
                height={900}
                className="h-auto w-full rounded-lg"
              />
            </DialogContent>
          </Dialog>

          {/* ======================================================
              SİSTEM ÖZETİ — ANA GÖRSEL
          ====================================================== */}
          <Dialog>
            <DialogTrigger asChild>
              <button
                type="button"
                aria-label={
                  en
                    ? "Enlarge system overview image"
                    : "Sistem özeti görselini büyüt"
                }
                className="absolute left-[60%] top-[49%] z-30 w-[84%] -translate-x-1/2 -translate-y-1/2 cursor-zoom-in overflow-hidden rounded-xl border border-white/35 bg-white p-0 shadow-[0_28px_70px_rgba(0,0,0,0.38)] transition-all duration-500 ease-out hover:z-[70] hover:scale-[1.11] hover:shadow-[0_38px_100px_rgba(0,0,0,0.50)] focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
              >
                <div className="relative aspect-[2.02/1] w-full">
                  <Image
                    src="/hero-system-ozeti.png"
                    alt={
                      en
                        ? "VeriSaha industrial monitoring system overview"
                        : "VeriSaha endüstriyel izleme sistem özeti"
                    }
                    fill
                    priority
                    className="object-cover"
                    sizes="(max-width: 1024px) 80vw, 43vw"
                  />
                </div>
              </button>
            </DialogTrigger>

            <DialogContent className="max-w-5xl [&>button:not(.custom-close)]:hidden">
              <DialogTitle className="sr-only">
                {en ? "System Overview" : "Sistem Özeti"}
              </DialogTitle>

              <DialogClose className="custom-close absolute right-3 top-3 z-20 rounded-full bg-white/90 p-2 shadow transition hover:bg-white">
                <X className="h-5 w-5 text-brand-navy" />
              </DialogClose>

              <Image
                src="/hero-system-ozeti.png"
                alt={
                  en
                    ? "VeriSaha industrial monitoring system overview enlarged"
                    : "VeriSaha endüstriyel izleme sistem özeti büyük görünüm"
                }
                width={1800}
                height={900}
                className="h-auto w-full rounded-lg"
              />
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </section>
  );
}