import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { cache } from "react";
import { categoryBySlug } from "@/data/content";

export type ArticleMeta = {
  slug: string;
  title: string;
  date: string;
  category: string;
  categoryName: string;
  summary: string;
  cover: string;
  author: string;
  legacyId: string;
  legacyPath: string;
  readingMinutes: number;
};

export type Article = ArticleMeta & {
  html: string;
  toc: { id: string; text: string }[];
};

const DIR = path.join(process.cwd(), "content", "bai-viet");
export const PAGE_SIZE = 12;

const stripTags = (s: string) => s.replace(/<[^>]+>/g, " ").replace(/&nbsp;/g, " ").replace(/\s+/g, " ").trim();

const slugId = (s: string) =>
  s
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/đ/gi, "d")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 60);

function processHtml(raw: string) {
  const toc: { id: string; text: string }[] = [];
  const used = new Set<string>();
  let html = raw
    // bỏ ảnh đệm/ảnh quá nhỏ của web cũ
    .replace(/<figure>\s*<img[^>]*width="(\d+)"[^>]*\/?>\s*<\/figure>/g, (m, w) => (Number(w) < 120 ? "" : m))
    .replace(/<img[^>]*width="(\d{1,2})"[^>]*\/?>/g, "")
    // bọc bảng để cuộn ngang trên điện thoại
    .replace(/<table>/g, '<div class="table-wrap"><table>')
    .replace(/<\/table>/g, "</table></div>")
    .replace(/<a href="(https?:\/\/(?!www\.luatvienminh\.vn)[^"]+)"/g, '<a href="$1" target="_blank" rel="noopener nofollow"');
  html = html.replace(/<(h2|h3)>([\s\S]*?)<\/\1>/g, (_m, tag: string, inner: string) => {
    const text = stripTags(inner);
    let id = slugId(text.replace(/^(\d+(\.\d+)*|[IVX]+)[.)]\s*/, "")) || "muc";
    while (used.has(id)) id += "-2";
    used.add(id);
    if (tag === "h2") toc.push({ id, text: text.replace(/^(\d+|[IVX]+)[.)]\s*/, "") });
    return `<${tag} id="${id}">${inner}</${tag}>`;
  });
  return { html, toc };
}

function readFile(file: string): Article {
  const src = fs.readFileSync(path.join(DIR, file), "utf8");
  const { data, content } = matter(src);
  const { html, toc } = processHtml(content);
  const words = stripTags(content).split(" ").length;
  return {
    slug: data.slug,
    title: data.title,
    date: data.date,
    category: data.category,
    categoryName: categoryBySlug(data.category)?.name ?? "Bài viết",
    summary: data.summary ?? "",
    cover: data.cover ?? "",
    author: data.author ?? "",
    legacyId: String(data.legacyId ?? ""),
    legacyPath: data.legacyPath ?? "",
    readingMinutes: Math.max(1, Math.round(words / 220)),
    html,
    toc,
  };
}

export const getAllArticles = cache((): Article[] => {
  if (!fs.existsSync(DIR)) return [];
  return fs
    .readdirSync(DIR)
    .filter((f) => f.endsWith(".md"))
    .map(readFile)
    .sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : a.title.localeCompare(b.title)));
});

export function toMeta(a: Article): ArticleMeta {
  const { html, toc, ...meta } = a;
  void html;
  void toc;
  return meta;
}

export const getArticleMetas = () => getAllArticles().map(toMeta);

export const getArticle = (slug: string) => getAllArticles().find((a) => a.slug === slug);

export const getByCategory = (cat: string) => getArticleMetas().filter((a) => a.category === cat);

export function getRelated(a: ArticleMeta, n = 4) {
  const same = getArticleMetas().filter((x) => x.slug !== a.slug && x.category === a.category);
  const rest = getArticleMetas().filter((x) => x.slug !== a.slug && x.category !== a.category);
  return [...same, ...rest].slice(0, n);
}

export function paginate<T>(items: T[], page: number, size = PAGE_SIZE) {
  const total = Math.max(1, Math.ceil(items.length / size));
  return { items: items.slice((page - 1) * size, page * size), total, page };
}

export function formatDate(iso: string) {
  const [y, m, d] = iso.split("-");
  return `${d}/${m}/${y}`;
}
