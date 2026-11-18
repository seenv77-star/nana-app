# KY연애코칭 홈페이지

`site/` 폴더 전체가 홈페이지예요. 빌드 과정 없이 이 폴더를 그대로 올리면 됩니다.

## 1. Netlify에 올리기

> ⚠️ **접속 제한 기능(아래 6장)은 "폴더 끌어다 놓기(Drop)" 배포에서는 동작하지 않아요.**
> 접속 제한까지 쓰려면 아래 **방법 A(GitHub 연결)**로 배포하세요.

### 방법 A. GitHub 연결 (추천: 접속 제한 동작)
1. [app.netlify.com](https://app.netlify.com) → **Add new site → Import an existing project → GitHub** → 이 저장소 선택
2. **Base directory: `site`** 만 입력하고 배포 (나머지는 `netlify.toml`에 들어 있어요)
3. **Site configuration → Forms → Form detection → Enable** 을 켜고 한 번 더 배포
4. **Forms → consult → Form notifications** 에서 새 신청을 이메일로 받도록 설정

### 방법 B. 폴더 끌어다 놓기 (간단하지만 접속 제한 없음)
1. [app.netlify.com/drop](https://app.netlify.com/drop)에 `site` 폴더를 통째로 끌어다 놓아요.
2. 위 3~4번처럼 Forms를 켜고 다시 한 번 끌어다 놓아요.

신청 내용(사연 포함)은 Netlify 관리 화면에서 **사이트 주인만** 볼 수 있어요. 이것이 '비공개 상담 신청'이에요.

## 2. 꼭 바꿔야 하는 것
| 항목 | 위치 |
|---|---|
| 카카오톡 채널 주소 | `assets/js/site.js` 맨 위 `CONFIG.kakaoChannel` (예: `https://pf.kakao.com/_xxxxxx/chat`) |
| 사업자 정보 5개 | `index.html` 바닥글의 `{{ }}` |
| 정예나 코치 프로필 사진 | `assets/img/studio.jpg` 를 프로필 사진으로 바꾸고, `index.html` 2장 KY의 `.ky-story-media` 사진 `alt` 수정 |

카카오톡 채널 주소를 넣으면 고객센터와 신청 완료 후의 "카카오톡으로 상담 신청" 버튼이 채널로 연결돼요. 머리말·첫 화면·떠 있는 버튼은 "사연 작성 후 상담 신청" 폼으로 이어져요.

## 3. 구성
- `index.html` — 화면별로 나뉜 한 페이지예요. 메뉴를 누르면 주소(#)에 맞는 화면만 보여요 (자바스크립트가 꺼져 있으면 모든 화면이 차례로 보여요).
  - **메인 (`#top`)**: 띠 배너, 첫 화면(KY · KING YOURSELF, 핵심 숫자 4개), 마음, 이런 분들께, KY가 다른 이유 4가지, KING YOURSELF 철학, 아직 상담 신청하지 마세요(오늘 밤 해 볼 3가지), 후기 일부, 진행 방법, 자주 묻는 질문 일부, 마무리
  - **KY 소개 (`#philosophy`)**: From King Yena to KING YOURSELF, 수많은 사랑을 지켜보며 깨달은 것, 상담 철학
  - **함께하는 고민 (`#concerns`)**, **상담 안내 (`#programs`, 상담 스타일 포함)**, **VIP 집중관리 (`#care`)**, **VVIP 컨설팅 (`#meet`)**, **후기 (`#reviews`)**, **FAQ (`#faq`)**, **상담 신청 (`#apply`)**
- `assets/css/site.css` — 디자인 (밤 → 새벽 톤, Hahmlet + Asta Sans)
- `assets/js/site.js` — 모션, 톤 전환, 상담 스타일 전환, 후기 넘기기, 신청 폼, 카카오톡 연결
- `assets/vendor/` — GSAP 3.13 (GreenSock 무료 'no charge' 라이선스, 상업적 이용 가능)

## 4. 이미지 출처
| 파일 | 출처 |
|---|---|
| `hero.jpg`, `cups.jpg`, `comfort.jpg`, `coach.jpg`, `studio.jpg` | Pollinations.ai 무료 AI 생성 이미지 (하단 워터마크 영역은 잘라냄) |
| `couple-warm.jpg`, `crying-phone.jpg`, `man-stressed.jpg`, `couple-distant.jpg` | 사용자 제공 사진 |

## 5. 접근성·동작
- '동작 줄이기' 설정이면 모든 모션 없이 처음부터 내용이 보여요.
- 자바스크립트가 꺼져 있어도 모든 내용이 보이고, 첫 커튼은 스스로 걷혀요.
- 키보드만으로 메뉴, 상담 스타일 탭(좌우 화살표), 신청 폼을 모두 쓸 수 있어요.

## 6. 접속 제한 (우회 차단)
`netlify/edge-functions/access-guard.js` 가 모든 접속을 먼저 확인해요. 설정은 파일 맨 위 `CONFIG` 에서 바꿔요.

| 접속 | 결과 |
|---|---|
| 한국에서 접속한 일반 방문자 | 통과 |
| 한국 밖에서 접속 | '접근 제한' 화면 (해외 거주자는 카카오톡 문의 안내) |
| 구글·네이버·다음·빙 검색엔진 | 통과 (검색 노출 유지) |
| 카카오톡·페이스북 등 링크 미리보기 | 통과 |
| AI 수집 봇 (GPTBot, ClaudeBot, CCBot 등) | 차단 (+ `robots.txt` 에서도 거부) |
| 자동 수집 도구 (curl, python, 헤드리스 브라우저 등) | 차단 |

- 해외 교민도 받으려면 `allowCountries: ["KR", "US", "JP", "CA", "AU"]` 처럼 나라를 추가해요.
- `kakaoChannel` 에 채널 주소를 넣으면 접근 제한 화면에 문의 버튼이 생겨요.
- 잠시 끄려면 `enabled: false`.
- 다른 사이트 안에 몰래 넣어 보여 주는 것(iframe)도 `netlify.toml` 의 헤더로 막아 두었어요.

**한계 (꼭 알아 두세요)**
- 한국 VPN을 쓰거나, 봇이 검색엔진 이름을 흉내 내면 완벽히 막을 수는 없어요. 화면에 보이는 글은 사람이 직접 복사할 수 있어요.
- Netlify 무료 플랜에는 월 사용량 한도가 있어요. 방문자가 많아지면 Netlify 사용량 화면을 확인하세요.
- 더 강하게 막으려면 도메인을 **Cloudflare(무료)** 에 연결하고 **Security → WAF → Custom rules** 에서
  `국가가 KR이 아니면 차단(또는 Managed Challenge)` 규칙과 **Bot Fight Mode** 를 켜면 돼요.
