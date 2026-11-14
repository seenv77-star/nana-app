# KING YENA INTERIOR — 공식 홈페이지

Next.js(App Router) + React + TypeScript + Tailwind CSS로 만든 원페이지 반응형 사이트예요.
빌드하면 `out/` 폴더에 **정적 파일**이 만들어지므로 Netlify, Cloudflare Pages 어디에나 무료로 올릴 수 있어요.

- 디자인: Quiet Luxury × Modern Minimalism. 아이보리 #F5F0E8 · 웜 베이지 #D5C8B6 · 토프 #887662 · 차콜 #292824 · 화이트
- 글꼴: Newsreader(영문 세리프) + Pretendard(한글). 둘 다 무료 상업 이용이 가능한 OFL 라이선스예요.
- 모션: 첫 화면의 아이보리 '포켓 도어'가 열리는 연출, 사진이 아래에서 위로 열리는 효과, 데스크톱 Process 가로 스크롤(GSAP).
  기기에서 '동작 줄이기'를 켠 방문자에게는 모든 모션이 꺼지고 바로 보여요.

---

## 1. 실행하기

Node.js 20 이상이 필요해요.

```bash
cd interior
npm install
npm run dev        # 개발 서버 → http://localhost:3000
npm run build      # 배포용 정적 파일 생성 → out/
npm run lint       # 타입 검사
```

## 2. 배포하기 (둘 중 하나)

### Netlify (추천 — 상담 폼이 바로 동작해요)
1. Netlify에 로그인 → **Add new site → Import an existing project** → 이 GitHub 저장소 선택
2. **Base directory: `interior`** 만 입력 (빌드 명령 `npm run build`, 배포 폴더 `out`은 `netlify.toml`에 들어 있어요)
3. 배포가 끝나면 **Site configuration → Forms**에서 폼 감지(Form detection)를 켜고 한 번 더 배포
4. **Forms → Form notifications**에서 문의가 들어오면 받을 이메일을 등록

### Cloudflare Pages
1. Cloudflare → **Workers & Pages → Create → Pages → Connect to Git**
2. Root directory `interior`, Build command `npm run build`, Build output directory `out`
3. Cloudflare에는 폼 접수 기능이 없으니 아래 3장의 외부 폼 서비스를 연결하세요.

## 3. 상담 문의 폼 연결

`src/content/site.ts`의 `form.provider`로 정해요.

| 값 | 동작 |
|---|---|
| `"netlify"` (기본값) | Netlify에 배포하면 바로 접수. 무료 플랜 월 100건, 첨부 파일 포함. 접수 내역은 Netlify 관리자 화면에서 확인 |
| `"endpoint"` | `form.endpoint`에 외부 폼 서비스 주소를 넣어요 (Cloudflare Pages 등) |
| `"none"` | 접수 서비스 없음. 제출하면 **"아직 연결되지 않았다"는 안내만** 보여요 (가짜 접수 완료 메시지는 절대 보여주지 않아요) |

- 내 컴퓨터(localhost)에서 테스트하면 실제로 보내지 않고 "미리보기 환경이라 전송되지 않았어요"라고 안내해요.
- 무료로 쓸 수 있는 외부 폼 서비스 예 (무료 한도는 바뀔 수 있으니 가입 때 확인): **Web3Forms**(무료, 월 250건), **Formspree**(무료 월 50건, 파일 첨부는 유료), **Getform**(무료 플랜 있음).
  서비스마다 첨부 파일 지원 여부가 다르니 가입 전에 확인하세요.
- 문의 알림을 카카오톡이나 구글 시트로 받고 싶다면 Netlify Forms의 Outgoing webhook → Zapier/Make(무료 플랜) 연결을 쓰면 돼요.
- 입력 칸 이름을 바꿨다면 `public/__forms.html`도 똑같이 바꿔 주세요. (Netlify가 배포할 때 이 파일로 폼을 인식해요)
- 스팸 방지: 숨은 입력칸(honeypot) + 페이지를 연 지 3초 안의 자동 제출 차단. 스팸이 많아지면 Netlify Forms의 reCAPTCHA를 추가로 켤 수 있어요.

## 4. 내용 고치기 (코드를 몰라도 이 파일들만 고치면 돼요)

