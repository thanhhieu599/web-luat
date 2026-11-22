import { NextResponse } from "next/server";
import { getAllArticles } from "@/lib/articles";

export const dynamic = "force-static";

export function GET() {
  const strip = (s: string) => s.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
  return NextResponse.json(
    getAllArticles().map((a) => ({
      s: a.slug,
      t: a.title,
      c: a.categoryName,
      d: a.date,
      i: a.cover,
      x: a.summary,
      b: strip(a.html).slice(0, 1500),
    })),
  );
}
