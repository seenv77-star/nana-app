/**
 * 서비스 · 차별점 · 진행 절차 · 후기 · 자주 묻는 질문
 * 실제 운영 방식에 맞게 문구를 바꿔 쓰세요.
 */

export const services = {
  title: "Our Expertise",
  subtitle: "공간의 목적과 삶의 방식에 맞는 디자인 솔루션.",
  items: [
    { no: "01", en: "Residential Interior", ko: "주거공간 인테리어", text: "아파트, 주택 등 주거공간의 취향과 생활 패턴을 고려한 맞춤형 디자인.", image: "/images/p1-cover.webp", imageAlt: "호텔 스위트풍 거실 (데모 이미지)" },
    { no: "02", en: "Premium Remodeling", ko: "프리미엄 리모델링", text: "기존 공간의 구조와 기능을 재해석하는 고급 리모델링.", image: "/images/p4-cover.webp", imageAlt: "호텔 레스토랑풍 다이닝 (데모 이미지)" },
    { no: "03", en: "Commercial Interior", ko: "상업공간 인테리어", text: "브랜드의 정체성과 고객 경험을 고려한 상업공간 디자인.", image: "/images/p3-cover.webp", imageAlt: "호텔 살롱풍 부티크 라운지 (데모 이미지)" },
    { no: "04", en: "Space Styling", ko: "공간 스타일링", text: "가구, 조명, 소재, 컬러를 조화롭게 구성하는 공간 스타일링.", image: "/images/p6-detail.webp", imageAlt: "호텔 라운지풍 스타일링 (데모 이미지)" },
  ],
};

export const reasons = {
  title: "The Difference Is in the Details.",
  subtitle: "좋은 공간은 작은 차이에서 완성됩니다.",
  // 실제로 제공하지 않는 서비스나 확인되지 않은 품질 보증은 넣지 않아요.
  items: [
    { title: "생활 방식에서 시작하는 기획", text: "도면보다 먼저, 그 공간에서 누가 어떤 하루를 보내는지 묻는 것으로 설계를 시작합니다." },
    { title: "유행보다 오래가는 디자인", text: "몇 년 뒤에도 질리지 않도록 형태와 소재를 절제하고, 시간이 지날수록 자연스러워지는 마감을 고릅니다." },
    { title: "조명, 동선, 수납까지", text: "보이는 면만이 아니라 빛의 방향, 움직이는 길, 물건이 놓일 자리를 함께 계획합니다." },
    { title: "소재와 마감의 완성도", text: "대리석, 월넛, 황동, 패브릭처럼 손에 닿는 소재의 질감과 이음새의 마감까지 확인합니다." },
    { title: "충분한 소통과 투명한 진행", text: "결정이 필요한 순간마다 선택지와 이유를 설명하고, 진행 상황을 단계별로 공유합니다." },
  ],
};

export const process = {
  title: "From Vision to Reality",
  subtitle: "당신의 생각이 하나의 공간으로 완성되는 과정.",
  steps: [
    { no: "01", en: "Consultation", ko: "초기 상담 및 고객 요구사항 파악" },
    { no: "02", en: "Space Planning", ko: "공간 분석 및 디자인 방향 설정" },
    { no: "03", en: "Design Proposal", ko: "레이아웃, 소재, 컬러 및 디자인 제안" },
    { no: "04", en: "Estimate & Agreement", ko: "견적 협의 및 계약" },
    { no: "05", en: "Construction", ko: "공정 일정에 따른 시공 및 현장 관리" },
    { no: "06", en: "Completion", ko: "최종 점검 및 공간 인도" },
  ],
};

/**
 * 고객 후기
 * ⚠️ 실제 후기가 등록되기 전까지는 visible 을 false 로 두거나, 아래처럼 sample: true 로 '샘플'임을 표시하세요.
 *    허위 후기와 임의의 별점은 넣지 않아요 (별점 표시 기능 없음).
 */
export const reviews = {
  visible: true,
  title: "Stories from Our Clients",
  subtitle: "공간을 경험한 사람들의 이야기.",
  items: [
    { name: "샘플 고객", projectType: "아파트 전체 인테리어", text: "실제 고객 후기가 들어갈 자리입니다. 상담부터 완공까지의 경험을 고객의 말 그대로 담아 주세요.", image: "/images/p1-detail.webp", imageAlt: "관련 프로젝트 이미지 (데모)", sample: true },
    { name: "샘플 고객", projectType: "단독주택 신축 인테리어", text: "후기는 고객의 동의를 받은 뒤 이름 대신 이니셜이나 익명으로 표시할 수 있습니다.", image: "/images/p2-detail.webp", imageAlt: "관련 프로젝트 이미지 (데모)", sample: true },
    { name: "샘플 고객", projectType: "상업공간 인테리어", text: "관련 프로젝트 사진과 함께 보여 주면 후기의 신뢰도가 높아집니다.", image: "/images/p3-detail.webp", imageAlt: "관련 프로젝트 이미지 (데모)", sample: true },
  ],
};

/**
 * 자주 묻는 질문
 * ✏️ 운영 정책이 정해지지 않은 답변은 일반적인 문구로 써 두었어요. 실제 기준에 맞게 고쳐 주세요.
 */
export const faq = {
  title: "Questions",
  subtitle: "상담 전에 자주 묻는 질문.",
  items: [
    { q: "인테리어 상담은 어떻게 진행되나요?", a: "홈페이지 문의나 전화로 상담을 신청하시면, 공간 유형과 면적, 원하시는 방향을 먼저 여쭙니다. 이후 일정을 맞춰 방문하거나 사무실에서 만나 구체적인 상담을 진행합니다." },
    { q: "견적은 어떤 기준으로 산정되나요?", a: "공간의 면적, 공사 범위, 사용하는 자재와 마감 수준, 구조 변경 여부에 따라 달라집니다. 현장 확인과 디자인 방향이 정해진 뒤 항목별로 나눈 견적서를 드립니다." },
    { q: "공사 기간은 어느 정도 소요되나요?", a: "공사 범위와 면적에 따라 다릅니다. 상담과 현장 확인 후 공정별 일정표로 예상 기간을 안내해 드립니다." },
    { q: "부분 인테리어도 가능한가요?", a: "가능합니다. 주방, 욕실, 침실처럼 한 공간만 바꾸는 작업도 집 전체의 톤과 어울리도록 함께 고민합니다." },
    { q: "원하는 디자인 사진을 전달해도 되나요?", a: "네, 좋습니다. 상담 문의 폼에 참고 이미지를 첨부하시거나 상담 때 보여 주시면, 마음에 드는 이유를 함께 살펴보고 공간에 맞게 제안합니다." },
    { q: "시공 후 사후관리는 어떻게 진행되나요?", a: "공간 인도 후 문제가 생기면 연락 주세요. 사후관리 기간과 범위는 계약 시 계약서에 명시해 안내해 드립니다." },
  ],
};
