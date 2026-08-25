import type { Metadata } from "next";
import { EnglishSolutionPage } from "@/components/english-solution-page";

export const metadata: Metadata = {
  title: "Custom Projects | VeriSaha Teknoloji",
  description: "Custom batch panels, test systems and industrial automation projects designed around your requirements.",
};

export default function Page() {
  return <EnglishSolutionPage solution="custom-projects" />;
}
