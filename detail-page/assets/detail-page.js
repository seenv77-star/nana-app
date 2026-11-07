/* =========================================================
   상세페이지 렌더러
   - 각 페이지 HTML에서 window.PAGE = {...} 로 내용만 정의하면
     정해진 설득 구조 순서대로 화면을 그립니다.
   - 값이 없는 섹션은 자동으로 건너뜁니다.
   - 문자열에는 <br>, <span class="hl">강조</span>, <span class="mark">밑줄</span> 사용 가능.
   ========================================================= */
(function () {
  "use strict";

  var P = window.PAGE;
  if (!P) { console.error("window.PAGE 설정이 없습니다."); return; }

  /* 기본 섹션 순서 = 설득 흐름 (docs/상세페이지-가이드.md 2장 참고) */
  var DEFAULT_ORDER = [
    "hero",         // ① 첫 화면 후킹: 타깃 호명 + 꿈의 결과
    "proof",        // ② 증거·증명·가치 시각화 (맨 앞)
    "quote",        // ②+ (선택) 후기에서 가장 많이 나온 한 문장
    "problem",      // ③ 문제 공감: "혹시 이런 고민 있으세요?"
    "pain",         // ④ 잘못 해결하면 생기는 손해
    "alternatives", // ⑤ 흔한 대안과 그 한계
    "solution",     // ⑥ 그래서 탄생한 솔루션 + USP + 한끗 디테일
    "styles",       // ⑥+ (선택) 상담 스타일 고르기 (예: 공감 / 현실 코칭)
    "method",       // ⑥+ (선택) 변화가 일어나는 원리·과정
    "types",        // ⑥+ (선택) 고민 유형 고르기 → 답을 찾는 질문 + 추천 상품
    "features",     // ⑦ 기능·특징 (일반적 특징도 빠짐없이)
    "change",       // ⑦+ (선택) 사용 전 → 사용 후 미래 그려 주기
    "compare",      // ⑧ 일반 제품 vs 우리 제품
    "reviews",      // ⑨ 후기 + 많이 팔리는 현상
    "trust",        // ⑩ 스토리·권위·인증
    "howto",        // ⑪ 사용법·필요한 시간
    "fit",          // ⑪+ (선택) 이런 분께 추천 / 맞지 않아요 — 솔직함으로 신뢰
    "offer",        // ⑫ 가치 먼저 → 가격·구성 → 희소성
    "guarantee",    // ⑬ 보증 (위험 제거)
    "faq",          // ⑭ 구매 전 망설임 해소
    "final"         // ⑮ 최종 CTA
  ];

  /* ---------- 유틸 ---------- */
  function esc(s) {
    return String(s == null ? "" : s)
      .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
  }
  function won(n) { return Number(n).toLocaleString("ko-KR") + "원"; }
  function has(v) { return v != null && !(Array.isArray(v) && !v.length); }
  function head(o) {
    if (!o) return "";
    return '<div class="sec-head">' +
      (o.eyebrow ? '<span class="eyebrow">' + o.eyebrow + "</span>" : "") +
      (o.title ? '<h2 class="sec-title">' + o.title + "</h2>" : "") +
      (o.sub ? '<p class="sec-sub">' + o.sub + "</p>" : "") +
      "</div>";
  }
  /* 이미지 슬롯: src가 없으면 AI 생성 프롬프트를 보여주는 자리표시 */
  function img(o, extra) {
    if (!o) return "";
    if (o.mock && MOCK[o.mock]) {
      return '<figure class="mock-slot' + (extra ? " " + extra : "") + '" role="img" aria-label="' + esc(o.alt || o.label || "") + '">' + MOCK[o.mock](o) + "</figure>";
    }
    var ratio = o.ratio || "1/1";
    var cls = "img-slot" + (extra ? " " + extra : "");
    if (o.src) {
      return '<figure class="' + cls + '" style="aspect-ratio:' + ratio + '"><img src="' + esc(o.src) +
        '" alt="' + esc(o.alt || "") + '" loading="lazy"></figure>';
    }
    return '<figure class="' + cls + ' empty" style="aspect-ratio:' + ratio + '" role="img" aria-label="' + esc(o.alt || "이미지 자리") + '">' +
      '<span class="slot-label">📷 ' + esc(o.label || o.alt || "이미지 자리") + " · " + esc(ratio.replace("/", ":")) + "</span>" +
      (o.prompt ? '<span class="slot-prompt">AI 프롬프트: ' + esc(o.prompt) + "</span>" : "") +
      "</figure>";
  }
  function sec(inner, mod, id) {
    return '<section class="sec ' + (mod || "") + '"' + (id ? ' id="' + id + '"' : "") + ">" + inner + "</section>";
  }

  /* ---------- 화면 목업 이미지 (image: { mock: "chat" | "rewrite" | "report" | "call" | "timeline", ... })
     사진 대신 고객이 실제로 겪는 장면·서비스 결과물을 HTML로 그립니다. 한글이 정확하게 나옵니다. ---------- */
  var MOCK = {
    /* 메신저 대화창: msgs [{me:true, text, time, read}], draft(쓰다 만 메시지), alert(상단 알림), clock, title */
    chat: function (o) {
      return '<div class="mk-phone"><div class="mk-status"><span>' + esc(o.clock || "02:14") + '</span><span>▂▄▆ ▮▮▮</span></div>' +
        '<div class="mk-head"><span>‹</span><b>' + esc(o.title || "그 사람") + '</b><span>☰</span></div>' +
        '<div class="mk-body">' + (o.msgs || []).map(function (m) {
          return '<div class="mk-msg' + (m.me ? " me" : "") + '">' + (m.me ? '<span class="mk-meta">' + (m.read ? "읽음<br>" : "") + esc(m.time || "") + "</span>" : "") +
            "<p>" + esc(m.text) + "</p>" + (m.me ? "" : '<span class="mk-meta">' + esc(m.time || "") + "</span>") + "</div>";
        }).join("") + (o.alert ? '<div class="mk-alert">' + esc(o.alert) + "</div>" : "") + "</div>" +
        (o.draft ? '<div class="mk-input"><div class="mk-draft">' + esc(o.draft) + '<i class="mk-caret"></i></div><span class="mk-send">전송</span></div>' : "") +
        "</div>";
    },
    /* 보내면 멀어지는 문장 vs 다듬은 문장 */
    rewrite: function (o) {
      return '<div class="mk-rewrite"><div class="rw bad"><span class="rw-tag">✕ 지금 보내면 멀어지는 문장</span><p>' + esc(o.bad) + "</p></div>" +
        '<div class="rw-arrow">↓ 킹예나와 함께 다듬으면</div>' +
        '<div class="rw good"><span class="rw-tag">✓ 마음은 전하고, 부담은 줄인 문장</span><p>' + esc(o.good) + "</p></div>" +
        (o.tip ? '<div class="rw-tip">💡 ' + esc(o.tip) + "</div>" : "") + "</div>";
    },
    /* 상담 리포트 문서: title, sections [{h, text, hl, checks:[]}] */
    report: function (o) {
      return '<div class="mk-doc"><div class="doc-top"><span class="doc-badge">사연 리포트</span><span>' + esc(o.title || "") + "</span></div>" +
        (o.sections || []).map(function (s) {
          return '<div class="doc-sec"><b>' + esc(s.h) + "</b>" +
            (s.text ? "<p>" + esc(s.text) + "</p>" : '<i class="doc-line"></i><i class="doc-line short"></i>') +
            (s.hl ? '<p class="doc-hl">' + esc(s.hl) + "</p>" : "") +
            (s.checks ? "<ul>" + s.checks.map(function (c) { return "<li>" + esc(c) + "</li>"; }).join("") + "</ul>" : "") + "</div>";
        }).join("") + "</div>";
    },
    /* 통화 화면 + 통화 요약 메모 */
    call: function (o) {
      return '<div class="mk-call"><div class="call-av">' + esc(o.avatar || "예나") + '</div><b>' + esc(o.name || "킹예나 상담") + "</b>" +
        '<span class="call-time">' + esc(o.time || "24:37") + '</span><div class="call-btns"><i>🔇</i><i>📝</i><i>🔊</i></div>' +
        (o.memo ? '<div class="call-memo"><span>통화 요약 메모</span><ol>' + o.memo.map(function (m) { return "<li>" + esc(m) + "</li>"; }).join("") + "</ol></div>" : "") +
        "</div>";
    },
    /* 기간 관리 타임라인: steps [{when, title, text, done}] */
    timeline: function (o) {
      return '<div class="mk-timeline">' + (o.title ? '<div class="tl-title">' + esc(o.title) + "</div>" : "") + (o.steps || []).map(function (s) {
        return '<div class="tl-step' + (s.main ? " main" : "") + '"><span class="tl-dot">' + (s.main ? "★" : "✓") + '</span><div><small>' + esc(s.when) + "</small><b>" + esc(s.title) + "</b>" +
          (s.text ? "<p>" + esc(s.text) + "</p>" : "") + "</div></div>";
      }).join("") + "</div>";
    }
  };

  /* ---------- 섹션 렌더러 ---------- */
  var R = {
    hero: function (h) {
      var body = '<div class="hero-body">' +
        (h.callout ? '<span class="hero-callout">' + h.callout + "</span>" : "") +
        '<h1 class="hero-headline">' + h.headline + "</h1>" +
        (h.sub ? '<p class="hero-sub">' + h.sub + "</p>" : "") +
        (has(h.badges) ? '<div class="hero-badges">' + h.badges.map(function (b) { return "<span>" + b + "</span>"; }).join("") + "</div>" : "") +
        "</div>";
      /* style: "dark" → 어두운 배경, 문구 먼저(0.5초 후킹) + 목업 이미지 */
      if (h.style === "dark") return '<header class="hero hero-dark">' + body + '<div class="hero-visual">' + img(h.image) + "</div></header>";
      return '<header class="hero">' + img(h.image, "bleed") + body + "</header>";
    },

    proof: function (list) {
      return '<div class="proof">' + list.map(function (p) {
        return "<div><b>" + p.num + "</b><small>" + p.label + "</small></div>";
      }).join("") + "</div>";
    },

    problem: function (p) {
      /* results 가 있으면 누를 수 있는 자가진단 체크리스트 (스스로 체크 → 문제 인식·몰입) */
      if (has(p.results)) {
        return sec(head(p) + (p.image ? '<div class="sec-img">' + img(p.image) + "</div>" : "") + '<ul class="checklist selfcheck">' + p.items.map(function (i, n) {
          return '<li><button type="button" class="sc-item" data-sc="' + n + '" aria-pressed="false">' + i + "</button></li>";
        }).join("") + '</ul><div class="sc-result" aria-live="polite"><b class="sc-count">0 / ' + p.items.length + '</b><p class="sc-msg">' + p.results[0].text + "</p></div>" +
          (p.bridge ? '<p class="bridge">' + p.bridge + "</p>" : ""), "", "problem");
      }
      return sec(head(p) + (p.image ? '<div class="sec-img">' + img(p.image) + "</div>" : "") + '<ul class="checklist">' + p.items.map(function (i) { return "<li>" + i + "</li>"; }).join("") + "</ul>" +
        (p.bridge ? '<p class="bridge">' + p.bridge + "</p>" : ""), "", "problem");
    },

    pain: function (p) {
      /* stat: 실제 조사 데이터 카드 (출처 필수) */
      var stat = p.stat ? '<div class="stat-card"><b>' + p.stat.num + "</b><p>" + p.stat.label + '</p><small>출처: ' + p.stat.source + "</small></div>" : "";
      return sec(head(p) + (p.image ? '<div class="sec-img">' + img(p.image) + "</div>" : "") + stat + '<div class="cases">' + p.cases.map(function (c) {
        return '<div class="case"><b>' + c.title + "</b><p>" + c.text + "</p></div>";
      }).join("") + "</div>", "dark");
    },

    quote: function (q) {
      return '<div class="quote-band"><span class="q-label">' + (q.label || "후기에서 가장 많이 나온 말") + '</span><p>“' + q.text + '”</p>' +
        (q.by ? "<small>" + q.by + "</small>" : "") + "</div>";
    },

    /* 고민 유형 탭: items [{ name, who:[], questions:[], plan, sel:{옵션명: 값}, recText }] */
    types: function (t) {
      var planOf = function (id) { return ((P.offer && P.offer.plans) || []).filter(function (p) { return p.id === id; })[0]; };
      return sec(head(t) + '<div class="ty-tabs" role="tablist">' + t.items.map(function (it, i) {
        return '<button type="button" class="chip ty-tab' + (i ? "" : " on") + '" role="tab" aria-selected="' + (i ? "false" : "true") + '" data-type="' + i + '">' + it.name + "</button>";
      }).join("") + "</div>" + t.items.map(function (it, i) {
        var pl = planOf(it.plan);
        return '<div class="ty-panel" data-panel="' + i + '"' + (i ? " hidden" : "") + ">" +
          '<div class="ty-who"><b>이런 분이라면</b><ul>' + it.who.map(function (w) { return "<li>" + w + "</li>"; }).join("") + "</ul></div>" +
          '<div class="ty-qs"><b>' + (t.qTitle || "상담이 끝나면 답을 찾는 질문") + "</b>" + it.questions.map(function (q, n) {
            return '<div class="ty-q"><span>Q' + (n + 1) + "</span><p>" + q + "</p></div>";
          }).join("") + "</div>" +
          (pl ? '<div class="ty-plans"><b class="ty-plans-h">' + (t.plansTitle || "이 고민에 맞는 상담") + "</b>" +
            ((P.offer && P.offer.plans) || []).slice().sort(function (a, b) { return a.price - b.price; }).map(function (x) {
              var rec = x.id === pl.id;
              return '<button type="button" class="ty-plan' + (rec ? " rec" : "") + '" data-open-sheet data-plan="' + esc(x.id) + '"' +
                (it.sel ? " data-sel='" + esc(JSON.stringify(it.sel)) + "'" : "") + "><span>" + (rec ? "<em>추천</em>" : "") + x.name +
                (rec && it.recText ? "<small>" + it.recText + "</small>" : "") + "</span><b>" + won(x.price) + "</b></button>";
            }).join("") + "</div>" : "") +
          "</div>";
      }).join(""), "alt", "types");
    },

    /* 한눈에 보기: rows [{k, v}] */
    summary: function (m) {
      return sec(head(m) + '<dl class="summary">' + m.rows.map(function (r) {
        return "<div><dt>" + r.k + "</dt><dd>" + r.v + "</dd></div>";
      }).join("") + "</dl>", "alt", "summary");
    },

    /* 신청 전 체크사항: items [{t, d}] */
    notes: function (n) {
      return sec(head(n) + '<ul class="notes">' + n.items.map(function (i) {
        return "<li><b>" + i.t + "</b>" + (i.d ? "<p>" + i.d + "</p>" : "") + "</li>";
      }).join("") + "</ul>", "", "notes");
    },

    change: function (c) {
      return sec(head(c) + (c.image ? '<div class="sec-img">' + img(c.image) + "</div>" : "") + '<div class="change"><div class="ch-col before"><span class="ch-tag">' + (c.beforeLabel || "상담 전") + "</span><ul>" +
        c.before.map(function (i) { return "<li>" + i + "</li>"; }).join("") + '</ul></div><div class="ch-col after"><span class="ch-tag">' + (c.afterLabel || "상담 후") + "</span><ul>" +
        c.after.map(function (i) { return "<li>" + i + "</li>"; }).join("") + "</ul></div></div>", "alt");
    },

    fit: function (f) {
      return sec(head(f) + '<div class="fit"><div class="fit-col yes"><b>' + (f.yesTitle || "이런 분께 추천해요") + "</b><ul>" +
        f.yes.map(function (i) { return "<li>" + i + "</li>"; }).join("") + '</ul></div><div class="fit-col no"><b>' + (f.noTitle || "이런 분께는 맞지 않아요") + "</b><ul>" +
        f.no.map(function (i) { return "<li>" + i + "</li>"; }).join("") + "</ul></div></div>");
    },

    alternatives: function (a) {
      return sec(head(a) + (a.image ? '<div class="sec-img">' + img(a.image) + "</div>" : "") + '<div class="alts">' + a.items.map(function (it, i) {
        return '<div class="alt-item"><span class="num">' + String.fromCharCode(65 + i) + "</span><div><b>" + it.name + "</b><p>" + it.limit + "</p></div></div>";
      }).join("") + "</div>", "alt");
    },

    solution: function (s) {
      var html = '<div class="sec-head">' +
        '<span class="eyebrow">' + (s.eyebrow || "그래서 만들었습니다") + "</span>" +
        '<h2 class="solution-name">' + s.name + "</h2>" +
        (s.desc ? '<p class="sec-sub">' + s.desc + "</p>" : "") + "</div>" +
        (s.image ? img(s.image) : "");
      if (has(s.usp)) {
        html += '<div class="usp">' + s.usp.map(function (u) {
          return '<div class="usp-item"><span class="ic">' + (u.icon || "✔") + "</span><div><b>" + u.title + "</b><span>" + u.text + "</span></div></div>";
        }).join("") + "</div>";
      }
      if (s.onePoint) {
        var o = s.onePoint;
        html += '<div class="onepoint">' + (o.image ? img(o.image) : "") +
          '<div class="op-body"><span class="op-tag">' + (o.tag || "ONLY HERE · 한끗 차이") + "</span><h3>" + o.title + "</h3><p>" + o.text + "</p></div></div>";
      }
      return sec(html, "", "solution");
    },

    features: function (list) {
      return '<div class="features">' + list.map(function (f, i) {
        return '<article class="feature">' +
          '<span class="f-no">POINT ' + String(i + 1).padStart(2, "0") + (f.eyebrow ? " · " + f.eyebrow : "") + "</span>" +
          "<h3>" + f.title + "</h3><p>" + f.text + "</p>" +
          (has(f.points) ? '<div class="points">' + f.points.map(function (p) { return "<span>" + p + "</span>"; }).join("") + "</div>" : "") +
          (f.image ? img(f.image) : "") + "</article>";
      }).join("") + "</div>";
    },

    compare: function (c) {
      var cols = c.columns || ["일반 제품", "우리 제품"];
      return sec(head(c) +
        '<table class="compare"><thead><tr><th></th><th>' + cols[0] + '</th><th class="ours">' + cols[1] + "</th></tr></thead><tbody>" +
        c.rows.map(function (r) { return "<tr><td>" + r[0] + "</td><td>" + r[1] + '</td><td class="ours">' + r[2] + "</td></tr>"; }).join("") +
        "</tbody></table>", "alt");
    },

    reviews: function (r) {
      var html = head(r) + (r.summary ? '<div class="rv-summary"><b>' + (r.summaryTitle || "후기를 요약했어요") + "</b><p>" + r.summary + "</p></div>" : "");
      if (r.rating) {
        html += '<div class="rating-box"><div class="score">' + r.rating + '</div><div class="stars">★★★★★</div>' +
          (r.count ? '<div class="muted" style="font-size:13px;margin-top:4px">' + r.count + "</div>" : "") + "</div>";
      }
      html += '<div class="reviews">' + r.items.map(function (v) {
        return '<div class="review"><div class="r-head"><span class="stars">' + (v.stars === 0 ? "" : "★★★★★".slice(0, v.stars || 5)) + "</span><span>" + esc(v.name) + (v.meta ? " · " + esc(v.meta) : "") + "</span></div>" +
          (v.title ? '<div class="r-title">' + v.title + "</div>" : "") + "<p>" + v.text + "</p>" + (v.image ? img(v.image) : "") + "</div>";
      }).join("") + "</div>";
      if (r.notice) html += '<div class="notice-card"><b>' + r.notice.title + "</b><p>" + r.notice.text + "</p></div>";
      return sec(html, "", "reviews");
    },

    /* 상담 스타일 카드: items [{ icon, tag, name, who:[], promise, sel:{}, cta, dark }] */
    styles: function (s) {
      return sec(head(s) + '<div class="styles">' + s.items.map(function (it) {
        return '<div class="st-card' + (it.dark ? " dark" : "") + '"><span class="st-ic">' + it.icon + "</span>" +
          (it.tag ? '<small class="st-tag">' + it.tag + "</small>" : "") + "<h3>" + it.name + "</h3>" +
          "<ul>" + it.who.map(function (w) { return "<li>" + w + "</li>"; }).join("") + "</ul>" +
          (it.promise ? '<p class="st-promise">' + it.promise + "</p>" : "") +
          '<button class="btn' + (it.dark ? "" : " ghost") + '" data-open-sheet' + (it.sel ? " data-sel='" + esc(JSON.stringify(it.sel)) + "'" : "") + ">" + (it.cta || "이 스타일로 신청") + "</button></div>";
      }).join("") + "</div>" + (s.note ? '<p class="st-note">' + s.note + "</p>" : ""), "", "styles");
    },

    /* 변화 원리: steps [{title, text}], quote {text, by} */
    method: function (m) {
      return sec(head(m) + '<ol class="method">' + m.steps.map(function (st, i) {
        return '<li><span class="me-no">' + String(i + 1).padStart(2, "0") + "</span><div><b>" + st.title + "</b><p>" + st.text + "</p></div></li>";
      }).join("") + "</ol>" +
        (m.quote ? '<blockquote class="me-quote"><p>“' + m.quote.text + "”</p><small>" + (m.quote.by || "") + "</small></blockquote>" : ""), "dark", "method");
    },

    trust: function (t) {
      return sec(head(t) + (t.image ? img(t.image) : "") +
        (t.story ? '<p class="trust-story" style="margin-top:' + (t.image ? "20px" : "0") + '">' + t.story + "</p>" : "") +
        (has(t.people) ? '<div class="tr-people"><small>' + (t.peopleTitle || "가까이에서 지켜본 연애") + "</small><div>" +
          t.people.map(function (x) { return "<span>" + x + "</span>"; }).join("") + "</div></div>" : "") +
        (t.story2 ? '<p class="trust-story">' + t.story2 + "</p>" : "") +
        (has(t.badges) ? '<div class="trust-badges">' + t.badges.map(function (b) { return "<div>" + b + "</div>"; }).join("") + "</div>" : ""), "dark");
    },

    howto: function (h) {
      return sec('<div class="sec-head">' + (h.eyebrow ? '<span class="eyebrow">' + h.eyebrow + "</span>" : "") +
        '<h2 class="sec-title">' + h.title + "</h2>" + (h.timeCost ? '<span class="timecost">⏱ ' + h.timeCost + "</span>" : "") + "</div>" +
        '<div class="steps">' + h.steps.map(function (s, i) {
          return '<div class="step"><span class="s-no">' + (i + 1) + "</span><div><b>" + s.title + "</b><span>" + s.text + "</span></div></div>";
        }).join("") + "</div>", "alt");
    },

    offer: function (o) {
      var html = head(o);
      if (has(o.values)) {
        html += '<div class="value-list">' + o.values.map(function (v) {
          /* worth(금액)가 없으면 '포함'으로 표시 — 근거 없는 가치 금액은 쓰지 않는다 */
          return v.worth ? "<div><span>" + v.label + "</span><span>" + v.worth + "</span></div>"
            : '<div><span>' + v.label + '</span><span class="incl">✓ 포함</span></div>';
        }).join("") + (o.valueTotal ? '<div class="total"><span>총 가치</span><span>' + o.valueTotal + "</span></div>" : "") + "</div>";
      }
      if (has(o.plans)) {
        /* 상품이 여러 개(가격이 다른 플랜)일 때: 플랜 카드 */
        html += '<div class="plans">' + o.plans.map(function (pl) {
          var r = pl.original ? Math.round((1 - pl.price / pl.original) * 100) : 0;
          return '<div class="plan' + (pl.featured ? " featured" : "") + (pl.premium ? " premium" : "") + '">' +
            (pl.badge ? '<span class="pl-badge">' + pl.badge + "</span>" : "") +
            '<div class="pl-name">' + pl.name + "</div>" + (pl.desc ? '<div class="pl-desc">' + pl.desc + "</div>" : "") +
            '<div class="pl-price">' + (pl.original ? "<s>" + won(pl.original) + "</s>" : "") +
            (r > 0 ? '<span class="p-rate">' + r + "%</span>" : "") + "<b>" + won(pl.price) + "</b></div>" +
            (pl.note ? '<div class="pl-note">' + pl.note + "</div>" : "") +
            (has(pl.items) ? "<ul>" + pl.items.map(function (i) { return "<li>" + i + "</li>"; }).join("") + "</ul>" : "") +
            '<button class="btn' + (pl.featured || pl.premium ? "" : " ghost") + '" data-open-sheet data-plan="' + esc(pl.id) + '">' + (pl.cta || "이걸로 신청하기") + "</button></div>";
        }).join("") + "</div>";
      } else {
        var rate = o.original ? Math.round((1 - o.price / o.original) * 100) : 0;
        html += '<div class="price-card"><div class="p-name">' + (o.name || P.meta.name) + "</div>" +
          (o.original ? '<div class="p-original">정가 ' + won(o.original) + "</div>" : "") +
          '<div class="p-row">' + (rate > 0 ? '<span class="p-rate">' + rate + "%</span>" : "") + '<span class="p-price">' + won(o.price) + "</span></div>" +
          (o.perDay ? '<div class="p-per">' + o.perDay + "</div>" : "") +
          (has(o.items) ? "<ul>" + o.items.map(function (i) { return "<li>" + i + "</li>"; }).join("") + "</ul>" : "") +
          "</div>";
      }
      if (o.scarcity) {
        var s = o.scarcity;
        html += '<div class="scarcity">' + (s.reason ? '<div class="reason">' + s.reason + "</div>" : "") +
          (s.deadline ? '<div class="timer" data-deadline="' + esc(s.deadline) + '">--</div>' : "") +
          (s.stockTotal ? '<div class="stock">' + (s.stockLabel || "남은 수량") + " <b>" + s.stockLeft + "</b> / " + s.stockTotal +
            '<div class="stock-bar"><i style="width:' + Math.max(4, Math.round(s.stockLeft / s.stockTotal * 100)) + '%"></i></div></div>' : "") +
          "</div>";
      }
      return sec(html, "", "offer");
    },

    guarantee: function (g) {
      return sec('<div class="guarantee"><div class="seal">' + (g.seal || "100%<br>보증") + "</div><div><b>" + g.title + "</b><p>" + g.text + "</p></div></div>", "alt");
    },

    faq: function (f) {
      return sec(head({ eyebrow: f.eyebrow || "FAQ", title: f.title || "구매 전, 이게 궁금하셨죠?" }) +
        '<div class="faq">' + f.items.map(function (i) {
          return "<details><summary>" + i.q + '</summary><div class="a">' + i.a + "</div></details>";
        }).join("") + "</div>");
    },

    final: function (f) {
      return sec('<div class="final">' + (f.image ? '<div class="sec-img">' + img(f.image) + "</div>" : "") + '<h2 class="sec-title">' + f.headline + "</h2>" +
        (f.text ? '<p class="sec-sub">' + f.text + "</p>" : "") +
        '<button class="btn" data-open-sheet>' + (P.cta && P.cta.label || "지금 구매하기") + "</button>" +
        (P.cta && P.cta.sub ? '<p class="cta-sub">' + P.cta.sub + "</p>" : "") + "</div>", "alt");
    }
  };

  /* ---------- 테마 적용 ---------- */
  var t = (P.meta && P.meta.theme) || {};
  Object.keys(t).forEach(function (k) {
    document.documentElement.style.setProperty("--" + k.replace(/[A-Z]/g, function (m) { return "-" + m.toLowerCase(); }), t[k]);
  });
  if (P.meta && P.meta.title) document.title = P.meta.title;

  /* ---------- 페이지 조립 ---------- */
  var root = document.getElementById("app") || document.body;
  var out = "";
  if (P.meta && P.meta.demo) out += '<div class="demo-bar">※ 예시 문구·수치·후기입니다. 실제 데이터로 교체한 뒤 사용하세요.</div>';
  (P.order || DEFAULT_ORDER).forEach(function (key) {
    if (has(P[key]) && R[key]) out += R[key](P[key]);
  });

  var plans = (P.offer && P.offer.plans) || [];
  var price = P.offer ? P.offer.price : 0;
  var stickyPrice;
  if (plans.length) {
    var minPrice = Math.min.apply(null, plans.map(function (p) { return p.price; }));
    stickyPrice = "<span>이벤트가</span><b>" + won(minPrice) + "~</b>";
  } else {
    stickyPrice = (P.offer && P.offer.original ? "<s>" + won(P.offer.original) + "</s>" : "") + "<b>" + (price ? won(price) : "") + "</b>";
  }
  out += '<div class="sticky-cta"><div class="s-price">' + stickyPrice +
    '</div><button class="btn" data-open-sheet>' + ((P.cta && P.cta.label) || "구매하기") + "</button></div>";
  root.innerHTML = '<main class="page">' + out + "</main>" +
    '<div class="sheet-backdrop" data-close-sheet></div><div class="sheet" role="dialog" aria-modal="true" aria-label="구매 과정"></div>';

  /* ---------- 카운트다운 (실제 마감일 기준, 지나면 '종료') ---------- */
  var timers = root.querySelectorAll("[data-deadline]");
  function tick() {
    timers.forEach(function (el) {
      var d = new Date(el.getAttribute("data-deadline")) - new Date();
      if (isNaN(d)) { el.textContent = ""; return; }
      if (d <= 0) { el.textContent = "혜택이 종료되었습니다"; return; }
      var dd = Math.floor(d / 864e5), hh = Math.floor(d / 36e5) % 24, mm = Math.floor(d / 6e4) % 60, ss = Math.floor(d / 1e3) % 60;
      el.textContent = (dd ? dd + "일 " : "") + [hh, mm, ss].map(function (n) { return String(n).padStart(2, "0"); }).join(":") + " 남음";
    });
  }
  if (timers.length) { tick(); setInterval(tick, 1000); }

  /* =========================================================
     구매 과정 체험하기 (옵션 선택 → 주문 정보 확인 → 완료)
     실제 결제는 일어나지 않는 시연용입니다.
     ========================================================= */
  var cfg = P.purchase || {};
  var opts = cfg.options || [];
  var sheet = root.querySelector(".sheet");
  var backdrop = root.querySelector(".sheet-backdrop");
  var state;

  function reset(planId) { state = { step: 1, sel: {}, qty: 1, plan: planId || null }; }
  function curPlan() { return plans.filter(function (p) { return p.id === state.plan; })[0]; }
  function unit() { return plans.length ? (curPlan() ? curPlan().price : 0) : price; }
  function total() { return unit() * state.qty + (cfg.shipping || 0); }
  /* when: ["플랜id"] 가 있으면 해당 플랜을 골랐을 때만 보이는 옵션 */
  function visibleOpts() {
    return opts.filter(function (o) { return !o.when || o.when.indexOf(state.plan) > -1; });
  }
  function ready() {
    return (!plans.length || curPlan()) && visibleOpts().every(function (o) { return state.sel[o.name]; });
  }
  function bar() {
    return '<div class="grab"></div><div class="s-steps">' + [1, 2, 3].map(function (n) {
      return "<i" + (n <= state.step ? ' class="on"' : "") + "></i>";
    }).join("") + "</div>";
  }

  function draw() {
    var h = bar();
    if (state.step === 1) {
      h += "<h4>" + (cfg.step1Title || "옵션을 선택해 주세요") + "</h4>";
      if (plans.length) {
        h += '<div class="opt"><div class="opt-label">' + esc(cfg.planLabel || "상품") + '</div><div class="plan-pick">' + plans.map(function (p) {
          return '<button class="chip pick' + (state.plan === p.id ? " on" : "") + '" data-pick="' + esc(p.id) + '"><span>' + esc(p.name) + "</span><b>" + won(p.price) + "</b></button>";
        }).join("") + "</div></div>";
      }
      visibleOpts().forEach(function (o) {
        h += '<div class="opt"><div class="opt-label">' + esc(o.name) + '</div><div class="chips">' + o.values.map(function (v) {
          var sold = (o.soldOut || []).indexOf(v) > -1;
          return '<button class="chip' + (state.sel[o.name] === v ? " on" : "") + '" data-opt="' + esc(o.name) + '" data-val="' + esc(v) + '"' + (sold ? " disabled" : "") + ">" + esc(v) + "</button>";
        }).join("") + "</div></div>";
      });
      if (cfg.qty !== false) {
        h += '<div class="opt"><div class="opt-label">수량</div><div class="qty"><button data-qty="-1" aria-label="수량 빼기">−</button><span>' + state.qty + '</span><button data-qty="1" aria-label="수량 더하기">+</button></div></div>';
      }
      h += '<div class="sum"><span>총 결제 예정 금액</span><b>' + won(total()) + "</b></div>" +
        '<div class="actions"><button class="btn ghost" data-close-sheet>닫기</button><button class="btn" data-next' + (ready() ? "" : " disabled") + ">다음 단계</button></div>";
    } else if (state.step === 2) {
      h += "<h4>" + (cfg.step2Title || "주문 정보를 확인해 주세요") + "</h4><div class=\"receipt\"><div><span>상품</span><span>" +
        esc(curPlan() ? curPlan().name : P.meta.name) + "</span></div>";
      visibleOpts().forEach(function (o) { h += "<div><span>" + esc(o.name) + "</span><span>" + esc(state.sel[o.name]) + "</span></div>"; });
      if (cfg.qty !== false) h += "<div><span>수량</span><span>" + state.qty + "개</span></div>";
      h += "<div><span>상품 금액</span><span>" + won(unit() * state.qty) + "</span></div>" +
        (cfg.shipping === false ? "" : "<div><span>배송비</span><span>" + (cfg.shipping ? won(cfg.shipping) : "무료") + "</span></div>") +
        (has(cfg.gifts) ? "<div><span>사은품</span><span>" + cfg.gifts.join(", ") + "</span></div>" : "") +
        '<div class="total"><span>최종 결제 금액</span><span>' + won(total()) + "</span></div></div>" +
        '<div class="actions"><button class="btn ghost" data-prev>이전</button><button class="btn" data-next>' + (cfg.submitLabel || "주문 완료하기") + "</button></div>";
    } else {
      var cp = curPlan() || {};
      h += '<div class="done"><div class="check">✓</div><h4>' + (cfg.doneTitle || "주문이 완료되었습니다!") + "</h4><p>" +
        (cp.doneText || cfg.doneText || "실제 판매 페이지에서는 이 단계에서 결제가 진행됩니다.") + '</p></div><div class="actions single"><button class="btn" data-close-sheet>닫기</button></div>';
    }
    h += '<p class="note">※ 구매 과정 체험용 화면입니다. 실제 결제는 이루어지지 않습니다.</p>';
    sheet.innerHTML = h;
  }

  function open(planId, sel) { reset(planId); if (sel) { try { state.sel = JSON.parse(sel); } catch (e) { } } draw(); sheet.classList.add("on"); backdrop.classList.add("on"); document.body.style.overflow = "hidden"; }
  function close() { sheet.classList.remove("on"); backdrop.classList.remove("on"); document.body.style.overflow = ""; }

  root.addEventListener("click", function (e) {
    var el = e.target.closest("button, [data-close-sheet]");
    if (!el) return;
    if (el.dataset.sc) {
      var on = el.getAttribute("aria-pressed") !== "true";
      el.setAttribute("aria-pressed", String(on));
      var pr = P.problem, cnt = root.querySelectorAll('.sc-item[aria-pressed="true"]').length, msg = pr.results[0].text;
      pr.results.forEach(function (r) { if (cnt >= (r.min || 0)) msg = r.text; });
      root.querySelector(".sc-count").textContent = cnt + " / " + pr.items.length;
      root.querySelector(".sc-msg").innerHTML = msg;
      root.querySelector(".sc-result").classList.toggle("hot", cnt >= (pr.hotFrom || 3));
      return;
    }
    if (el.dataset.type) {
      root.querySelectorAll(".ty-tab").forEach(function (b) { var on = b === el; b.classList.toggle("on", on); b.setAttribute("aria-selected", String(on)); });
      root.querySelectorAll(".ty-panel").forEach(function (p) { p.hidden = p.dataset.panel !== el.dataset.type; });
      return;
    }
    if (el.hasAttribute("data-open-sheet")) return open(el.dataset.plan, el.dataset.sel);
    if (el.hasAttribute("data-close-sheet")) return close();
    if (el.dataset.pick) { state.plan = el.dataset.pick; return draw(); }
    if (el.dataset.opt) { state.sel[el.dataset.opt] = el.dataset.val; return draw(); }
    if (el.dataset.qty) { state.qty = Math.min(cfg.maxQty || 10, Math.max(1, state.qty + Number(el.dataset.qty))); return draw(); }
    if (el.hasAttribute("data-next") && !el.disabled) { state.step++; return draw(); }
    if (el.hasAttribute("data-prev")) { state.step--; return draw(); }
  });
  document.addEventListener("keydown", function (e) { if (e.key === "Escape") close(); });
})();
