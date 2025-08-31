import Hero from "@/components/sections/hero";
import Solutions from "@/components/sections/solutions";   // ← parantez YOK
import { Sectors } from "@/components/sections/sectors";
import { StatsStrip } from "@/components/sections/stats-strip";
import { CtaBand } from "@/components/sections/cta-band";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-brand-off">
      <Hero />
      <Solutions />
      <Sectors />
      <StatsStrip />
      <CtaBand />
    </main>
  );
}