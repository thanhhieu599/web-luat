import type { MetadataRoute } from "next";
import { CASES } from "@/data/cases";
import { CATEGORIES } from "@/data/content";
import { LAWYERS } from "@/data/lawyers";
import { SERVICES } from "@/data/services";
import { SITE } from "@/data/site";
import { getArticleMetas } from "@/lib/articles";

export default function sitemap(): MetadataRoute.Sitemap {
  const u = (p: string) => SITE.url + p;
  const articles = getArticleMetas();
  const latest = articles[0]?.date ?? undefined;
  return [
    { url: u("/"), lastModified: latest, priority: 1 },
    { url: u("/gioi-thieu"), priority: 0.8 },
    { url: u("/dich-vu"), priority: 0.9 },
    ...SERVICES.map((s) => ({ url: u(`/dich-vu/${s.slug}`), priority: 0.9 })),
    ...LAWYERS.map((l) => ({ url: u(`/luat-su/${l.slug}`), priority: 0.6 })),
    { url: u("/vu-an-tieu-bieu"), priority: 0.7 },
    ...CASES.map((c) => ({ url: u(`/vu-an-tieu-bieu/${c.slug}`), priority: 0.6 })),
    { url: u("/bai-viet"), lastModified: latest, priority: 0.8 },
    ...CATEGORIES.map((c) => ({ url: u(`/bai-viet/chuyen-muc/${c.slug}`), priority: 0.6 })),
    ...articles.map((a) => ({ url: u(`/bai-viet/${a.slug}`), lastModified: a.date, priority: 0.7 })),
    { url: u("/lien-he"), priority: 0.8 },
    { url: u("/thoa-thuan-dich-vu"), priority: 0.2 },
    { url: u("/bao-ve-thong-tin"), priority: 0.2 },
  ];
}
