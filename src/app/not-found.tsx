import Link from "next/link";
import { Icon } from "@/components/Icon";
import { SITE } from "@/data/site";

export default function NotFound() {
  return (
    <section className="py-20 sm:py-28">
      <div className="container-x flex max-w-[720px] flex-col items-start gap-5">
        <p className="eyebrow text-gold-ink">Lỗi 404</p>
        <h1 className="text-[32px] leading-tight font-extrabold text-navy sm:text-[44px]">Không tìm thấy trang bạn cần</h1>
        <p className="text-[17px] leading-relaxed text-gray-2">
          Trang có thể đã được chuyển sang địa chỉ mới khi website được nâng cấp. Bạn thử tìm bài viết theo từ khóa hoặc quay về trang chủ.
        </p>
        <div className="flex flex-wrap gap-3">
          <Link href="/tim-kiem" className="btn-navy"><Icon name="search" size={18} />Tìm bài viết</Link>
          <Link href="/" className="btn-ghost">Về trang chủ</Link>
        </div>
        <p className="text-[15px] text-gray">Cần hỗ trợ ngay? Gọi <a href={`tel:${SITE.hotline}`} className="font-bold text-navy">{SITE.hotlineDisplay}</a></p>
      </div>
    </section>
  );
}
