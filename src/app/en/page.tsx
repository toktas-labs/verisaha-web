import type { Metadata } from "next";
import Hero from "@/components/sections/hero";
import Solutions from "@/components/sections/solutions";
import { Sectors } from "@/components/sections/sectors";
import { StatsStrip } from "@/components/sections/stats-strip";
import { CtaBand } from "@/components/sections/cta-band";

export const metadata: Metadata = {
  title: "Industrial Monitoring & Automation | VeriSaha Teknoloji",
  description:
    "Industrial measurement, remote monitoring, automation and reporting solutions by VeriSaha Teknoloji.",
};

export default function EnglishHomePage() {
  return (
    <main className="min-h-screen bg-brand-off">
      <Hero locale="en" />
      <Solutions locale="en" />
      <Sectors locale="en" />
      <StatsStrip locale="en" />
      <CtaBand locale="en" />
    </main>
  );
}
