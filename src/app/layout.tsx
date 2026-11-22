import type { Metadata, Viewport } from "next";
import { Inter, Roboto } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { MobileBar } from "@/components/MobileBar";
import { JsonLd } from "@/components/JsonLd";
import { SITE } from "@/data/site";
import { SERVICES } from "@/data/services";

const inter = Inter({ subsets: ["latin", "vietnamese"], variable: "--font-inter", display: "swap" });
const roboto = Roboto({ subsets: ["latin", "vietnamese"], weight: ["700"], variable: "--font-roboto", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: { default: `${SITE.name} – Luật sư tư vấn, tranh tụng tại TP.HCM`, template: `%s | ${SITE.shortName}` },
  description: SITE.description,
  applicationName: SITE.shortName,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "vi_VN",
    siteName: SITE.name,
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: SITE.name }],
  },
  icons: { icon: "/favicon-32.png", apple: "/apple-touch-icon.png" },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = { themeColor: "#05273B", width: "device-width", initialScale: 1 };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="vi" className={`${inter.variable} ${roboto.variable}`}>
      <body className="pb-[76px] lg:pb-0">
        <a href="#noi-dung" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:bg-white focus:px-4 focus:py-2">
          Bỏ qua tới nội dung
        </a>
        <Header />
        <main id="noi-dung">{children}</main>
        <Footer />
        <MobileBar />
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@type": "LegalService",
            "@id": `${SITE.url}/#organization`,
            name: SITE.name,
            alternateName: SITE.shortName,
            url: SITE.url,
            logo: `${SITE.url}/images/site/emblem.svg`,
            image: `${SITE.url}/og-image.jpg`,
            telephone: "+84977761893",
            email: SITE.email,
            address: {
              "@type": "PostalAddress",
              streetAddress: "Lầu 5, 70 Hoàng Diệu, Phường Xóm Chiếu",
              addressLocality: "TP. Hồ Chí Minh",
              addressCountry: "VN",
            },
            geo: { "@type": "GeoCoordinates", latitude: SITE.geo.lat, longitude: SITE.geo.lng },
            openingHours: "Mo-Sa 08:00-17:30",
            areaServed: "Việt Nam",
            knowsAbout: SERVICES.map((s) => s.name),
            sameAs: [SITE.facebook, SITE.youtube],
          }}
        />
      </body>
    </html>
  );
}
