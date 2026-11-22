import Image from "next/image";
import Link from "next/link";
import { SITE } from "@/data/site";
import { Icon } from "./Icon";
import { JsonLd } from "./JsonLd";

export type Crumb = { label: string; href?: string };

export function Breadcrumbs({ items, light = false }: { items: Crumb[]; light?: boolean }) {
  const all: Crumb[] = [{ label: "Trang chủ", href: "/" }, ...items];
  return (
    <>
      <nav aria-label="Breadcrumb" className={`flex flex-wrap items-center gap-x-2 gap-y-1 text-[13.5px] ${light ? "text-mist" : "text-gray"}`}>
        {all.map((c, i) => (
          <span key={i} className="flex items-center gap-2">
            {i > 0 && <span aria-hidden="true" className="opacity-60">›</span>}
            {c.href && i < all.length - 1 ? (
              <Link href={c.href} className={`hover:underline ${light ? "hover:text-white" : "hover:text-brand"}`}>{c.label}</Link>
            ) : (
              <span className={`line-clamp-1 ${light ? "text-white" : "text-navy"}`} aria-current="page">{c.label}</span>
            )}
          </span>
        ))}
      </nav>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: all.map((c, i) => ({
            "@type": "ListItem",
            position: i + 1,
            name: c.label,
            ...(c.href ? { item: SITE.url + c.href } : {}),
          })),
        }}
      />
    </>
  );
}

/** Đầu trang con: nền xanh than, breadcrumb, tiêu đề, mô tả */
export function PageHero({
  crumbs,
  eyebrow,
  title,
  lead,
  children,
}: {
  crumbs: Crumb[];
  eyebrow?: string;
  title: string;
  lead?: string;
  children?: React.ReactNode;
}) {
  return (
    <section className="bg-navy text-white">
      <div className="container-x flex flex-col gap-4 py-12 sm:py-16 lg:py-20">
        <Breadcrumbs items={crumbs} light />
        {eyebrow && <p className="eyebrow mt-2 text-gold">{eyebrow}</p>}
        <h1 className="max-w-[860px] text-[32px] leading-[1.15] font-extrabold sm:text-[44px] lg:text-5xl">{title}</h1>
        {lead && <p className="max-w-[720px] text-base leading-relaxed text-mist sm:text-lg">{lead}</p>}
        {children}
      </div>
    </section>
  );
}

export function SectionHead({
  eyebrow,
  title,
  lead,
  light = false,
  action,
}: {
  eyebrow: string;
  title: string;
  lead?: string;
  light?: boolean;
  action?: React.ReactNode;
}) {
  return (
    <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
      <div className="max-w-[720px]">
        <p className={`eyebrow mb-3 ${light ? "text-gold" : "text-gold-ink"}`}>{eyebrow}</p>
        <h2 className={`h-section ${light ? "text-white" : "text-navy"}`}>{title}</h2>
        {lead && <p className={`mt-4 text-base leading-relaxed sm:text-[17px] ${light ? "text-mist" : "text-gray"}`}>{lead}</p>}
      </div>
      {action}
    </div>
  );
}

export function Faq({ items, className = "" }: { items: { q: string; a: string }[]; className?: string }) {
  return (
    <div className={`border-t border-line ${className}`}>
      {items.map((f, i) => (
        <details key={i} className="group border-b border-line" open={i === 0}>
          <summary className="flex cursor-pointer list-none items-start justify-between gap-6 py-5 [&::-webkit-details-marker]:hidden">
            <span className="text-[16.5px] font-semibold leading-snug text-navy sm:text-lg">{f.q}</span>
            <Icon name="down" size={22} className="mt-0.5 shrink-0 text-brand transition-transform group-open:rotate-180" />
          </summary>
          <p className="-mt-1 pb-5 pr-8 text-[15.5px] leading-relaxed text-gray-2 sm:text-base">{f.a}</p>
        </details>
      ))}
    </div>
  );
}

export function CtaBand() {
  return (
    <section className="relative overflow-hidden bg-navy text-white">
      <Image src="/images/site/cta.webp" alt="" fill sizes="100vw" className="object-cover opacity-25" />
      <div className="container-x relative flex flex-col items-start justify-between gap-6 py-14 md:flex-row md:items-center lg:py-20">
        <div className="max-w-[640px]">
          <h2 className="text-[26px] leading-tight font-bold sm:text-[34px]">Bắt đầu với buổi tư vấn để tìm hướng giải quyết phù hợp</h2>
          <p className="mt-3 text-base text-mist sm:text-[17px]">Gọi {SITE.hotlineDisplay} hoặc để lại thông tin, luật sư sẽ liên hệ lại trong giờ làm việc.</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Link href="/lien-he#dat-lich" className="btn-gold">Đặt lịch tư vấn<Icon name="arrow" size={18} /></Link>
          <a href={`tel:${SITE.hotline}`} className="btn-ghost-light"><Icon name="phone" size={17} />{SITE.hotlineDisplay}</a>
        </div>
      </div>
    </section>
  );
}
