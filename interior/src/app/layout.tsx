import type { Metadata, Viewport } from "next";
import "pretendard/dist/web/variable/pretendardvariable-dynamic-subset.css";
import "@fontsource-variable/newsreader/opsz.css";
import "@fontsource-variable/newsreader/opsz-italic.css";
import "./globals.css";
import { site } from "@/content/site";

export const metadata: Metadata = {
  metadataBase: new URL(site.seo.url),
  title: { default: site.seo.title, template: `%s | ${site.brand}` },
  description: site.seo.description,
  keywords: ["인테리어", "아파트 인테리어", "고급 주택 인테리어", "리모델링", "전체 리모델링", "부분 인테리어", "상업공간 인테리어", "공간 스타일링", "KING YENA INTERIOR", "킹예나 인테리어"],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "ko_KR",
    siteName: site.brand,
    title: site.seo.title,
    description: site.seo.description,
    url: "/",
    images: [{ url: site.seo.ogImage, width: 1200, height: 630, alt: site.brand }],
  },
  twitter: { card: "summary_large_image", title: site.seo.title, description: site.seo.description, images: [site.seo.ogImage] },
  robots: { index: true, follow: true },
  icons: { icon: "/favicon.svg" },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#f5f0e8",
};

/** 구조화 데이터 — 사업자 정보가 채워지면 해당 항목이 자동으로 추가돼요 */
function jsonLd() {
  const c = site.company;
  const data: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "HomeAndConstructionBusiness",
    name: site.brand,
    alternateName: site.brandKo,
    description: site.seo.description,
    url: site.seo.url,
    image: new URL(site.seo.ogImage, site.seo.url).toString(),
    areaServed: "KR",
  };
  if (c.phone) data.telephone = c.phone;
  if (c.email) data.email = c.email;
  if (c.address) data.address = { "@type": "PostalAddress", streetAddress: c.address, addressCountry: "KR" };
  const sameAs = c.sns.map((s) => s.url).filter(Boolean);
  if (sameAs.length) data.sameAs = sameAs;
  return JSON.stringify(data);
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd() }} />
        <a className="skip" href="#main">
          본문으로 바로가기
        </a>
        {children}
      </body>
    </html>
  );
}
