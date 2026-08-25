export type Locale = "tr" | "en";

const trToEn: Record<string, string> = {
  "/": "/en",
  "/demo": "/en/demo",
  "/blog": "/en/blog",
  "/hakkimizda": "/en/about",
  "/iletisim": "/en/contact",
  "/cozumler/olcum-izleme": "/en/solutions/measurement-monitoring",
  "/cozumler/proje-bazli": "/en/solutions/custom-projects",
  "/cozumler/endustriyel-otomasyon": "/en/solutions/industrial-automation",
  "/cozumler/raporlama": "/en/solutions/reporting",
  "/cozumler/uzaktan-izleme": "/en/solutions/remote-monitoring",
  "/cozumler/danismanlik": "/en/solutions/consulting",
};

const enToTr = Object.fromEntries(
  Object.entries(trToEn).map(([tr, en]) => [en, tr])
) as Record<string, string>;

const blogTrToEn: Record<string, string> = {
  "endustriyel-veri-izlemenin-onemi": "why-industrial-data-monitoring-matters",
  "debimetre-cesitleri-ve-uygulama-alanlari": "flowmeter-types-and-applications",
  "uzaktan-izleme-ve-otomasyonun-gelecegi": "future-of-remote-monitoring-and-automation",
};

const blogEnToTr = Object.fromEntries(
  Object.entries(blogTrToEn).map(([tr, en]) => [en, tr])
) as Record<string, string>;

export function isEnglishPath(pathname: string): boolean {
  return pathname === "/en" || pathname.startsWith("/en/");
}

export function localeFromPath(pathname: string): Locale {
  return isEnglishPath(pathname) ? "en" : "tr";
}

function switchBlogPostPath(pathname: string, target: Locale): string | undefined {
  const trMatch = pathname.match(/^\/blog\/([^/]+)$/);
  if (trMatch && target === "en") {
    const translatedSlug = blogTrToEn[trMatch[1]];
    return translatedSlug ? `/en/blog/${translatedSlug}` : "/en/blog";
  }

  const enMatch = pathname.match(/^\/en\/blog\/([^/]+)$/);
  if (enMatch && target === "tr") {
    const translatedSlug = blogEnToTr[enMatch[1]];
    return translatedSlug ? `/blog/${translatedSlug}` : "/blog";
  }

  return undefined;
}

export function switchLocalePath(pathname: string, target: Locale): string {
  const blogPostPath = switchBlogPostPath(pathname, target);
  if (blogPostPath) return blogPostPath;

  if (target === "en") {
    if (isEnglishPath(pathname)) return pathname;
    return trToEn[pathname] ?? "/en";
  }

  if (!isEnglishPath(pathname)) return pathname;
  return enToTr[pathname] ?? "/";
}

export function localizedPath(locale: Locale, trPath: string): string {
  if (locale === "tr") return trPath;
  return trToEn[trPath] ?? "/en";
}
