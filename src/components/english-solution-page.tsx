import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  BarChart3,
  CheckCircle2,
  Cpu,
  FileSpreadsheet,
  Gauge,
  Globe,
  Monitor,
  PanelTop,
  Search,
  Settings,
  Smartphone,
  TestTube2,
  UserCheck,
  X,
  type LucideIcon,
} from "lucide-react";

export type EnglishSolutionKey =
  | "measurement-monitoring"
  | "custom-projects"
  | "industrial-automation"
  | "reporting"
  | "remote-monitoring"
  | "consulting";

type FeatureCard = {
  title: string;
  description: string;
  image: string;
  icon: LucideIcon;
  bullets?: string[];
};

type SolutionContent = {
  title: string;
  description: string;
  heroImage: string;
  gradient: string;
  highlights: Array<{ title: string; text: string }>;
  primaryCta: string;
  cards: FeatureCard[];
  ctaTitle: string;
  ctaText: string;
};

const content: Record<EnglishSolutionKey, SolutionContent> = {
  "measurement-monitoring": {
    title: "Measurement Monitoring",
    description:
      "Monitor and archive field process parameters such as flow, temperature, pressure, level and energy in real time. Collect data through Modbus/S7 integrations, analyze it and improve production efficiency.",
    heroImage: "/olcum/hero.jpg",
    gradient: "bg-gradient-to-br from-brand-navy/85 via-cyan-800/70 to-teal-700/65",
    highlights: [
      { title: "Efficiency", text: "Real-time monitoring that helps optimize processes." },
      { title: "Safety", text: "Limits, alarms and notifications for critical values." },
      { title: "Easy Reporting", text: "Trends, archives and PDF/Excel outputs." },
    ],
    primaryCta: "Request a Demo",
    cards: [
      {
        title: "Parameter-Based Monitoring",
        description:
          "Track flow, temperature, pressure, level and energy measurements from a single panel, with dedicated indicators and alarms for critical parameters.",
        image: "/olcum/parametre.jpg",
        icon: Gauge,
        bullets: [
          "Flowmeter/totalizer, temperature, pressure and level",
          "Energy consumption (electricity, steam, gas)",
          "Limit/alarm thresholds and notifications",
        ],
      },
      {
        title: "Method-Based Monitoring",
        description:
          "Desktop applications, automation panels (HMI/PLC), web dashboards or remote monitoring: a flexible architecture based on your needs.",
        image: "/olcum/yontem.jpg",
        icon: Monitor,
        bullets: [
          "Desktop: live monitoring + MySQL archive",
          "Panel (HMI/PLC): on-site monitoring",
          "Web: browser-based and mobile-friendly",
          "Remote: VPN/RDP/IoT tunnels",
        ],
      },
      {
        title: "Reporting",
        description:
          "Prepare quality and management reports with trend analysis, archive viewing and PDF/Excel exports.",
        image: "/olcum/raporlama.jpg",
        icon: BarChart3,
        bullets: ["Daily/monthly/yearly trends", "Archive and filtering", "PDF / Excel export"],
      },
    ],
    ctaTitle: "Collect field data and turn it into value.",
    ctaText: "Monitor your process measurements, analyze historical data and create practical reports.",
  },
  "custom-projects": {
    title: "Custom Projects",
    description:
      "Batch and set-reset panels, test systems and solutions designed around customer-specific requirements, including integration, commissioning and long-term reliability.",
    heroImage: "/proje/hero.jpg",
    gradient: "bg-gradient-to-br from-brand-navy/85 via-cyan-800/70 to-teal-700/65",
    highlights: [
      { title: "Flexibility", text: "Panels and automation projects tailored to specific requirements." },
      { title: "Reliability", text: "Field-proven design and installation." },
      { title: "Control Flexibility", text: "Compatible with PLC, PC and web-based solutions." },
    ],
    primaryCta: "Request a Project",
    cards: [
      {
        title: "Batch & Set-Reset Panels",
        description:
          "Batch and set-reset panels for filling and production lines, designed for high accuracy, safety and ease of use.",
        image: "/proje/pano.jpg",
        icon: PanelTop,
      },
      {
        title: "Test & Calibration Systems",
        description:
          "Solutions for special test and calibration requirements with precision and safety as key priorities.",
        image: "/proje/test.jpg",
        icon: TestTube2,
      },
      {
        title: "Customer-Specific Projects",
        description:
          "Projects designed entirely around your needs, compatible with PLC, SCADA and industrial communication infrastructures.",
        image: "/proje/ozel.jpg",
        icon: Settings,
      },
    ],
    ctaTitle: "Let’s design your project together.",
    ctaText: "Panels, test systems and integration solutions tailored to your requirements.",
  },
  "industrial-automation": {
    title: "Industrial Automation",
    description:
      "Industrial monitoring and integration with PLC, SCADA and HMI systems. Reliable automation solutions compatible with PLC platforms such as Siemens S7-1200/1500.",
    heroImage: "/otomasyon/hero.jpg",
    gradient: "bg-gradient-to-bl from-brand-teal/80 via-brand-navy/70 to-black/50",
    highlights: [
      { title: "Integration", text: "Compatibility with PLC, SCADA and HMI systems." },
      { title: "Monitoring", text: "Real-time monitoring of production data." },
      { title: "Scalability", text: "Scalable architecture with Modbus, Profibus and Profinet." },
    ],
    primaryCta: "Request a Solution",
    cards: [
      {
        title: "PLC Systems",
        description:
          "Flexible control solutions with Siemens S7-1200/1500 and similar PLCs for reliable industrial automation.",
        image: "/otomasyon/plc.jpg",
        icon: Cpu,
      },
      {
        title: "SCADA & HMI Solutions",
        description:
          "Monitor and manage field data through operator panels (HMI) and SCADA software.",
        image: "/otomasyon/scada.jpg",
        icon: Monitor,
      },
      {
        title: "Industrial Communication",
        description:
          "Digitalize your processes with Modbus, Profibus, Profinet and OPC UA-based communication integration.",
        image: "/otomasyon/haberlesme.jpg",
        icon: Globe,
      },
    ],
    ctaTitle: "Digitalize your production processes.",
    ctaText: "Improve efficiency with PLC, SCADA and HMI solutions and strengthen your processes with industrial communication.",
  },
  reporting: {
    title: "Reporting",
    description:
      "Comprehensive reporting with daily, monthly and yearly reports, graphical monitoring and PDF & Excel outputs.",
    heroImage: "/raporlama/hero.jpg",
    gradient: "bg-gradient-to-br from-brand-navy/85 via-cyan-800/70 to-teal-700/65",
    highlights: [
      { title: "Visualization", text: "Trend charts, tables and analysis." },
      { title: "Flexibility", text: "Daily, monthly and yearly reports." },
      { title: "Export", text: "Easy sharing with PDF and Excel outputs." },
    ],
    primaryCta: "Request Reporting",
    cards: [
      {
        title: "Trend Analysis",
        description: "Track daily, monthly and yearly trends graphically and analyze your processes more clearly.",
        image: "/raporlama/trend.jpg",
        icon: BarChart3,
      },
      {
        title: "Archive & Filtering",
        description:
          "Archive all measurement data, filter historical records and quickly access the information you need.",
        image: "/raporlama/arsiv.jpg",
        icon: Search,
      },
      {
        title: "PDF & Excel Outputs",
        description:
          "Export reports in PDF or Excel format for easy sharing and corporate integration.",
        image: "/raporlama/pdfexcel.jpg",
        icon: FileSpreadsheet,
      },
    ],
    ctaTitle: "Make reporting easier.",
    ctaText: "Analyze your processes with daily, monthly and yearly reports and share them easily through PDF and Excel outputs.",
  },
  "remote-monitoring": {
    title: "Remote Monitoring",
    description:
      "Monitor and manage measurement instruments in the field in real time through web, mobile and desktop interfaces.",
    heroImage: "/uzaktan/hero.jpg",
    gradient: "bg-gradient-to-r from-cyan-900/80 via-brand-navy/75 to-teal-700/60",
    highlights: [
      { title: "Multi-Platform", text: "Web, mobile and desktop access." },
      { title: "Real-Time Monitoring", text: "Live measurement values and alarms." },
      { title: "Secure Access", text: "Support for VPN, encryption and authorization." },
    ],
    primaryCta: "Request a Solution",
    cards: [
      {
        title: "Web Interface",
        description: "Access measurement data from anywhere using browser-based monitoring screens.",
        image: "/uzaktan/web.jpg",
        icon: Globe,
      },
      {
        title: "Mobile Application",
        description: "Monitor field devices from your phone using Android/iOS applications.",
        image: "/uzaktan/mobil.jpg",
        icon: Smartphone,
      },
      {
        title: "PC & SCADA Integration",
        description: "Comprehensive desktop monitoring and SCADA integration.",
        image: "/uzaktan/pc.jpg",
        icon: Monitor,
      },
    ],
    ctaTitle: "Access your data from anywhere.",
    ctaText: "Monitor field devices in real time with web, mobile and PC-based solutions.",
  },
  consulting: {
    title: "Consulting",
    description: "End-to-end expert support covering site survey, installation, commissioning and training.",
    heroImage: "/danismanlik/hero.jpg",
    gradient: "bg-gradient-to-br from-brand-navy/85 via-cyan-800/70 to-teal-700/65",
    highlights: [
      { title: "Site Survey & Needs Analysis", text: "On-site assessment and accurate solution planning." },
      { title: "Installation & Commissioning", text: "Safe and efficient implementation processes." },
      { title: "Training & Support", text: "User training and long-term support." },
    ],
    primaryCta: "Request an Expert",
    cards: [
      {
        title: "End-to-End Consulting",
        description:
          "We support every stage of your project, from site survey and installation to commissioning and user training. Our goal is to strengthen your processes with reliable, sustainable and efficient solutions.",
        image: "/danismanlik/detail.jpg",
        icon: UserCheck,
      },
    ],
    ctaTitle: "Manage your project confidently with expert support.",
    ctaText: "We support every step with site survey, installation, commissioning and training services.",
  },
};

