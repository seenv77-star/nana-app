// Builds Korean portfolio sheets (for Kmong) and a service thumbnail from rendered frames.
const { chromium } = require('playwright');
const path = require('path');
const brands = require('./brands.js');

const meta = {
  seolbae: {
    product: '나주배 글로우 토너 패드 (70매)', target: '미국 20~30대, 칙칙하고 건조한 피부',
    concept: '"한 번 닦으면 배처럼 촉촉한 광채" — 한국 과일 원료를 미국 소비자가 바로 이해하는 언어로',
    why: [
      ['제목', '검색량이 큰 "Korean toner pads", "niacinamide", "exfoliating"을 앞쪽에 배치. 200자 규정 안에서 155자'],
      ['요약 문구', '5칸을 모두 사용. 각 줄을 "효과 제목: 근거 → 사용 상황" 순서로 구성'],
      ['이미지 7장', '효과 → 성분 → 제형 → 결과 → 사용법 → 대상 순으로, 구매 직전 고민을 차례로 해소'],
      ['규제 표현', '"치료·재생" 대신 "looks / helps / feels" 표현만 사용. 결과 수치는 예시임을 명시'],
    ],
  },
  kongyeol: {
    product: '검은콩 펩타이드 퍼밍 세럼 (50ml)', target: '미국 30~40대, 탄력 저하와 잔주름 고민',
    concept: '"발효 검은콩 + 펩타이드" — 한국 발효 전통을 프리미엄 안티에이징 스토리로',
    why: [
      ['제목', '"peptide serum", "firming", "fine lines", "fragrance-free" 등 구매 의도 키워드 중심. 181자'],
      ['요약 문구', '효과 → 핵심 원료 → 성분 근거 → 제형 → 저자극·사용법 순서로 5칸 구성'],
      ['이미지 7장', '프리미엄 톤(블랙·베이지)으로 가격 인식을 높이고, 제형·루틴 정보로 첫 구매 장벽을 낮춤'],
      ['규제 표현', '"주름 개선" 대신 "softens the look of fine lines"처럼 화장품 범위 안의 표현만 사용'],
    ],
  },
};

const css = `*{box-sizing:border-box;margin:0;padding:0}
body{font-family:Pretendard,Inter,sans-serif;color:#15181d;background:#fff;width:1200px}
.sec{padding:64px 72px}
.k{font-size:18px;font-weight:700;letter-spacing:2px;color:#6b7280}
h1{font-size:54px;font-weight:800;letter-spacing:-1.5px;line-height:1.2}
h2{font-size:36px;font-weight:800;letter-spacing:-1px;margin-bottom:24px}
img{display:block}
.grid{display:grid;grid-template-columns:repeat(3,1fr);gap:14px}
.grid img{width:100%;border-radius:12px;border:1px solid #e5e7eb}
.row{display:flex;gap:16px;padding:18px 0;border-bottom:1px solid #eceef1;font-size:20px;line-height:1.55}
.row b{flex:none;width:130px}
.en{background:#f6f7f9;border-radius:16px;padding:26px 28px;font-family:Inter,sans-serif;font-size:16.5px;line-height:1.6;color:#30343b}
.en li{margin:0 0 10px 18px}
`;