| 파일 | 내용 |
|---|---|
| `src/content/site.ts` | 브랜드명, 첫 화면 문구, About 문구·가치 4개, **회사 정보·연락처**, SNS, 폼 설정, 검색 노출 정보(도메인) |
| `src/content/portfolio.ts` | 포트폴리오 (프로젝트명, 지역, 공간 유형, 면적, 콘셉트, 시공 범위, 설명, 사진) |
| `src/content/sections.ts` | 서비스 4개, 차별점 5개, 진행 절차 6단계, 고객 후기, 자주 묻는 질문 6개 |
| `src/app/privacy/page.tsx` | 개인정보처리방침 |
| `public/images/` | 사진 파일 (WebP 권장, 가로 1200~1600px) |

## 5. 실제 정보로 꼭 바꿔야 할 항목

- [ ] **회사 정보** (`site.ts` → `company`): 회사명, 대표자, 사업자등록번호, 주소, 연락처, 이메일, 상담 시간, Instagram·블로그 주소
      → 비어 있으면 화면에 "입력 필요"라고 보여요.
- [ ] **도메인** (`site.ts` → `seo.url`): 지금은 `https://example.com`. 실제 주소로 바꿔야 검색엔진·공유 미리보기·사이트맵이 정확해져요.
- [ ] **포트폴리오 6개**: 지금은 모두 데모 프로젝트예요. 실제 시공 사례와 사진으로 바꾸고 `demo: false`로 바꾸세요.
- [ ] **사진 15장 + 공유 이미지(`og.jpg`)**: 지금은 AI로 만든 데모 이미지예요. 실제 시공 사진으로 바꾸세요.
      사진을 바꾸면 이미지 설명(`alt`)의 "(데모 이미지)"도 지우고 실제 설명으로 고쳐 주세요.
      첫 화면 · About · 서비스 사진 위의 "DEMO 이미지" 표시는 각 컴포넌트(`Hero.tsx`, `About.tsx`, `Services.tsx`)에서 지우면 돼요.
- [ ] **고객 후기**: 지금은 "SAMPLE" 표시가 된 예시예요. 고객 동의를 받은 실제 후기로 바꾸고 `sample: false`로 바꾸세요.
      실제 후기가 없으면 `reviews.visible: false`로 섹션을 숨기세요. 별점은 표시하지 않도록 만들어 두었어요.
- [ ] **자주 묻는 질문 답변**: 견적·공사 기간·사후관리(A/S 기간) 같은 운영 정책을 실제 기준에 맞게 고치세요.
- [ ] **예산·시기 선택지** (`Contact.tsx` 상단 `BUDGET`, `WHEN`): 실제 주력 가격대에 맞게 조정
- [ ] **개인정보처리방침**: [입력 필요] 항목, 보관 기간, 위탁 업체(Netlify 등)를 실제 운영 기준으로 채우고 시행일 입력
- [ ] **푸터의 데모 안내 문구** (`Footer.tsx`): 실제 사진으로 바꾼 뒤 삭제
- [ ] 차별점(Why) 5개 문구가 실제로 제공하는 서비스와 맞는지 확인 (확인되지 않은 보증 문구는 넣지 마세요)

## 6. 이미지 출처

`public/images/`의 사진은 모두 [Pollinations.ai](https://pollinations.ai)(무료, 상업 이용 가능)로 생성한 **AI 데모 이미지**이고, 실제 시공 사례가 아니에요.
화면에도 "DEMO" 표시를 해 두었어요. 오픈 전에 실제 시공 사진으로 교체하는 것을 강하게 권장해요.
무료 실사 사진이 필요하면 Unsplash·Pexels(무료 상업 이용 가능, 출처 표기 권장)를 쓸 수 있어요.

## 7. 구성

```
interior/
├─ src/app/            layout(메타·OG·구조화 데이터), page(원페이지), privacy, sitemap, robots, globals.css(디자인 토큰)
├─ src/components/     Header · Hero · About · Portfolio(필터+상세) · Services · Why · Process · Reviews · Faq · Contact · Footer · MobileCta · Motion
├─ src/content/        ← 내용 데이터 (여기만 고치면 돼요)
├─ public/             images, __forms.html(Netlify 폼 감지용), favicon, _headers(Cloudflare)
└─ netlify.toml
```

접근성: 본문 바로가기, 키보드로 모든 기능 사용 가능, 포트폴리오 상세는 ESC로 닫힘, 폼 오류는 해당 칸으로 이동·안내,
본문 글자색은 배경과 4.5:1 이상의 대비를 지켰어요.
