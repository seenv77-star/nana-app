# nana-app 작업 규칙

## 상세페이지(랜딩페이지)를 만들 때

상세페이지 요청이 오면 항상 아래 순서를 따른다.

1. **`docs/상세페이지-가이드.md`를 먼저 읽는다.** 디자인·내용 구성·구조의 기준이다.
2. 가이드 1장의 **INPUT 값**(Target, Problem, Features, Benefits, Price, Guarantee, ProofData, AltOptions/AltLimits, TimeCost, Story, Scarcity+명분, CTA, OnePoint, FAQ 재료)을 정리한다. 사용자가 주지 않은 값은 임의로 지어내지 말고 질문하거나, 예시임을 명시하고 `meta.demo: true`로 둔다.
3. `detail-page/pages/_template.html`을 복사해 `detail-page/pages/<상품영문명>.html`로 만들고 `window.PAGE` 내용만 채운다. 렌더링·디자인은 `detail-page/assets/`의 공통 CSS/JS가 담당한다.
4. 구조는 가이드 2장의 **15블록 설득 흐름**을 따른다. 특히:
   - 증거·증명·가치 시각화는 첫 화면 바로 아래(맨 앞)
   - 가격 앞에 반드시 가치 목록
   - 한끗(원포인트) 디테일 1개
   - 희소성에는 명분, 수치는 사실만
   - FAQ는 경쟁 상품 1점 후기·구매 전 망설임 해소
5. 이미지가 없으면 `src`를 비우고 `prompt`에 AI 이미지 프롬프트(가이드 5장 표)를 적는다.
6. Playwright로 390px 모바일 화면을 확인한다 (가로 스크롤 없음, 구매 체험 3단계 동작).
7. 가이드 6장 체크리스트로 점검한다.

## 문구 줄바꿈 규칙 (상세페이지·홈페이지 공통)
- 두 문장 이상인 설명은 **문장마다 줄을 바꾼다.**
  예) `좋은 조건이 좋은 관계를 만들지는 않습니다.<br>상대를 바라보는 안목과 감정을 다루는 태도를 함께 봅니다.`
- 한 문장이 길면 **의미가 끊기는 쉼표 자리**에서 줄을 바꾼다.
  예) `6년의 라이브 방송으로 들어 온 수많은 사연,<br>그리고 서로 다른 조건의 사람들과 직접 사랑해 본 경험.`
- 모바일에서 한 단어만 남는 줄이 생기지 않도록 가운데 정렬 글에는 `text-wrap: balance`, 왼쪽 정렬 글에는 `text-wrap: pretty`를 함께 쓴다.

## 참고 구조 (벤치마킹)
- **기간제 프로그램·코칭·챌린지형 상품**(기수, 결과물 리포트, 커뮤니티형/셀프형 플랜)을 만들 때는
  `docs/참고-류디-40일기록프로그램-구조.md`의 섹션 흐름과 설득 패턴을 참고한다.
  구조만 빌리고 문구·사례·수치는 우리 상품의 사실로 새로 쓴다.

## 참고 예시
- 실물 상품: `detail-page/pages/sneaker.html`
- 무형 서비스: `detail-page/pages/pt-program.html`
- 상품 여러 개(플랜): `detail-page/pages/king-yena-love.html`