export function EnglishSolutionPage({ solution }: { solution: EnglishSolutionKey }) {
  const item = content[solution];

  return (
    <main className="bg-white">
      <section className="relative overflow-hidden min-h-[400px] md:min-h-[500px] lg:min-h-[560px]">
        <div className="absolute inset-0 z-0">
          <Image src={item.heroImage} alt={item.title} fill className="object-cover opacity-40" priority />
          <div className={`absolute inset-0 ${item.gradient}`} />
        </div>

        <div className="relative z-10 mx-auto max-w-6xl px-4 py-12 md:py-20 text-white">
          <div className="max-w-3xl">
            <h1 className="text-3xl md:text-5xl font-bold leading-tight md:leading-[1.15]">{item.title}</h1>
            <p className="mt-4 max-w-2xl text-white/90 md:text-lg leading-relaxed">{item.description}</p>

            <ul className="mt-6 grid gap-2 text-white">
              {item.highlights.map((highlight) => (
                <li className="flex items-start gap-2" key={highlight.title}>
                  <CheckCircle2 className="mt-0.5 size-5 shrink-0" />
                  <span><b>{highlight.title}:</b> {highlight.text}</span>
                </li>
              ))}
            </ul>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/en/contact">
                <Button size="lg" className="bg-white text-brand-navy hover:bg-slate-100">{item.primaryCta}</Button>
              </Link>
              <Link href="#details">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">Learn More</Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section id="details" className="bg-white">
        <div className="mx-auto max-w-6xl px-4 py-14 md:py-20">
          <div className={`grid gap-6 items-stretch ${item.cards.length === 1 ? "sm:grid-cols-1 lg:grid-cols-3" : "sm:grid-cols-2 lg:grid-cols-3"}`}>
            {item.cards.map((card) => {
              const Icon = card.icon;
              return (
                <Card key={card.title} className={`flex flex-col h-full ${item.cards.length === 1 ? "lg:col-span-1" : ""}`}>
                  <CardHeader className="flex flex-row items-center gap-3">
                    <div className="rounded-xl bg-brand-navy/5 p-3">
                      <Icon className="size-6 text-brand-navy" />
                    </div>
                    <CardTitle>{card.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="flex flex-col flex-1">
                    <p className="text-slate-600 leading-relaxed">{card.description}</p>
                    {card.bullets && (
                      <ul className="mt-4 list-disc space-y-1 pl-5 text-sm text-slate-600">
                        {card.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}
                      </ul>
                    )}
                    <Dialog>
                      <DialogTrigger asChild>
                        <button type="button" className="relative mt-6 aspect-[4/3] w-full overflow-hidden rounded-lg border text-left cursor-pointer">
                          <Image src={card.image} alt={card.title} fill className="object-cover" />
                          <span className="absolute bottom-2 right-2 bg-white/80 rounded-full p-2 shadow">
                            <Search className="h-5 w-5 text-brand-navy" />
                          </span>
                        </button>
                      </DialogTrigger>
                      <DialogContent className="max-w-4xl [&>button:not(.custom-close)]:hidden">
                        <DialogTitle className="sr-only">{card.title}</DialogTitle>
                        <DialogClose className="custom-close absolute top-3 right-3 rounded-full bg-white/90 hover:bg-white p-2 shadow">
                          <X className="h-5 w-5 text-brand-navy" />
                        </DialogClose>
                        <Image src={card.image} alt={card.title} width={1200} height={900} className="w-full h-auto rounded-lg" />
                      </DialogContent>
                    </Dialog>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-brand-navy">
        <div className="mx-auto max-w-6xl px-4 py-10 text-white">
          <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
            <div>
              <h2 className="text-2xl font-semibold">{item.ctaTitle}</h2>
              <p className="mt-1 text-white/85">{item.ctaText}</p>
            </div>
            <div className="flex gap-3">
              <Link href="/en/contact">
                <Button size="lg" className="bg-white text-brand-navy hover:bg-slate-100">Contact Us</Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
