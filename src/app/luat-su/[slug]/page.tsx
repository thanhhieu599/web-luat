import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArticleRow, LawyerCard, LawyerPhoto } from "@/components/cards";
import { Breadcrumbs, CtaBand } from "@/components/blocks";
import { Icon } from "@/components/Icon";
import { JsonLd } from "@/components/JsonLd";
import { CASES } from "@/data/cases";
import { LAWYERS, lawyerBySlug } from "@/data/lawyers";
import { serviceBySlug } from "@/data/services";
import { SITE } from "@/data/site";
import { getArticleMetas } from "@/lib/articles";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return LAWYERS.map((l) => ({ slug: l.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const l = lawyerBySlug((await params).slug);
  if (!l) return {};
  return {
    title: `${l.title} ${l.name} – ${l.position}`,
    description: l.summary,
    alternates: { canonical: `/luat-su/${l.slug}` },
    openGraph: l.photo ? { images: [{ url: l.photo }] } : undefined,
  };
}

export default async function LawyerPage({ params }: Props) {
  const l = lawyerBySlug((await params).slug);
  if (!l) notFound();
  const others = LAWYERS.filter((x) => x.slug !== l.slug).slice(0, 4);
  const cases = CASES.filter((c) => l.cases?.includes(c.slug));
  const written = getArticleMetas().filter((a) => a.author.includes(l.name)).slice(0, 4);
  const phoneDisplay = l.phone.replace(/(\d{4})(\d{3})(\d+)/, "$1 $2 $3");

  return (
    <>
      <section className="py-10 sm:py-14 lg:py-16">
        <div className="container-x grid gap-10 md:grid-cols-[minmax(260px,400px)_1fr] lg:gap-16">
          <div className="relative aspect-[4/5] overflow-hidden bg-[#e9eef4]">
            <LawyerPhoto lawyer={l} sizes="(min-width: 768px) 400px, 100vw" />
          </div>
          <div className="flex min-w-0 flex-col gap-5 md:pt-2">
            <Breadcrumbs items={[{ label: "Giới thiệu", href: "/gioi-thieu" }, { label: "Đội ngũ", href: "/gioi-thieu#doi-ngu" }, { label: l.name }]} />
            <div>
              <p className="eyebrow text-gold-ink">{l.title} · {l.position}</p>
              <h1 className="mt-2 text-[34px] leading-tight font-extrabold text-navy sm:text-5xl">{l.name}</h1>
            </div>
            <p className="max-w-[640px] text-[16.5px] leading-relaxed text-[#26313b] sm:text-lg">{l.summary}</p>
            <ul className="flex flex-wrap gap-2.5">
              {l.areas.map((a) => <li key={a} className="border border-[#dce5f0] px-3.5 py-1.5 text-[14.5px] font-medium text-navy">{a}</li>)}
            </ul>
            <dl className="grid gap-5 border-y border-line py-5 sm:grid-cols-3">
              <div><dt className="text-[13px] text-gray">Điện thoại</dt><dd className="mt-1 font-semibold text-navy"><a href={`tel:${l.phone}`}>{phoneDisplay}</a></dd></div>
              <div className="min-w-0"><dt className="text-[13px] text-gray">Email</dt><dd className="mt-1 font-semibold break-words text-navy"><a href={`mailto:${l.email}`}>{l.email}</a></dd></div>
              <div><dt className="text-[13px] text-gray">Thành viên</dt><dd className="mt-1 font-semibold text-navy">{SITE.bar}</dd></div>
            </dl>
            <div className="flex flex-wrap gap-3">
              <Link href="/lien-he#dat-lich" className="btn-gold">Đặt lịch với luật sư {l.name.split(" ").pop()}</Link>
              <a href={`tel:${l.phone}`} className="btn-ghost"><Icon name="phone" size={17} />Gọi {phoneDisplay}</a>
            </div>
          </div>
        </div>
      </section>

      <section className="pb-16 sm:pb-20">
        <div className="container-x grid gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="flex flex-col gap-4">
            <h2 className="text-2xl font-bold text-navy">Giới thiệu</h2>
            {l.bio.map((p, i) => <p key={i} className="text-[16.5px] leading-[1.8] text-[#26313b]">{p}</p>)}
            {l.work && (
              <>
                <h3 className="mt-4 text-xl font-bold text-navy">Công việc luật sư đảm nhận</h3>
                <ul className="flex flex-col gap-3">
                  {l.work.map((w) => <li key={w} className="flex gap-3 text-[15.5px] leading-relaxed text-[#26313b]"><Icon name="check" size={19} className="mt-1 shrink-0 text-gold-dark" />{w}</li>)}
                </ul>
              </>
            )}
          </div>
          <div className="flex flex-col gap-10">
            <div>
              <h2 className="mb-2 text-2xl font-bold text-navy">Lĩnh vực phụ trách</h2>
              <ul className="border-t border-line">
                {l.services.map((s) => serviceBySlug(s)).filter(Boolean).map((s) => (
                  <li key={s!.slug} className="border-b border-line">
                    <Link href={`/dich-vu/${s!.slug}`} className="flex items-center justify-between py-4 font-semibold text-navy hover:text-brand">{s!.name}<Icon name="chevron" size={18} /></Link>
                  </li>
                ))}
              </ul>
            </div>
            {cases.length > 0 && (
              <div>
                <h2 className="mb-2 text-2xl font-bold text-navy">Vụ án đã tham gia</h2>
                <ul className="border-t border-line">
                  {cases.map((c) => (
                    <li key={c.slug} className="border-b border-line">
                      <Link href={`/vu-an-tieu-bieu/${c.slug}`} className="flex items-center justify-between gap-4 py-4">
                        <span><b className="block text-[16.5px] text-navy">{c.title}</b><small className="text-sm text-gray">{c.role} · {c.field}</small></span>
                        <Icon name="chevron" size={18} className="shrink-0 text-brand" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </section>

      {written.length > 0 && (
        <section className="pb-16 sm:pb-20">
          <div className="container-x">
            <h2 className="mb-2 text-2xl font-bold text-navy">Bài viết của luật sư {l.name}</h2>
            <div className="divide-y divide-line border-t border-line">{written.map((a) => <ArticleRow key={a.slug} a={a} />)}</div>
          </div>
        </section>
      )}

      <section className="bg-soft py-16 sm:py-20">
        <div className="container-x flex flex-col gap-8">
          <h2 className="text-2xl font-bold text-navy sm:text-[28px]">Luật sư khác</h2>
          <div className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-4 sm:gap-6">{others.map((o) => <LawyerCard key={o.slug} lawyer={o} />)}</div>
        </div>
      </section>

      <CtaBand />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Person",
          name: l.name,
          jobTitle: `${l.title}, ${l.position}`,
          telephone: l.phone,
          email: l.email,
          image: l.photo ? SITE.url + l.photo : undefined,
          worksFor: { "@id": `${SITE.url}/#organization` },
          knowsAbout: l.areas,
          url: `${SITE.url}/luat-su/${l.slug}`,
        }}
      />
    </>
  );
}
