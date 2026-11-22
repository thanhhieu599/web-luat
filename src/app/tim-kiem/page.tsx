import type { Metadata } from "next";
import { Suspense } from "react";
import { PageHero } from "@/components/blocks";
import { SearchBox } from "./SearchBox";

export const metadata: Metadata = {
  title: "Tìm kiếm bài viết",
  description: "Tìm bài viết pháp luật của Luật Viên Minh theo từ khóa.",
  alternates: { canonical: "/tim-kiem" },
  robots: { index: false, follow: true },
};

export default function SearchPage() {
  return (
    <>
      <PageHero crumbs={[{ label: "Tìm kiếm" }]} title="Tìm bài viết" lead="Gõ từ khóa có dấu hoặc không dấu, ví dụ: ly hon, so do, thua ke." />
      <section className="py-10 sm:py-14">
        <div className="container-x max-w-[900px]">
          <Suspense>
            <SearchBox />
          </Suspense>
        </div>
      </section>
    </>
  );
}
