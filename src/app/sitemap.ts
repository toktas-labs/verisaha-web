import type { MetadataRoute } from "next";
import { getBlogPosts, getTranslatedBlogSlug } from "@/lib/blog-posts";

const BASE_URL = "https://verisaha.com";

type LocalizedRoutePair = {
  tr: string;
  en: string;
  priority: number;
  changeFrequency?: MetadataRoute.Sitemap[number]["changeFrequency"];
};

const routePairs: LocalizedRoutePair[] = [
  { tr: "/", en: "/en", priority: 1 },
  { tr: "/demo", en: "/en/demo", priority: 0.9 },
  { tr: "/blog", en: "/en/blog", priority: 0.8 },
  { tr: "/hakkimizda", en: "/en/about", priority: 0.7 },
  { tr: "/iletisim", en: "/en/contact", priority: 0.8 },
  {
    tr: "/cozumler/olcum-izleme",
    en: "/en/solutions/measurement-monitoring",
    priority: 0.8,
  },
  {
    tr: "/cozumler/proje-bazli",
    en: "/en/solutions/custom-projects",
    priority: 0.8,
  },
  {
    tr: "/cozumler/endustriyel-otomasyon",
    en: "/en/solutions/industrial-automation",
    priority: 0.8,
  },
  {
    tr: "/cozumler/raporlama",
    en: "/en/solutions/reporting",
    priority: 0.8,
  },
  {
    tr: "/cozumler/uzaktan-izleme",
    en: "/en/solutions/remote-monitoring",
    priority: 0.8,
  },
  {
    tr: "/cozumler/danismanlik",
    en: "/en/solutions/consulting",
    priority: 0.8,
  },
];

function absoluteUrl(path: string) {
  return `${BASE_URL}${path}`;
}

function localizedEntries({
  tr,
  en,
  priority,
  changeFrequency = "monthly",
}: LocalizedRoutePair): MetadataRoute.Sitemap {
  const languages = {
    tr: absoluteUrl(tr),
    en: absoluteUrl(en),
  };

  return [tr, en].map((path) => ({
    url: absoluteUrl(path),
    changeFrequency,
    priority,
    alternates: {
      languages,
    },
  }));
}

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = routePairs.flatMap(localizedEntries);

  const blogRoutes = getBlogPosts("tr").flatMap((post) => {
    const enSlug = getTranslatedBlogSlug("tr", "en", post.slug);
    if (!enSlug) return [];

    return localizedEntries({
      tr: `/blog/${post.slug}`,
      en: `/en/blog/${enSlug}`,
      priority: 0.7,
    });
  });

  return [...staticRoutes, ...blogRoutes];
}
