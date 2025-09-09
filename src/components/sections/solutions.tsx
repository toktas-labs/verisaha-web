// src/components/sections/solutions.tsx
// 👇 mevcut dosyanın iyileştirilmiş sürümü
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import * as Lucide from "lucide-react";
import Link from "next/link";

const services = [
  { key: "olcum-izleme", title: "Ölçüm İzleme", icon: "Gauge",
    excerpt: "Akış, seviye, sıcaklık, basınç ve proses analitiği dâhil tüm ölçüm verilerini tek panelden izleyin." },
  { key: "proje-bazli", title: "Proje Bazlı Çözümler", icon: "Settings",
    excerpt: "Batch & Set–Reset panoları, test sistemleri ve müşteri taleplerine özel tasarlanan çözümler." },
  { key: "endustriyel-otomasyon", title: "Endüstriyel Otomasyon", icon: "Cpu",
    excerpt: "PLC, SCADA ve HMI sistemleriyle endüstriyel takip ve entegrasyon: S7-1200/1500 vb." },
  { key: "raporlama", title: "Raporlama", icon: "BarChart3",
    excerpt: "Günlük, aylık ve yıllık raporlar; grafiksel takip ve PDF & Excel çıktıları ile kapsamlı raporlama." },
  { key: "uzaktan-izleme", title: "Uzaktan İzleme", icon: "Smartphone",
    excerpt: "Sahadaki ölçüm cihazlarını web, mobil ve bilgisayar üzerinden anlık olarak izleyin ve yönetin." },
  { key: "danismanlik", title: "Danışmanlık", icon: "Wrench",
    excerpt: "Keşif, kurulum, devreye alma ve eğitim ile uçtan uca uzmanlık desteği." },
];

export default function Solutions() {
  return (
    <section id="solutions" className="bg-white">
      <div className="mx-auto max-w-6xl px-4 py-14 md:py-20">
        <div className="mb-8">
          <h2 className="text-2xl font-bold tracking-tight text-brand-navy md:text-3xl">Çözümler</h2>
          <p className="mt-2 text-slate-600">Sahadan veriyi alın, analiz edin ve değer üretin.</p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((svc) => {
            const Icon = (Lucide as any)[svc.icon] || (Lucide as any).Wrench;
            return (
              <Card
                key={svc.key}
                className="group rounded-2xl border border-brand-navy/30 bg-white transition
                           duration-200 hover:-translate-y-1 hover:shadow-lg hover:bg-slate-50"
              >
	       <Link href={`/cozumler/${svc.key}`}>
                <CardHeader className="flex flex-row items-center gap-3 p-6 pb-2">
                  <div className="rounded-xl bg-brand-off/50 p-3 text-brand-navy">
                    <Icon className="h-6 w-6" />
                  </div>
                  <CardTitle className="text-lg font-semibold text-brand-navy">{svc.title}</CardTitle>
                </CardHeader>
                <CardContent className="p-6 pt-2">
                  <p className="text-slate-600">{svc.excerpt}</p>
                </CardContent>
	       </Link>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
