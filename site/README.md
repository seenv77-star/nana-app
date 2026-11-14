# 킹예나 연애상담 홈페이지

`site/` 폴더 전체가 홈페이지예요. 빌드 과정 없이 이 폴더를 그대로 올리면 됩니다.

## 1. Netlify에 올리기
1. [app.netlify.com/drop](https://app.netlify.com/drop)에 `site` 폴더를 통째로 끌어다 놓아요.
2. 생성된 사이트 → **Site configuration → Forms → Form detection → Enable** 을 켜요.
   (새 사이트는 기본으로 꺼져 있어서, 켜지 않으면 상담 신청이 저장되지 않아요.)
3. 같은 폴더를 한 번 더 끌어다 놓아 다시 배포해요. 이제 `consult` 폼이 잡혀요.
4. **Forms → consult → Form notifications** 에서 새 신청이 오면 이메일로 받도록 설정해요.

신청 내용(사연 포함)은 Netlify 관리 화면에서 **사이트 주인만** 볼 수 있어요. 이것이 '비공개 상담 신청'이에요.

## 2. 꼭 바꿔야 하는 것
| 항목 | 위치 |
|---|---|
| 카카오톡 채널 주소 | `assets/js/site.js` 맨 위 `CONFIG.kakaoChannel` (예: `https://pf.kakao.com/_xxxxxx/chat`) |
| 사업자 정보 5개 | `index.html` 바닥글의 `{{ }}` |
| 킹예나 프로필 사진 | `assets/img/studio.jpg` 를 프로필 사진으로 바꾸고, `index.html` 5장 사진의 `alt` 수정 |

카카오톡 채널 주소를 넣으면 고객센터와 신청 완료 후의 "카카오톡으로 상담 신청" 버튼이 채널로 연결돼요. 머리말·첫 화면·떠 있는 버튼은 "사연 작성 후 상담 신청" 폼으로 이어져요.

## 3. 구성
- `index.html` — 첫 장면, 1장 마음, 2장 철학, 3장 두 가지 상담, 4장 상담 안내(사연 리포트·카톡·전화·30일 집중관리), 5장 킹예나, 6장 후기, 7장 자주 묻는 질문, 사랑의 가치, 사연 작성 후 상담 신청(3단계), 바닥글(취소·환불 규정, 이용 안내, 개인정보, 사업자 정보)
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
