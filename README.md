# nana-app

## 상세페이지 템플릿

전환 중심 설득 구조(15블록)로 모바일 상세페이지를 만드는 템플릿입니다.

```
docs/상세페이지-가이드.md      ← 구조·카피·디자인·AI 이미지 워크플로·체크리스트
detail-page/
  assets/detail-page.css      ← 공통 디자인
  assets/detail-page.js       ← window.PAGE 설정을 15블록 순서로 렌더링 + 구매 과정 체험
  pages/_template.html        ← 새 페이지 시작용 빈 템플릿
  pages/sneaker.html          ← 예시: 실물 상품(운동화)
  pages/pt-program.html       ← 예시: 무형 서비스(1:1 온라인 PT)
```

### 새 상세페이지 만들기
1. `pages/_template.html`을 복사해 이름을 바꿉니다.
2. `window.PAGE`의 `{{ }}`를 채웁니다. 필요 없는 블록은 지우면 자동으로 빠집니다.
3. 이미지는 `detail-page/images/`에 넣고 `src`를 채웁니다. 비워 두면 AI 프롬프트가 적힌 자리표시가 나옵니다.
4. 브라우저로 HTML 파일을 열어 확인합니다.
