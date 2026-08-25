import type { Metadata } from "next";
import { EnglishSolutionPage } from "@/components/english-solution-page";

export const metadata: Metadata = {
  title: "Industrial Reporting | VeriSaha Teknoloji",
  description: "Daily, monthly and yearly industrial reports with trend analysis and PDF/Excel exports.",
};

export default function Page() {
  return <EnglishSolutionPage solution="reporting" />;
}
