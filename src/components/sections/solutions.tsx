import {
  BarChart3,
  Cpu,
  Gauge,
  Settings,
  Smartphone,
  Wrench,
  CheckCircle2,
  ArrowRight,
  type LucideIcon,
} from "lucide-react";

import Link from "next/link";
import { localizedPath, type Locale } from "@/lib/i18n";

type MainService = {
  key: string;
  path: string;
  trTitle: string;
  enTitle: string;
  trDescription: string;
  enDescription: string;
  trExamples: string[];
  enExamples: string[];
  trTechnologies: string[];
  enTechnologies: string[];
  icon: LucideIcon;
};

type SupportService = {
  key: string;
  path: string;
  trTitle: string;
  enTitle: string;
  trDescription: string;
  enDescription: string;
  icon: LucideIcon;
};

const mainServices: MainService[] = [
  {
    key: "olcum-izleme",
    path: "/cozumler/olcum-izleme",
    trTitle: "Ölçüm & İzleme",
    enTitle: "Measurement & Monitoring",
    icon: Gauge,

    trDescription:
      "Akış, seviye, sıcaklık, basınç ve diğer proses verilerinin sahadan toplanması, gerçek zamanlı izlenmesi, kayıt altına alınması ve analiz edilmesi.",

    enDescription:
      "Collect, monitor, record and analyze flow, level, temperature, pressure and other process data from the field in real time.",

    trExamples: [
      "Silo / Tank İzleme",
      "Kuyu Takibi",
      "Üretim Veri Akışı İzleme",
      "Debi & Tüketim Takibi",
    ],

    enExamples: [
      "Silo / Tank Monitoring",
      "Well Monitoring",
      "Production Data Flow Monitoring",
      "Flow & Consumption Monitoring",
    ],

    trTechnologies: [
      "Modbus TCP/RTU",
      "PLC/SCADA",
      "Canlı Veri",
      "Geçmiş Kayıt",
    ],

    enTechnologies: [
      "Modbus TCP/RTU",
      "PLC/SCADA",
      "Live Data",
      "Historical Data",
    ],
  },

  {
    key: "endustriyel-otomasyon",
    path: "/cozumler/endustriyel-otomasyon",
    trTitle: "Endüstriyel Otomasyon",
    enTitle: "Industrial Automation",
    icon: Cpu,

    trDescription:
      "PLC, HMI, pano ve saha ekipmanlarını bir araya getirerek proseslerin güvenilir, otomatik ve uzaktan kontrol edilebilir hale getirilmesi.",

    enDescription:
      "Integrate PLC, HMI, control panels and field equipment to create reliable, automated and remotely controllable processes.",

    trExamples: [
      "Uzaktan Motor Kontrolü",
      "Pompa Otomasyonu",
      "Vana Kontrolü",
      "Seviye Bazlı Otomasyon",
    ],

    enExamples: [
      "Remote Motor Control",
      "Pump Automation",
      "Valve Control",
      "Level-Based Automation",
    ],

    trTechnologies: [
      "PLC",
      "HMI",
      "Saha Entegrasyonu",
      "Web Kontrol",
    ],

    enTechnologies: [
      "PLC",
      "HMI",
      "Field Integration",
      "Web Control",
    ],
  },

  {
    key: "proje-bazli",
    path: "/cozumler/proje-bazli",
    trTitle: "Özel Proje & Yazılım",
    enTitle: "Custom Projects & Software",
    icon: Settings,

    trDescription:
      "Standart çözümlerin yeterli olmadığı projelerde ihtiyaca özel web, Windows (.NET) ve saha uygulamalarını tasarlıyor, geliştiriyor ve devreye alıyoruz.",

    enDescription:
      "For projects where standard solutions are not enough, we design, develop and commission custom web, Windows (.NET) and field applications.",

    trExamples: [
      "Web & Windows İzleme Uygulamaları",
      "Alarm & Bildirim Sistemleri",
      "Üretim Raporlama Yazılımları",
      "Özel Veri Toplama & Entegrasyon",
    ],

    enExamples: [
      "Web & Windows Monitoring Applications",
      "Alarm & Notification Systems",
      "Production Reporting Software",
      "Custom Data Collection & Integration",
    ],

    trTechnologies: [
      "Web",
      ".NET",
      "MQTT",
      "SQL",
      "Raspberry Pi",
      "Özel Yazılım",
    ],

    enTechnologies: [
      "Web",
      ".NET",
      "MQTT",
      "SQL",
      "Raspberry Pi",
      "Custom Software",
    ],
  },
];

