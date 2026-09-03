"use client";

import Link from "next/link";
import { Activity } from "lucide-react";
import { usePathname } from "next/navigation";

export default function ModbusDemoCTA() {
  const pathname = usePathname();

  const isDemoPage =
    pathname === "/demo" ||
    pathname.startsWith("/demo/") ||
    pathname === "/en/demo" ||
    pathname.startsWith("/en/demo/");

  const isStudioPage =
    pathname === "/studio" || pathname.startsWith("/studio/");

  if (isDemoPage || isStudioPage) {
    return null;
  }

  const en = pathname === "/en" || pathname.startsWith("/en/");

  return (
    <section className="relative bg-white py-3">
      <div className="mx-auto max-w-6xl px-4">
        <div className="rounded-2xl border border-slate-200 bg-white shadow-md shadow-slate-200/40">
          <div className="flex flex-col items-center justify-between gap-6 px-6 py-6 text-center md:flex-row md:px-8 md:py-7 md:text-left">
            <div className="flex items-start gap-4">
              <div className="hidden h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-brand-teal/10 text-brand-teal md:flex">
                <Activity className="h-6 w-6" />
              </div>

              <div>
                <h3 className="text-xl font-bold text-brand-navy md:text-2xl">
                  {en
                    ? "Have You Tried Our Modbus Demo?"
                    : "Modbus Demo’yu Denediniz mi?"}
                </h3>

                <p className="mt-2 max-w-2xl text-sm leading-relaxed text-slate-600 md:text-base">
                  {en
                    ? "Test Modbus TCP/RTU communication directly in your browser and explore data reading operations."
                    : "Modbus TCP/RTU haberleşmesini tarayıcınız üzerinden deneyin ve veri okuma işlemlerini inceleyin."}
                </p>
              </div>
            </div>

            <Link
              href={en ? "/en/demo" : "/demo"}
              className="shrink-0 rounded-full bg-gradient-to-r from-brand-navy to-brand-teal px-7 py-3 font-semibold text-white shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md"
            >
              Modbus Demo
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
