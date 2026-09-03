import { Factory, FlaskConical, Zap, Droplet } from "lucide-react";
import type { Locale } from "@/lib/i18n";

export function Sectors({ locale = "tr" }: { locale?: Locale }) {
  const en = locale === "en";

  const sectors = [
    { title: en ? "Food / Dairy" : "Gıda / Süt", icon: Factory },
    { title: en ? "Chemical" : "Kimya", icon: FlaskConical },
    { title: en ? "Energy" : "Enerji", icon: Zap },
    { title: en ? "Water & Wastewater" : "Su & Atıksu", icon: Droplet },
  ];

  return (
    <section className="bg-brand-off">
      <div className="mx-auto max-w-6xl px-4 py-12 md:py-16">

        <h2 className="mb-6 text-2xl font-bold tracking-tight text-brand-navy md:text-3xl">
          {en ? "Industries We Serve" : "Hizmet Verdiğimiz Sektörler"}
        </h2>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {sectors.map(({ title, icon: Icon }) => (
            <div
              key={title}
              className="flex items-center gap-4 rounded-2xl border border-brand-navy/30 bg-white p-5"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-teal/10 text-brand-teal">
                <Icon className="h-5 w-5" />
              </div>

              <span className="text-base font-semibold text-brand-navy">
                {title}
              </span>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}