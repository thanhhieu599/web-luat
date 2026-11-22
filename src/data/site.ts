export const SITE = {
  name: "Công ty Luật TNHH Viên Minh",
  shortName: "Luật Viên Minh",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.luatvienminh.vn",
  tagline: "Đồng hành pháp lý, vững bước thành công",
  description:
    "Công ty Luật TNHH Viên Minh – luật sư tư vấn, bào chữa và tranh tụng các vụ việc hình sự, hôn nhân gia đình, nhà đất, dân sự và doanh nghiệp tại TP. Hồ Chí Minh.",
  address: "Lầu 5, 70 Hoàng Diệu, Phường Xóm Chiếu, TP. Hồ Chí Minh",
  addressShort: "Lầu 5, 70 Hoàng Diệu, Phường Xóm Chiếu, TP.HCM",
  hotline: "0977761893",
  hotlineDisplay: "0977 761 893",
  phone2: "0989203511",
  phone2Display: "0989 203 511",
  email: "luatvienminh@gmail.com",
  hours: "Thứ Hai – Thứ Bảy, 8:00 – 17:30",
  zalo: "https://zalo.me/0977761893",
  facebook: "https://www.facebook.com/luatvienminh",
  youtube: "https://www.youtube.com/@luatvienminh",
  mapUrl: "https://maps.google.com/?q=70+Ho%C3%A0ng+Di%E1%BB%87u,+Ph%C6%B0%E1%BB%9Dng+X%C3%B3m+Chi%E1%BA%BFu,+TP.HCM",
  geo: { lat: 10.7612, lng: 106.7043 },
  bar: "Đoàn Luật sư TP. Hồ Chí Minh",
} as const;

export const NAV = [
  { label: "Giới thiệu", href: "/gioi-thieu" },
  { label: "Dịch vụ", href: "/dich-vu" },
  { label: "Vụ án tiêu biểu", href: "/vu-an-tieu-bieu" },
  { label: "Bài viết", href: "/bai-viet" },
  { label: "Liên hệ", href: "/lien-he" },
] as const;

export const STATS = [
  { value: "15+", label: "năm hành nghề" },
  { value: "7", label: "luật sư thành viên" },
  { value: "Đoàn LS", label: "TP. Hồ Chí Minh" },
] as const;
