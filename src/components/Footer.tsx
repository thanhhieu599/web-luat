import Link from "next/link";
import { SITE } from "@/data/site";
import { SERVICES } from "@/data/services";
import { Icon } from "./Icon";
import { Logo } from "./Logo";

export function Footer() {
  return (
    <footer className="bg-navy text-[15px] text-mist">
      <div className="container-x grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1fr] lg:gap-12 lg:py-16">
        <div className="flex flex-col gap-4">
          <Logo light />
          <b className="mt-2 text-gold">CÔNG TY LUẬT TNHH VIÊN MINH</b>
          <p className="flex gap-2.5"><Icon name="pin" size={18} className="mt-0.5 shrink-0 text-gold" />{SITE.address}</p>
          <a href={`tel:${SITE.hotline}`} className="flex gap-2.5 hover:text-white"><Icon name="phone" size={17} className="mt-0.5 shrink-0 text-gold" />{SITE.hotlineDisplay} · {SITE.phone2Display}</a>
          <a href={`mailto:${SITE.email}`} className="flex gap-2.5 hover:text-white"><Icon name="mail" size={18} className="mt-0.5 shrink-0 text-gold" />{SITE.email}</a>
        </div>
        <div>
          <p className="mb-4 font-bold text-gold">DỊCH VỤ</p>
          <ul className="flex flex-col gap-2.5">
            {SERVICES.map((s) => (
              <li key={s.slug}><Link href={`/dich-vu/${s.slug}`} className="hover:text-white">{s.name}</Link></li>
            ))}
          </ul>
        </div>
        <div>
          <p className="mb-4 font-bold text-gold">VỀ CHÚNG TÔI</p>
          <ul className="flex flex-col gap-2.5">
            <li><Link href="/gioi-thieu" className="hover:text-white">Giới thiệu</Link></li>
            <li><Link href="/gioi-thieu#doi-ngu" className="hover:text-white">Đội ngũ luật sư</Link></li>
            <li><Link href="/vu-an-tieu-bieu" className="hover:text-white">Vụ án tiêu biểu</Link></li>
            <li><Link href="/bai-viet" className="hover:text-white">Bài viết</Link></li>
            <li><Link href="/lien-he" className="hover:text-white">Liên hệ</Link></li>
          </ul>
        </div>
        <div>
          <p className="mb-4 font-bold text-gold">CHÍNH SÁCH</p>
          <ul className="flex flex-col gap-2.5">
            <li><Link href="/thoa-thuan-dich-vu" className="hover:text-white">Thỏa thuận dịch vụ</Link></li>
            <li><Link href="/bao-ve-thong-tin" className="hover:text-white">Bảo vệ thông tin</Link></li>
          </ul>
          <p className="mb-3 mt-7 font-bold text-gold">THEO DÕI</p>
          <div className="flex gap-3">
            <a href={SITE.facebook} target="_blank" rel="noopener" aria-label="Facebook" className="grid size-10 place-items-center border border-white/20 hover:border-gold hover:text-gold"><Icon name="facebook" size={18} /></a>
            <a href={SITE.youtube} target="_blank" rel="noopener" aria-label="YouTube" className="grid size-10 place-items-center border border-white/20 hover:border-gold hover:text-gold"><Icon name="youtube" size={20} /></a>
            <a href={SITE.zalo} target="_blank" rel="noopener" aria-label="Zalo" className="grid size-10 place-items-center border border-white/20 text-xs font-bold hover:border-gold hover:text-gold">Zalo</a>
          </div>
        </div>
      </div>
      <div className="bg-gold text-sm text-navy">
        <div className="container-x flex min-h-14 flex-wrap items-center justify-between gap-x-6 gap-y-1 py-3">
          <span>© {new Date().getFullYear()} Công ty Luật TNHH Viên Minh. Giữ toàn quyền.</span>
          <span>{SITE.bar}</span>
        </div>
      </div>
    </footer>
  );
}
