# Website Luật Viên Minh

Website của Công ty Luật TNHH Viên Minh, dựng lại theo thiết kế Figma bằng Next.js.

- **Công nghệ:** Next.js 15 (App Router), React 19, TypeScript, Tailwind CSS 4
- **Trang:** toàn bộ trang được dựng tĩnh sẵn (SSG) nên tải rất nhanh; chỉ form liên hệ chạy phía máy chủ
- **Nội dung:** bài viết là file Markdown trong `content/bai-viet/`; dịch vụ, luật sư, vụ án, câu hỏi thường gặp nằm trong `src/data/`

## Chạy trên máy

```bash
npm install
```

```bash
npm run dev
```

Mở http://localhost:3000. Bản chạy thật:

```bash
npm run build && npm start
```

## Cấu trúc trang

| Đường dẫn | Nội dung |
|---|---|
| `/` | Trang chủ |
| `/gioi-thieu` | Giới thiệu, đội ngũ (`#doi-ngu`) |
| `/luat-su/[slug]` | Hồ sơ từng luật sư |
| `/dich-vu`, `/dich-vu/[slug]` | Tổng quan và 6 trang dịch vụ |
| `/vu-an-tieu-bieu`, `/vu-an-tieu-bieu/[slug]` | Vụ án tiêu biểu |
| `/bai-viet`, `/bai-viet/trang/[n]` | Danh sách bài viết, phân trang 12 bài |
| `/bai-viet/chuyen-muc/[cat]` | Bài viết theo chuyên mục |
| `/bai-viet/[slug]` | Chi tiết bài viết (mục lục tự động từ H2) |
| `/tim-kiem` | Tìm kiếm bài viết, gõ không dấu vẫn được |
| `/lien-he` | Liên hệ, form đặt lịch tư vấn |
| `/thoa-thuan-dich-vu`, `/bao-ve-thong-tin` | Chính sách |

## Thêm hoặc sửa bài viết

Tạo file mới trong `content/bai-viet/`, ví dụ `ten-bai-viet.md`:

```markdown
---
title: "Tiêu đề bài viết"
slug: "ten-bai-viet"
date: "2026-12-01"
category: "hon-nhan-gia-dinh"
summary: "Đoạn tóm tắt hiển thị dưới tiêu đề và trên Google."
cover: "/images/bai-viet/ten-anh.webp"
author: "Luật sư Lê Ngọc Trà My"
---
<p>Đoạn mở đầu…</p>
<h2>1. Tiêu đề mục</h2>
<p>Nội dung…</p>
```

- `category` là một trong: `hon-nhan-gia-dinh`, `dat-dai`, `hinh-su`, `doanh-nghiep`, `dan-su-tranh-chap`, `viet-kieu-yeu-to-nuoc-ngoai`.
- Mỗi thẻ `<h2>` thành một mục trong "Mục lục nội dung".
- Ảnh đặt trong `public/images/bai-viet/`, nên dùng định dạng WebP rộng tối đa 1200px.
- `author` trùng tên luật sư trong `src/data/lawyers.ts` thì bài hiện ảnh và link tới hồ sơ luật sư.

Có thể sửa trực tiếp trên GitHub (nút ✏️ trên file). Khi đẩy lên nhánh chính, Vercel tự build lại website.

## Form liên hệ

Form gửi về `/api/lien-he`. Cần cấu hình ít nhất một kênh nhận (xem `.env.example`):

- **Email qua Resend:** `RESEND_API_KEY`, `CONTACT_TO` (email nhận), `CONTACT_FROM` (email gửi đã xác minh tên miền trên Resend).
- **Telegram (tùy chọn):** `TELEGRAM_BOT_TOKEN`, `TELEGRAM_CHAT_ID`.

Chưa cấu hình thì form báo khách gọi hotline, không mất yêu cầu âm thầm. Form có ô ẩn chống spam và giới hạn 5 lần gửi trong 10 phút cho mỗi địa chỉ IP.

## Chuyển hướng từ website cũ

`next.config.ts` chuyển hướng 301 toàn bộ đường dẫn của web ePortal cũ:

- 86 bài viết `/bai_viet/…/articleid/<id>/…` và `/tin_tuc/…` → `/bai-viet/<slug>` (danh sách trong `src/data/redirects.json`)
- 6 dịch vụ `/dich_vu/…`, 6 hồ sơ luật sư `/doi_ngu/productid/…`, các trang chính và chính sách

Nhờ vậy thứ hạng Google của các bài cũ được giữ lại khi đổi sang web mới.

## Chuyển bài viết từ web cũ

`scripts/migrate_articles.py` đọc HTML bài viết đã tải từ web cũ. Script làm các việc:

- làm sạch định dạng rác;
- chuyển tiêu đề có đánh số thành `<h2>`;
- bỏ khối liên hệ lặp ở cuối bài;
- tải và nén ảnh sang WebP;
- ghi file Markdown và danh sách chuyển hướng.

```bash
python3 scripts/migrate_articles.py <thư mục HTML bài viết> <thư mục HTML chuyên mục>
```

Cần `beautifulsoup4` và `Pillow`.

## Deploy lên Vercel

1. Vào vercel.com → **Add New → Project** → chọn kho `web-luat`. Vercel tự nhận Next.js, không cần chỉnh gì.
2. Vào **Settings → Environment Variables**, thêm các biến trong `.env.example`.
3. Vào **Settings → Domains**, thêm `luatvienminh.vn` và `www.luatvienminh.vn`, rồi trỏ DNS theo hướng dẫn của Vercel.

## Hiệu năng và SEO

- Font Inter và Roboto tự chứa, không chặn hiển thị trang. Ảnh tự chuyển AVIF/WebP đúng kích thước màn hình.
- Dữ liệu có cấu trúc: LegalService, Person (luật sư), Service, Article, FAQPage, BreadcrumbList.
- Có `sitemap.xml` và `robots.txt` tự sinh, mỗi trang có canonical riêng.
- Trang tôn trọng chế độ giảm chuyển động của thiết bị, có nút "Bỏ qua tới nội dung" và focus rõ ràng khi dùng bàn phím.
