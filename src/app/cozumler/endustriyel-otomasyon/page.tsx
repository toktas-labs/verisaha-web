// ------------------------------------------------------------
// src/app/cozumler/endustriyel-otomasyon/page.tsx
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
  title: "Endüstriyel Otomasyon | VeriSaha Teknoloji",
  description:
    "PLC, SCADA ve HMI sistemleriyle endüstriyel takip ve entegrasyon. Siemens S7-1200/1500 gibi PLC sistemleriyle uyumlu, güvenilir otomasyon çözümleri.",
};

export default function IndustrialAutomationPage() {
  return (
    <main className="bg-white">
      {/* HERO */}
      <section className="relative overflow-hidden min-h-[400px] md:min-h-[500px] lg:min-h-[560px]">
        <div className="absolute inset-0 z-0">
          <Image
            src="/otomasyon/hero.jpg"
            alt="Endüstriyel Otomasyon"
            fill
            className="object-cover opacity-40"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-bl from-brand-teal/80 via-brand-navy/70 to-black/50" />
        </div>

        <div className="relative z-10 mx-auto max-w-6xl px-4 py-12 md:py-20 text-white">
          <div className="max-w-3xl">
            <h1 className="text-3xl md:text-5xl font-bold leading-tight md:leading-[1.15]">
              Endüstriyel Otomasyon
            </h1>
            <p className="mt-4 max-w-2xl text-white/90 md:text-lg leading-relaxed">
              PLC, SCADA ve HMI sistemleriyle endüstriyel takip ve entegrasyon.
              Siemens S7-1200/1500 gibi PLC sistemleriyle uyumlu, güvenilir
              otomasyon çözümleri.
            </p>

            <ul className="mt-6 grid gap-2 text-white">
              <li className="flex items-start gap-2">
                <Lucide.CheckCircle2 className="mt-0.5 size-5 shrink-0" />
                <span><b>Entegrasyon:</b> PLC, SCADA ve HMI sistemleriyle tam uyum.</span>
              </li>
              <li className="flex items-start gap-2">
                <Lucide.CheckCircle2 className="mt-0.5 size-5 shrink-0" />
                <span><b>Takip:</b> Üretim verilerinin gerçek zamanlı izlenmesi.</span>
              </li>
              <li className="flex items-start gap-2">
                <Lucide.CheckCircle2 className="mt-0.5 size-5 shrink-0" />
                <span><b>Genişletilebilirlik:</b> Modbus, Profibus ve Profinet
                  protokolleriyle ölçeklenebilir yapı.</span>
              </li>
            </ul>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/iletisim">
                <Button size="lg" className="bg-white text-brand-navy hover:bg-slate-100">
                  Çözüm Talep Edin
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

            {/* PLC Sistemleri */}
            <Card className="flex flex-col h-full">
              <CardHeader className="flex flex-row items-center gap-3">
                <div className="rounded-xl bg-brand-navy/5 p-3">
                  <Lucide.Cpu className="size-6 text-brand-navy" />
                </div>
                <CardTitle>PLC Sistemleri</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col flex-1">
                <p className="text-slate-600">
                  Siemens S7-1200/1500 ve benzeri PLC’lerle esnek kontrol çözümleri.
                  Endüstriyel süreçler için güvenilir otomasyon.
                </p>
                <Dialog>
                  <DialogTrigger asChild>
                    <div className="relative mt-4 aspect-[4/3] w-full overflow-hidden rounded-lg border cursor-pointer">
                      <Image
                        src="/otomasyon/plc.jpg"
                        alt="PLC Sistemleri"
                        fill
                        className="object-cover"
                      />
                      <div className="absolute bottom-2 right-2 bg-white/80 rounded-full p-2 shadow">
                        <Lucide.Search className="h-5 w-5 text-brand-navy" />
                      </div>
                    </div>
                  </DialogTrigger>
                  <DialogContent className="max-w-4xl [&>button:not(.custom-close)]:hidden">
                    <DialogTitle className="sr-only">PLC Sistemleri</DialogTitle>
                    <DialogClose className="custom-close absolute top-3 right-3 rounded-full bg-white/90 hover:bg-white p-2 shadow">
                      <Lucide.X className="h-5 w-5 text-brand-navy" />
                    </DialogClose>
                    <Image
                      src="/otomasyon/plc.jpg"
                      alt="PLC Sistemleri büyük"
                      width={1200}
                      height={900}
                      className="w-full h-auto rounded-lg"
                    />
                  </DialogContent>
                </Dialog>
              </CardContent>
            </Card>

            {/* SCADA & HMI */}
            <Card className="flex flex-col h-full">
              <CardHeader className="flex flex-row items-center gap-3">
                <div className="rounded-xl bg-brand-navy/5 p-3">
                  <Lucide.Monitor className="size-6 text-brand-navy" />
                </div>
                <CardTitle>SCADA & HMI Çözümleri</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col flex-1">
                <p className="text-slate-600">
                  Sahadaki verileri operatör panelleri (HMI) ve SCADA yazılımları
                  üzerinden izleyin ve yönetin.
                </p>
                <Dialog>
                  <DialogTrigger asChild>
                    <div className="relative mt-4 aspect-[4/3] w-full overflow-hidden rounded-lg border cursor-pointer">
                      <Image
                        src="/otomasyon/scada.jpg"
                        alt="SCADA & HMI Çözümleri"
                        fill
                        className="object-cover"
                      />
                      <div className="absolute bottom-2 right-2 bg-white/80 rounded-full p-2 shadow">
                        <Lucide.Search className="h-5 w-5 text-brand-navy" />
                      </div>
                    </div>
                  </DialogTrigger>
                  <DialogContent className="max-w-4xl [&>button:not(.custom-close)]:hidden">
                    <DialogTitle className="sr-only">SCADA & HMI Çözümleri</DialogTitle>
                    <DialogClose className="custom-close absolute top-3 right-3 rounded-full bg-white/90 hover:bg-white p-2 shadow">
                      <Lucide.X className="h-5 w-5 text-brand-navy" />
                    </DialogClose>
                    <Image
                      src="/otomasyon/scada.jpg"
                      alt="SCADA & HMI Çözümleri büyük"
                      width={1200}
                      height={900}
                      className="w-full h-auto rounded-lg"
                    />
                  </DialogContent>
                </Dialog>
              </CardContent>
            </Card>

            {/* Endüstriyel Haberleşme */}
            <Card className="flex flex-col h-full">
              <CardHeader className="flex flex-row items-center gap-3">
                <div className="rounded-xl bg-brand-navy/5 p-3">
                  <Lucide.Network className="size-6 text-brand-navy" />
                </div>
                <CardTitle>Endüstriyel Haberleşme</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col flex-1">
                <p className="text-slate-600">
                  Modbus, Profibus, Profinet ve OPC UA tabanlı haberleşme
                  entegrasyonu ile süreçlerinizi dijitalleştirin.
                </p>
                <Dialog>
                  <DialogTrigger asChild>
                    <div className="relative mt-4 aspect-[4/3] w-full overflow-hidden rounded-lg border cursor-pointer">
                      <Image
                        src="/otomasyon/haberlesme.jpg"
                        alt="Endüstriyel Haberleşme"
                        fill
                        className="object-cover"
                      />
                      <div className="absolute bottom-2 right-2 bg-white/80 rounded-full p-2 shadow">
                        <Lucide.Search className="h-5 w-5 text-brand-navy" />
                      </div>
                    </div>
                  </DialogTrigger>
                  <DialogContent className="max-w-4xl [&>button:not(.custom-close)]:hidden">
                    <DialogTitle className="sr-only">Endüstriyel Haberleşme</DialogTitle>
                    <DialogClose className="custom-close absolute top-3 right-3 rounded-full bg-white/90 hover:bg-white p-2 shadow">
                      <Lucide.X className="h-5 w-5 text-brand-navy" />
                    </DialogClose>
                    <Image
                      src="/otomasyon/haberlesme.jpg"
                      alt="Endüstriyel Haberleşme büyük"
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
                Üretim süreçlerinizi dijitalleştirin.
              </h2>
              <p className="mt-1 text-white/85">
                PLC, SCADA ve HMI çözümleriyle verimliliği artırın, endüstriyel
                haberleşmeyle süreçlerinizi güçlendirin.
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
