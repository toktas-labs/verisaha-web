// ------------------------------------------------------------
// src/app/cozumler/raporlama/page.tsx
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
  title: "Raporlama | VeriSaha Teknoloji",
  description:
    "Günlük, aylık ve yıllık raporlar; grafiksel takip ve PDF & Excel çıktıları ile kapsamlı raporlama çözümleri.",
};

export default function ReportingPage() {
  return (
    <main className="bg-white">
      {/* HERO */}
      <section className="relative overflow-hidden min-h-[400px] md:min-h-[500px] lg:min-h-[560px]">
        <div className="absolute inset-0 z-0">
          <Image
            src="/raporlama/hero.jpg"
            alt="Raporlama"
            fill
            className="object-cover opacity-40"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-tr from-brand-teal/80 via-brand-navy/55 to-brand-navy/75" />
        </div>

        <div className="relative z-10 mx-auto max-w-6xl px-4 py-12 md:py-20 text-white">
          <div className="max-w-3xl">
            <h1 className="text-3xl md:text-5xl font-bold leading-tight md:leading-[1.15]">
              Raporlama
            </h1>
            <p className="mt-4 max-w-2xl text-white/90 md:text-lg leading-relaxed">
              Günlük, aylık ve yıllık raporlar; grafiksel takip ve PDF & Excel
              çıktıları ile kapsamlı raporlama çözümleri.
            </p>

            <ul className="mt-6 grid gap-2 text-white">
              <li className="flex items-start gap-2">
                <Lucide.CheckCircle2 className="mt-0.5 size-5 shrink-0" />
                <span><b>Görselleştirme:</b> Trend grafikler, tablolar ve analizler.</span>
              </li>
              <li className="flex items-start gap-2">
                <Lucide.CheckCircle2 className="mt-0.5 size-5 shrink-0" />
                <span><b>Esneklik:</b> Günlük, aylık ve yıllık raporlar.</span>
              </li>
              <li className="flex items-start gap-2">
                <Lucide.CheckCircle2 className="mt-0.5 size-5 shrink-0" />
                <span><b>Dışa Aktarım:</b> PDF ve Excel çıktıları ile kolay paylaşım.</span>
              </li>
            </ul>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/iletisim">
                <Button size="lg" className="bg-white text-brand-navy hover:bg-slate-100">
                  Raporlama Talep Edin
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

            {/* Trend Analizleri */}
            <Card className="flex flex-col h-full">
              <CardHeader className="flex flex-row items-center gap-3">
                <div className="rounded-xl bg-brand-navy/5 p-3">
                  <Lucide.LineChart className="size-6 text-brand-navy" />
                </div>
                <CardTitle>Trend Analizleri</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col flex-1">
                <p className="text-slate-600">
                  Günlük, aylık ve yıllık trendleri grafiksel olarak takip edin.
                  Süreçlerinizi daha net analiz edin.
                </p>
                <Dialog>
                  <DialogTrigger asChild>
                    <div className="relative mt-4 aspect-[4/3] w-full overflow-hidden rounded-lg border cursor-pointer">
                      <Image
                        src="/raporlama/trend.jpg"
                        alt="Trend Analizleri"
                        fill
                        className="object-cover"
                      />
                      <div className="absolute bottom-2 right-2 bg-white/80 rounded-full p-2 shadow">
                        <Lucide.Search className="h-5 w-5 text-brand-navy" />
                      </div>
                    </div>
                  </DialogTrigger>
                  <DialogContent className="max-w-4xl [&>button:not(.custom-close)]:hidden">
                    <DialogTitle className="sr-only">Trend Analizleri</DialogTitle>
                    <DialogClose className="custom-close absolute top-3 right-3 rounded-full bg-white/90 hover:bg-white p-2 shadow">
                      <Lucide.X className="h-5 w-5 text-brand-navy" />
                    </DialogClose>
                    <Image
                      src="/raporlama/trend.jpg"
                      alt="Trend Analizleri büyük"
                      width={1200}
                      height={900}
                      className="w-full h-auto rounded-lg"
                    />
                  </DialogContent>
                </Dialog>
              </CardContent>
            </Card>

            {/* Arşiv ve Filtreleme */}
            <Card className="flex flex-col h-full">
              <CardHeader className="flex flex-row items-center gap-3">
                <div className="rounded-xl bg-brand-navy/5 p-3">
                  <Lucide.FolderOpen className="size-6 text-brand-navy" />
                </div>
                <CardTitle>Arşiv ve Filtreleme</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col flex-1">
                <p className="text-slate-600">
                  Tüm ölçüm verilerinizi arşivleyin, geçmiş kayıtları filtreleyin
                  ve ihtiyaç duyduğunuz bilgiye hızla erişin.
                </p>
                <Dialog>
                  <DialogTrigger asChild>
                    <div className="relative mt-4 aspect-[4/3] w-full overflow-hidden rounded-lg border cursor-pointer">
                      <Image
                        src="/raporlama/arsiv.jpg"
                        alt="Arşiv ve Filtreleme"
                        fill
                        className="object-cover"
                      />
                      <div className="absolute bottom-2 right-2 bg-white/80 rounded-full p-2 shadow">
                        <Lucide.Search className="h-5 w-5 text-brand-navy" />
                      </div>
                    </div>
                  </DialogTrigger>
                  <DialogContent className="max-w-4xl [&>button:not(.custom-close)]:hidden">
                    <DialogTitle className="sr-only">Arşiv ve Filtreleme</DialogTitle>
                    <DialogClose className="custom-close absolute top-3 right-3 rounded-full bg-white/90 hover:bg-white p-2 shadow">
                      <Lucide.X className="h-5 w-5 text-brand-navy" />
                    </DialogClose>
                    <Image
                      src="/raporlama/arsiv.jpg"
                      alt="Arşiv ve Filtreleme büyük"
                      width={1200}
                      height={900}
                      className="w-full h-auto rounded-lg"
                    />
                  </DialogContent>
                </Dialog>
              </CardContent>
            </Card>

            {/* PDF & Excel Çıktıları */}
            <Card className="flex flex-col h-full">
              <CardHeader className="flex flex-row items-center gap-3">
                <div className="rounded-xl bg-brand-navy/5 p-3">
                  <Lucide.FileSpreadsheet className="size-6 text-brand-navy" />
                </div>
                <CardTitle>PDF & Excel Çıktıları</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col flex-1">
                <p className="text-slate-600">
                  Raporlarınızı PDF veya Excel formatında dışa aktarın.
                  Kolay paylaşım ve kurumsal entegrasyon için ideal.
                </p>
                <Dialog>
                  <DialogTrigger asChild>
                    <div className="relative mt-4 aspect-[4/3] w-full overflow-hidden rounded-lg border cursor-pointer">
                      <Image
                        src="/raporlama/pdfexcel.jpg"
                        alt="PDF & Excel Çıktıları"
                        fill
                        className="object-cover"
                      />
                      <div className="absolute bottom-2 right-2 bg-white/80 rounded-full p-2 shadow">
                        <Lucide.Search className="h-5 w-5 text-brand-navy" />
                      </div>
                    </div>
                  </DialogTrigger>
                  <DialogContent className="max-w-4xl [&>button:not(.custom-close)]:hidden">
                    <DialogTitle className="sr-only">PDF & Excel Çıktıları</DialogTitle>
                    <DialogClose className="custom-close absolute top-3 right-3 rounded-full bg-white/90 hover:bg-white p-2 shadow">
                      <Lucide.X className="h-5 w-5 text-brand-navy" />
                    </DialogClose>
                    <Image
                      src="/raporlama/pdfexcel.jpg"
                      alt="PDF & Excel Çıktıları büyük"
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
                Raporlamanızı kolaylaştırın.
              </h2>
              <p className="mt-1 text-white/85">
                Günlük, aylık ve yıllık raporlar ile süreçlerinizi analiz edin,
                PDF ve Excel çıktılarıyla kolayca paylaşın.
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
