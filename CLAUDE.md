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

## 참고 예시
- 실물 상품: `detail-page/pages/sneaker.html`
- 무형 서비스: `detail-page/pages/pt-program.html`
