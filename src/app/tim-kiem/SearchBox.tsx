"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import { Icon } from "@/components/Icon";

type Doc = { s: string; t: string; c: string; d: string; i: string; x: string; b: string };

const fold = (s: string) =>
  s.normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/đ/gi, "d").toLowerCase();

export function SearchBox() {
  const params = useSearchParams();
  const router = useRouter();
  const [q, setQ] = useState(params.get("q") ?? "");
  const [docs, setDocs] = useState<(Doc & { ft: string; fx: string })[] | null>(null);
  const input = useRef<HTMLInputElement>(null);

  useEffect(() => {
    input.current?.focus();
    fetch("/search-index.json")
      .then((r) => r.json())
      .then((list: Doc[]) => setDocs(list.map((d) => ({ ...d, ft: fold(d.t), fx: fold(d.x + " " + d.b) }))))
      .catch(() => setDocs([]));
  }, []);

  useEffect(() => {
    const id = setTimeout(() => router.replace(q ? `/tim-kiem?q=${encodeURIComponent(q)}` : "/tim-kiem", { scroll: false }), 300);
    return () => clearTimeout(id);
  }, [q, router]);

  const results = useMemo(() => {
    const query = fold(q.trim());
    if (!docs || query.length < 2) return [];
    const words = query.split(/\s+/);
    return docs
      .map((d) => {
        let score = 0;
        for (const w of words) {
          if (d.ft.includes(w)) score += 3;
          else if (d.fx.includes(w)) score += 1;
          else return null;
        }
        if (d.ft.includes(query)) score += 6;
        return { d, score };
      })
      .filter((x): x is { d: Doc & { ft: string; fx: string }; score: number } => !!x)
      .sort((a, b) => b.score - a.score || (a.d.d < b.d.d ? 1 : -1))
      .slice(0, 30);
  }, [q, docs]);

  return (
    <div className="flex flex-col gap-6">
      <label className="flex h-14 items-center gap-3 border-2 border-navy bg-white px-4 focus-within:border-brand">
        <Icon name="search" size={22} className="text-gray" />
        <span className="sr-only">Từ khóa</span>
        <input
          ref={input}
          type="search"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Ví dụ: ly hôn đơn phương, sổ đỏ, thừa kế…"
          className="h-full flex-1 bg-transparent text-[17px] text-ink outline-none"
          enterKeyHint="search"
        />
      </label>
      {docs === null && <p className="text-gray">Đang tải dữ liệu bài viết…</p>}
      {docs && q.trim().length >= 2 && (
        <p className="text-[15px] font-semibold text-navy">{results.length ? `${results.length} kết quả` : `Không tìm thấy bài viết cho “${q.trim()}”. Hãy thử từ khóa khác.`}</p>
      )}
      <ul className="divide-y divide-line">
        {results.map(({ d }) => (
          <li key={d.s}>
            <Link href={`/bai-viet/${d.s}`} className="group grid grid-cols-[96px_1fr] items-start gap-4 py-4 sm:grid-cols-[160px_1fr] sm:gap-6">
              <span className="relative block aspect-[4/3] overflow-hidden bg-soft">{d.i && <Image src={d.i} alt="" fill sizes="160px" className="object-cover" />}</span>
              <span className="flex flex-col gap-1.5">
                <small className="text-[12.5px] font-semibold text-gold-ink">{d.c}</small>
                <b className="text-[16px] leading-snug text-navy group-hover:text-brand sm:text-lg">{d.t}</b>
                <span className="line-clamp-2 text-sm text-gray">{d.x}</span>
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
