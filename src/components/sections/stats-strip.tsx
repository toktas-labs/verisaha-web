export function StatsStrip() {
  const stats = [
    { k: "20+", v: "Uzaktan İzleme Yazılımı" },
    { k: "7/24", v: "Canlı Veri Takibi" },
    { k: "Modbus / S7", v: "Haberleşme" },
  ];

  return (
    <section className="bg-white">
      <div className="mx-auto max-w-6xl px-4">
        <div className="grid grid-cols-1 divide-y border-y sm:grid-cols-3 sm:divide-x sm:divide-y-0">
          {stats.map((s) => (
            <div
              key={s.k}
              className="flex items-center justify-center gap-3 py-6"
            >
              <span className="text-2xl font-semibold text-brand-navy">
                {s.k}
              </span>
              <span className="text-slate-600">{s.v}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
