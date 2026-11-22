import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArticleList, categoryCounts } from "@/components/ArticleList";
import { getArticleMetas, paginate, PAGE_SIZE } from "@/lib/articles";

type Props = { params: Promise<{ page: string }> };

export function generateStaticParams() {
  const total = Math.ceil(getArticleMetas().length / PAGE_SIZE);
  return Array.from({ length: Math.max(0, total - 1) }, (_, i) => ({ page: String(i + 2) }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { page } = await params;
  return { title: `Bài viết – Trang ${page}`, alternates: { canonical: `/bai-viet/trang/${page}` } };
}

export default async function ArticlesPaged({ params }: Props) {
  const n = Number((await params).page);
  const all = getArticleMetas();
  const { items, total } = paginate(all, n);
  if (!Number.isInteger(n) || n < 2 || n > total) notFound();
  return (
    <ArticleList
      items={items}
      page={n}
      total={total}
      basePath="/bai-viet"
      title={`Bài viết – Trang ${n}`}
      lead="Kiến thức pháp luật do luật sư Viên Minh phân tích và cập nhật."
      counts={categoryCounts(all)}
    />
  );
}
