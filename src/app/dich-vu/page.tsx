import type { Metadata } from "next";
import { ServiceTile } from "@/components/cards";
import { CtaBand, PageHero, SectionHead } from "@/components/blocks";
import { STEPS } from "@/data/content";
import { SERVICES } from "@/data/services";

export const metadata: Metadata = {
  title: "Dịch vụ luật sư",
  description:
    "Dịch vụ luật sư hình sự, hôn nhân gia đình, nhà đất, doanh nghiệp, dân sự và tranh tụng của Công ty Luật TNHH Viên Minh tại TP. Hồ Chí Minh.",
  alternates: { canonical: "/dich-vu" },
};

export default function ServicesPage() {
  return (
    <>
      <PageHero
        crumbs={[{ label: "Dịch vụ" }]}
        eyebrow="Dịch vụ của chúng tôi"
        title="Tận tâm trong từng giải pháp"
        lead="Chúng tôi hiểu những khó khăn mà cá nhân và doanh nghiệp gặp phải khi vướng vào vấn đề pháp lý. Mỗi lĩnh vực có luật sư phụ trách riêng, theo sát từ buổi tư vấn đầu tiên."
      />
      <section className="py-16 sm:py-20 lg:py-24">
        <div className="container-x flex flex-col gap-10">
          <SectionHead eyebrow="Lĩnh vực" title="Những dịch vụ chúng tôi cung cấp" />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {SERVICES.map((s, i) => <ServiceTile key={s.slug} s={s} priority={i < 3} />)}
          </div>
        </div>
      </section>
      <section className="bg-soft py-16 sm:py-20">
        <div className="container-x flex flex-col gap-10">
          <SectionHead eyebrow="Cách chúng tôi làm việc" title="4 bước rõ ràng cho mọi vụ việc" />
          <ol className="grid gap-x-8 gap-y-9 sm:grid-cols-2 lg:grid-cols-4">
            {STEPS.map((s, i) => (
              <li key={s.t} className="flex flex-col gap-2 border-t-2 border-gold pt-5">
                <span className="text-[15px] font-bold text-gold-ink">Bước {i + 1}</span>
                <b className="text-xl text-navy">{s.t}</b>
                <span className="text-[15px] leading-relaxed text-gray-2">{s.d}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>
      <CtaBand />
    </>
  );
}
