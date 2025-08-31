// src/components/sections/sectors.tsx
import { Factory, FlaskConical, Zap, Droplet } from "lucide-react";

export function Sectors() {
  const sectors = [
    { title: "Gıda / Süt", icon: Factory },
    { title: "Kimya", icon: FlaskConical },
    { title: "Enerji", icon: Zap },
    { title: "Su & Atıksu", icon: Droplet },
  ];

  return (
    <section className="bg-brand-off">
      <div className="mx-auto max-w-6xl px-4 py-12 md:py-16">
        <h3 className="mb-6 text-xl font-semibold text-brand-navy md:text-2xl">Hizmet Verdiğimiz Sektörler</h3>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {sectors.map(({ title, icon: Icon }) => (
            <div key={title}
                 className="flex items-center gap-4 rounded-2xl border border-brand-navy/30 bg-white p-5">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-teal/10 text-brand-teal">
                <Icon className="h-5 w-5" />
              </div>
              <span className="text-sm font-medium text-brand-navy">{title}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
