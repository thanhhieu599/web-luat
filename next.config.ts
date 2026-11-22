import type { NextConfig } from "next";
import legacyArticles from "./src/data/redirects.json";

// productid của hồ sơ luật sư trên web cũ -> slug mới
const LEGACY_LAWYERS: Record<string, string> = {
  "352845": "pham-duc-huy",
  "352846": "nguyen-van-sang",
  "352849": "nguyen-van-hien",
  "352848": "vu-thi-trang",
  "354304": "le-tien-dung",
  "352847": "nguyen-thi-hong-huong",
};

const LEGACY_PAGES: [string, string][] = [
  ["/trang_chu", "/"],
  ["/Default.aspx", "/"],
  ["/gioi_thieu", "/gioi-thieu"],
  ["/ve_chung_toi", "/gioi-thieu"],
  ["/doi_ngu", "/gioi-thieu#doi-ngu"],
  ["/dich_vu", "/dich-vu"],
  ["/dich_vu/luat_su_hinh_su", "/dich-vu/luat-su-hinh-su"],
  ["/dich_vu/luat_su_dan_su", "/dich-vu/luat-su-dan-su"],
  ["/dich_vu/to_tung_dan_su", "/dich-vu/luat-su-dan-su"],
  ["/dich_vu/luat_su_dat_dai", "/dich-vu/luat-su-nha-dat"],
  ["/dich_vu/luat_su_tranh_tung", "/dich-vu/luat-su-tranh-tung"],
  ["/dich_vu/luat_su_hon_nhan_va_gia_dinh", "/dich-vu/luat-su-hon-nhan-gia-dinh"],
  ["/dich_vu/luat_su_ly_hon", "/dich-vu/luat-su-hon-nhan-gia-dinh"],
  ["/dich_vu/luat_su_doanh_nghiep_va_dau_tu", "/dich-vu/luat-su-doanh-nghiep"],
  ["/dich_vu/dich_vu_doanh_nghiep", "/dich-vu/luat-su-doanh-nghiep"],
  ["/vu_an_dien_hinh", "/vu-an-tieu-bieu"],
  ["/du_an_phap_ly_tieu_bieu", "/vu-an-tieu-bieu"],
  ["/lien_he", "/lien-he"],
  ["/trang_chu/ctl/terms", "/thoa-thuan-dich-vu"],
  ["/gioi_thieu/ctl/terms", "/thoa-thuan-dich-vu"],
  ["/trang_chu/ctl/privacy", "/bao-ve-thong-tin"],
  ["/gioi_thieu/ctl/privacy", "/bao-ve-thong-tin"],
];

const nextConfig: NextConfig = {
  poweredByHeader: false,
  images: {
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 60 * 60 * 24 * 30,
  },
  async redirects() {
    const articles = Object.entries(legacyArticles as Record<string, string>).flatMap(([id, slug]) => [
      {
        source: `/:section(bai_viet|tin_tuc)/nhap_tin_tuc/articletype/articleview/articleid/${id}/:rest*`,
        destination: `/bai-viet/${slug}`,
        permanent: true,
      },
    ]);
    const lawyers = Object.entries(LEGACY_LAWYERS).map(([pid, slug]) => ({
      source: `/doi_ngu/productid/${pid}/:rest*`,
      destination: `/luat-su/${slug}`,
      permanent: true,
    }));
    const pages = LEGACY_PAGES.map(([source, destination]) => ({ source, destination, permanent: true }));
    return [
      ...articles,
      ...lawyers,
      ...pages,
      { source: "/:section(bai_viet|tin_tuc)/:rest*", destination: "/bai-viet", permanent: true },
      { source: "/bieu_mau/:rest*", destination: "/bai-viet", permanent: true },
    ];
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
        ],
      },
      {
        source: "/images/:path*",
        headers: [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }],
      },
    ];
  },
};

export default nextConfig;
