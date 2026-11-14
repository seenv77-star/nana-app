/**
 * 포트폴리오 데이터
 * ⚠️ 지금 들어 있는 6개는 모두 "데모 프로젝트"예요 (demo: true → 화면에 '데모' 표시).
 *    실제 시공 사례로 교체할 때는 demo 를 false 로 바꾸고, 사진을 public/images 에 넣어 경로를 바꿔 주세요.
 */

export type Category = "APARTMENT" | "HOUSE" | "COMMERCIAL" | "REMODELING";

export type Project = {
  id: string;
  title: string;
  titleKo: string;
  location: string;
  category: Category;
  spaceType: string;
  area: string;
  concept: string;
  scope: string;
  intent: string[];
  images: { src: string; alt: string }[];
  demo: boolean;
};

export const categories: { key: "ALL" | Category; label: string }[] = [
  { key: "ALL", label: "ALL" },
  { key: "APARTMENT", label: "APARTMENT" },
  { key: "HOUSE", label: "HOUSE" },
  { key: "COMMERCIAL", label: "COMMERCIAL" },
  { key: "REMODELING", label: "REMODELING" },
];

export const projects: Project[] = [
  {
    id: "soft-horizon",
    title: "Soft Horizon",
    titleKo: "도심 위의 수평선, 아파트 거실과 다이닝",
    location: "서울 (데모)",
    category: "APARTMENT",
    spaceType: "아파트",
    area: "165㎡ (50평)",
    concept: "호텔 스위트의 저녁 같은 분위기를 매일의 거실로 옮긴 공간",
    scope: "전체 인테리어, 주방, 조명 설계",
    intent: [
      "창밖의 스카이라인이 가장 먼저 보이도록 가구의 높이를 낮추고, 월넛 사이드보드를 벽 길이 그대로 이어 시선이 끊기지 않게 했습니다.",
      "대리석과 황동, 월넛을 절제해 섞고 천장 간접조명과 펜던트로 호텔 라운지 같은 저녁 분위기를 만들었습니다.",
    ],
    images: [
      { src: "/images/p1-cover.webp", alt: "크리스털 샹들리에 아래 대리석 원형 식탁과 월넛 문이 있는 호텔 스위트풍 다이닝 (데모 이미지)" },
      { src: "/images/p1-detail.webp", alt: "대리석 아일랜드와 월넛 수납장이 있는 호텔풍 주방 (데모 이미지)" },
    ],
    demo: true,
  },
  {
    id: "garden-light",
    title: "Garden Light",
    titleKo: "정원을 향해 열린 단독주택",
    location: "경기 (데모)",
    category: "HOUSE",
    spaceType: "단독주택",
    area: "230㎡ (70평)",
    concept: "리조트 빌라처럼 높은 천장과 석재 벽난로를 중심에 둔 집",
    scope: "신축 인테리어, 계단·벽난로 디자인",
    intent: [
      "정원에서 들어오는 빛을 계절마다 다르게 느낄 수 있도록 창의 높이와 위치를 함께 검토했습니다.",
      "곡선 계단을 트래버틴과 월넛으로 마감해 두 층을 하나의 흐름으로 연결했습니다.",
    ],
    images: [
      { src: "/images/p2-cover.webp", alt: "두 층 높이 천장과 석재 벽난로, 정원을 향한 큰 창이 있는 리조트형 거실 (데모 이미지)" },
      { src: "/images/p2-detail.webp", alt: "샹들리에 아래로 휘어 오르는 대리석 곡선 계단 (데모 이미지)" },
    ],
    demo: true,
  },
  {
    id: "stone-atelier",
    title: "Stone Atelier",
    titleKo: "호텔 살롱처럼 머무는 패션 부티크 VIP 라운지",
    location: "서울 (데모)",
    category: "COMMERCIAL",
    spaceType: "상업공간 · 부티크 VIP 라운지",
    area: "99㎡ (30평)",
    concept: "제품보다 머무는 경험을 먼저 보여주는 프라이빗 살롱",
    scope: "상업공간 인테리어, VIP 라운지, 조명 설계",
    intent: [
      "브랜드의 절제된 톤을 공간에서도 느낄 수 있도록 마감을 아이보리 패널, 대리석, 황동 세 가지로 제한했습니다.",
      "원형 천장 아래 상담 테이블을 두고 샹들리에와 벽등으로 빛을 낮춰, 고객이 오래 머물며 제품을 고를 수 있게 했습니다.",
    ],
    images: [
      { src: "/images/p3-cover.webp", alt: "원형 천장의 크리스털 샹들리에 아래 대리석 원형 테이블이 놓인 부티크 VIP 살롱 (데모 이미지)" },
      { src: "/images/p3-detail.webp", alt: "터프티드 소파와 큰 거울, 황동 벽등이 있는 피팅 라운지 (데모 이미지)" },
    ],
    demo: true,
  },
  {
    id: "quiet-table",
    title: "Quiet Table",
    titleKo: "25년 된 아파트의 다이닝과 욕실 리모델링",
    location: "서울 (데모)",
    category: "REMODELING",
    spaceType: "아파트 리모델링",
    area: "112㎡ (34평)",
    concept: "호텔 레스토랑의 식탁처럼 머물고 싶은 다이닝",
    scope: "전체 리모델링, 욕실, 구조 변경",
    intent: [
      "막혀 있던 주방 벽을 열어 식탁에서 거실과 창이 한 번에 보이도록 구조를 바꿨습니다.",
      "욕실은 대리석과 황동으로 마감해 호텔 스파처럼 한 덩어리로 느껴지도록 했습니다.",
    ],
    images: [
      { src: "/images/p4-cover.webp", alt: "짙은 월넛 패널 벽과 황동 샹들리에, 대리석 원형 식탁이 있는 다이닝 (데모 이미지)" },
      { src: "/images/p4-detail.webp", alt: "황동 다리의 독립형 욕조와 대리석 바닥이 있는 호텔풍 욕실 (데모 이미지)" },
    ],
    demo: true,
  },
  {
    id: "linen-rest",
    title: "Linen Rest",
    titleKo: "쉼에 집중한 침실과 드레스룸",
    location: "서울 (데모)",
    category: "APARTMENT",
    spaceType: "아파트",
    area: "142㎡ (43평)",
    concept: "스위트룸처럼 빛과 소리를 낮춰 하루를 내려놓는 침실",
    scope: "침실·드레스룸 부분 인테리어",
    intent: [
      "침실은 커튼과 헤드보드에 패브릭을 써서 소리가 부드럽게 흡수되도록 했습니다.",
      "드레스룸은 복도형으로 길게 이어 양쪽 수납을 자주 쓰는 순서대로 높이를 나눠 매일의 동선을 줄였습니다.",
    ],
    images: [
      { src: "/images/p5-cover.webp", alt: "터프티드 헤드보드와 양쪽 테이블 램프, 샹들리에가 있는 스위트룸형 침실 (데모 이미지)" },
      { src: "/images/p5-detail.webp", alt: "월넛 수납장이 양쪽으로 이어지는 대리석 바닥의 드레스룸 복도 (데모 이미지)" },
    ],
    demo: true,
  },
  {
    id: "calm-lounge",
    title: "Calm Lounge",
    titleKo: "기다림이 편안한 클리닉 라운지",
    location: "서울 (데모)",
    category: "COMMERCIAL",
    spaceType: "상업공간 · 클리닉",
    area: "132㎡ (40평)",
    concept: "호텔 로비처럼 처음 들어선 순간 긴장이 풀리는 대기 공간",
    scope: "상업공간 인테리어, 리셉션 데스크 디자인",
    intent: [
      "리셉션 데스크를 곡선으로 만들어 들어오는 사람이 정면으로 마주 서지 않도록 했습니다.",
      "대기 의자는 서로 시선이 겹치지 않게 배치해 머무는 동안의 불편함을 줄였습니다.",
    ],
    images: [
      { src: "/images/p6-cover.webp", alt: "원형 천장과 샹들리에, 곡선 리셉션 데스크가 있는 호텔 로비풍 클리닉 (데모 이미지)" },
      { src: "/images/p6-detail.webp", alt: "가죽 암체어와 대리석 테이블, 플로어 램프가 있는 라운지 코너 (데모 이미지)" },
    ],
    demo: true,
  },
];
