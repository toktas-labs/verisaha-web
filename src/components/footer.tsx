"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Linkedin, Mail, MapPin, Phone } from "lucide-react";
import { localeFromPath, localizedPath } from "@/lib/i18n";

export default function Footer() {
  const pathname = usePathname();
  const locale = localeFromPath(pathname);
  const en = locale === "en";

  return (
    <footer className="w-full bg-brand-navy text-white/90">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:py-12">
        <div className="flex flex-col gap-5 border-b border-white/15 pb-8 sm:flex-row sm:items-center sm:justify-between sm:gap-4 sm:pb-10">
          <Link href={localizedPath(locale, "/")} className="flex items-center gap-3">
            <div className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-white/10 font-bold">
              VST
            </div>
            <span className="text-lg font-semibold tracking-tight sm:text-xl">
              VeriSaha Teknoloji
            </span>
          </Link>

          <Link
            href={localizedPath(locale, "/iletisim")}
            className="inline-flex w-fit items-center rounded-full border border-brand-teal px-5 py-2 text-sm font-medium text-white transition hover:bg-white/10"
          >
            {en ? "Contact Us" : "İletişim Kur"}
          </Link>
        </div>

        <div className="grid gap-9 pt-8 sm:grid-cols-2 sm:gap-10 sm:pt-10 lg:grid-cols-4">
          <div>
            <h4 className="mb-3 font-semibold text-white">{en ? "Services" : "Hizmetler"}</h4>
            <ul className="space-y-2 text-white/80">
              <li>
                <Link className="hover:underline" href={`${localizedPath(locale, "/")}#solutions`}>
                  {en ? "All Services" : "Tüm Hizmetler"}
                </Link>
              </li>
              <li>
                <Link className="hover:underline" href={localizedPath(locale, "/cozumler/uzaktan-izleme")}>
                  {en ? "Remote Monitoring" : "Uzaktan İzleme"}
                </Link>
              </li>
              <li>
                <Link className="hover:underline" href={localizedPath(locale, "/cozumler/proje-bazli")}>
                  {en ? "Custom Projects" : "Proje Bazlı Çözümler"}
                </Link>
              </li>
              <li>
                <Link className="hover:underline" href={localizedPath(locale, "/cozumler/endustriyel-otomasyon")}>
                  {en ? "Industrial Automation" : "Endüstriyel Otomasyon"}
                </Link>
              </li>
              <li>
                <Link className="hover:underline" href={localizedPath(locale, "/cozumler/raporlama")}>
                  {en ? "Reporting" : "Raporlama"}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="mb-3 font-semibold text-white">{en ? "Industries" : "Sektörler"}</h4>
            <ul className="space-y-2 text-white/80">
              <li>{en ? "Food & Dairy" : "Gıda & Süt"}</li>
              <li>{en ? "Chemical" : "Kimya"}</li>
              <li>{en ? "Energy" : "Enerji"}</li>
              <li>{en ? "Water & Wastewater" : "Su & Atıksu"}</li>
            </ul>
          </div>

          <div>
            <h4 className="mb-3 font-semibold text-white">{en ? "Company" : "Hakkımızda"}</h4>
            <ul className="space-y-2 text-white/80">
              <li>
                <Link className="hover:underline" href={localizedPath(locale, "/hakkimizda")}>
                  {en ? "About Us" : "Kurumsal"}
                </Link>
              </li>
              <li>
                <Link className="hover:underline" href={localizedPath(locale, "/blog")}>
                  Blog
                </Link>
              </li>
              <li>
                <Link className="hover:underline" href={localizedPath(locale, "/iletisim")}>
                  {en ? "Contact" : "İletişim"}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="mb-3 font-semibold text-white">VeriSaha {en ? "Head Office" : "Merkez"}</h4>
            <ul className="space-y-3 text-white/85">
              <li className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-5 w-5 shrink-0" />
                <p>Antalya, {en ? "Türkiye" : "Türkiye"}</p>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-5 w-5 shrink-0" />
                <a className="underline underline-offset-4" href="mailto:info@verisaha.com">
                  info@verisaha.com
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-5 w-5 shrink-0" />
                <a className="hover:underline" href="tel:+905446614303">
                  +90 544 661 43 03
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-9 grid items-center gap-5 border-t border-white/15 pt-6 sm:grid-cols-3 lg:mt-10">
          <div className="flex items-center gap-3 sm:justify-self-start">
            <a
              aria-label="VeriSaha LinkedIn"
              href="https://www.linkedin.com/company/verisaha-teknoloji/"
              target="_blank"
              rel="noopener noreferrer"
              className="grid size-9 place-items-center rounded-full border border-white/20 transition hover:bg-white/10"
            >
              <Linkedin className="h-5 w-5" />
            </a>
          </div>

          <div className="text-sm text-white/70 sm:text-center">
            © {new Date().getFullYear()} VeriSaha Teknoloji — {en ? "All rights reserved." : "Tüm hakları saklıdır."}
          </div>

          <div className="hidden sm:block" aria-hidden="true" />
        </div>
      </div>
    </footer>
  );
}
