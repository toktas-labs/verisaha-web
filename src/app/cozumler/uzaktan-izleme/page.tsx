// ------------------------------------------------------------
// src/app/cozumler/uzaktan-izleme/page.tsx
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
  title: "Uzaktan İzleme | VeriSaha Teknoloji",
  description:
    "Sahadaki ölçüm cihazlarını web, mobil ve bilgisayar üzerinden anlık olarak izleyin ve yönetin.",
};

export default function RemoteMonitoringPage() {
  return (
    <main className="bg-white">
      {/* HERO */}
      <section className="relative overflow-hidden min-h-[400px] md:min-h-[500px] lg:min-h-[560px]">
        <div className="absolute inset-0 z-0">
          <Image
            src="/uzaktan/hero.jpg"
            alt="Uzaktan İzleme"
            fill
            className="object-cover opacity-40"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-900/80 via-brand-navy/75 to-teal-700/60" />
        </div>

        <div className="relative z-10 mx-auto max-w-6xl px-4 py-12 md:py-20 text-white">
          <div className="max-w-3xl">
            <h1 className="text-3xl md:text-5xl font-bold leading-tight md:leading-[1.15]">
              Uzaktan İzleme
            </h1>
            <p className="mt-4 max-w-2xl text-white/90 md:text-lg leading-relaxed">
              Sahadaki ölçüm cihazlarını web, mobil ve bilgisayar üzerinden
              anlık olarak izleyin ve yönetin.
            </p>

            <ul className="mt-6 grid gap-2 text-white">
              <li className="flex items-start gap-2">
                <Lucide.CheckCircle2 className="mt-0.5 size-5 shrink-0" />
                <span><b>Çoklu Platform:</b> Web, mobil ve masaüstü erişim.</span>
              </li>
              <li className="flex items-start gap-2">
                <Lucide.CheckCircle2 className="mt-0.5 size-5 shrink-0" />
                <span><b>Gerçek Zamanlı Takip:</b> Anlık ölçüm değerleri ve alarmlar.</span>
              </li>
              <li className="flex items-start gap-2">
                <Lucide.CheckCircle2 className="mt-0.5 size-5 shrink-0" />
                <span><b>Güvenli Erişim:</b> VPN, şifreleme ve yetkilendirme desteği.</span>
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

            {/* Web Arayüzü */}
            <Card className="flex flex-col h-full">
              <CardHeader className="flex flex-row items-center gap-3">
                <div className="rounded-xl bg-brand-navy/5 p-3">
                  <Lucide.Globe className="size-6 text-brand-navy" />
                </div>
                <CardTitle>Web Arayüzü</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col flex-1">
                <p className="text-slate-600">
                  Tarayıcı tabanlı izleme ekranları ile her yerden ölçüm
                  verilerine erişin.
                </p>
                <Dialog>
                  <DialogTrigger asChild>
                    <div className="relative mt-4 aspect-[4/3] w-full overflow-hidden rounded-lg border cursor-pointer">
                      <Image
                        src="/uzaktan/web.jpg"
                        alt="Web Arayüzü"
                        fill
                        className="object-cover"
                      />
                      <div className="absolute bottom-2 right-2 bg-white/80 rounded-full p-2 shadow">
                        <Lucide.Search className="h-5 w-5 text-brand-navy" />
                      </div>
                    </div>
                  </DialogTrigger>
                  <DialogContent className="max-w-4xl [&>button:not(.custom-close)]:hidden">
                    <DialogTitle className="sr-only">Web Arayüzü</DialogTitle>
                    <DialogClose className="custom-close absolute top-3 right-3 rounded-full bg-white/90 hover:bg-white p-2 shadow">
                      <Lucide.X className="h-5 w-5 text-brand-navy" />
                    </DialogClose>
                    <Image
                      src="/uzaktan/web.jpg"
                      alt="Web Arayüzü büyük"
                      width={1200}
                      height={900}
                      className="w-full h-auto rounded-lg"
                    />
                  </DialogContent>
                </Dialog>
              </CardContent>
            </Card>

            {/* Mobil Uygulama */}
            <Card className="flex flex-col h-full">
              <CardHeader className="flex flex-row items-center gap-3">
                <div className="rounded-xl bg-brand-navy/5 p-3">
                  <Lucide.Smartphone className="size-6 text-brand-navy" />
                </div>
                <CardTitle>Mobil Uygulama</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col flex-1">
                <p className="text-slate-600">
                  Android/iOS uygulamaları ile sahadaki cihazları
                  cebinizden takip edin.
                </p>
                <Dialog>
                  <DialogTrigger asChild>
                    <div className="relative mt-4 aspect-[4/3] w-full overflow-hidden rounded-lg border cursor-pointer">
                      <Image
                        src="/uzaktan/mobil.jpg"
                        alt="Mobil Uygulama"
                        fill
                        className="object-cover"
                      />
                      <div className="absolute bottom-2 right-2 bg-white/80 rounded-full p-2 shadow">
                        <Lucide.Search className="h-5 w-5 text-brand-navy" />
                      </div>
                    </div>
                  </DialogTrigger>
                  <DialogContent className="max-w-4xl [&>button:not(.custom-close)]:hidden">
                    <DialogTitle className="sr-only">Mobil Uygulama</DialogTitle>
                    <DialogClose className="custom-close absolute top-3 right-3 rounded-full bg-white/90 hover:bg-white p-2 shadow">
                      <Lucide.X className="h-5 w-5 text-brand-navy" />
                    </DialogClose>
                    <Image
                      src="/uzaktan/mobil.jpg"
                      alt="Mobil Uygulama büyük"
                      width={1200}
                      height={900}
                      className="w-full h-auto rounded-lg"
                    />
                  </DialogContent>
                </Dialog>
              </CardContent>
            </Card>

            {/* PC & SCADA Entegrasyonu */}
            <Card className="flex flex-col h-full">
              <CardHeader className="flex flex-row items-center gap-3">
                <div className="rounded-xl bg-brand-navy/5 p-3">
                  <Lucide.Monitor className="size-6 text-brand-navy" />
                </div>
                <CardTitle>PC & SCADA Entegrasyonu</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col flex-1">
                <p className="text-slate-600">
                  Bilgisayar üzerinden kapsamlı izleme ve SCADA entegrasyonu.
                </p>
                <Dialog>
                  <DialogTrigger asChild>
                    <div className="relative mt-4 aspect-[4/3] w-full overflow-hidden rounded-lg border cursor-pointer">
                      <Image
                        src="/uzaktan/pc.jpg"
                        alt="PC & SCADA Entegrasyonu"
                        fill
                        className="object-cover"
                      />
                      <div className="absolute bottom-2 right-2 bg-white/80 rounded-full p-2 shadow">
                        <Lucide.Search className="h-5 w-5 text-brand-navy" />
                      </div>
                    </div>
                  </DialogTrigger>
                  <DialogContent className="max-w-4xl [&>button:not(.custom-close)]:hidden">
                    <DialogTitle className="sr-only">PC & SCADA Entegrasyonu</DialogTitle>
                    <DialogClose className="custom-close absolute top-3 right-3 rounded-full bg-white/90 hover:bg-white p-2 shadow">
                      <Lucide.X className="h-5 w-5 text-brand-navy" />
                    </DialogClose>
                    <Image
                      src="/uzaktan/pc.jpg"
                      alt="PC & SCADA Entegrasyonu büyük"
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
                Verilerinize her yerden erişin.
              </h2>
              <p className="mt-1 text-white/85">
                Web, mobil ve PC tabanlı çözümlerle sahadaki cihazlarınızı anlık olarak izleyin.
              </p>
            </div>
            <div className="flex gap-3">
              <Link href="/iletisim">
                <Button size="lg" className="bg-white text-brand-navy hover:bg-slate-100">
                  İletişime Geçin
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
