"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { NAV, SITE } from "@/data/site";
import { SERVICES } from "@/data/services";
import { Icon } from "./Icon";
import { Logo } from "./Logo";

export function Header() {
  const path = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => setOpen(false), [path]);
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 40);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
  }, [open]);

  const active = (href: string) => path === href || path.startsWith(href + "/");

  return (
    <>
      <div className="hidden bg-gold text-[14px] text-navy lg:block">
        <div className="container-x flex h-11 items-center justify-between gap-6">
          <div className="flex items-center gap-8">
            <span className="flex items-center gap-2"><Icon name="pin" size={16} />{SITE.addressShort}</span>
            <a href={`mailto:${SITE.email}`} className="flex items-center gap-2 hover:underline"><Icon name="mail" size={16} />{SITE.email}</a>
          </div>
          <div className="flex items-center gap-5">
            <a href={`tel:${SITE.hotline}`} className="flex items-center gap-2 font-semibold"><Icon name="phone" size={15} />Hotline {SITE.hotlineDisplay}</a>
            <a href={SITE.facebook} target="_blank" rel="noopener" aria-label="Facebook Luật Viên Minh"><Icon name="facebook" size={18} /></a>
            <a href={SITE.youtube} target="_blank" rel="noopener" aria-label="YouTube Luật Viên Minh"><Icon name="youtube" size={20} /></a>
          </div>
        </div>
      </div>

      <header className={`sticky top-0 z-40 border-b border-[#e8ecf1] bg-white/95 backdrop-blur transition-shadow ${scrolled ? "shadow-[0_4px_18px_rgba(5,39,59,0.08)]" : ""}`}>
        <div className={`container-x flex items-center gap-6 transition-[height] duration-300 ${scrolled ? "h-[68px]" : "h-[68px] lg:h-[84px]"}`}>
          <Logo />
          <nav aria-label="Menu chính" className="ml-auto hidden items-center gap-8 lg:flex xl:gap-10">
            {NAV.map((n) =>
              n.href === "/dich-vu" ? (
                <div key={n.href} className="group relative">
                  <Link href={n.href} className={`font-nav text-[15px] font-bold uppercase tracking-[0.02em] ${active(n.href) ? "text-brand" : "text-gray-2 hover:text-brand"}`}>{n.label}</Link>
                  <div className="invisible absolute left-1/2 top-full w-[300px] -translate-x-1/2 pt-6 opacity-0 transition-all group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
                    <ul className="border-t-2 border-gold bg-white py-2 shadow-[0_14px_40px_rgba(5,39,59,0.14)]">
                      {SERVICES.map((s) => (
                        <li key={s.slug}><Link href={`/dich-vu/${s.slug}`} className="block px-5 py-2.5 text-[15px] text-navy hover:bg-soft hover:text-brand">{s.name}</Link></li>
                      ))}
                    </ul>
                  </div>
                </div>
              ) : (
                <Link key={n.href} href={n.href} className={`font-nav text-[15px] font-bold uppercase tracking-[0.02em] ${active(n.href) ? "text-brand" : "text-gray-2 hover:text-brand"}`}>{n.label}</Link>
              ),
            )}
          </nav>
          <div className="ml-auto flex items-center gap-1 lg:ml-0">
            <Link href="/tim-kiem" aria-label="Tìm kiếm bài viết" className="grid size-11 place-items-center text-navy hover:text-brand"><Icon name="search" size={22} /></Link>
            <Link href="/lien-he#dat-lich" className="btn-navy ml-2 hidden h-11! px-5! text-[15px]! lg:inline-flex">Đặt lịch tư vấn</Link>
            <button type="button" className="grid size-11 place-items-center text-navy lg:hidden" aria-label="Mở menu" aria-expanded={open} onClick={() => setOpen(true)}>
              <Icon name="menu" size={24} strokeWidth={2.2} />
            </button>
          </div>
        </div>
      </header>

      <div className={`fixed inset-0 z-50 bg-navy/45 transition-opacity lg:hidden ${open ? "opacity-100" : "pointer-events-none opacity-0"}`} onClick={() => setOpen(false)} aria-hidden="true" />
      <aside
        className={`fixed inset-y-0 right-0 z-50 flex w-[min(340px,88vw)] flex-col overflow-y-auto bg-white shadow-2xl transition-transform duration-300 lg:hidden ${open ? "translate-x-0" : "invisible translate-x-full"}`}
        aria-label="Menu"
        aria-hidden={!open}
      >
        <div className="flex h-[68px] items-center justify-between border-b border-line pl-5 pr-2">
          <Logo compact />
          <button type="button" className="grid size-11 place-items-center text-navy" aria-label="Đóng menu" onClick={() => setOpen(false)}><Icon name="close" size={24} /></button>
        </div>
        <nav className="flex flex-col px-3 py-3" aria-label="Menu điện thoại">
          {NAV.map((n) => (
            <Link key={n.href} href={n.href} className={`flex min-h-12 items-center justify-between px-3 text-[17px] font-semibold ${active(n.href) ? "text-brand" : "text-navy"}`}>
              {n.label}<Icon name="chevron" size={18} className="text-[#a0a8b3]" />
            </Link>
          ))}
        </nav>
        <p className="px-6 pt-2 text-xs font-bold uppercase tracking-[0.1em] text-gold-ink">Dịch vụ</p>
        <nav className="flex flex-col px-3 pb-4" aria-label="Dịch vụ">
          {SERVICES.map((s) => (
            <Link key={s.slug} href={`/dich-vu/${s.slug}`} className="flex min-h-11 items-center px-3 text-[15px] text-gray-2">{s.name}</Link>
          ))}
        </nav>
        <div className="mt-auto flex flex-col gap-2 border-t border-line p-5 text-sm text-gray-2">
          <a href={`tel:${SITE.hotline}`} className="btn-gold"><Icon name="phone" size={18} />Gọi {SITE.hotlineDisplay}</a>
          <span className="mt-2">{SITE.addressShort}</span>
        </div>
      </aside>
    </>
  );
}
