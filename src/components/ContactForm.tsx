"use client";

import { useState } from "react";
import Link from "next/link";
import { SERVICES } from "@/data/services";
import { SITE } from "@/data/site";

type Status = "idle" | "sending" | "sent" | "error";

export function ContactForm({
  title = "Đặt lịch tư vấn",
  defaultService = "",
  compact = false,
  id,
}: {
  title?: string;
  defaultService?: string;
  compact?: boolean;
  id?: string;
}) {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    const phone = String(data.phone || "").replace(/\s|\./g, "");
    if (!String(data.name || "").trim()) return (setStatus("error"), setError("Vui lòng nhập họ và tên."));
    if (!/^(\+84|0)\d{8,10}$/.test(phone)) return (setStatus("error"), setError("Số điện thoại chưa đúng, ví dụ 0977 761 893."));
    setStatus("sending");
    setError("");
    try {
      const res = await fetch("/api/lien-he", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, phone, page: window.location.pathname }),
      });
      if (!res.ok) throw new Error((await res.json().catch(() => ({})))?.error || "send");
      setStatus("sent");
      form.reset();
    } catch (err) {
      setStatus("error");
      setError(
        err instanceof Error && err.message !== "send"
          ? err.message
          : `Chưa gửi được. Bạn vui lòng gọi ${SITE.hotlineDisplay} hoặc thử lại sau ít phút.`,
      );
    }
  }

  if (status === "sent") {
    return (
      <div id={id} className="flex flex-col gap-3 bg-white p-6 sm:p-8" role="status">
        <b className="text-xl text-navy">Đã nhận yêu cầu của bạn</b>
        <p className="text-[15.5px] leading-relaxed text-gray-2">
          Luật sư sẽ gọi lại trong giờ làm việc ({SITE.hours}). Việc gấp, bạn gọi ngay {SITE.hotlineDisplay}.
        </p>
        <button type="button" className="link-arrow self-start" onClick={() => setStatus("idle")}>Gửi yêu cầu khác</button>
      </div>
    );
  }

  return (
    <form id={id} onSubmit={onSubmit} noValidate className={`flex flex-col gap-4 bg-white ${compact ? "p-5 sm:p-6" : "p-6 sm:p-8"}`}>
      <b className="text-xl text-navy sm:text-[22px]">{title}</b>
      <div className={`grid gap-4 ${compact ? "" : "sm:grid-cols-2"}`}>
        <label className="field">Họ và tên *<input name="name" type="text" autoComplete="name" placeholder="Nguyễn Văn A" required /></label>
        <label className="field">Số điện thoại *<input name="phone" type="tel" inputMode="tel" autoComplete="tel" placeholder="09xx xxx xxx" required /></label>
      </div>
      {!compact && <label className="field">Email<input name="email" type="email" autoComplete="email" placeholder="ban@email.com" /></label>}
      <label className="field">
        Lĩnh vực cần tư vấn
        <select name="service" defaultValue={defaultService}>
          <option value="">Chọn lĩnh vực</option>
          {SERVICES.map((s) => (
            <option key={s.slug} value={s.name}>{s.name.replace("Luật sư ", "").replace(/^./, (c) => c.toUpperCase())}</option>
          ))}
          <option value="Khác">Khác</option>
        </select>
      </label>
      <label className="field">Nội dung<textarea name="message" rows={compact ? 3 : 4} placeholder="Tóm tắt ngắn vụ việc và thời gian bạn tiện nghe máy" /></label>
      <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />
      <p className="text-[13px] leading-relaxed text-gray">
        Thông tin chỉ dùng để luật sư liên hệ tư vấn, theo chính sách <Link href="/bao-ve-thong-tin" className="text-brand underline">Bảo vệ thông tin</Link>.
      </p>
      {status === "error" && <p className="text-sm font-medium text-[#b42318]" role="alert">{error}</p>}
      <button type="submit" className="btn-gold w-full" disabled={status === "sending"}>
        {status === "sending" ? "Đang gửi…" : "Gửi yêu cầu"}
      </button>
    </form>
  );
}
