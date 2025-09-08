// ------------------------------------------------------------
// src/app/cozumler/danismanlik/page.tsx
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
  title: "Danışmanlık | VeriSaha Teknoloji",
  description:
    "Keşif, kurulum, devreye alma ve eğitim ile uçtan uca uzmanlık desteği.",
};

export default function ConsultingPage() {
  return (
    <main className="bg-white">
      {/* HERO */}
      <section className="relative overflow-hidden min-h-[400px] md:min-h-[500px] lg:min-h-[560px]">
        <div className="absolute inset-0 z-0">
          <Image
            src="/danismanlik/hero.jpg"
            alt="Danışmanlık"
            fill
            className="object-cover opacity-40"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-br from-brand-navy/85 via-cyan-800/70 to-teal-700/65" />
        </div>

        <div className="relative z-10 mx-auto max-w-6xl px-4 py-12 md:py-20 text-white">
          <div className="max-w-3xl">
            <h1 className="text-3xl md:text-5xl font-bold leading-tight md:leading-[1.15]">
              Danışmanlık
            </h1>
            <p className="mt-4 max-w-2xl text-white/90 md:text-lg leading-relaxed">
              Keşif, kurulum, devreye alma ve eğitim ile uçtan uca uzmanlık desteği.

            </p>

            <ul className="mt-6 grid gap-2 text-white">
              <li className="flex items-start gap-2">
                <Lucide.CheckCircle2 className="mt-0.5 size-5 shrink-0" />
                <span><b>Keşif & İhtiyaç Analizi:</b> Sahada inceleme ve doğru çözüm planlama.</span>
              </li>
              <li className="flex items-start gap-2">
                <Lucide.CheckCircle2 className="mt-0.5 size-5 shrink-0" />
                <span><b>Kurulum & Devreye Alma:</b> Güvenli ve hızlı uygulama süreçleri.</span>
              </li>
              <li className="flex items-start gap-2">
                <Lucide.CheckCircle2 className="mt-0.5 size-5 shrink-0" />
                <span><b>Eğitim & Destek:</b> Kullanıcı eğitimi ve uzun vadeli destek.</span>
              </li>
            </ul>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/iletisim">
                <Button size="lg" className="bg-white text-brand-navy hover:bg-slate-100">
                  Uzman Talep Edin
                </Button>
              </Link>
              <Link href="#bolum">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                  Detaylı Bilgi Alın
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* TEK KART */}
      <section id="bolum" className="bg-white">
        <div className="mx-auto max-w-6xl px-4 py-14 md:py-20">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 items-stretch">
            <Card className="flex flex-col h-full">
              <CardHeader className="flex flex-row items-center gap-3">
                <div className="rounded-xl bg-brand-navy/5 p-3">
                  <Lucide.UserCheck className="size-6 text-brand-navy" />
                </div>
                <CardTitle>Uçtan Uca Danışmanlık</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col flex-1">
                <p className="text-slate-600 leading-relaxed">
                  Projelerinizin her aşamasında yanınızdayız. Keşiften kuruluma,
                  devreye almadan kullanıcı eğitimine kadar uçtan uca uzmanlık desteği sunuyoruz. 
                  Hedefimiz; güvenilir, sürdürülebilir ve verimli çözümlerle süreçlerinizi güçlendirmek.
                </p>

                <Dialog>
                  <DialogTrigger asChild>
                    <div className="relative mt-6 aspect-[4/3] w-full overflow-hidden rounded-lg border cursor-pointer">
                      <Image
                        src="/danismanlik/detail.jpg"
                        alt="Danışmanlık detay görseli"
                        fill
                        className="object-cover"
                      />
                      <div className="absolute bottom-2 right-2 bg-white/80 rounded-full p-2 shadow">
                        <Lucide.Search className="h-5 w-5 text-brand-navy" />
                      </div>
                    </div>
                  </DialogTrigger>
                  <DialogContent className="max-w-4xl [&>button:not(.custom-close)]:hidden">
                    <DialogTitle className="sr-only">Danışmanlık Görseli</DialogTitle>
                    <DialogClose className="custom-close absolute top-3 right-3 rounded-full bg-white/90 hover:bg-white p-2 shadow">
                      <Lucide.X className="h-5 w-5 text-brand-navy" />
                    </DialogClose>
                    <Image
                      src="/danismanlik/detail.jpg"
                      alt="Danışmanlık detay görseli büyük"
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
                Uzman desteği ile projenizi güvenle yönetin.
              </h2>
              <p className="mt-1 text-white/85">
                Keşif, kurulum, devreye alma ve eğitim hizmetlerimizle sürecinizin her adımında yanınızdayız.
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
