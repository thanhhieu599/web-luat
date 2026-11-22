import Link from "next/link";
import { SITE } from "@/data/site";
import { Icon } from "./Icon";

/** Thanh liên hệ cố định ở đáy màn hình điện thoại */
export function MobileBar() {
  return (
    <nav
      aria-label="Liên hệ nhanh"
      className="fixed inset-x-0 bottom-0 z-30 grid grid-cols-[1fr_1fr_1.5fr] gap-2 border-t border-line bg-white/97 px-4 pt-2.5 pb-[calc(10px+env(safe-area-inset-bottom))] shadow-[0_-6px_20px_rgba(5,39,59,0.08)] lg:hidden"
    >
      <a href={`tel:${SITE.hotline}`} className="flex h-12 items-center justify-center gap-1.5 border-[1.5px] border-gold-dark text-[15px] font-bold text-gold-ink">
        <Icon name="phone" size={17} />Gọi
      </a>
      <a href={SITE.zalo} target="_blank" rel="noopener" className="flex h-12 items-center justify-center gap-1.5 border-[1.5px] border-brand text-[15px] font-bold text-brand">
        Zalo
      </a>
      <Link href="/lien-he#dat-lich" className="flex h-12 items-center justify-center gap-1.5 bg-gold-dark text-[15px] font-bold text-white">
        Đặt lịch tư vấn
      </Link>
    </nav>
  );
}
