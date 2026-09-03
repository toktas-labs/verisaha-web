// ------------------------------------------------------------
// src/app/cozumler/proje-bazli/page.tsx
// ------------------------------------------------------------

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import * as Lucide from "lucide-react";

export const metadata = {
  title: "Özel Proje & Yazılım | VeriSaha Teknoloji",
  description:
    "İhtiyaca özel Web ve Windows (.NET) yazılımları, Raspberry Pi tabanlı saha uygulamaları, veri toplama, endüstriyel entegrasyon, otomasyon ve test sistemleri.",
};

export default function ProjectBasedSolutionsPage() {
  return (
    <main className="bg-white">
      {/* HERO */}
      <section className="relative min-h-[400px] overflow-hidden md:min-h-[500px] lg:min-h-[560px]">
        <div className="absolute inset-0 z-0">
          <Image
            src="/proje/hero.jpg"
            alt="Özel proje ve yazılım çözümleri"
            fill
            className="object-cover opacity-40"
            priority
          />

          <div className="absolute inset-0 bg-gradient-to-br from-brand-navy/85 via-cyan-800/70 to-teal-700/65" />
        </div>

        <div className="relative z-10 mx-auto max-w-6xl px-4 py-12 text-white md:py-20">
          <div className="max-w-3xl">
            <h1 className="text-3xl font-bold leading-tight md:text-5xl md:leading-[1.15]">
              Özel Proje & Yazılım
            </h1>

            <p className="mt-4 max-w-2xl leading-relaxed text-white/90 md:text-lg">
              Standart çözümlerin yeterli olmadığı projelerde; ihtiyacınıza
              özel Web, Windows (.NET) ve saha uygulamalarını tasarlıyor,
              geliştiriyor ve mevcut otomasyon sistemlerinizle entegre
              ediyoruz.
            </p>

            <ul className="mt-6 grid gap-2 text-white">
              <li className="flex items-start gap-2">
                <Lucide.CheckCircle2 className="mt-0.5 size-5 shrink-0" />

                <span>
                  <b>Özel Yazılım:</b> Web, Windows (.NET) ve projeye özel
                  kullanıcı arayüzleri.
                </span>
              </li>

              <li className="flex items-start gap-2">
                <Lucide.CheckCircle2 className="mt-0.5 size-5 shrink-0" />

                <span>
                  <b>Saha Entegrasyonu:</b> PLC, ölçüm cihazları, Raspberry Pi
                  ve endüstriyel haberleşme altyapıları.
                </span>
              </li>

              <li className="flex items-start gap-2">
                <Lucide.CheckCircle2 className="mt-0.5 size-5 shrink-0" />

                <span>
                  <b>Uçtan Uca Çözüm:</b> Veri toplama, kontrol, alarm,
                  raporlama ve devreye alma.
                </span>
              </li>
            </ul>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/iletisim">
                <Button
                  size="lg"
                  className="bg-white text-brand-navy hover:bg-slate-100"
                >
                  Projenizi Konuşalım
                </Button>
              </Link>

              <Link href="#bolumler">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white text-white hover:bg-white/10"
                >
                  Detayları İnceleyin
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 3 ANA ÇÖZÜM */}
      <section id="bolumler" className="bg-white">
        <div className="mx-auto max-w-6xl px-4 py-14 md:py-20">
          <div className="grid items-stretch gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {/* WEB & WINDOWS */}
            <Card className="flex h-full flex-col">
              <CardHeader className="flex flex-row items-center gap-3">
                <div className="rounded-xl bg-brand-navy/5 p-3">
                  <Lucide.Monitor className="size-6 text-brand-navy" />
                </div>

                <CardTitle>Web & Windows (.NET) Uygulamaları</CardTitle>
              </CardHeader>

              <CardContent className="flex flex-1 flex-col">
                <p className="leading-relaxed text-slate-600">
                  Projenize özel izleme, kontrol, alarm ve raporlama
                  uygulamalarını Web veya Windows (.NET) ortamında
                  geliştiriyoruz.
                </p>

                <ul className="mt-4 space-y-2 text-sm text-slate-600">
                  <li className="flex gap-2">
                    <Lucide.CheckCircle2 className="mt-0.5 size-4 shrink-0 text-brand-teal" />
                    Gerçek zamanlı izleme ve kontrol
                  </li>

                  <li className="flex gap-2">
                    <Lucide.CheckCircle2 className="mt-0.5 size-4 shrink-0 text-brand-teal" />
                    Alarm ve kullanıcı yönetimi
                  </li>

                  <li className="flex gap-2">
                    <Lucide.CheckCircle2 className="mt-0.5 size-4 shrink-0 text-brand-teal" />
                    SQL kayıt ve raporlama
                  </li>
                </ul>

                <div className="mt-4 flex flex-wrap gap-2">
                  {["Web", ".NET", "SQL", "Dashboard"].map((item) => (
                    <span
                      key={item}
                      className="rounded-full border border-brand-navy/10 bg-slate-50 px-2.5 py-1 text-xs font-medium text-slate-600"
                    >
                      {item}
                    </span>
                  ))}
                </div>

                <Dialog>
                  <DialogTrigger asChild>
                    <div className="relative mt-5 aspect-[4/3] w-full cursor-pointer overflow-hidden rounded-lg border">
                      <Image
                        src="/proje/ozel.jpg"
                        alt="Özel Web ve Windows yazılım uygulamaları"
                        fill
                        className="object-cover"
                      />

                      <div className="absolute bottom-2 right-2 rounded-full bg-white/80 p-2 shadow">
                        <Lucide.Search className="h-5 w-5 text-brand-navy" />
                      </div>
                    </div>
                  </DialogTrigger>

                  <DialogContent className="max-w-4xl [&>button:not(.custom-close)]:hidden">
                    <DialogTitle className="sr-only">
                      Web & Windows (.NET) Uygulamaları
                    </DialogTitle>

                    <DialogClose className="custom-close absolute right-3 top-3 rounded-full bg-white/90 p-2 shadow hover:bg-white">
                      <Lucide.X className="h-5 w-5 text-brand-navy" />
                    </DialogClose>

                    <Image
                      src="/proje/ozel.jpg"
                      alt="Özel Web ve Windows yazılım uygulamaları büyük"
                      width={1200}
                      height={900}
                      className="h-auto w-full rounded-lg"
                    />
                  </DialogContent>
                </Dialog>
              </CardContent>
            </Card>

            {/* VERİ TOPLAMA & ENTEGRASYON */}
            <Card className="flex h-full flex-col">
              <CardHeader className="flex flex-row items-center gap-3">
                <div className="rounded-xl bg-brand-navy/5 p-3">
                  <Lucide.Cpu className="size-6 text-brand-navy" />
                </div>

                <CardTitle>Veri Toplama & Sistem Entegrasyonu</CardTitle>
              </CardHeader>

              <CardContent className="flex flex-1 flex-col">
                <p className="leading-relaxed text-slate-600">
                  Saha cihazlarından alınan verileri PLC, Raspberry Pi veya
                  endüstriyel haberleşme altyapıları üzerinden merkezi
                  sistemlere aktarıyoruz.
                </p>

                <ul className="mt-4 space-y-2 text-sm text-slate-600">
                  <li className="flex gap-2">
                    <Lucide.CheckCircle2 className="mt-0.5 size-4 shrink-0 text-brand-teal" />
                    Modbus TCP/RTU veri toplama
                  </li>

                  <li className="flex gap-2">
                    <Lucide.CheckCircle2 className="mt-0.5 size-4 shrink-0 text-brand-teal" />
                    Raspberry Pi tabanlı saha uygulamaları
                  </li>

                  <li className="flex gap-2">
                    <Lucide.CheckCircle2 className="mt-0.5 size-4 shrink-0 text-brand-teal" />
                    MQTT ve SQL sistem entegrasyonu
                  </li>
                </ul>

                <div className="mt-4 flex flex-wrap gap-2">
                  {["Raspberry Pi", "Modbus", "MQTT", "SQL"].map((item) => (
                    <span
                      key={item}
                      className="rounded-full border border-brand-navy/10 bg-slate-50 px-2.5 py-1 text-xs font-medium text-slate-600"
                    >
                      {item}
                    </span>
                  ))}
                </div>

                <Dialog>
                  <DialogTrigger asChild>
                    <div className="relative mt-5 aspect-[4/3] w-full cursor-pointer overflow-hidden rounded-lg border">
                      <Image
                        src="/proje/test.jpg"
                        alt="Veri toplama ve sistem entegrasyonu"
                        fill
                        className="object-cover"
                      />

                      <div className="absolute bottom-2 right-2 rounded-full bg-white/80 p-2 shadow">
                        <Lucide.Search className="h-5 w-5 text-brand-navy" />
                      </div>
                    </div>
                  </DialogTrigger>

                  <DialogContent className="max-w-4xl [&>button:not(.custom-close)]:hidden">
                    <DialogTitle className="sr-only">
                      Veri Toplama & Sistem Entegrasyonu
                    </DialogTitle>

                    <DialogClose className="custom-close absolute right-3 top-3 rounded-full bg-white/90 p-2 shadow hover:bg-white">
                      <Lucide.X className="h-5 w-5 text-brand-navy" />
                    </DialogClose>

                    <Image
                      src="/proje/test.jpg"
                      alt="Veri toplama ve sistem entegrasyonu büyük"
                      width={1200}
                      height={900}
                      className="h-auto w-full rounded-lg"
                    />
                  </DialogContent>
                </Dialog>
              </CardContent>
            </Card>

            {/* OTOMASYON & TEST */}
            <Card className="flex h-full flex-col">
              <CardHeader className="flex flex-row items-center gap-3">
                <div className="rounded-xl bg-brand-navy/5 p-3">
                  <Lucide.Settings className="size-6 text-brand-navy" />
                </div>

                <CardTitle>Özel Otomasyon & Test Sistemleri</CardTitle>
              </CardHeader>

              <CardContent className="flex flex-1 flex-col">
                <p className="leading-relaxed text-slate-600">
                  Üretim, dolum ve test süreçlerine özel pano, kontrol ve test
                  sistemlerini yazılım ve saha ekipmanlarıyla birlikte
                  geliştiriyoruz.
                </p>

                <ul className="mt-4 space-y-2 text-sm text-slate-600">
                  <li className="flex gap-2">
                    <Lucide.CheckCircle2 className="mt-0.5 size-4 shrink-0 text-brand-teal" />
                    Batch ve set-reset uygulamaları
                  </li>

                  <li className="flex gap-2">
                    <Lucide.CheckCircle2 className="mt-0.5 size-4 shrink-0 text-brand-teal" />
                    PLC / HMI tabanlı kontrol sistemleri
                  </li>

                  <li className="flex gap-2">
                    <Lucide.CheckCircle2 className="mt-0.5 size-4 shrink-0 text-brand-teal" />
                    Test ve kalibrasyon çözümleri
                  </li>
                </ul>

                <div className="mt-4 flex flex-wrap gap-2">
                  {["PLC", "HMI", "Pano", "Test Sistemi"].map((item) => (
                    <span
                      key={item}
                      className="rounded-full border border-brand-navy/10 bg-slate-50 px-2.5 py-1 text-xs font-medium text-slate-600"
                    >
                      {item}
                    </span>
                  ))}
                </div>

                <Dialog>
                  <DialogTrigger asChild>
                    <div className="relative mt-5 aspect-[4/3] w-full cursor-pointer overflow-hidden rounded-lg border">
                      <Image
                        src="/proje/pano.jpg"
                        alt="Özel otomasyon ve test sistemleri"
                        fill
                        className="object-cover"
                      />

                      <div className="absolute bottom-2 right-2 rounded-full bg-white/80 p-2 shadow">
                        <Lucide.Search className="h-5 w-5 text-brand-navy" />
                      </div>
                    </div>
                  </DialogTrigger>

                  <DialogContent className="max-w-4xl [&>button:not(.custom-close)]:hidden">
                    <DialogTitle className="sr-only">
                      Özel Otomasyon & Test Sistemleri
                    </DialogTitle>

                    <DialogClose className="custom-close absolute right-3 top-3 rounded-full bg-white/90 p-2 shadow hover:bg-white">
                      <Lucide.X className="h-5 w-5 text-brand-navy" />
                    </DialogClose>

                    <Image
                      src="/proje/pano.jpg"
                      alt="Özel otomasyon ve test sistemleri büyük"
                      width={1200}
                      height={900}
                      className="h-auto w-full rounded-lg"
                    />
                  </DialogContent>
                </Dialog>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-brand-navy">
        <div className="mx-auto max-w-6xl px-4 py-10 text-white">
          <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
            <div>
              <h2 className="text-2xl font-semibold">
                Projenizi birlikte geliştirelim.
              </h2>

              <p className="mt-1 text-white/85">
                Yazılımdan saha entegrasyonuna kadar ihtiyacınıza özel
                çözümü birlikte oluşturalım.
              </p>
            </div>

            <Link href="/iletisim">
              <Button
                size="lg"
                className="bg-white text-brand-navy hover:bg-slate-100"
              >
                İletişime Geçin
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}