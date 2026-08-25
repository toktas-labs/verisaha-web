import type { Metadata } from "next";
import { EnglishSolutionPage } from "@/components/english-solution-page";

export const metadata: Metadata = {
  title: "Measurement Monitoring | VeriSaha Teknoloji",
  description: "Real-time monitoring and archiving of industrial flow, temperature, pressure, level and energy measurements.",
};

export default function Page() {
  return <EnglishSolutionPage solution="measurement-monitoring" />;
}