function sheet(b) {
  const m = meta[b.slug];
  const img = (n) => `file://${path.join(__dirname, b.slug, n + '.png')}`;
  return `<!doctype html><html><head><meta charset="utf-8"><style>${css}</style></head><body>
  <div class="sec" style="background:#15181d;color:#fff">
    <div class="k" style="color:#9aa3af">PORTFOLIO · 미국 아마존 K-뷰티 상세페이지 세트</div>
    <h1 style="margin-top:14px">${b.name}<br><span style="color:#c9d1db;font-weight:700;font-size:38px">${m.product}</span></h1>
    <div style="margin-top:30px;display:flex;gap:12px;flex-wrap:wrap;font-size:18px;font-weight:600">
      ${['영문 제목', '요약 문구 5개', '검색 키워드', '상세 이미지 7장', 'A+ 콘텐츠 2모듈', '미국 표현 규제 점검'].map(t => `<span style="border:1.5px solid #4b5563;border-radius:999px;padding:8px 16px">${t}</span>`).join('')}
    </div>
  </div>
  <div class="sec">
    <h2>기획 요약</h2>
    <div class="row"><b>타깃</b><span>${m.target}</span></div>
    <div class="row"><b>콘셉트</b><span>${m.concept}</span></div>
    ${m.why.map(([a, c]) => `<div class="row"><b>${a}</b><span>${c}</span></div>`).join('')}
  </div>
  <div class="sec" style="padding-top:0">
    <h2>상세 이미지 7장</h2>
    <div class="grid">${['01_main', '02_hero', '03_ingredients', '04_texture', '05_results', '06_howto', '07_whofor'].map(n => `<img src="${img(n)}">`).join('')}</div>
  </div>
  <div class="sec" style="padding-top:0">
    <h2>A+ 콘텐츠</h2>
    <img src="${img('A1_aplus_hero')}" style="width:100%;border-radius:12px;margin-bottom:14px">
    <img src="${img('A2_aplus_routine')}" style="width:100%;border-radius:12px">
  </div>
  <div class="sec" style="padding-top:0">
    <h2>영문 제목 · 요약 문구</h2>
    <div class="en"><b>${b.title}</b><ul style="margin-top:16px">${b.bullets.map(t => `<li>${t}</li>`).join('')}</ul></div>
  </div>
  <div style="padding:22px 72px 40px;font-size:15px;color:#6b7280">※ 본 작업물은 포트폴리오용 가상 브랜드입니다. 결과 수치는 예시 데이터이며, 실제 작업 시 브랜드가 제공한 시험 근거로 교체합니다.</div>
  </body></html>`;
}

function thumb() {
  const f = (s, n) => `file://${path.join(__dirname, s, n + '.png')}`;
  return `<!doctype html><html><head><meta charset="utf-8"><style>${css}
  body{width:1304px;height:976px;overflow:hidden}</style></head><body>
  <div style="position:relative;width:1304px;height:976px;background:linear-gradient(135deg,#0f1115 0%,#1d2330 100%);color:#fff">
    <div style="position:absolute;left:80px;top:96px;width:620px">
      <div style="display:inline-block;background:#fff;color:#111;font-weight:800;font-size:24px;border-radius:10px;padding:8px 16px">Amazon · TikTok Shop</div>
      <div style="font-size:72px;font-weight:800;line-height:1.15;letter-spacing:-2px;margin-top:30px">K-뷰티<br>미국 판매용<br>상세페이지 세트</div>
      <div style="font-size:28px;color:#c9d1db;line-height:1.5;margin-top:28px">영문 제목 · 요약 문구 · 이미지 7장 · A+<br>미국 화장품 표현 규제 점검 포함</div>
    </div>
    <img src="${f('seolbae', '02_hero')}" style="position:absolute;right:250px;top:120px;width:380px;border-radius:18px;transform:rotate(-5deg);box-shadow:0 30px 60px rgba(0,0,0,.45)">
    <img src="${f('kongyeol', '02_hero')}" style="position:absolute;right:60px;top:300px;width:380px;border-radius:18px;transform:rotate(5deg);box-shadow:0 30px 60px rgba(0,0,0,.45)">
    <div style="position:absolute;left:80px;bottom:80px;display:flex;gap:12px;font-size:22px;font-weight:700">
      <span style="border:2px solid #4b5563;border-radius:999px;padding:10px 20px">세금계산서 발행 가능</span>
      <span style="border:2px solid #4b5563;border-radius:999px;padding:10px 20px">화장품 전문</span>
    </div>
  </div></body></html>`;
}

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1200, height: 1000 } });
  for (const b of brands) {
    require('fs').writeFileSync(path.join(__dirname, b.slug, 'sheet.html'), sheet(b)); await page.goto('file://' + path.join(__dirname, b.slug, 'sheet.html'), { waitUntil: 'load' });
    await page.waitForTimeout(300);
    await page.screenshot({ path: path.join(__dirname, `portfolio_${b.slug}.png`), fullPage: true });
  }
  await page.setViewportSize({ width: 1304, height: 976 });
  require('fs').writeFileSync(path.join(__dirname, 'thumb.html'), thumb()); await page.goto('file://' + path.join(__dirname, 'thumb.html'), { waitUntil: 'load' });
  await page.waitForTimeout(300);
  await page.screenshot({ path: path.join(__dirname, 'kmong_thumbnail.png') });
  await browser.close();
  console.log('ok');
})();
