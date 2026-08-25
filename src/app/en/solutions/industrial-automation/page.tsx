import type { Metadata } from "next";
import { EnglishSolutionPage } from "@/components/english-solution-page";

export const metadata: Metadata = {
  title: "Industrial Automation | VeriSaha Teknoloji",
  description: "PLC, SCADA and HMI integration for reliable industrial monitoring and automation.",
};

export default function Page() {
  return <EnglishSolutionPage solution="industrial-automation" />;
}
