"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { localeFromPath } from "@/lib/i18n";

export default function HtmlLangSync() {
  const pathname = usePathname();

  useEffect(() => {
    document.documentElement.lang = localeFromPath(pathname);
  }, [pathname]);

  return null;
}