const supportServices: SupportService[] = [
  {
    key: "uzaktan-izleme",
    path: "/cozumler/uzaktan-izleme",
    trTitle: "Uzaktan İzleme",
    enTitle: "Remote Monitoring",
    icon: Smartphone,

    trDescription:
      "Tesis, makine ve saha cihazlarınızı web, mobil ve bilgisayar üzerinden anlık olarak takip edin.",

    enDescription:
      "Monitor facilities, machines and field devices in real time from web, mobile and desktop interfaces.",
  },

  {
    key: "raporlama",
    path: "/cozumler/raporlama",
    trTitle: "Raporlama & Analiz",
    enTitle: "Reporting & Analysis",
    icon: BarChart3,

    trDescription:
      "Geçmiş kayıtları, trendleri ve üretim verilerini analiz edin; PDF ve Excel raporları oluşturun.",

    enDescription:
      "Analyze historical records, trends and production data, and generate PDF and Excel reports.",
  },

  {
    key: "danismanlik",
    path: "/cozumler/danismanlik",
    trTitle: "Danışmanlık & Entegrasyon",
    enTitle: "Consulting & Integration",
    icon: Wrench,

    trDescription:
      "Keşiften cihaz seçimine, haberleşmeden devreye almaya kadar uçtan uca teknik destek alın.",

    enDescription:
      "Get end-to-end technical support from site survey and device selection to communication and commissioning.",
  },
];

export default function Solutions({
  locale = "tr",
}: {
  locale?: Locale;
}) {
  const en = locale === "en";

  return (
    <section id="solutions" className="bg-white">
      <div className="mx-auto max-w-6xl px-4 py-14 md:py-20">
        {/* BAŞLIK */}
        <div className="mb-10 max-w-3xl">
          <h2 className="text-2xl font-bold tracking-tight text-brand-navy md:text-3xl">
            {en ? "Our Solutions" : "Çözümlerimiz"}
          </h2>

          <p className="mt-3 text-base leading-relaxed text-slate-600 md:text-lg">
            {en
              ? "We collect field data, turn it into meaningful information and develop monitoring, control and reporting systems tailored to your processes."
              : "Sahadan veriyi alıyor, anlamlandırıyor ve sürecinize özel izleme, kontrol ve raporlama sistemleri geliştiriyoruz."}
          </p>
        </div>

        {/* 3 ANA ÇÖZÜM */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {mainServices.map((service) => {
            const Icon = service.icon;
            const examples = en
              ? service.enExamples
              : service.trExamples;

            const technologies = en
              ? service.enTechnologies
              : service.trTechnologies;

            return (
              <article
                key={service.key}
                className="group flex h-full flex-col rounded-2xl border border-brand-navy/20 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-brand-teal/40 hover:shadow-xl"
              >
                {/* İKON + BAŞLIK */}
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-navy/5 text-brand-navy transition-colors duration-300 group-hover:bg-brand-teal/10 group-hover:text-brand-teal">
                    <Icon className="h-5.5 w-5.5" />
                  </div>

                  <h3 className="text-xl font-bold text-brand-navy">
                    {en ? service.enTitle : service.trTitle}
                  </h3>
                </div>

                {/* AÇIKLAMA */}
                <p className="mt-5 leading-relaxed text-slate-600">
                  {en
                    ? service.enDescription
                    : service.trDescription}
                </p>

                {/* ÖRNEK UYGULAMALAR */}
                <div className="mt-6 border-t border-slate-100 pt-5">
                  <p className="text-xs font-bold uppercase tracking-[0.14em] text-brand-teal">
                    {en
                      ? "Example Applications"
                      : "Örnek Uygulamalar"}
                  </p>

                  <div className="mt-4 space-y-3">
                    {examples.map((example) => (
                      <div
                        key={example}
                        className="flex items-start gap-2.5 text-sm text-slate-700"
                      >
                        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-brand-teal" />
                        <span>{example}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* TEKNOLOJİLER */}
                <div className="mt-6 flex flex-wrap gap-2">
                  {technologies.map((technology) => (
                    <span
                      key={technology}
                      className="rounded-full border border-brand-navy/10 bg-slate-50 px-2.5 py-1 text-xs font-medium text-slate-600"
                    >
                      {technology}
                    </span>
                  ))}
                </div>

                {/* DETAY */}
                <div className="mt-auto pt-7">
                  <Link
                    href={localizedPath(locale, service.path)}
                    className="inline-flex items-center gap-2 text-sm font-semibold text-brand-navy transition-colors hover:text-brand-teal"
                  >
                    {en ? "View Details" : "Detayları İncele"}

                    <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </Link>
                </div>
              </article>
            );
          })}
        </div>

        {/* TAMAMLAYICI ÇÖZÜMLER */}
        <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-3">
          {supportServices.map((service) => {
            const Icon = service.icon;

            return (
              <Link
                key={service.key}
                href={localizedPath(locale, service.path)}
                className="group rounded-2xl border border-slate-200 bg-slate-50/60 p-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-brand-teal/30 hover:bg-white hover:shadow-md"
              >
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-brand-navy shadow-sm transition-colors group-hover:text-brand-teal">
                    <Icon className="h-5 w-5" />
                  </div>

                  <div>
                    <h3 className="font-semibold text-brand-navy">
                      {en ? service.enTitle : service.trTitle}
                    </h3>

                    <p className="mt-2 text-sm leading-relaxed text-slate-600">
                      {en
                        ? service.enDescription
                        : service.trDescription}
                    </p>

                    <div className="mt-3 flex items-center gap-1.5 text-xs font-semibold text-brand-navy transition-colors group-hover:text-brand-teal">
                      {en ? "View Details" : "Detayları İncele"}

                      <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}