/**
 * ─────────────────────────────────────────────────────────────
 *  KING YENA INTERIOR — 사이트 기본 정보
 *  이 파일의 값만 바꾸면 홈페이지 문구·연락처·폼 설정이 바뀌어요.
 *  값이 빈 문자열("")인 항목은 화면에 "입력 필요"로 표시돼요. 실제 정보로 채워 주세요.
 * ─────────────────────────────────────────────────────────────
 */

export const site = {
  brand: "KING YENA INTERIOR",
  brandKo: "킹예나 인테리어",
  slogan: "공간을 바꾸는 것이 아니라, 삶의 품격을 설계합니다.",
  sloganEn: "We Design the Way You Live.",

  /** 검색엔진·공유 미리보기 (배포 주소가 정해지면 url을 바꿔 주세요) */
  seo: {
    url: "https://example.com", // TODO: 실제 도메인
    title: "KING YENA INTERIOR | 킹예나 인테리어 — 프리미엄 인테리어 디자인·리모델링",
    description:
      "아파트 인테리어, 고급 주택, 전체 리모델링, 부분 인테리어, 상업공간. 머무는 사람의 취향과 생활 방식에서 시작하는 킹예나 인테리어의 공간 설계.",
    ogImage: "/images/og.jpg",
  },

  nav: [
    { href: "#about", label: "About" },
    { href: "#portfolio", label: "Portfolio" },
    { href: "#services", label: "Services" },
    { href: "#process", label: "Process" },
    { href: "#contact", label: "Contact" },
  ],

  hero: {
    titleLines: ["공간을 바꾸는 것이 아니라,", "삶의 품격을 설계합니다."],
    subtitle: "Timeless Spaces, Thoughtfully Designed.",
    image: "/images/hero.webp",
    imageAlt: "크리스털 샹들리에 아래 아이보리 소파와 대리석 바닥, 창밖으로 저녁 도시 야경이 보이는 호텔 스위트풍 거실 (데모 이미지)",
    primary: { href: "#portfolio", label: "프로젝트 살펴보기" },
    secondary: { href: "#contact", label: "상담 문의하기" },
  },

  about: {
    title: "A Space That Reflects You.",
    subtitle: "당신의 삶을 닮은 공간을 만듭니다.",
    image: "/images/about.webp",
    imageAlt: "대리석 상판과 월넛 패널, 황동 인레이가 만나는 디테일 (데모 이미지)",
    story: [
      "집은 단순히 머무는 장소가 아닙니다. 하루를 시작하는 순간부터 가장 편안한 나로 돌아오는 시간까지, 우리의 모든 일상이 쌓이는 공간입니다.",
      "KING YENA INTERIOR는 유행을 따라가는 디자인보다 그 공간에 머무는 사람의 취향과 생활 방식에 집중합니다. 눈에 보이는 아름다움은 물론, 보이지 않는 동선과 빛의 흐름, 소재의 질감, 오래 사용해도 변하지 않는 편안함까지.",
      "좋은 인테리어는 완공되는 순간이 아니라, 그곳에서 살아가는 매일 증명된다고 믿습니다.",
    ],
    values: [
      { en: "Timeless Elegance", ko: "시간이 지나도 가치가 변하지 않는 절제된 아름다움" },
      { en: "Personal Identity", ko: "고객의 취향과 라이프스타일을 담은 맞춤 설계" },
      { en: "Thoughtful Detail", ko: "보이지 않는 부분까지 고민하는 섬세한 디테일" },
      { en: "Everyday Comfort", ko: "아름다움과 편안함이 공존하는 실용적인 공간" },
    ],
  },

  /** 연락처·사업자 정보 — 비워 두면 화면에 "입력 필요"로 보여요 */
  company: {
    name: "", // 회사명
    ceo: "", // 대표자
    bizNumber: "", // 사업자등록번호
    address: "", // 사무실 주소
    phone: "", // 연락처 (예: 02-000-0000)
    email: "", // 이메일
    hours: "", // 상담 가능 시간 (예: 평일 10:00–18:00)
    sns: [
      { label: "Instagram", url: "" },
      { label: "Blog", url: "" },
    ],
  },

  /**
   * 상담 문의 폼 연결
   *  - "netlify": Netlify에 배포하면 Netlify Forms로 접수돼요(무료 플랜 월 100건). 담당자 알림은 Netlify 설정에서 켜요.
   *  - "endpoint": Formspree·Getform·Web3Forms 같은 폼 접수 서비스 주소를 endpoint 에 넣어요 (Cloudflare Pages 배포 시).
   *  - "none": 접수 서비스가 아직 없어요. 제출하면 "연결이 필요하다"는 안내만 보여요(가짜 접수 완료를 보여주지 않아요).
   */
  form: {
    provider: "netlify" as "netlify" | "endpoint" | "none",
    endpoint: "", // provider 가 "endpoint" 일 때만 사용 (예: https://formspree.io/f/xxxx)
    name: "project-inquiry",
    maxFiles: 3,
    maxFileMB: 5, // 파일 1개 최대 용량
    maxTotalMB: 8, // Netlify Forms 제출 1건당 첨부 한도
    accept: ["image/jpeg", "image/png", "image/webp", "image/heic", "image/heif"],
  },
};

export type Site = typeof site;
