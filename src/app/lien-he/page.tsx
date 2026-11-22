import type { Metadata } from "next";
import Image from "next/image";
import { ContactForm } from "@/components/ContactForm";
import { Breadcrumbs } from "@/components/blocks";
import { Icon, type IconName } from "@/components/Icon";
import { SITE } from "@/data/site";

export const metadata: Metadata = {
  title: "Liên hệ – Đặt lịch tư vấn luật sư",
  description: `Liên hệ Công ty Luật TNHH Viên Minh: ${SITE.address}. Hotline ${SITE.hotlineDisplay}. Đặt lịch tư vấn với luật sư.`,
  alternates: { canonical: "/lien-he" },
};

const rows: { icon: IconName; t: string; v: React.ReactNode }[] = [
  { icon: "pin", t: "Địa chỉ văn phòng", v: SITE.address },
  {
    icon: "phone",
    t: "Điện thoại",
    v: (
      <>
        <a href={`tel:${SITE.hotline}`} className="hover:text-brand">{SITE.hotlineDisplay}</a> ·{" "}
        <a href={`tel:${SITE.phone2}`} className="hover:text-brand">{SITE.phone2Display}</a>
      </>
    ),
  },
  { icon: "mail", t: "Email", v: <a href={`mailto:${SITE.email}`} className="hover:text-brand">{SITE.email}</a> },
  { icon: "clock", t: "Giờ làm việc", v: `${SITE.hours}. Tiếp khách ngoài giờ khi đã hẹn trước.` },
];

export default function ContactPage() {
  return (
    <>
      <section className="pt-10 pb-8 sm:pt-14 sm:pb-10">
        <div className="container-x flex flex-col gap-4">
          <Breadcrumbs items={[{ label: "Liên hệ" }]} />
          <p className="eyebrow mt-3 text-gold-ink">Liên hệ với Luật Viên Minh</p>
          <h1 className="max-w-[820px] text-[32px] leading-[1.15] font-extrabold text-navy sm:text-5xl">Giải pháp pháp lý vững vàng cho mọi vấn đề</h1>
          <p className="max-w-[720px] text-base leading-relaxed text-gray-2 sm:text-lg">Gặp vấn đề pháp lý, xin đừng lo lắng. Hãy gọi hoặc để lại thông tin, luật sư sẽ liên hệ lại với bạn trong giờ làm việc.</p>
        </div>
      </section>
      <section className="pb-16 sm:pb-20 lg:pb-24">
        <div className="container-x grid gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <b className="block text-[20px] text-navy sm:text-[22px]">{SITE.name.toUpperCase()}</b>
            <ul>
              {rows.map((r) => (
                <li key={r.t} className="grid grid-cols-[48px_1fr] items-start gap-4 border-b border-line py-5">
                  <span className="grid size-12 place-items-center bg-navy text-gold"><Icon name={r.icon} size={22} /></span>
                  <div><b className="block text-[17px] text-navy">{r.t}</b><span className="text-[16px] leading-relaxed text-[#26313b]">{r.v}</span></div>
                </li>
              ))}
            </ul>
            <a href={SITE.mapUrl} target="_blank" rel="noopener" className="group relative mt-7 block aspect-[16/9] overflow-hidden bg-[#e9eef4]">
              <Image src="/images/site/map.webp" alt={`Bản đồ đến ${SITE.address}`} fill sizes="(min-width: 1024px) 560px, 100vw" className="object-cover" />
              <span className="absolute bottom-4 left-4 flex items-center gap-2 bg-white px-4 py-2.5 text-[15px] font-semibold text-navy shadow group-hover:text-brand">
                <Icon name="pin" size={18} />Mở Google Maps
              </span>
            </a>
          </div>
          <div className="bg-soft p-1 sm:p-2">
            <ContactForm id="dat-lich" title="Gửi thông tin liên hệ" />
          </div>
        </div>
      </section>
    </>
  );
}
