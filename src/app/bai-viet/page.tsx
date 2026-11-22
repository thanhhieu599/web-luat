import type { Metadata } from "next";
import { ArticleList, categoryCounts } from "@/components/ArticleList";
import { getArticleMetas, paginate } from "@/lib/articles";

export const metadata: Metadata = {
  title: "Bài viết – Tin tức pháp luật",
  description: "Kiến thức pháp luật về hôn nhân gia đình, đất đai, hình sự, doanh nghiệp, dân sự do luật sư Viên Minh phân tích và cập nhật.",
  alternates: { canonical: "/bai-viet" },
};

export default function ArticlesPage() {
  const all = getArticleMetas();
  const { items, total } = paginate(all, 1);
  return (
    <ArticleList
      items={items}
      page={1}
      total={total}
      basePath="/bai-viet"
      title="Cập nhật pháp luật – Vững vàng pháp lý"
      lead="Theo dõi thông tin pháp luật mới, chính sách quan trọng và phân tích chuyên môn từ luật sư Viên Minh."
      counts={categoryCounts(all)}
    />
  );
}
