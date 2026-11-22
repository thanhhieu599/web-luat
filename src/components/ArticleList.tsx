import Link from "next/link";
import { ArticleCard, ArticleRow } from "./cards";
import { PageHero } from "./blocks";
import { Icon } from "./Icon";
import { CATEGORIES } from "@/data/content";
import type { ArticleMeta } from "@/lib/articles";

export function ArticleList({
  items,
  page,
  total,
  basePath,
  activeCategory,
  title,
  lead,
  counts,
}: {
  items: ArticleMeta[];
  page: number;
  total: number;
  basePath: string;
  activeCategory?: string;
  title: string;
  lead: string;
  counts: Record<string, number>;
}) {
  const crumbs = activeCategory
    ? [{ label: "Bài viết", href: "/bai-viet" }, { label: CATEGORIES.find((c) => c.slug === activeCategory)?.name ?? "" }]
    : [{ label: "Bài viết" }];
  const [first, ...rest] = items;
  const pageHref = (n: number) => (n === 1 ? basePath : `${basePath}/trang/${n}`);

  return (
    <>
      <PageHero crumbs={crumbs} eyebrow="Tin tức pháp luật" title={title} lead={lead}>
        <Link href="/tim-kiem" className="mt-2 flex h-12 w-full max-w-[520px] items-center gap-3 bg-white px-4 text-[15px] text-gray hover:text-navy">
          <Icon name="search" size={20} />Tìm bài viết, ví dụ: ly hôn, sổ đỏ, thừa kế…
        </Link>
      </PageHero>

      <div className="sticky top-[68px] z-20 border-b border-line bg-white lg:top-[68px]">
        <nav aria-label="Chuyên mục" className="container-x -mb-px flex gap-6 overflow-x-auto whitespace-nowrap">
          <Link href="/bai-viet" className={`border-b-2 py-4 text-[15px] font-semibold ${!activeCategory ? "border-gold-dark text-navy" : "border-transparent text-gray hover:text-navy"}`}>Tất cả</Link>
          {CATEGORIES.map((c) => (
            <Link key={c.slug} href={`/bai-viet/chuyen-muc/${c.slug}`} className={`border-b-2 py-4 text-[15px] font-semibold ${activeCategory === c.slug ? "border-gold-dark text-navy" : "border-transparent text-gray hover:text-navy"}`}>
              {c.name} <span className="font-normal text-gray">({counts[c.slug] ?? 0})</span>
            </Link>
          ))}
        </nav>
      </div>

      <section className="py-10 sm:py-14">
        <div className="container-x">
          {!items.length && <p className="py-16 text-center text-gray">Chưa có bài viết trong chuyên mục này.</p>}
          {first && page === 1 && (
            <div className="mb-6 border-b border-line pb-10">
              <div className="grid gap-6 md:grid-cols-[1.2fr_1fr] md:items-center md:gap-10">
                <ArticleCard a={first} priority />
                <div className="hidden md:block">
                  <p className="line-clamp-6 text-[16.5px] leading-relaxed text-gray-2">{first.summary}</p>
                  <Link href={`/bai-viet/${first.slug}`} className="link-arrow mt-4">Đọc bài viết<Icon name="arrow" size={17} /></Link>
                </div>
              </div>
            </div>
          )}
          <div className="divide-y divide-line">
            {(page === 1 ? rest : items).map((a) => <ArticleRow key={a.slug} a={a} />)}
          </div>
          {total > 1 && (
            <nav aria-label="Phân trang" className="mt-10 flex flex-wrap items-center justify-center gap-2">
              {page > 1 && <Link href={pageHref(page - 1)} className="flex h-11 items-center gap-1 border border-line px-4 text-[15px] font-semibold text-navy hover:border-brand" rel="prev">‹ Trước</Link>}
              {Array.from({ length: total }, (_, i) => i + 1).map((n) => (
                <Link key={n} href={pageHref(n)} aria-current={n === page ? "page" : undefined} className={`grid size-11 place-items-center border text-[15px] font-semibold ${n === page ? "border-navy bg-navy text-white" : "border-line text-navy hover:border-brand"}`}>{n}</Link>
              ))}
              {page < total && <Link href={pageHref(page + 1)} className="flex h-11 items-center gap-1 border border-line px-4 text-[15px] font-semibold text-navy hover:border-brand" rel="next">Sau ›</Link>}
            </nav>
          )}
        </div>
      </section>
    </>
  );
}

export function categoryCounts(all: ArticleMeta[]) {
  return all.reduce<Record<string, number>>((m, a) => ((m[a.category] = (m[a.category] ?? 0) + 1), m), {});
}
