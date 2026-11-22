import Image from "next/image";
import Link from "next/link";
import type { Lawyer } from "@/data/lawyers";
import type { Service } from "@/data/services";
import { formatDate, type ArticleMeta } from "@/lib/articles";
import { Icon } from "./Icon";

const initials = (name: string) =>
  name
    .split(" ")
    .slice(-2)
    .map((w) => w[0])
    .join("");

export function LawyerPhoto({ lawyer, sizes, className = "" }: { lawyer: Lawyer; sizes: string; className?: string }) {
  return lawyer.photo ? (
    <Image src={lawyer.photo} alt={`${lawyer.title} ${lawyer.name}`} fill sizes={sizes} className={`object-cover object-[50%_18%] ${className}`} />
  ) : (
    <span className="absolute inset-0 grid place-items-center bg-[#e9eef4] text-4xl font-bold text-brand/60" aria-hidden="true">
      {initials(lawyer.name)}
    </span>
  );
}

export function LawyerCard({ lawyer }: { lawyer: Lawyer }) {
  return (
    <Link href={`/luat-su/${lawyer.slug}`} className="group flex flex-col gap-3.5">
      <span className="relative block aspect-[4/5] overflow-hidden bg-[#e9eef4]">
        <LawyerPhoto lawyer={lawyer} sizes="(min-width: 1024px) 230px, 45vw" className="zoom-img" />
      </span>
      <span className="flex flex-col gap-1">
        <small className="text-xs uppercase tracking-[0.08em] text-gray">{lawyer.position}</small>
        <b className="text-[17px] text-brand group-hover:text-navy">{lawyer.name}</b>
      </span>
    </Link>
  );
}

export function ServiceTile({ s, priority = false }: { s: Service; priority?: boolean }) {
  return (
    <Link href={`/dich-vu/${s.slug}`} className="group relative block h-[300px] overflow-hidden text-white sm:h-[380px] lg:h-[420px]">
      <Image src={s.image} alt={s.name} fill sizes="(min-width: 1024px) 300px, (min-width: 640px) 50vw, 80vw" className="zoom-img object-cover" priority={priority} />
      <span className="absolute inset-x-0 bottom-0 flex flex-col gap-2 bg-gradient-to-t from-navy/95 via-navy/70 to-transparent p-5 pt-16 sm:p-6 sm:pt-20">
        <b className="text-lg sm:text-[19px]">{s.name}</b>
        <span className="text-sm leading-relaxed text-[#d6dee7]">{s.short}</span>
        <span className="mt-1 flex items-center gap-1.5 text-sm font-semibold text-gold">Xem dịch vụ<Icon name="arrow" size={16} className="transition-transform group-hover:translate-x-1" /></span>
      </span>
    </Link>
  );
}

export function ArticleCard({ a, priority = false }: { a: ArticleMeta; priority?: boolean }) {
  return (
    <Link href={`/bai-viet/${a.slug}`} className="group flex flex-col gap-3">
      <span className="relative block aspect-[16/10] overflow-hidden bg-soft">
        {a.cover && <Image src={a.cover} alt={a.title} fill sizes="(min-width: 1024px) 380px, (min-width: 640px) 50vw, 100vw" className="zoom-img object-cover" priority={priority} />}
      </span>
      <span className="text-[13px] font-semibold text-gold-ink">{a.categoryName} · {formatDate(a.date)}</span>
      <b className="line-clamp-3 text-lg leading-snug text-navy group-hover:text-brand sm:text-[19px]">{a.title}</b>
    </Link>
  );
}

export function ArticleRow({ a }: { a: ArticleMeta }) {
  return (
    <Link href={`/bai-viet/${a.slug}`} className="group grid grid-cols-[104px_1fr] items-start gap-4 py-5 sm:grid-cols-[260px_1fr] sm:gap-7">
      <span className="relative block aspect-[4/3] overflow-hidden bg-soft sm:aspect-[16/10]">
        {a.cover && <Image src={a.cover} alt="" fill sizes="(min-width: 640px) 260px, 104px" className="zoom-img object-cover" />}
      </span>
      <span className="flex min-w-0 flex-col gap-1.5 sm:gap-2.5">
        <span className="text-[12.5px] font-semibold text-gold-ink sm:text-[13px]">{a.categoryName} · {formatDate(a.date)}</span>
        <b className="line-clamp-3 text-[15.5px] leading-snug text-navy group-hover:text-brand sm:text-xl">{a.title}</b>
        <span className="hidden text-[15px] leading-relaxed text-gray sm:line-clamp-2">{a.summary}</span>
      </span>
    </Link>
  );
}
