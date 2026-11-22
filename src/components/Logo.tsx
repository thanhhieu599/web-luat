import Image from "next/image";
import Link from "next/link";

export function Logo({ light = false, compact = false }: { light?: boolean; compact?: boolean }) {
  return (
    <Link href="/" className="flex shrink-0 items-center gap-2.5" aria-label="Luật Viên Minh – Trang chủ">
      <Image src="/images/site/emblem.svg" alt="" width={compact ? 38 : 46} height={compact ? 38 : 46} priority />
      <span className={`flex flex-col leading-none ${light ? "text-white" : "text-navy"}`}>
        <b className={`${compact ? "text-[17px]" : "text-[19px]"} font-extrabold tracking-[0.04em]`}>VIÊN MINH</b>
        <small className="mt-1 text-[9.5px] font-semibold tracking-[0.3em]">LAW FIRM</small>
      </span>
    </Link>
  );
}
