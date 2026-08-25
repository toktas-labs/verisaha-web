import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart3, Cpu, Gauge, Settings, Smartphone, Wrench, type LucideIcon } from "lucide-react";
import Link from "next/link";
import { localizedPath, type Locale } from "@/lib/i18n";

const services: Array<{
  key: string;
  path: string;
  trTitle: string;
  enTitle: string;
  icon: LucideIcon;
  trExcerpt: string;
  enExcerpt: string;
}> = [
  {
    key: "olcum-izleme",
    path: "/cozumler/olcum-izleme",
    trTitle: "Ölçüm İzleme",
    enTitle: "Measurement Monitoring",
    icon: Gauge,
    trExcerpt: "Akış, seviye, sıcaklık, basınç ve proses analitiği dâhil tüm ölçüm verilerini tek panelden izleyin.",
    enExcerpt: "Monitor flow, level, temperature, pressure and other process measurements from a single dashboard.",
  },
  {
    key: "proje-bazli",
    path: "/cozumler/proje-bazli",
    trTitle: "Proje Bazlı Çözümler",
    enTitle: "Custom Projects",
    icon: Settings,
    trExcerpt: "Batch & Set–Reset panoları, test sistemleri ve müşteri taleplerine özel tasarlanan çözümler.",
    enExcerpt: "Batch and set-reset panels, test systems and solutions designed around customer-specific requirements.",
  },
  {
    key: "endustriyel-otomasyon",
    path: "/cozumler/endustriyel-otomasyon",
    trTitle: "Endüstriyel Otomasyon",
    enTitle: "Industrial Automation",
    icon: Cpu,
    trExcerpt: "PLC, SCADA ve HMI sistemleriyle endüstriyel takip ve entegrasyon: S7-1200/1500 vb.",
    enExcerpt: "Industrial monitoring and integration with PLC, SCADA and HMI systems, including S7-1200/1500 platforms.",
  },
  {
    key: "raporlama",
    path: "/cozumler/raporlama",
    trTitle: "Raporlama",
    enTitle: "Reporting",
    icon: BarChart3,
    trExcerpt: "Günlük, aylık ve yıllık raporlar; grafiksel takip ve PDF & Excel çıktıları ile kapsamlı raporlama.",
    enExcerpt: "Daily, monthly and yearly reports with visual trends and PDF/Excel exports.",
  },
  {
    key: "uzaktan-izleme",
    path: "/cozumler/uzaktan-izleme",
    trTitle: "Uzaktan İzleme",
    enTitle: "Remote Monitoring",
    icon: Smartphone,
    trExcerpt: "Sahadaki ölçüm cihazlarını web, mobil ve bilgisayar üzerinden anlık olarak izleyin ve yönetin.",
    enExcerpt: "Monitor and manage field instruments in real time from web, mobile and desktop interfaces.",
  },
  {
    key: "danismanlik",
    path: "/cozumler/danismanlik",
    trTitle: "Danışmanlık",
    enTitle: "Consulting",
    icon: Wrench,
    trExcerpt: "Keşif, kurulum, devreye alma ve eğitim ile uçtan uca uzmanlık desteği.",
    enExcerpt: "End-to-end technical support covering site survey, installation, commissioning and training.",
  },
];

export default function Solutions({ locale = "tr" }: { locale?: Locale }) {
  const en = locale === "en";

  return (
    <section id="solutions" className="bg-white">
      <div className="mx-auto max-w-6xl px-4 py-14 md:py-20">
        <div className="mb-8">
          <h2 className="text-2xl font-bold tracking-tight text-brand-navy md:text-3xl">
            {en ? "Solutions" : "Çözümler"}
          </h2>
          <p className="mt-2 text-slate-600">
            {en ? "Collect field data, analyze it and turn it into value." : "Sahadan veriyi alın, analiz edin ve değer üretin."}
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((svc) => {
            const Icon = svc.icon;
            return (
              <Card
                key={svc.key}
                className="group rounded-2xl border border-brand-navy/30 bg-white transition duration-200 hover:-translate-y-1 hover:shadow-lg hover:bg-slate-50"
              >
                <Link href={localizedPath(locale, svc.path)}>
                  <CardHeader className="flex flex-row items-center gap-3 p-6 pb-2">
                    <div className="rounded-xl bg-brand-off/50 p-3 text-brand-navy">
                      <Icon className="h-6 w-6" />
                    </div>
                    <CardTitle className="text-lg font-semibold text-brand-navy">
                      {en ? svc.enTitle : svc.trTitle}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-6 pt-2">
                    <p className="text-slate-600">{en ? svc.enExcerpt : svc.trExcerpt}</p>
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
