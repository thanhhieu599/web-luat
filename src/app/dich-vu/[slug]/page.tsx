import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArticleRow, LawyerPhoto } from "@/components/cards";
import { ContactForm } from "@/components/ContactForm";
import { Breadcrumbs, CtaBand, Faq } from "@/components/blocks";
import { Icon } from "@/components/Icon";
import { JsonLd } from "@/components/JsonLd";
import { lawyerBySlug } from "@/data/lawyers";
import { SERVICES, serviceBySlug } from "@/data/services";
import { SITE } from "@/data/site";
import { getByCategory } from "@/lib/articles";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return SERVICES.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const s = serviceBySlug((await params).slug);
  if (!s) return {};
  return {
    title: `${s.name} tại TP.HCM`,
    description: s.intro.slice(0, 160),
    alternates: { canonical: `/dich-vu/${s.slug}` },
    openGraph: { images: [{ url: s.image }] },
  };
}

export default async function ServicePage({ params }: Props) {
  const s = serviceBySlug((await params).slug);
  if (!s) notFound();
  const lawyers = s.lawyers.map(lawyerBySlug).filter(Boolean);
  const articles = getByCategory(s.articleCategory).slice(0, 4);
  const others = SERVICES.filter((x) => x.slug !== s.slug);

  return (
    <>
      <section className="bg-navy text-white">
        <div className="container-x grid items-center gap-10 py-10 sm:py-14 lg:grid-cols-2 lg:gap-14 lg:py-16">
          <div className="flex flex-col gap-5">
            <Breadcrumbs items={[{ label: "Dịch vụ", href: "/dich-vu" }, { label: s.name }]} light />
            <h1 className="text-[32px] leading-[1.15] font-extrabold sm:text-[44px] lg:text-5xl">{s.headline}</h1>
            <p className="text-base leading-relaxed text-mist sm:text-lg">{s.intro}</p>
            <div className="flex flex-wrap gap-3">
              <a href="#dat-lich" className="btn-gold">Đặt lịch tư vấn</a>
              <a href={`tel:${SITE.hotline}`} className="btn-ghost-light"><Icon name="phone" size={17} />{SITE.hotlineDisplay}</a>
            </div>
          </div>
          <div className="relative aspect-[16/11] lg:aspect-[5/4]">
            <Image src={s.image} alt={s.name} fill priority sizes="(min-width: 1024px) 560px, 100vw" className="object-cover" />
          </div>
        </div>
      </section>

      <section className="py-14 sm:py-16 lg:py-20">
        <div className="container-x grid gap-12 lg:grid-cols-[minmax(0,1fr)_360px] lg:gap-16">
          <article className="flex min-w-0 flex-col gap-12">
            <div>
              <h2 className="mb-5 text-2xl font-bold text-navy sm:text-[26px]">Khi nào bạn cần luật sư</h2>
              <div className="grid gap-6 sm:grid-cols-3">
                {s.when.map((w) => (
                  <div key={w.t} className="border-t-2 border-gold pt-4">
                    <b className="block text-[17px] text-navy">{w.t}</b>
                    <p className="mt-2 text-[15px] leading-relaxed text-gray-2">{w.d}</p>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h2 className="mb-3 text-2xl font-bold text-navy sm:text-[26px]">Chúng tôi hỗ trợ những việc gì</h2>
              <ul className="border-t border-line">
                {s.items.map((it) => (
                  <li key={it.t} className="grid grid-cols-[28px_1fr] gap-3 border-b border-line py-4">
                    <Icon name="check" size={20} className="mt-0.5 text-gold-dark" />
                    <div><b className="block text-[17px] text-navy">{it.t}</b><span className="text-[15.5px] leading-relaxed text-gray-2">{it.d}</span></div>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="mb-4 text-2xl font-bold text-navy sm:text-[26px]">Chi phí</h2>
              {s.fees && (
                <dl className="mb-4 grid gap-5 border-y border-line py-5 sm:grid-cols-3">
                  {s.fees.map((f) => (
                    <div key={f.label}><dt className="text-sm text-gray">{f.label}</dt><dd className="mt-1 text-xl font-bold text-navy">{f.value}</dd></div>
                  ))}
                </dl>
              )}
              <p className="text-[15.5px] leading-relaxed text-gray-2">{s.feeNote}</p>
            </div>

            {lawyers.length > 0 && (
              <div>
                <h2 className="mb-5 text-2xl font-bold text-navy sm:text-[26px]">Luật sư phụ trách</h2>
                <div className="grid gap-6 sm:grid-cols-2">
                  {lawyers.map((l) => (
                    <Link key={l!.slug} href={`/luat-su/${l!.slug}`} className="group flex items-center gap-4">
                      <span className="relative block h-[104px] w-[88px] shrink-0 overflow-hidden bg-[#e9eef4]"><LawyerPhoto lawyer={l!} sizes="88px" /></span>
                      <span className="flex flex-col gap-1">
                        <small className="text-xs uppercase tracking-[0.08em] text-gray">{l!.title}</small>
                        <b className="text-[17px] text-brand group-hover:text-navy">{l!.name}</b>
                        <span className="line-clamp-2 text-sm text-gray-2">{l!.summary}</span>
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            <div>
              <h2 className="mb-1 text-2xl font-bold text-navy sm:text-[26px]">Câu hỏi thường gặp</h2>
              <Faq items={s.faqs} />
            </div>

            {articles.length > 0 && (
              <div>
                <div className="mb-1 flex items-end justify-between gap-4">
                  <h2 className="text-2xl font-bold text-navy sm:text-[26px]">Bài viết liên quan</h2>
                  <Link href={`/bai-viet/chuyen-muc/${s.articleCategory}`} className="link-arrow shrink-0 text-[15px]">Xem thêm<Icon name="arrow" size={16} /></Link>
                </div>
                <div className="divide-y divide-line border-t border-line">{articles.map((a) => <ArticleRow key={a.slug} a={a} />)}</div>
              </div>
            )}
          </article>

          <aside className="lg:sticky lg:top-24 lg:self-start">
            <div className="bg-soft p-1">
              <ContactForm id="dat-lich" title={`Tư vấn ${s.name.replace("Luật sư ", "")}`} defaultService={s.name} compact />
            </div>
            <p className="mt-4 text-sm text-gray-2">Hoặc gọi <a href={`tel:${SITE.hotline}`} className="font-bold text-navy">{SITE.hotlineDisplay}</a> · {SITE.hours}</p>
            <nav aria-label="Dịch vụ khác" className="mt-8 hidden lg:block">
              <p className="mb-2 text-sm font-bold uppercase tracking-[0.08em] text-gray">Dịch vụ khác</p>
              <ul className="border-t border-line">
                {others.map((o) => (
                  <li key={o.slug} className="border-b border-line"><Link href={`/dich-vu/${o.slug}`} className="flex items-center justify-between py-3 text-[15px] font-medium text-navy hover:text-brand">{o.name}<Icon name="chevron" size={16} /></Link></li>
                ))}
              </ul>
            </nav>
          </aside>
        </div>
      </section>

      <CtaBand />
      <JsonLd
        data={[
          {
            "@context": "https://schema.org",
            "@type": "Service",
            name: s.name,
            description: s.intro,
            provider: { "@id": `${SITE.url}/#organization` },
            areaServed: "TP. Hồ Chí Minh",
            url: `${SITE.url}/dich-vu/${s.slug}`,
          },
          {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: s.faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
          },
        ]}
      />
    </>
  );
}
