import Image from "next/image";
import Link from "next/link";
import { ArticleCard, LawyerCard, ServiceTile } from "@/components/cards";
import { ContactForm } from "@/components/ContactForm";
import { Faq, SectionHead } from "@/components/blocks";
import { Icon } from "@/components/Icon";
import { JsonLd } from "@/components/JsonLd";
import { CASES } from "@/data/cases";
import { CLIENTS, FAQS, REASONS, STEPS, TESTIMONIALS } from "@/data/content";
import { LAWYERS } from "@/data/lawyers";
import { SERVICES } from "@/data/services";
import { SITE, STATS } from "@/data/site";
import { getArticleMetas } from "@/lib/articles";

export default function Home() {
  const news = getArticleMetas().slice(0, 3);
  const team = LAWYERS.filter((l) => l.photo).slice(0, 5);
  const featured = SERVICES.slice(0, 4);
  const t = TESTIMONIALS[0];

  return (
    <>
      <section className="overflow-hidden bg-navy text-white">
        <div className="container-x grid items-end gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-14">
          <div className="flex flex-col gap-6 pt-12 pb-4 sm:pt-16 lg:pt-24 lg:pb-24">
            <p className="eyebrow text-gold">{SITE.name}</p>
            <h1 className="text-[36px] leading-[1.12] font-extrabold sm:text-5xl lg:text-[60px]">{SITE.tagline}</h1>
            <p className="max-w-[540px] text-base leading-relaxed text-mist sm:text-lg">
              Luật sư trực tiếp tư vấn, tham gia tố tụng và theo sát vụ việc của bạn trong các lĩnh vực hình sự, nhà đất, hôn nhân gia đình, dân sự và doanh nghiệp.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link href="/lien-he#dat-lich" className="btn-gold">Đặt lịch tư vấn</Link>
              <a href={`tel:${SITE.hotline}`} className="btn-ghost-light"><Icon name="phone" size={17} />Gọi {SITE.hotlineDisplay}</a>
            </div>
            <dl className="mt-3 grid max-w-[520px] grid-cols-3 gap-6 border-t border-white/15 pt-6">
              {STATS.map((s) => (
                <div key={s.label}>
                  <dt className="sr-only">{s.label}</dt>
                  <dd className="text-[26px] font-bold text-gold sm:text-3xl">{s.value}</dd>
                  <dd className="text-[13px] text-mist sm:text-sm">{s.label}</dd>
                </div>
              ))}
            </dl>
          </div>
          <div className="relative -mx-5 sm:mx-0">
            <div className="relative h-[340px] sm:h-[460px] lg:h-[580px]">
              <Image src="/images/luat-su/pham-duc-huy.webp" alt="Thạc sĩ – Luật sư Phạm Đức Huy, Giám đốc Công ty Luật TNHH Viên Minh" fill priority sizes="(min-width: 1024px) 520px, 100vw" className="object-cover object-[50%_18%]" />
            </div>
            <div className="absolute bottom-0 left-0 bg-white px-5 py-4 text-navy sm:px-6">
              <span className="block text-[11.5px] tracking-[0.1em] text-gray">THẠC SĨ – LUẬT SƯ · GIÁM ĐỐC</span>
              <b className="text-[17px] sm:text-lg">PHẠM ĐỨC HUY</b>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-white/10 bg-navy py-16 text-white sm:py-20 lg:py-24">
        <div className="container-x flex flex-col gap-10 lg:gap-12">
          <div className="grid gap-6 lg:grid-cols-2 lg:items-end lg:gap-14">
            <div>
              <p className="eyebrow mb-3 text-white">Về chúng tôi</p>
              <h2 className="h-section text-gold">Lời khuyên đúng đắn để giảm rủi ro pháp lý, bảo vệ quyền lợi khách hàng</h2>
            </div>
            <p className="text-base leading-relaxed text-mist sm:text-[17px]">
              Đội ngũ luật sư trực tiếp tư vấn, đồng hành và giám sát vụ việc để đạt hiệu quả cao. Mỗi hồ sơ có một luật sư phụ trách từ buổi tư vấn đầu tiên đến khi kết thúc.
            </p>
          </div>
          <div className="-mx-5 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-2 sm:mx-0 sm:grid sm:grid-cols-2 sm:overflow-visible sm:px-0 lg:grid-cols-4 lg:gap-5">
            {featured.map((s, i) => (
              <div key={s.slug} className="w-[78vw] shrink-0 snap-start sm:w-auto"><ServiceTile s={s} priority={i < 2} /></div>
            ))}
          </div>
          <Link href="/dich-vu" className="inline-flex items-center gap-2 self-start font-semibold text-gold hover:text-white">
            Tất cả {SERVICES.length} lĩnh vực dịch vụ<Icon name="arrow" size={18} />
          </Link>
        </div>
      </section>

      <section className="py-16 sm:py-20 lg:py-24">
        <div className="container-x flex flex-col gap-10">
          <SectionHead
            eyebrow="Đội ngũ"
            title="Luật sư thành viên"
            lead="Mỗi vụ việc được tiếp nhận và xử lý theo quy trình rõ ràng, đặt quyền lợi của khách hàng làm trọng tâm."
            action={<Link href="/gioi-thieu#doi-ngu" className="link-arrow shrink-0">Xem toàn bộ đội ngũ<Icon name="arrow" size={18} /></Link>}
          />
          <div className="-mx-5 flex snap-x gap-4 overflow-x-auto px-5 pb-2 sm:mx-0 sm:grid sm:grid-cols-3 sm:overflow-visible sm:px-0 lg:grid-cols-5 lg:gap-5">
            {team.map((l) => (
              <div key={l.slug} className="w-[42vw] shrink-0 snap-start sm:w-auto"><LawyerCard lawyer={l} /></div>
            ))}
          </div>
        </div>
      </section>

      <section aria-label="Khách hàng" className="pb-16 sm:pb-20">
        <div className="container-x flex flex-col items-center gap-8 border-t border-line pt-10 md:flex-row md:justify-between">
          <span className="text-sm font-semibold tracking-[0.12em] text-gray">KHÁCH HÀNG TIN CHỌN</span>
          <ul className="grid grid-cols-2 items-center gap-x-10 gap-y-6 sm:flex sm:gap-14">
            {CLIENTS.map((c) => (
              <li key={c.name} className="relative h-10 w-[130px]"><Image src={c.logo} alt={c.name} fill sizes="130px" className="object-contain grayscale transition hover:grayscale-0" /></li>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-soft py-16 sm:py-20 lg:py-24">
        <div className="container-x flex flex-col gap-10">
          <SectionHead
            eyebrow="Vụ án tiêu biểu"
            title="Mỗi vụ án là một cam kết đồng hành đến cùng"
            lead="Luật sư Viên Minh đã tham gia bào chữa trong nhiều vụ án lớn được dư luận quan tâm."
            action={<Link href="/vu-an-tieu-bieu" className="link-arrow shrink-0">Tất cả vụ án<Icon name="arrow" size={18} /></Link>}
          />
          <div className="grid gap-10 md:grid-cols-3 md:gap-8">
            {CASES.map((c) => (
              <Link key={c.slug} href={`/vu-an-tieu-bieu/${c.slug}`} className="group flex flex-col gap-3.5">
                <span className="relative block aspect-[16/10] overflow-hidden">
                  {c.image && <Image src={c.image} alt={c.title} fill sizes="(min-width: 768px) 380px, 100vw" className="zoom-img object-cover" />}
                </span>
                <span className="text-[13px] text-gray">{c.field}</span>
                <b className="text-xl leading-snug text-navy group-hover:text-brand">{c.title}</b>
                <span className="text-[15px] leading-relaxed text-gray-2">{c.summary}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20 lg:py-24">
        <div className="container-x grid gap-12 lg:grid-cols-[5fr_7fr] lg:gap-16">
          <div className="flex flex-col gap-6">
            <div>
              <p className="eyebrow mb-3 text-gold-ink">Quy trình làm việc</p>
              <h2 className="h-section text-navy">Minh bạch và đồng hành</h2>
            </div>
            <p className="text-base leading-relaxed text-gray-2 sm:text-[17px]">Lựa chọn đúng luật sư là bước đầu tiên để bảo vệ quyền lợi của bạn. Chúng tôi không chỉ tư vấn pháp lý mà còn là người đồng hành đáng tin cậy.</p>
            <ul className="flex flex-col gap-3">
              {REASONS.map((r) => (
                <li key={r} className="flex gap-3 text-[15.5px] leading-relaxed text-[#26313b]"><Icon name="check" size={20} className="mt-0.5 shrink-0 text-gold-dark" />{r}</li>
              ))}
            </ul>
          </div>
          <ol className="grid content-start gap-x-12 gap-y-9 sm:grid-cols-2">
            {STEPS.map((s, i) => (
              <li key={s.t} className="flex flex-col gap-2 border-t-2 border-gold pt-5">
                <span className="text-[15px] font-bold text-gold-ink">Bước {i + 1}</span>
                <b className="text-[21px] text-navy">{s.t}</b>
                <span className="text-[15px] leading-relaxed text-gray-2">{s.d}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="bg-navy py-16 text-white sm:py-20">
        <div className="container-x grid gap-8 lg:grid-cols-[1fr_2fr] lg:items-center lg:gap-16">
          <div>
            <p className="eyebrow mb-3 text-gold">Khách hàng nói về chúng tôi</p>
            <h2 className="text-[26px] leading-tight font-bold sm:text-[32px]">Minh chứng từ những người đã đồng hành</h2>
          </div>
          <figure className="flex flex-col gap-5">
            <blockquote className="text-lg leading-relaxed text-[#e6ecf2] sm:text-[22px]">“{t.quote}”</blockquote>
            <figcaption className="text-[15px] text-mist"><b className="text-white">{t.name}</b> · {t.matter}</figcaption>
          </figure>
        </div>
      </section>

      <section className="py-16 sm:py-20 lg:py-24">
        <div className="container-x flex flex-col gap-10">
          <SectionHead eyebrow="Bài viết" title="Kiến thức pháp luật mới cập nhật" action={<Link href="/bai-viet" className="link-arrow shrink-0">Tất cả bài viết<Icon name="arrow" size={18} /></Link>} />
          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
            {news.map((a) => <ArticleCard key={a.slug} a={a} />)}
          </div>
        </div>
      </section>

      <section className="bg-soft py-16 sm:py-20 lg:py-24">
        <div className="container-x grid gap-10 lg:grid-cols-[5fr_7fr] lg:gap-16">
          <div className="flex flex-col gap-6">
            <div>
              <p className="eyebrow mb-3 text-gold-ink">Câu hỏi thường gặp</p>
              <h2 className="h-section text-navy">Giải đáp những băn khoăn pháp lý của bạn</h2>
            </div>
            <div className="relative hidden aspect-[4/3] lg:block"><Image src="/images/site/faq.webp" alt="" fill sizes="460px" className="object-cover" /></div>
          </div>
          <Faq items={FAQS} />
        </div>
      </section>

      <section className="relative overflow-hidden bg-navy text-white" id="lien-he">
        <Image src="/images/site/cta.webp" alt="" fill sizes="100vw" className="object-cover opacity-25" />
        <div className="container-x relative grid gap-10 py-16 sm:py-20 lg:grid-cols-2 lg:gap-16 lg:py-24">
          <div className="flex flex-col gap-5">
            <h2 className="h-section">Bắt đầu với buổi tư vấn để tìm hướng giải quyết phù hợp</h2>
            <p className="text-base leading-relaxed text-[#d6dee7] sm:text-[17px]">Để lại thông tin, luật sư sẽ gọi lại trong giờ làm việc. Thông tin của bạn được bảo mật theo quy định nghề luật sư.</p>
            <ul className="flex flex-col gap-3 text-[15.5px] text-[#e6ecf2]">
              <li className="flex gap-3"><Icon name="phone" size={18} className="mt-0.5 text-gold" />Hotline: <b>{SITE.hotlineDisplay} · {SITE.phone2Display}</b></li>
              <li className="flex gap-3"><Icon name="clock" size={19} className="mt-0.5 text-gold" />{SITE.hours}</li>
              <li className="flex gap-3"><Icon name="pin" size={19} className="mt-0.5 text-gold" />{SITE.address}</li>
            </ul>
          </div>
          <ContactForm />
        </div>
      </section>

      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: FAQS.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
        }}
      />
    </>
  );
}
