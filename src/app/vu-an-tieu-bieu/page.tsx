import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { CtaBand, PageHero } from "@/components/blocks";
import { Icon } from "@/components/Icon";
import { CASES, OTHER_CASES } from "@/data/cases";

export const metadata: Metadata = {
  title: "Vụ án tiêu biểu",
  description:
    "Những vụ án tiêu biểu luật sư Viên Minh đã tham gia bào chữa: Vạn Thịnh Phát – SCB, Cục Đăng kiểm Việt Nam, Cảnh sát biển và Biên phòng.",
  alternates: { canonical: "/vu-an-tieu-bieu" },
};

export default function CasesPage() {
  return (
    <>
      <PageHero
        crumbs={[{ label: "Vụ án tiêu biểu" }]}
        eyebrow="Những vụ án đã tham gia"
        title="Mỗi vụ án là một cam kết – Viên Minh luôn đồng hành đến cùng vì lẽ phải"
        lead="Mỗi vụ án là một hành trình của sự tận tâm, trách nhiệm và cam kết bảo vệ quyền lợi chính đáng của khách hàng."
      />
      <section className="py-14 sm:py-16 lg:py-20">
        <div className="container-x flex flex-col divide-y divide-line border-y border-line">
          {CASES.map((c, i) => (
            <Link key={c.slug} href={`/vu-an-tieu-bieu/${c.slug}`} className="group grid gap-6 py-8 md:grid-cols-[400px_1fr] md:gap-10 lg:py-10">
              <span className="relative block aspect-[16/10] overflow-hidden">
                {c.image && <Image src={c.image} alt={c.title} fill sizes="(min-width: 768px) 400px, 100vw" className="zoom-img object-cover" priority={i === 0} />}
              </span>
              <span className="flex flex-col justify-center gap-3">
                <span className="text-[13.5px] font-semibold text-gold-ink">{c.field}</span>
                <b className="text-[22px] leading-snug text-navy group-hover:text-brand sm:text-[26px]">{c.title}</b>
                <span className="text-[15.5px] leading-relaxed text-gray-2">{c.summary}</span>
                <span className="text-sm text-gray"><b className="font-semibold text-navy">Vai trò:</b> {c.role}</span>
                <span className="link-arrow mt-1">Xem chi tiết<Icon name="arrow" size={17} /></span>
              </span>
            </Link>
          ))}
        </div>
      </section>
      <section className="bg-soft py-14 sm:py-16">
        <div className="container-x grid gap-8 lg:grid-cols-[5fr_7fr] lg:gap-16">
          <h2 className="h-section text-navy">Một số vụ việc khác</h2>
          <ul className="flex flex-col gap-4">
            {OTHER_CASES.map((o) => (
              <li key={o} className="flex gap-3 border-b border-line pb-4 text-[16px] leading-relaxed text-[#26313b]"><Icon name="scale" size={20} className="mt-0.5 shrink-0 text-gold-dark" />{o}</li>
            ))}
          </ul>
        </div>
      </section>
      <CtaBand />
    </>
  );
}
