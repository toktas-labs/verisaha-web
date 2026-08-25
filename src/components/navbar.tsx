"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Check, ChevronDown, Globe2, Menu } from "lucide-react";
import {
  localeFromPath,
  localizedPath,
  switchLocalePath,
  type Locale,
} from "@/lib/i18n";

const navLink =
  "text-brand-navy hover:text-brand-navy/80 font-medium tracking-[0.2px] transition-colors";

const solutionItems = [
  { tr: "Ölçüm İzleme", en: "Measurement Monitoring", path: "/cozumler/olcum-izleme" },
  { tr: "Proje Bazlı Çözümler", en: "Custom Projects", path: "/cozumler/proje-bazli" },
  { tr: "Endüstriyel Otomasyon", en: "Industrial Automation", path: "/cozumler/endustriyel-otomasyon" },
  { tr: "Raporlama", en: "Reporting", path: "/cozumler/raporlama" },
  { tr: "Uzaktan İzleme", en: "Remote Monitoring", path: "/cozumler/uzaktan-izleme" },
  { tr: "Danışmanlık", en: "Consulting", path: "/cozumler/danismanlik" },
] as const;

function LanguageMenu({ locale, pathname, mobile = false }: { locale: Locale; pathname: string; mobile?: boolean }) {
  const triggerClass = mobile
    ? "flex w-full items-center justify-center gap-2 rounded-full border border-slate-300 px-4 py-2.5 text-sm font-semibold text-brand-navy transition hover:bg-slate-50"
    : "inline-flex h-10 items-center gap-1.5 rounded-full border border-slate-300 bg-white px-3 text-sm font-semibold text-brand-navy transition hover:border-brand-teal hover:bg-slate-50";

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className={triggerClass} aria-label={locale === "en" ? "Change language" : "Dil değiştir"}>
        <Globe2 className="size-4 text-brand-teal" />
        {locale.toUpperCase()}
        <ChevronDown className="size-3.5" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="min-w-40 border border-slate-200 bg-white text-brand-navy shadow-xl">
        <DropdownMenuItem asChild>
          <Link href={switchLocalePath(pathname, "tr")} className="flex w-full items-center justify-between gap-4 px-3 py-2">
            Türkçe
            {locale === "tr" && <Check className="size-4 text-brand-teal" />}
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href={switchLocalePath(pathname, "en")} className="flex w-full items-center justify-between gap-4 px-3 py-2">
            English
            {locale === "en" && <Check className="size-4 text-brand-teal" />}
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default function Navbar() {
  const pathname = usePathname();
  const locale = localeFromPath(pathname);
  const en = locale === "en";

  const labels = {
    solutions: en ? "Solutions" : "Çözümler",
    about: en ? "About" : "Hakkımızda",
    contact: en ? "Contact" : "İletişim",
    navigation: en ? "Main navigation" : "Ana navigasyon",
    openMenu: en ? "Open menu" : "Menüyü aç",
    mobileMenu: en ? "Navigation menu" : "Navigasyon menüsü",
    homeAria: en ? "VeriSaha home page" : "VeriSaha ana sayfa",
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white shadow-md">
      <div className="mx-auto flex h-18 max-w-screen-xl items-center justify-between px-4 lg:px-8">
        <Link href={localizedPath(locale, "/")} className="flex shrink-0 items-center" aria-label={labels.homeAria}>
          <Image
            src="/verisaha-logo.png"
            alt="VeriSaha Teknoloji"
            width={200}
            height={48}
            priority
            className="h-auto w-[170px] sm:w-[190px] xl:w-[200px]"
          />
        </Link>

        <nav className="hidden items-center gap-6 lg:flex xl:gap-9" aria-label={labels.navigation}>
          <Link
            href={localizedPath(locale, "/demo")}
            className="rounded-full bg-gradient-to-r from-brand-navy to-brand-teal px-5 py-2 font-semibold text-white shadow transition hover:opacity-90"
          >
            Modbus Demo
          </Link>

          <DropdownMenu>
            <DropdownMenuTrigger className={`${navLink} flex items-center gap-1 outline-none`}>
              {labels.solutions} <ChevronDown className="size-4 text-brand-teal" />
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="start"
              className="min-w-64 border border-slate-200 bg-white text-brand-navy shadow-2xl"
            >
              {solutionItems.map((item) => (
                <DropdownMenuItem asChild key={item.path}>
                  <Link
                    href={localizedPath(locale, item.path)}
                    className="block w-full rounded-md px-3 py-2 hover:bg-slate-100 focus:bg-slate-100"
                  >
                    {en ? item.en : item.tr}
                  </Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <Link href={localizedPath(locale, "/blog")} className={navLink}>
            Blog
          </Link>
          <Link href={localizedPath(locale, "/hakkimizda")} className={navLink}>
            {labels.about}
          </Link>
        </nav>

        <div className="flex items-center gap-2">
          <Button
            asChild
            variant="outline"
            className="hidden rounded-full border-2 border-brand-teal bg-transparent px-5 text-brand-navy hover:bg-brand-teal hover:text-white lg:inline-flex"
          >
            <Link href={localizedPath(locale, "/iletisim")}>{labels.contact}</Link>
          </Button>

          <div className="hidden lg:block">
            <LanguageMenu locale={locale} pathname={pathname} />
          </div>

          <Sheet>
            <SheetTrigger
              className="inline-flex rounded-md p-2 text-brand-navy transition hover:bg-slate-100 lg:hidden"
              aria-label={labels.openMenu}
            >
              <Menu className="size-6" />
            </SheetTrigger>

            <SheetContent side="left" className="w-80 max-w-[88vw] bg-white">
              <SheetTitle className="sr-only">{labels.mobileMenu}</SheetTitle>
              <div className="mt-8 flex flex-col gap-5">
                <SheetClose asChild>
                  <Link
                    href={localizedPath(locale, "/demo")}
                    className="rounded-lg bg-gradient-to-r from-brand-navy to-brand-teal px-4 py-3 text-center font-semibold text-white shadow-sm"
                  >
                    Modbus Demo
                  </Link>
                </SheetClose>

                <div>
                  <span className="font-semibold text-brand-navy">{labels.solutions}</span>
                  <div className="ml-3 mt-3 flex flex-col gap-3 border-l border-slate-200 pl-4 text-sm text-slate-700">
                    {solutionItems.map((item) => (
                      <SheetClose asChild key={item.path}>
                        <Link className="hover:text-brand-navy" href={localizedPath(locale, item.path)}>
                          {en ? item.en : item.tr}
                        </Link>
                      </SheetClose>
                    ))}
                  </div>
                </div>

                <SheetClose asChild>
                  <Link href={localizedPath(locale, "/blog")} className="font-medium text-brand-navy">
                    Blog
                  </Link>
                </SheetClose>
                <SheetClose asChild>
                  <Link href={localizedPath(locale, "/hakkimizda")} className="font-medium text-brand-navy">
                    {labels.about}
                  </Link>
                </SheetClose>

                <SheetClose asChild>
                  <Link
                    href={localizedPath(locale, "/iletisim")}
                    className="mt-1 inline-flex items-center justify-center rounded-full border-2 border-brand-teal px-5 py-2.5 font-medium text-brand-navy transition hover:bg-brand-teal hover:text-white"
                  >
                    {labels.contact}
                  </Link>
                </SheetClose>

                <div className="border-t border-slate-200 pt-4">
                  <div className="flex items-center justify-between gap-3 rounded-xl border border-slate-200 p-2">
                    <span className="flex items-center gap-2 px-2 text-sm font-semibold text-brand-navy">
                      <Globe2 className="size-4 text-brand-teal" />
                      {en ? "Language" : "Dil"}
                    </span>
                    <div className="flex items-center gap-1">
                      <SheetClose asChild>
                        <Link
                          href={switchLocalePath(pathname, "tr")}
                          className={`rounded-lg px-3 py-1.5 text-sm font-semibold ${locale === "tr" ? "bg-brand-navy text-white" : "text-brand-navy hover:bg-slate-100"}`}
                        >
                          TR
                        </Link>
                      </SheetClose>
                      <SheetClose asChild>
                        <Link
                          href={switchLocalePath(pathname, "en")}
                          className={`rounded-lg px-3 py-1.5 text-sm font-semibold ${locale === "en" ? "bg-brand-navy text-white" : "text-brand-navy hover:bg-slate-100"}`}
                        >
                          EN
                        </Link>
                      </SheetClose>
                    </div>
                  </div>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
