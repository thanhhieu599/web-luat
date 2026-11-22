import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArticleList, categoryCounts } from "@/components/ArticleList";
import { CATEGORIES, categoryBySlug } from "@/data/content";
import { getArticleMetas } from "@/lib/articles";

type Props = { params: Promise<{ cat: string }> };

export function generateStaticParams() {
  return CATEGORIES.map((c) => ({ cat: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const c = categoryBySlug((await params).cat);
  if (!c) return {};
  return {
    title: `${c.name} – Bài viết pháp luật`,
    description: `Bài viết pháp luật về ${c.name.toLowerCase()} do luật sư Viên Minh phân tích.`,
    alternates: { canonical: `/bai-viet/chuyen-muc/${c.slug}` },
  };
}

export default async function CategoryPage({ params }: Props) {
  const c = categoryBySlug((await params).cat);
  if (!c) notFound();
  const all = getArticleMetas();
  const items = all.filter((a) => a.category === c.slug);
  return (
    <ArticleList
      items={items}
      page={1}
      total={1}
      basePath={`/bai-viet/chuyen-muc/${c.slug}`}
      activeCategory={c.slug}
      title={c.name}
      lead={`${items.length} bài viết về ${c.name.toLowerCase()} do luật sư Viên Minh phân tích và cập nhật.`}
      counts={categoryCounts(all)}
    />
  );
}
