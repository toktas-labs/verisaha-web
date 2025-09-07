// ------------------------------------------------------------
// src/app/cozumler/proje-bazli/page.tsx
// ------------------------------------------------------------
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog"
import * as Lucide from "lucide-react";

export const metadata = {
  title: "Proje Bazlı Çözümler | VeriSaha Teknoloji",
  description:
    "Set–reset panoları, batch panoları, test sistemleri ve müşteri taleplerine özel tasarlanan çözümler. Anahtar teslim entegrasyon ve devreye alma hizmetleri.",
};

export default function ProjectBasedSolutionsPage() {
  return (
    <main className="bg-white">
      {/* HERO */}
      <section className="relative overflow-hidden min-h-[400px] md:min-h-[500px] lg:min-h-[560px]">
        <div className="absolute inset-0 z-0">
          <Image
            src="/proje/hero.jpg"
            alt="Proje bazlı çözümler"
            fill
            className="object-cover opacity-40"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-br from-brand-navy/85 via-cyan-800/70 to-teal-700/65" />
        </div>

        <div className="relative z-10 mx-auto max-w-6xl px-4 py-12 md:py-20 text-white">
          <div className="max-w-3xl">
            <h1 className="text-3xl md:text-5xl font-bold leading-tight md:leading-[1.15]">
              Proje Bazlı Çözümler
            </h1>
            <p className="mt-4 max-w-2xl text-white/90 md:text-lg leading-relaxed">
              Set–reset panoları, batch panoları, test sistemleri ve müşteri
              taleplerine özel tasarlanan çözümler. Entegrasyon, devreye alma
              ve uzun vadeli güvenilirlik.
            </p>

            <ul className="mt-6 grid gap-2 text-white">
              <li className="flex items-start gap-2">
                <Lucide.CheckCircle2 className="mt-0.5 size-5 shrink-0" />
                <span><b>Esneklik:</b> İhtiyaca özel pano ve otomasyon projeleri.</span>
              </li>
              <li className="flex items-start gap-2">
                <Lucide.CheckCircle2 className="mt-0.5 size-5 shrink-0" />
                <span><b>Güvenilirlik:</b> Sahada kanıtlanmış tasarım ve montaj.</span>
              </li>
              <li className="flex items-start gap-2">
                <Lucide.CheckCircle2 className="mt-0.5 size-5 shrink-0" />
                <span><b>Kontrol Esnekliği:</b> PLC, PC ve Web tabanlı çözümlerle uyumlu.</span>
              </li>
            </ul>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/iletisim">
                <Button size="lg" className="bg-white text-brand-navy hover:bg-slate-100">
                  Proje Talep Edin
                </Button>
              </Link>
              <Link href="#bolumler">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                  Detaylı Bilgi Alın
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 3 SÜTUN */}
      <section id="bolumler" className="bg-white">
        <div className="mx-auto max-w-6xl px-4 py-14 md:py-20">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 items-stretch">

            {/* Batch & Set-Reset Panoları */}
            <Card className="flex flex-col h-full">
              <CardHeader className="flex flex-row items-center gap-3">
                <div className="rounded-xl bg-brand-navy/5 p-3">
                  <Lucide.Settings className="size-6 text-brand-navy" />
                </div>
                <CardTitle>Batch & Set-Reset Panoları</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col flex-1">
                <p className="text-slate-600">
                  Dolum ve üretim hatlarında kullanılan batch ve set–reset
                  panoları; yüksek doğruluk, güvenlik ve kolay kullanım.
                </p>
                <Dialog>
                  <DialogTrigger asChild>
                    <div className="relative mt-4 aspect-[4/3] w-full overflow-hidden rounded-lg border cursor-pointer">
                      <Image
                        src="/proje/pano.jpg"
                        alt="Batch & Set-Reset Panoları"
                        fill
                        className="object-cover"
                      />
                      <div className="absolute bottom-2 right-2 bg-white/80 rounded-full p-2 shadow">
                        <Lucide.Search className="h-5 w-5 text-brand-navy" />
                      </div>
                    </div>
                  </DialogTrigger>
                  <DialogContent className="max-w-4xl [&>button:not(.custom-close)]:hidden">
                    <DialogTitle className="sr-only">Batch & Set-Reset Panoları</DialogTitle>
                    <DialogClose className="custom-close absolute top-3 right-3 rounded-full bg-white/90 hover:bg-white p-2 shadow">
                      <Lucide.X className="h-5 w-5 text-brand-navy" />
                    </DialogClose>
                    <Image
                      src="/proje/pano.jpg"
                      alt="Batch & Set-Reset Panoları büyük"
                      width={1200}
                      height={900}
                      className="w-full h-auto rounded-lg"
                    />
                  </DialogContent>
                </Dialog>
              </CardContent>
            </Card>

            {/* Test Sistemleri */}
            <Card className="flex flex-col h-full">
              <CardHeader className="flex flex-row items-center gap-3">
                <div className="rounded-xl bg-brand-navy/5 p-3">
                  <Lucide.TestTube className="size-6 text-brand-navy" />
                </div>
                <CardTitle>Test & Kalibrasyon Sistemleri</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col flex-1">
                <p className="text-slate-600">
                  Özel test ve kalibrasyon ihtiyaçlarınıza uygun, hassasiyet
                  ve güvenlik öncelikli çözümler.
                </p>
                <Dialog>
                  <DialogTrigger asChild>
                    <div className="relative mt-4 aspect-[4/3] w-full overflow-hidden rounded-lg border cursor-pointer">
                      <Image
                        src="/proje/test.jpg"
                        alt="Test ve Kalibrasyon Sistemleri"
                        fill
                        className="object-cover"
                      />
                      <div className="absolute bottom-2 right-2 bg-white/80 rounded-full p-2 shadow">
                        <Lucide.Search className="h-5 w-5 text-brand-navy" />
                      </div>
                    </div>
                  </DialogTrigger>
                  <DialogContent className="max-w-4xl [&>button:not(.custom-close)]:hidden">
                    <DialogTitle className="sr-only">Test & Kalibrasyon Sistemleri</DialogTitle>
                    <DialogClose className="custom-close absolute top-3 right-3 rounded-full bg-white/90 hover:bg-white p-2 shadow">
                      <Lucide.X className="h-5 w-5 text-brand-navy" />
                    </DialogClose>
                    <Image
                      src="/proje/test.jpg"
                      alt="Test ve Kalibrasyon Sistemleri büyük"
                      width={1200}
                      height={900}
                      className="w-full h-auto rounded-lg"
                    />
                  </DialogContent>
                </Dialog>
              </CardContent>
            </Card>

            {/* Özel Projeler */}
            <Card className="flex flex-col h-full">
              <CardHeader className="flex flex-row items-center gap-3">
                <div className="rounded-xl bg-brand-navy/5 p-3">
                  <Lucide.Layers className="size-6 text-brand-navy" />
                </div>
                <CardTitle>Müşteriye Özel Projeler</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col flex-1">
                <p className="text-slate-600">
                  Tamamen ihtiyaca göre tasarlanmış projeler. PLC, SCADA ve
                  endüstriyel haberleşme altyapılarıyla uyumlu çözümler.
                </p>
                <Dialog>
                  <DialogTrigger asChild>
                    <div className="relative mt-4 aspect-[4/3] w-full overflow-hidden rounded-lg border cursor-pointer">
                      <Image
                        src="/proje/ozel.jpg"
                        alt="Müşteriye Özel Projeler"
                        fill
                        className="object-cover"
                      />
                      <div className="absolute bottom-2 right-2 bg-white/80 rounded-full p-2 shadow">
                        <Lucide.Search className="h-5 w-5 text-brand-navy" />
                      </div>
                    </div>
                  </DialogTrigger>
                  <DialogContent className="max-w-4xl [&>button:not(.custom-close)]:hidden">
                    <DialogTitle className="sr-only">Müşteriye Özel Projeler</DialogTitle>
                    <DialogClose className="custom-close absolute top-3 right-3 rounded-full bg-white/90 hover:bg-white p-2 shadow">
                      <Lucide.X className="h-5 w-5 text-brand-navy" />
                    </DialogClose>
                    <Image
                      src="/proje/ozel.jpg"
                      alt="Müşteriye Özel Projeler büyük"
                      width={1200}
                      height={900}
                      className="w-full h-auto rounded-lg"
                    />
                  </DialogContent>
                </Dialog>
              </CardContent>
            </Card>

          </div>
        </div>
      </section>

      {/* CTA BANDI */}
      <section className="bg-brand-navy">
        <div className="mx-auto max-w-6xl px-4 py-10 text-white">
          <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
            <div>
              <h2 className="text-2xl font-semibold">
                Projenizi birlikte tasarlayalım.
              </h2>
              <p className="mt-1 text-white/85">
                İhtiyacınıza uygun pano, test sistemi ve entegrasyon çözümleri.
              </p>
            </div>
            <div className="flex gap-3">
              <Link href="/iletisim">
                <Button size="lg" className="bg-white text-brand-navy hover:bg-slate-100">
                  İletişime Geçin
                </Button>
              </Link>
              <Link href="/referanslar">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                  Referanslar
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
