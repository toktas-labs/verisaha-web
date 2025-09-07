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
  title: "Ölçüm İzleme | VeriSaha Teknoloji",
  description:
    "Akış, sıcaklık, basınç, seviye ve enerji gibi proses parametrelerinin anlık ve kayıtlı izlenmesi. Masaüstü, pano, web ve uzaktan izleme yöntemleri ile raporlama.",
};

export default function MeasurementMonitoringPage() {
  return (
    <main className="bg-white">
      {/* HERO */}
      <section className="relative overflow-hidden min-h-[400px] md:min-h-[500px] lg:min-h-[560px]">
        <div className="absolute inset-0 z-0">
          <Image
            src="/olcum/hero.jpg"
            alt="Ölçüm izleme"
            fill
            className="object-cover opacity-40"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-br from-brand-navy/80 via-brand-navy/70 to-teal-700/60" />
        </div>

        <div className="relative z-10 mx-auto max-w-6xl px-4 py-12 md:py-20 text-white">
          <div className="max-w-3xl">
            <h1 className="text-3xl md:text-5xl font-bold leading-tight md:leading-[1.15]">Ölçüm İzleme</h1>
            <p className="mt-4 max-w-2xl text-white/90 md:text-lg leading-relaxed">
              Sahadaki tüm proses parametrelerini (akış, sıcaklık, basınç, seviye, enerji)
              güvenilir şekilde anlık izleyin ve arşivleyin. Modbus/S7 entegrasyonlarıyla
              veriyi toplayın, analiz edin ve üretim verimliliğini artırın.
            </p>

            {/* Hero içine mini avantaj listesi */}
            <ul className="mt-6 grid gap-2 text-white">
              <li className="flex items-start gap-2">
                <Lucide.CheckCircle2 className="mt-0.5 size-5 shrink-0" />
                <span><b>Verimlilik:</b> Süreçleri optimize eden gerçek zamanlı takip.</span>
              </li>
              <li className="flex items-start gap-2">
                <Lucide.CheckCircle2 className="mt-0.5 size-5 shrink-0" />
                <span><b>Güvenlik:</b> Kritik değerler için limit/alarmlar ve bildirim.</span>
              </li>
              <li className="flex items-start gap-2">
                <Lucide.CheckCircle2 className="mt-0.5 size-5 shrink-0" />
                <span><b>Kolay Raporlama:</b> Trend, arşiv ve PDF/Excel çıktı.</span>
              </li>
            </ul>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/iletisim">
                <Button size="lg" className="bg-white text-brand-navy hover:bg-slate-100">
                  Demo Talep Edin
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
      
      {/* Parametre Bazlı İzleme */}
      <Card className="flex flex-col h-full">
        <CardHeader className="flex flex-row items-center gap-3">
          <div className="rounded-xl bg-brand-navy/5 p-3">
            <Lucide.Gauge className="size-6 text-brand-navy" />
          </div>
          <CardTitle>Parametre Bazlı İzleme</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col flex-1">
          <div className="flex-1 space-y-4">
            <p className="text-slate-600">
              Akış, sıcaklık, basınç, seviye ve enerji ölçümleriniz tek panelden takip edilir; 
              kritik parametreler için özel göstergeler ve alarmlar sunulur.
            </p>
            <ul className="list-disc pl-5 text-slate-600">
              <li>Debimetre/totalizer, sıcaklık, basınç, seviye</li>
              <li>Enerji tüketimi (elektrik, buhar, gaz)</li>
              <li>Limit/Alarm eşikleri ve bildirim</li>
            </ul>
          </div>
	  <Dialog>
	  <DialogTrigger asChild>
	    <div className="relative mt-4 aspect-[4/3] w-full overflow-hidden rounded-lg border cursor-pointer">
	      <Image
	        src="/olcum/parametre.jpg"
	        alt="Parametre bazlı izleme"
	        fill
	        className="object-cover"
	      />
	      {/* Sağ altta büyüteç ikonu */}
	      <div className="absolute bottom-2 right-2 bg-white/80 rounded-full p-2 shadow">
	        <Lucide.Search className="h-5 w-5 text-brand-navy" />
	      </div>
	    </div>
	  </DialogTrigger>

	  <DialogContent className="max-w-4xl [&>button:not(.custom-close)]:hidden">
	    <DialogTitle className="sr-only">Parametre Bazlı İzleme</DialogTitle>
	    <DialogClose className="custom-close absolute  top-3 right-3 rounded-full bg-white/90 hover:bg-white p-2 shadow">
		<Lucide.X className="h-5 w-5 text-brand-navy" />
	    </DialogClose>
	    <Image
	      src="/olcum/parametre.jpg"
	      alt="Parametre bazlı izleme büyük"
	      width={1200}
	      height={900}
	      className="w-full h-auto rounded-lg"
	    />
	  </DialogContent>
	</Dialog>
        </CardContent>
      </Card>

      {/* Yöntem Bazlı İzleme */}
      <Card className="flex flex-col h-full">
        <CardHeader className="flex flex-row items-center gap-3">
          <div className="rounded-xl bg-brand-navy/5 p-3">
            <Lucide.MonitorSmartphone className="size-6 text-brand-navy" />
          </div>
          <CardTitle>Yöntem Bazlı İzleme</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col flex-1">
          <div className="flex-1 space-y-4">
            <p className="text-slate-600">
              Masaüstü uygulaması, otomasyon panosu (HMI/PLC), web dashboard veya
              uzaktan izleme: ihtiyaca göre esnek mimari.
            </p>
            <ul className="list-disc pl-5 text-slate-600">
              <li>Masaüstü: anlık + MySQL arşiv</li>
              <li>Pano (HMI/PLC): sahada yerinde takip</li>
              <li>Web: tarayıcıdan, mobil uyumlu</li>
              <li>Uzaktan: VPN/RDP/IoT tünelleri</li>
            </ul>
          </div>
	  <Dialog>
	  <DialogTrigger asChild>
	    <div className="relative mt-4 aspect-[4/3] w-full overflow-hidden rounded-lg border cursor-pointer">
	      <Image
              src="/olcum/yontem.jpg"
              alt="Yöntem bazlı izleme"
              fill
              className="object-cover"
            />
	    {/* Sağ altta büyüteç ikonu */}
	    <div className="absolute bottom-2 right-2 bg-white/80 rounded-full p-2 shadow">
	      <Lucide.Search className="h-5 w-5 text-brand-navy" />
	    </div>
          </div>
	 </DialogTrigger>
        	  <DialogContent className="max-w-4xl [&>button:not(.custom-close)]:hidden">
	    <DialogTitle className="sr-only">Parametre Bazlı İzleme</DialogTitle>
	    <DialogClose className="custom-close absolute  top-3 right-3 rounded-full bg-white/90 hover:bg-white p-2 shadow">
		<Lucide.X className="h-5 w-5 text-brand-navy" />
	    </DialogClose>
	    <Image
              src="/olcum/yontem.jpg"
	      alt="Parametre bazlı izleme büyük"
	      width={1200}
	      height={900}
	      className="w-full h-auto rounded-lg"
	    />
	  </DialogContent>
	</Dialog>
       </CardContent>
      </Card>

      {/* Raporlama */}
      <Card className="flex flex-col h-full">
        <CardHeader className="flex flex-row items-center gap-3">
          <div className="rounded-xl bg-brand-navy/5 p-3">
            <Lucide.BarChart3 className="size-6 text-brand-navy" />
          </div>
          <CardTitle>Raporlama</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col flex-1">
          <div className="flex-1 space-y-4">
            <p className="text-slate-600">
              Trend analizleri, arşiv görüntüleme ve PDF/Excel çıktıları ile kalite ve
              yönetim raporlarını zahmetsiz hazırlayın.
            </p>
            <ul className="list-disc pl-5 text-slate-600">
              <li>Günlük/aylık/yıllık trendler</li>
              <li>Arşiv ve filtreleme</li>
              <li>PDF / Excel dışa aktarım</li>
            </ul>
          </div>
	  <Dialog>
	  <DialogTrigger asChild>
	    <div className="relative mt-4 aspect-[4/3] w-full overflow-hidden rounded-lg border cursor-pointer">
	      <Image
                src="/olcum/raporlama.jpg"
                alt="Raporlama"
	        fill
	        className="object-cover"
	      />
	      {/* Sağ altta büyüteç ikonu */}
	      <div className="absolute bottom-2 right-2 bg-white/80 rounded-full p-2 shadow">
	        <Lucide.Search className="h-5 w-5 text-brand-navy" />
	      </div>
	    </div>
	  </DialogTrigger>

	  <DialogContent className="max-w-4xl [&>button:not(.custom-close)]:hidden">
	    <DialogTitle className="sr-only">Raporlama</DialogTitle>
	    <DialogClose className="custom-close absolute  top-3 right-3 rounded-full bg-white/90 hover:bg-white p-2 shadow">
		<Lucide.X className="h-5 w-5 text-brand-navy" />
	    </DialogClose>
	    <Image
              src="/olcum/raporlama.jpg"
              alt="Raporlama"
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
              <h2 className="text-2xl font-semibold">Sahadan veri toplayın, değer üretin.</h2>
              <p className="mt-1 text-white/85">
                Canlı izleme + arşiv + raporlama ile operasyonunuzu güçlendirin.
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
