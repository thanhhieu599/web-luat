import { NextResponse } from "next/server";
import { SITE } from "@/data/site";

export const runtime = "nodejs";

const clean = (v: unknown, max = 2000) => String(v ?? "").replace(/[<>]/g, "").trim().slice(0, max);
const hits = new Map<string, number[]>();

function rateLimited(ip: string) {
  const now = Date.now();
  const list = (hits.get(ip) ?? []).filter((t) => now - t < 10 * 60_000);
  list.push(now);
  hits.set(ip, list);
  return list.length > 5;
}

export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Dữ liệu không hợp lệ." }, { status: 400 });
  }
  // Ô ẩn chống spam: người thật không điền
  if (clean(body.website)) return NextResponse.json({ ok: true });

  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "local";
  if (rateLimited(ip)) {
    return NextResponse.json({ error: `Bạn đã gửi nhiều lần. Vui lòng gọi ${SITE.hotlineDisplay}.` }, { status: 429 });
  }

  const name = clean(body.name, 120);
  const phone = clean(body.phone, 20).replace(/\s|\./g, "");
  const email = clean(body.email, 160);
  const service = clean(body.service, 120);
  const message = clean(body.message, 3000);
  const page = clean(body.page, 300);
  if (!name || !/^(\+84|0)\d{8,10}$/.test(phone)) {
    return NextResponse.json({ error: "Vui lòng nhập họ tên và số điện thoại hợp lệ." }, { status: 400 });
  }

  const lines = [
    `Họ tên: ${name}`,
    `Điện thoại: ${phone}`,
    email && `Email: ${email}`,
    service && `Lĩnh vực: ${service}`,
    message && `Nội dung: ${message}`,
    page && `Gửi từ trang: ${SITE.url}${page}`,
  ].filter(Boolean) as string[];

  const tasks: Promise<Response>[] = [];
  const resendKey = process.env.RESEND_API_KEY;
  if (resendKey) {
    tasks.push(
      fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: { Authorization: `Bearer ${resendKey}`, "Content-Type": "application/json" },
        body: JSON.stringify({
          from: process.env.CONTACT_FROM ?? "Website Luật Viên Minh <onboarding@resend.dev>",
          to: (process.env.CONTACT_TO ?? SITE.email).split(",").map((s) => s.trim()),
          reply_to: email || undefined,
          subject: `[Website] Yêu cầu tư vấn – ${name} – ${phone}`,
          text: lines.join("\n"),
        }),
      }),
    );
  }
  const tgToken = process.env.TELEGRAM_BOT_TOKEN;
  const tgChat = process.env.TELEGRAM_CHAT_ID;
  if (tgToken && tgChat) {
    tasks.push(
      fetch(`https://api.telegram.org/bot${tgToken}/sendMessage`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ chat_id: tgChat, text: `Yêu cầu tư vấn mới\n${lines.join("\n")}` }),
      }),
    );
  }

  if (!tasks.length) {
    console.warn("[lien-he] Chưa cấu hình RESEND_API_KEY hoặc TELEGRAM_BOT_TOKEN. Nội dung:\n" + lines.join("\n"));
    if (process.env.NODE_ENV === "production") {
      return NextResponse.json({ error: `Hệ thống chưa sẵn sàng nhận form. Vui lòng gọi ${SITE.hotlineDisplay}.` }, { status: 503 });
    }
    return NextResponse.json({ ok: true, dev: true });
  }

  const results = await Promise.allSettled(tasks);
  const ok = results.some((r) => r.status === "fulfilled" && r.value.ok);
  if (!ok) {
    console.error("[lien-he] Gửi thất bại", results);
    return NextResponse.json({ error: `Chưa gửi được. Vui lòng gọi ${SITE.hotlineDisplay}.` }, { status: 502 });
  }
  return NextResponse.json({ ok: true });
}
