import type { Metadata } from "next";
import { EnglishSolutionPage } from "@/components/english-solution-page";

export const metadata: Metadata = {
  title: "Remote Monitoring | VeriSaha Teknoloji",
  description: "Monitor industrial measurement devices remotely through web, mobile and desktop interfaces.",
};

export default function Page() {
  return <EnglishSolutionPage solution="remote-monitoring" />;
}
