import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { LawyerCard } from "@/components/cards";
import { CtaBand, PageHero, SectionHead } from "@/components/blocks";
import { Icon } from "@/components/Icon";
import { CLIENTS, REASONS, STEPS } from "@/data/content";
import { LAWYERS } from "@/data/lawyers";
import { SERVICES } from "@/data/services";
import { SITE, STATS } from "@/data/site";

export const metadata: Metadata = {
  title: "Giới thiệu Công ty Luật TNHH Viên Minh",
  description:
    "Công ty Luật TNHH Viên Minh – đội ngũ luật sư thuộc Đoàn Luật sư TP. Hồ Chí Minh, nhiều người từng công tác trong ngành kiểm sát, an ninh. Tư vấn, bào chữa và tranh tụng.",
  alternates: { canonical: "/gioi-thieu" },
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        crumbs={[{ label: "Giới thiệu" }]}
        eyebrow="Về chúng tôi"
        title="Luật Viên Minh – đồng hành pháp lý, vững bước thành công"
        lead="Chúng tôi đưa ra lời khuyên đúng đắn để giảm rủi ro pháp lý và bảo vệ quyền lợi khách hàng. Luật sư trực tiếp tư vấn, đồng hành và giám sát từng vụ việc."
      />

      <section className="py-16 sm:py-20 lg:py-24">
        <div className="container-x grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
          <div className="flex flex-col gap-5 text-[16.5px] leading-[1.8] text-[#26313b] sm:text-[17.5px]">
            <h2 className="h-section text-navy">Một công ty luật nhỏ gọn, tập trung vào kết quả</h2>
            <p>
              {SITE.name} là tổ chức hành nghề luật sư thuộc {SITE.bar}, văn phòng tại {SITE.address}. Chúng tôi tư vấn và đại diện cho cá nhân, gia đình và doanh nghiệp trong các vụ việc hình sự, hôn nhân gia đình, nhà đất, dân sự, doanh nghiệp và tranh tụng tại Tòa án.
            </p>
            <p>
              Đội ngũ gồm luật sư hành nghề lâu năm và những người từng công tác trong ngành kiểm sát, an ninh, báo chí pháp luật. Kinh nghiệm đó giúp chúng tôi hiểu cách cơ quan tiến hành tố tụng làm việc và chuẩn bị cho khách hàng từ giai đoạn sớm nhất.
            </p>
            <p>
              Luật sư Viên Minh đã tham gia bào chữa trong các vụ án lớn như vụ Tập đoàn Vạn Thịnh Phát và Ngân hàng SCB, vụ án tại Cục Đăng kiểm Việt Nam, vụ án liên quan đến Bộ Tư lệnh Cảnh sát biển và Bộ đội Biên phòng.
            </p>
            <dl className="mt-4 grid grid-cols-3 gap-6 border-y border-line py-6">
              {STATS.map((s) => (
                <div key={s.label}><dd className="text-[26px] font-bold text-navy sm:text-3xl">{s.value}</dd><dt className="text-sm text-gray">{s.label}</dt></div>
              ))}
            </dl>
          </div>
          <div className="relative min-h-[360px] lg:min-h-0">
            <Image src="/images/site/statue.webp" alt="Tượng nữ thần công lý" fill sizes="(min-width: 1024px) 500px, 100vw" className="object-cover" />
          </div>
        </div>
      </section>

      <section className="bg-navy py-16 text-white sm:py-20">
        <div className="container-x grid gap-10 lg:grid-cols-[5fr_7fr] lg:gap-16">
          <div>
            <p className="eyebrow mb-3 text-gold">Vì sao chọn chúng tôi</p>
            <h2 className="h-section">Lựa chọn đúng luật sư là bước đầu tiên để bảo vệ quyền lợi của bạn</h2>
          </div>
          <ul className="grid gap-x-10 gap-y-6 sm:grid-cols-2">
            {REASONS.map((r) => (
              <li key={r} className="flex gap-3 border-t border-white/15 pt-5 text-[16px] leading-relaxed text-[#e6ecf2]"><Icon name="check" size={20} className="mt-0.5 shrink-0 text-gold" />{r}</li>
            ))}
          </ul>
        </div>
      </section>

      <section id="doi-ngu" className="scroll-mt-24 py-16 sm:py-20 lg:py-24">
        <div className="container-x flex flex-col gap-10">
          <SectionHead eyebrow="Đội ngũ" title="Luật sư thành viên" lead="Bấm vào từng luật sư để xem lĩnh vực phụ trách, kinh nghiệm và thông tin liên hệ." />
          <div className="grid grid-cols-2 gap-x-4 gap-y-9 sm:grid-cols-3 sm:gap-x-6 lg:grid-cols-4">
            {LAWYERS.map((l) => <LawyerCard key={l.slug} lawyer={l} />)}
          </div>
        </div>
      </section>

      <section className="bg-soft py-16 sm:py-20">
        <div className="container-x flex flex-col gap-10">
          <SectionHead eyebrow="Quy trình làm việc" title="Minh bạch và đồng hành" />
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

      <section className="py-16 sm:py-20">
        <div className="container-x grid gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <p className="eyebrow mb-3 text-gold-ink">Lĩnh vực</p>
            <h2 className="h-section text-navy">Chúng tôi hỗ trợ những gì</h2>
          </div>
          <ul className="border-t border-line">
            {SERVICES.map((s) => (
              <li key={s.slug} className="border-b border-line">
                <Link href={`/dich-vu/${s.slug}`} className="group flex items-center justify-between gap-4 py-4">
                  <span><b className="block text-[17px] text-navy group-hover:text-brand">{s.name}</b><span className="text-[15px] text-gray">{s.short}</span></span>
                  <Icon name="chevron" size={20} className="shrink-0 text-brand" />
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="container-x mt-14 flex flex-wrap items-center justify-between gap-8 border-t border-line pt-10">
          <span className="text-sm font-semibold tracking-[0.12em] text-gray">KHÁCH HÀNG TIN CHỌN</span>
          {CLIENTS.map((c) => (
            <span key={c.name} className="relative h-10 w-[130px]"><Image src={c.logo} alt={c.name} fill sizes="130px" className="object-contain grayscale" /></span>
          ))}
        </div>
      </section>

      <CtaBand />
    </>
  );
}
