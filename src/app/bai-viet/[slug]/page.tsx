import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ShareBar, Toc } from "@/components/ArticleExtras";
import { Breadcrumbs } from "@/components/blocks";
import { Icon } from "@/components/Icon";
import { JsonLd } from "@/components/JsonLd";
import { CATEGORIES, categoryBySlug } from "@/data/content";
import { LAWYERS } from "@/data/lawyers";
import { serviceBySlug } from "@/data/services";
import { SITE } from "@/data/site";
import { formatDate, getAllArticles, getArticle, getArticleMetas, getRelated } from "@/lib/articles";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getAllArticles().map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const a = getArticle((await params).slug);
  if (!a) return {};
  return {
    title: a.title,
    description: a.summary.slice(0, 160),
    alternates: { canonical: `/bai-viet/${a.slug}` },
    openGraph: { type: "article", publishedTime: a.date, images: a.cover ? [{ url: a.cover }] : undefined },
  };
}

/** Tách ảnh đầu bài để đặt mục lục ngay dưới ảnh */
function splitLead(html: string) {
  const m = html.match(/^\s*(<figure>[\s\S]*?<\/figure>)/);
  return m ? [m[1], html.slice(m[0].length)] : ["", html];
}

export default async function ArticlePage({ params }: Props) {
  const a = getArticle((await params).slug);
  if (!a) notFound();
  const cat = categoryBySlug(a.category);
  const svc = cat ? serviceBySlug(cat.service) : undefined;
  const related = getRelated(a, 4);
  const all = getArticleMetas();
  const author = LAWYERS.find((l) => a.author.includes(l.name));
  const [leadFigure, rest] = splitLead(a.html);

  return (
    <>
      <div className="mx-auto grid w-full max-w-[1480px] gap-10 px-5 py-8 sm:px-8 lg:grid-cols-[230px_minmax(0,1fr)_300px] lg:gap-10 lg:px-10 lg:py-12 xl:grid-cols-[250px_minmax(0,1fr)_320px] xl:gap-14">
        <aside className="order-3 hidden lg:order-1 lg:block">
          <nav aria-label="Kiến thức pháp luật" className="sticky top-24 border border-line p-3">
            <p className="flex items-center gap-2 px-2 pb-2 text-[16px] font-bold text-navy"><Icon name="list" size={19} />Kiến thức pháp luật</p>
            {CATEGORIES.map((c) => {
              const list = all.filter((x) => x.category === c.slug);
              return (
                <details key={c.slug} open={c.slug === a.category} className="group">
                  <summary className="flex cursor-pointer list-none items-center gap-2 px-2 py-2.5 text-[14.5px] font-medium text-navy group-open:bg-[#fcebb8] group-open:font-bold [&::-webkit-details-marker]:hidden">
                    <span className="flex-1">{c.name}</span>
                    <span className="text-xs font-normal text-gray">{list.length}</span>
                    <Icon name="down" size={16} className="text-gray transition-transform group-open:rotate-180" />
                  </summary>
                  <ul className="my-1.5 ml-3 border-l border-[#efd9a0] pl-3">
                    {list.slice(0, 6).map((x) => (
                      <li key={x.slug}><Link href={`/bai-viet/${x.slug}`} className={`block py-1.5 text-[13px] leading-snug ${x.slug === a.slug ? "font-bold text-navy" : "text-gray hover:text-brand"}`}>{x.title}</Link></li>
                    ))}
                    <li><Link href={`/bai-viet/chuyen-muc/${c.slug}`} className="block py-1.5 text-[13px] font-semibold text-brand">Xem tất cả →</Link></li>
                  </ul>
                </details>
              );
            })}
          </nav>
        </aside>

        <article className="order-1 min-w-0 lg:order-2">
          <Breadcrumbs items={[{ label: "Bài viết", href: "/bai-viet" }, ...(cat ? [{ label: cat.name, href: `/bai-viet/chuyen-muc/${cat.slug}` }] : []), { label: a.title }]} />
          {cat && <Link href={`/bai-viet/chuyen-muc/${cat.slug}`} className="mt-5 inline-block rounded-full bg-[#fce8a8] px-3.5 py-1 text-[13px] font-semibold text-[#5c4300]">{cat.name}</Link>}
          <h1 className="mt-3 text-[26px] leading-[1.28] font-extrabold text-navy sm:text-[32px] lg:text-[34px]">{a.title}</h1>
          <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-gray">
            {author ? (
              <Link href={`/luat-su/${author.slug}`} className="flex items-center gap-2 font-medium text-navy hover:text-brand">
                {author.photo && <Image src={author.photo} alt="" width={30} height={30} className="size-[30px] rounded-full object-cover object-top" />}
                {a.author}
              </Link>
            ) : (
              <span className="flex items-center gap-1.5"><Icon name="user" size={16} />{SITE.shortName}</span>
            )}
            <span className="flex items-center gap-1.5"><Icon name="calendar" size={16} />{formatDate(a.date)}</span>
            <span className="flex items-center gap-1.5"><Icon name="clock" size={16} />{a.readingMinutes} phút đọc</span>
          </div>
          {a.summary && (
            <p className="mt-6 border-l-4 border-gold bg-soft px-5 py-4 text-[16.5px] leading-relaxed text-[#34404c] italic sm:text-[17px]">{a.summary}</p>
          )}
          {leadFigure && <div className="prose-law mt-6 [&_figure]:mb-0" dangerouslySetInnerHTML={{ __html: leadFigure }} />}
          <Toc items={a.toc} />
          <div className="prose-law" dangerouslySetInnerHTML={{ __html: rest }} />
          <ShareBar title={a.title} />

          <section className="mt-10 bg-navy p-6 text-white sm:p-8">
            <b className="block text-xl text-gold sm:text-2xl">Bạn cần luật sư tư vấn trường hợp của mình?</b>
            <p className="mt-2 text-[15.5px] leading-relaxed text-mist">Mỗi vụ việc có tình tiết riêng. Gọi hoặc để lại thông tin để luật sư Viên Minh xem hồ sơ và tư vấn hướng xử lý.</p>
            <div className="mt-5 flex flex-wrap gap-3">
              <a href={`tel:${SITE.hotline}`} className="btn-gold"><Icon name="phone" size={17} />Gọi {SITE.hotlineDisplay}</a>
              <Link href="/lien-he#dat-lich" className="btn-ghost-light">Đặt lịch tư vấn</Link>
            </div>
          </section>
        </article>

        <aside className="order-2 flex flex-col gap-8 lg:order-3">
          <div className="hidden border border-[#f4e2b0] bg-cream p-5 lg:block">
            <b className="flex items-start gap-2.5 text-[17px] leading-snug text-navy"><Icon name="scale" size={26} className="shrink-0 text-gold-dark" />Bạn đang gặp vướng mắc{cat ? ` về ${cat.name.toLowerCase()}` : " pháp lý"}?</b>
            <p className="mt-3 text-[14.5px] leading-relaxed text-gray-2">Luật sư Viên Minh sẵn sàng tư vấn, đánh giá hồ sơ và đề xuất hướng giải quyết phù hợp.</p>
            <a href={`tel:${SITE.hotline}`} className="mt-4 flex h-12 items-center justify-center gap-2 bg-gold-dark font-semibold text-white hover:bg-gold-ink"><Icon name="phone" size={17} />Trao đổi với luật sư</a>
          </div>
          <div>
            <p className="mb-1 flex items-center gap-2 text-[17px] font-bold text-navy"><Icon name="doc" size={20} className="text-brand" />Bài viết cùng chủ đề</p>
            <ul className="divide-y divide-line">
              {related.map((r) => (
                <li key={r.slug}>
                  <Link href={`/bai-viet/${r.slug}`} className="group grid grid-cols-[88px_1fr] items-center gap-3 py-3.5">
                    <span className="relative block h-[64px] overflow-hidden bg-soft">{r.cover && <Image src={r.cover} alt="" fill sizes="88px" className="object-cover" />}</span>
                    <span className="flex flex-col gap-1">
                      <b className="line-clamp-3 text-[14px] leading-snug font-semibold text-navy group-hover:text-brand">{r.title}</b>
                      <small className="text-xs text-gray">{formatDate(r.date)}</small>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          {svc && (
            <div className="border-t border-line pt-5">
              <p className="mb-2 text-[17px] font-bold text-navy">Dịch vụ liên quan</p>
              <ul className="flex flex-col gap-2.5">
                {svc.items.slice(0, 3).map((it) => (
                  <li key={it.t} className="flex gap-2.5 text-[14.5px] text-[#26313b]"><Icon name="check" size={18} className="mt-0.5 shrink-0 text-[#2e8b57]" />{it.t}</li>
                ))}
              </ul>
              <Link href={`/dich-vu/${svc.slug}`} className="link-arrow mt-4 text-[15px]">Xem {svc.name.toLowerCase()}<Icon name="arrow" size={16} /></Link>
            </div>
          )}
        </aside>
      </div>

      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Article",
          headline: a.title.slice(0, 110),
          description: a.summary,
          image: a.cover ? [SITE.url + a.cover] : undefined,
          datePublished: a.date,
          dateModified: a.date,
          author: author
            ? { "@type": "Person", name: author.name, url: `${SITE.url}/luat-su/${author.slug}` }
            : { "@type": "Organization", name: SITE.name },
          publisher: { "@id": `${SITE.url}/#organization` },
          mainEntityOfPage: `${SITE.url}/bai-viet/${a.slug}`,
          articleSection: cat?.name,
        }}
      />
    </>
  );
}
