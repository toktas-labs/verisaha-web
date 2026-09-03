import type { Locale } from "@/lib/i18n";

export function StatsStrip({ locale = "tr" }: { locale?: Locale }) {
  const en = locale === "en";
  const stats = [
    { k: "30+", v: en ? "Remote Monitoring Applications" : "Uzaktan İzleme Yazılımı" },
    { k: "7/24", v: en ? "Live Data Monitoring" : "Canlı Veri Takibi" },
    { k: en ? "Industry 4.0" : "Endüstri 4.0", v: en ? "Digitalization Solutions" : "Dijitalleşme Çözümleri" },
  ];

  return (
    <section className="bg-white">
      <div className="mx-auto max-w-6xl px-4">
        <div className="grid grid-cols-1 divide-y border-y sm:grid-cols-3 sm:divide-x sm:divide-y-0">
          {stats.map((s) => (
            <div key={s.k} className="flex items-center justify-center gap-3 py-6">
              <span className="text-2xl font-semibold text-brand-navy">{s.k}</span>
              <span className="text-slate-600">{s.v}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
