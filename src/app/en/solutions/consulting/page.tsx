import type { Metadata } from "next";
import { EnglishSolutionPage } from "@/components/english-solution-page";

export const metadata: Metadata = {
  title: "Industrial Consulting | VeriSaha Teknoloji",
  description: "Site survey, installation, commissioning and training support for industrial measurement and automation projects.",
};

export default function Page() {
  return <EnglishSolutionPage solution="consulting" />;
}
