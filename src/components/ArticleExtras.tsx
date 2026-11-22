"use client";

import { useState } from "react";
import { Icon } from "./Icon";

export function Toc({ items }: { items: { id: string; text: string }[] }) {
  const [open, setOpen] = useState(true);
  if (items.length < 2) return null;
  const rows = Math.ceil(items.length / 2);
  return (
    <nav aria-label="Mục lục nội dung" className="my-7 border border-[#dce5f0] bg-soft">
      <button type="button" onClick={() => setOpen(!open)} aria-expanded={open} className="flex w-full items-center justify-between gap-3 px-5 py-4 text-left">
        <span className="flex items-center gap-2.5 text-[17px] font-bold text-navy"><Icon name="list" size={21} />Mục lục nội dung</span>
        <span className="flex items-center gap-1 text-sm text-gray">{open ? "Thu gọn" : "Mở rộng"}<Icon name="down" size={16} className={`transition-transform ${open ? "rotate-180" : ""}`} /></span>
      </button>
      {open && (
        <ol
          className="grid gap-x-10 border-t border-[#dce5f0] px-5 py-3 sm:grid-flow-col sm:grid-cols-2"
          style={{ gridTemplateRows: `repeat(${rows}, auto)` }}
        >
          {items.map((t, i) => (
            <li key={t.id}>
              <a href={`#${t.id}`} className="flex gap-2 py-2 text-[15px] leading-snug text-[#26313b] hover:text-brand">
                <span className="min-w-5 font-semibold text-brand">{i + 1}.</span>
                <span>{t.text}</span>
              </a>
            </li>
          ))}
        </ol>
      )}
    </nav>
  );
}

export function ShareBar({ title }: { title: string }) {
  const [copied, setCopied] = useState(false);
  const url = () => window.location.href.split("#")[0];
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(url());
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      window.prompt("Sao chép liên kết:", url());
    }
  };
  const share = async () => {
    if (navigator.share) {
      try {
        await navigator.share({ title, url: url() });
        return;
      } catch {
        return;
      }
    }
    copy();
  };
  return (
    <div className="mt-10 flex flex-wrap items-center gap-2.5 border-t border-line pt-5 text-sm">
      <b className="mr-1 font-semibold text-navy">Chia sẻ bài viết:</b>
      <a
        href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(typeof window === "undefined" ? "" : url())}`}
        onClick={(e) => {
          e.preventDefault();
          window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url())}`, "share", "width=620,height=560");
        }}
        className="flex h-10 items-center gap-1.5 border border-line px-3.5 text-navy hover:border-brand"
      >
        <Icon name="facebook" size={16} />Facebook
      </a>
      <button type="button" onClick={share} className="flex h-10 items-center gap-1.5 border border-line px-3.5 text-navy hover:border-brand">
        <Icon name="zalo" size={16} />Zalo
      </button>
      <button type="button" onClick={copy} className="flex h-10 items-center gap-1.5 border border-line px-3.5 text-navy hover:border-brand">
        <Icon name="link" size={16} />{copied ? "Đã sao chép" : "Sao chép liên kết"}
      </button>
    </div>
  );
}
