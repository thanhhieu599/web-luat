import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { LawyerPhoto } from "@/components/cards";
import { CtaBand, PageHero } from "@/components/blocks";
import { Icon } from "@/components/Icon";
import { CASES, caseBySlug } from "@/data/cases";
import { lawyerBySlug } from "@/data/lawyers";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return CASES.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const c = caseBySlug((await params).slug);
  if (!c) return {};
  return { title: c.title, description: c.summary, alternates: { canonical: `/vu-an-tieu-bieu/${c.slug}` } };
}

export default async function CasePage({ params }: Props) {
  const c = caseBySlug((await params).slug);
  if (!c) notFound();
  const lawyers = c.lawyers.map(lawyerBySlug).filter(Boolean);
  const others = CASES.filter((x) => x.slug !== c.slug);
  return (
    <>
      <PageHero crumbs={[{ label: "Vụ án tiêu biểu", href: "/vu-an-tieu-bieu" }, { label: c.title }]} eyebrow={c.field} title={c.title} lead={c.summary} />
      <section className="py-14 sm:py-16 lg:py-20">
        <div className="container-x grid gap-12 lg:grid-cols-[minmax(0,1fr)_340px] lg:gap-16">
          <article className="flex min-w-0 flex-col gap-6">
            {c.image && <div className="relative aspect-[16/9]"><Image src={c.image} alt={c.title} fill priority sizes="(min-width: 1024px) 760px, 100vw" className="object-cover" /></div>}
            <dl className="grid gap-5 border-y border-line py-5 sm:grid-cols-2">
              <div><dt className="text-sm text-gray">Tội danh</dt><dd className="mt-1 text-[16px] leading-relaxed font-semibold text-navy">{c.charges}</dd></div>
              <div><dt className="text-sm text-gray">Vai trò của Luật Viên Minh</dt><dd className="mt-1 text-[16px] font-semibold text-navy">{c.role}</dd></div>
            </dl>
            {c.body.map((p, i) => <p key={i} className="text-[17px] leading-[1.8] text-[#26313b]">{p}</p>)}
            <p className="text-sm text-gray">Thông tin vụ án được trình bày ở mức đã công khai tại phiên tòa, không bao gồm nội dung bí mật của khách hàng.</p>
          </article>
          <aside className="flex flex-col gap-8">
            {lawyers.map((l) => (
              <Link key={l!.slug} href={`/luat-su/${l!.slug}`} className="group flex items-center gap-4">
                <span className="relative block h-[104px] w-[88px] shrink-0 overflow-hidden bg-[#e9eef4]"><LawyerPhoto lawyer={l!} sizes="88px" /></span>
                <span><small className="text-xs uppercase tracking-[0.08em] text-gray">Luật sư tham gia</small><b className="block text-[17px] text-brand group-hover:text-navy">{l!.name}</b></span>
              </Link>
            ))}
            <div>
              <p className="mb-2 text-sm font-bold uppercase tracking-[0.08em] text-gray">Vụ án khác</p>
              <ul className="border-t border-line">
                {others.map((o) => (
                  <li key={o.slug} className="border-b border-line"><Link href={`/vu-an-tieu-bieu/${o.slug}`} className="flex items-start justify-between gap-3 py-3.5 text-[15.5px] font-medium text-navy hover:text-brand">{o.title}<Icon name="chevron" size={16} className="mt-1 shrink-0" /></Link></li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </section>
      <CtaBand />
    </>
  );
}
