/* =========================================================
   킹예나 연애상담 — 사이트 동작
   - 카카오톡 채널 주소는 아래 CONFIG.kakaoChannel 하나만 바꾸면 모든 버튼에 적용돼요.
   - 상담 신청 폼은 Netlify Forms로 전송돼요(배포 시 사이트 관리자만 열람 가능 = 비공개).
   - GSAP가 없거나 '동작 줄이기' 설정이면 모든 내용이 처음부터 그대로 보여요.
   ========================================================= */
(function () {
  "use strict";

  var CONFIG = {
    kakaoChannel: "",            // 예: "https://pf.kakao.com/_xxxxxx/chat"
    kakaoTitle: "킹예나 비공개 상담 신청"
  };

  var root = document.documentElement;
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var mobile = window.matchMedia("(max-width: 860px)").matches;
  var $ = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };

  /* ---------- 알림 ---------- */
  var toastEl = $(".toast"), toastTimer;
  function toast(msg) {
    toastEl.textContent = msg; toastEl.hidden = false;
    clearTimeout(toastTimer); toastTimer = setTimeout(function () { toastEl.hidden = true; }, 3200);
  }

  /* ---------- 복사 ---------- */
  function copyText(t) {
    function fallback() {
      var ta = document.createElement("textarea"); ta.value = t; ta.setAttribute("readonly", ""); ta.style.position = "fixed"; ta.style.opacity = "0";
      document.body.appendChild(ta); ta.select(); try { document.execCommand("copy"); } catch (e) { } document.body.removeChild(ta);
    }
    try { if (navigator.clipboard && window.isSecureContext) { navigator.clipboard.writeText(t).catch(fallback); return; } } catch (e) { }
    fallback();
  }

  /* ---------- 카카오톡 채널 ---------- */
  var lastSummary = "";
  $$("[data-kakao]").forEach(function (a) {
    if (CONFIG.kakaoChannel) { a.href = CONFIG.kakaoChannel; a.target = "_blank"; a.rel = "noopener"; }
    a.addEventListener("click", function (e) {
      if (a.hasAttribute("data-kakao-copy") && lastSummary) copyText(lastSummary);
      if (!CONFIG.kakaoChannel) {
        e.preventDefault();
        toast("카카오톡 채널 주소가 아직 연결되지 않았어요.");
      } else if (a.hasAttribute("data-kakao-copy")) {
        toast("신청 내용을 복사했어요. 채팅방에 붙여넣어 보내 주세요.");
      }
    });
  });

  /* ---------- 머리말, 메뉴, 진행 표시, 떠 있는 버튼 ---------- */
  var header = $("[data-header]");
  var progress = $(".progress i");
  var floatK = $(".float-kakao");
  var hero = $(".hero");
  var ticking = false;
  function onScroll() {
    var y = window.scrollY;
    header.classList.toggle("scrolled", y > 24);
    var max = document.documentElement.scrollHeight - window.innerHeight;
    progress.style.transform = "scaleX(" + (max > 0 ? y / max : 0) + ")";
    floatK.classList.toggle("on", y > hero.offsetHeight * 0.7);
    ticking = false;
  }
  window.addEventListener("scroll", function () { if (!ticking) { ticking = true; requestAnimationFrame(onScroll); } }, { passive: true });
  onScroll();

  var menuBtn = $(".menu-btn"), mm = $("#mobile-menu");
  function setMenu(open) {
    menuBtn.setAttribute("aria-expanded", String(open));
    $(".sr-only", menuBtn).textContent = open ? "메뉴 닫기" : "메뉴 열기";
    mm.hidden = !open;
    document.body.style.overflow = open ? "hidden" : "";
    header.style.color = open ? "var(--moon)" : "";
  }
  menuBtn.addEventListener("click", function () { setMenu(menuBtn.getAttribute("aria-expanded") !== "true"); });
  $$("a", mm).forEach(function (a) { a.addEventListener("click", function () { setMenu(false); }); });
  document.addEventListener("keydown", function (e) { if (e.key === "Escape" && !mm.hidden) { setMenu(false); menuBtn.focus(); } });

  /* ---------- 밤 → 새벽: 화면 가운데에 걸린 장의 톤으로 배경이 바뀐다 ---------- */
  root.classList.add("tone-js");
  var toneSections = $$("[data-tone]");
  if ("IntersectionObserver" in window) {
    var toneIO = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) { if (en.isIntersecting) root.dataset.tone = en.target.dataset.tone; });
    }, { rootMargin: "-48% 0px -48% 0px" });
    toneSections.forEach(function (s) { toneIO.observe(s); });
  }
  root.dataset.tone = "night";

  /* ---------- 상담 스타일: 사진 교차 전환 + 글 바꾸기 ---------- */
  var tabs = $$('[role="tab"]');
  var imgA = $(".sm-a"), imgB = $(".sm-b");
  var current = "comfort";
  function selectStyle(btn, focus) {
    var key = btn.dataset.style;
    tabs.forEach(function (t) {
      var on = t === btn;
      t.setAttribute("aria-selected", String(on));
      t.tabIndex = on ? 0 : -1;
    });
    $("#panel-style").setAttribute("aria-labelledby", btn.id);
    if (focus) btn.focus();
    if (key === current) return;
    // 두 장의 사진을 번갈아 쓰며 교차 전환 (깜빡임 없음)
    var showing = imgA.classList.contains("is-on") ? imgA : imgB;
    var hidden = showing === imgA ? imgB : imgA;
    hidden.src = btn.dataset.img;
    hidden.classList.add("is-on"); showing.classList.remove("is-on");
    var out = $('[data-style-body="' + current + '"]'), inn = $('[data-style-body="' + key + '"]');
    out.classList.add("is-leaving");
    setTimeout(function () {
      out.hidden = true; out.classList.remove("is-leaving");
      inn.hidden = false; inn.classList.add("is-leaving");
      requestAnimationFrame(function () { requestAnimationFrame(function () { inn.classList.remove("is-leaving"); }); });
    }, reduce ? 0 : 260);
    current = key;
  }
  tabs.forEach(function (t, i) {
    t.addEventListener("click", function () { selectStyle(t); });
    t.addEventListener("keydown", function (e) {
      if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
        e.preventDefault();
        var n = tabs[(i + (e.key === "ArrowRight" ? 1 : tabs.length - 1)) % tabs.length];
        selectStyle(n, true);
      }
    });
  });

  /* ---------- 후기 넘기기 ---------- */
  var track = $(".rv-track");
  $$("[data-rv]").forEach(function (b) {
    b.addEventListener("click", function () {
      var card = $(".rv", track);
      var step = card ? card.getBoundingClientRect().width + 28 : 400;
      track.scrollBy({ left: step * Number(b.dataset.rv), behavior: reduce ? "auto" : "smooth" });
    });
  });

  /* =========================================================
     비공개 상담 신청 (3단계)
     ========================================================= */
  var form = $("[data-apply-form]");
  var steps = $$(".af-step", form);
  var dots = $$(".af-steps li", form);
  var stepIdx = 0;

  // 상담 안내 목록에서 고르면 신청 폼에 미리 선택하고 이동
  $$("[data-pick-plan]").forEach(function (row) {
    row.addEventListener("click", function () {
      var r = $('input[data-plan="' + row.dataset.pickPlan + '"]', form);
      if (r) { r.checked = true; clearErr("plan"); }
      goStep(0, false);
      $("#apply").scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
      setTimeout(function () { (r || $('input[name="style"]', form)).focus({ preventScroll: true }); }, reduce ? 0 : 700);
    });
  });

  // 연락 방법에 따라 입력칸 바꾸기
  var contact = $("#contact"), contactLabel = $("[data-contact-label]");
  $$('input[name="contact_type"]', form).forEach(function (r) {
    r.addEventListener("change", function () {
      var phone = r.value === "휴대폰 번호" && r.checked;
      contactLabel.textContent = phone ? "휴대폰 번호" : "카카오톡 ID";
      contact.inputMode = phone ? "tel" : "text";
      contact.autocomplete = phone ? "tel" : "off";
    });
  });

  function showErr(name, msg) {
    var el = $('[data-err="' + name + '"]', form);
    if (msg) el.textContent = msg;
    el.hidden = false;
    $$('[name="' + name + '"]', form).forEach(function (f) { f.setAttribute("aria-invalid", "true"); if (el.id) f.setAttribute("aria-describedby", el.id); });
  }
  function clearErr(name) {
    var el = $('[data-err="' + name + '"]', form);
    if (el) el.hidden = true;
    $$('[name="' + name + '"]', form).forEach(function (f) { f.removeAttribute("aria-invalid"); });
  }
  form.addEventListener("input", function (e) { if (e.target.name) clearErr(e.target.name); });
  form.addEventListener("change", function (e) { if (e.target.name) clearErr(e.target.name); });

  function validate(i) {
    var bad = [];
    function radio(n) { if (!$('input[name="' + n + '"]:checked', form)) { showErr(n); bad.push($('input[name="' + n + '"]', form)); } }
    if (i === 0) { radio("plan"); radio("style"); }
    if (i === 1) {
      radio("topic");
      var s = $("#story");
      if (s.value.trim().length < 20) { showErr("story"); bad.push(s); }
    }
    if (i === 2) {
      var n = $("#nickname");
      if (!n.value.trim()) { showErr("nickname"); bad.push(n); }
      if (!contact.value.trim()) { showErr("contact"); bad.push(contact); }
      var w = $("#when");
      if (!w.value) { showErr("when"); bad.push(w); }
      var c = $('input[name="consent"]', form);
      if (!c.checked) { showErr("consent"); bad.push(c); }
    }
    if (bad.length) { bad[0].focus(); return false; }
    return true;
  }

  function goStep(i, animate) {
    var from = steps[stepIdx], to = steps[i];
    dots.forEach(function (d, k) {
      d.classList.toggle("is-on", k === i);
      d.classList.toggle("is-done", k < i);
      if (k === i) d.setAttribute("aria-current", "step"); else d.removeAttribute("aria-current");
    });
    if (from === to) { to.hidden = false; return; }
    var dir = i > stepIdx ? 1 : -1;
    stepIdx = i;
    if (window.gsap && !reduce && animate !== false) {
      gsap.to(from, { autoAlpha: 0, x: -24 * dir, duration: .28, ease: "power2.in", onComplete: function () {
        from.hidden = true; gsap.set(from, { clearProps: "all" });
        to.hidden = false;
        gsap.fromTo(to, { autoAlpha: 0, x: 28 * dir }, { autoAlpha: 1, x: 0, duration: .5, ease: "power3.out", clearProps: "all" });
      } });
    } else {
      from.hidden = true; to.hidden = false;
    }
  }
  $$("[data-next]", form).forEach(function (b) { b.addEventListener("click", function () { if (validate(stepIdx)) goStep(stepIdx + 1); }); });
  $$("[data-prev]", form).forEach(function (b) { b.addEventListener("click", function () { goStep(stepIdx - 1); }); });

  function summary() {
    var v = function (n) { var el = $('[name="' + n + '"]:checked', form) || $('[name="' + n + '"]', form); return el ? el.value : ""; };
    return ["[" + CONFIG.kakaoTitle + "]", "상담: " + v("plan"), "스타일: " + v("style"), "고민 유형: " + v("topic"),
      "닉네임: " + $("#nickname").value.trim(), "희망 시간: " + $("#when").value, "홈페이지에서 사연을 비공개로 작성했어요."].join("\n");
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    if (!validate(2)) return;
    var sendErr = $('[data-err="send"]', form);
    sendErr.hidden = true;
    var btn = $("[data-submit]", form);
    btn.disabled = true; btn.textContent = "보내는 중";
    lastSummary = summary();
    var preview = location.protocol === "file:" || /claude|localhost|127\.0\.0\.1/.test(location.hostname);
    var done = function (isPreview) {
      var head = $("[data-apply-head]"), ok = $("[data-apply-done]");
      if (isPreview) { var dt = $("[data-done-text]"); if (!dt.dataset.preview) { dt.dataset.preview = "1"; dt.textContent = "미리보기 화면이라 실제로 전송되지는 않았어요. 배포하면 이 단계에서 사연이 비공개로 전달돼요. " + dt.textContent; } }
      var rows = [["상담", "plan"], ["스타일", "style"], ["고민 유형", "topic"], ["닉네임", "nickname"], ["희망 시간", "when"]];
      var list = $("[data-receipt-list]");
      list.innerHTML = "";
      rows.forEach(function (r) {
        var el = $('[name="' + r[1] + '"]:checked', form) || $('[name="' + r[1] + '"]', form);
        var d = document.createElement("div"), dt = document.createElement("dt"), dd = document.createElement("dd");
        dt.textContent = r[0]; dd.textContent = el ? el.value : ""; d.appendChild(dt); d.appendChild(dd); list.appendChild(d);
      });
      var receipt = $("[data-apply-receipt]");
      form.hidden = true; receipt.hidden = false;
      if (window.gsap && !reduce) gsap.from(receipt, { opacity: 0, y: 30, duration: .9, ease: "power3.out", delay: .35, clearProps: "all" });
      if (window.gsap && !reduce) {
        gsap.to(head, { autoAlpha: 0, y: -16, duration: .35, ease: "power2.in", onComplete: function () {
          head.hidden = true; ok.hidden = false;
          gsap.from($$(".ln, p, .btn", ok), { autoAlpha: 0, y: 24, filter: mobile ? "none" : "blur(8px)", duration: .9, stagger: .09, ease: "power3.out", clearProps: "all" });
          ok.focus();
        } });
      } else { head.hidden = true; ok.hidden = false; ok.focus(); }
      $("#apply").scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
    };
    if (preview) { setTimeout(function () { done(true); }, 500); return; }
    fetch("/", { method: "POST", body: new FormData(form) })
      .then(function (res) { if (!res.ok) throw new Error(res.status); done(false); })
      .catch(function () {
        copyText(lastSummary);
        sendErr.textContent = "사연을 보내지 못했어요. 인터넷 연결을 확인하고 다시 보내 주세요. 계속 안 되면 카카오톡 채널로 문의해 주세요. 신청 내용은 복사해 두었어요.";
        sendErr.hidden = false;
        btn.disabled = false; btn.textContent = "비공개로 사연 보내기";
      });
  });

  /* =========================================================
     모션 (GSAP + ScrollTrigger)
     ========================================================= */
  var motionStarted = false;
  function motion() {
    if (motionStarted) return;
    motionStarted = true;
    if (!window.gsap || !window.ScrollTrigger || reduce) {
      document.body.classList.remove("is-loading");
      var c = $(".curtain"); if (c) c.remove();
      return;
    }
    gsap.registerPlugin(ScrollTrigger);
    root.classList.add("motion");
    var blur = function (px) { return mobile ? "blur(0px)" : "blur(" + px + "px)"; };

    /* 1) 커튼이 가운데부터 걷히고, 곧바로 첫 장면이 들어온다 (한 번의 연속 동작) */
    var heroLines = $$(".hero .ln");
    gsap.set(heroLines, { autoAlpha: 0, x: function (i) { return (i % 2 ? 1 : -1) * (mobile ? 30 : 90); }, filter: blur(14) });
    gsap.set("[data-hero-in]", { autoAlpha: 0, y: 20 });
    gsap.set("[data-hero-card]", { autoAlpha: 0, y: 40 });
    gsap.set(".hero-media img", { scale: 1.16 });
    var intro = gsap.timeline({ onComplete: function () { var c = $(".curtain"); if (c) c.remove(); document.body.classList.remove("is-loading"); } });
    intro
      .from(".curtain-mark", { autoAlpha: 0, y: 12, duration: .7, ease: "power2.out" })
      .to(".curtain-mark", { autoAlpha: 0, y: -10, duration: .45, ease: "power2.in" }, "+=.25")
      .to(".curtain-stripes i", { scaleY: 0, duration: 1.05, ease: "expo.inOut", stagger: { each: .07, from: "center" } }, "-=.1")
      .to(".hero-media img", { scale: 1, duration: 2.6, ease: "power2.out" }, "<")
      .to(heroLines, { autoAlpha: 1, x: 0, filter: "blur(0px)", duration: 1.5, ease: "power3.out", stagger: .14 }, "-=1.9")
      .to("[data-hero-in]", { autoAlpha: 1, y: 0, duration: 1, ease: "power2.out", stagger: .12 }, "-=1.1")
      .to("[data-hero-card]", { autoAlpha: 1, y: 0, duration: 1.1, ease: "power3.out" }, "-=1.0");

    /* 첫 장면을 떠날 때: 사진은 천천히, 글은 조금 빨리 위로 (깊이감) */
    gsap.to(".hero-media", { yPercent: 14, ease: "none", scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: true } });
    gsap.to(".hero-copy", { yPercent: -18, autoAlpha: .2, ease: "none", scrollTrigger: { trigger: ".hero", start: "40% top", end: "bottom top", scrub: true } });

    /* 2) 장 제목: 줄마다 좌우를 번갈아 흐림 속에서 들어온다. 스크롤에 묶여 있어 되감으면 그대로 되돌아간다 */
    $$(".ch:not(.hero) .display").forEach(function (h) {
      var lines = $$(".ln", h);
      if (h.closest("[data-apply-done]")) return;
      gsap.from(lines, {
        x: function (i) { return (i % 2 ? 1 : -1) * (mobile ? 28 : Math.min(window.innerWidth * 0.06, 96)); },
        opacity: 0, filter: blur(12),
        ease: "power2.out", stagger: .12,
        scrollTrigger: { trigger: h, start: "top 90%", end: "top 52%", scrub: 1.2 }
      });
    });

    /* 3) 장 번호판: 이름이 먼저, 숫자가 아래에서 올라온다 */
    $$(".ch .plate").forEach(function (p) {
      var tl = gsap.timeline({ scrollTrigger: { trigger: p, start: "top 92%", end: "top 70%", scrub: 1 } });
      tl.from($(".plate-name", p), { opacity: 0, x: 16, ease: "power2.out" })
        .from($(".plate-no", p), { yPercent: 110, opacity: 0, ease: "power2.out" }, "<.1");
    });

    /* 4) 본문: 아래에서 흐림을 벗으며 올라온다 */
    $$(".rise").forEach(function (el) {
      gsap.from(el, { y: 34, opacity: 0, filter: blur(6), ease: "power1.out",
        scrollTrigger: { trigger: el, start: "top 94%", end: "top 74%", scrub: 1 } });
    });

    /* 5) 사진: 장을 지나는 동안 천천히 원래 크기로 */
    $$("[data-media] img").forEach(function (img) {
      gsap.fromTo(img, { scale: 1.16 }, { scale: 1, ease: "none",
        scrollTrigger: { trigger: img.closest("[data-media]"), start: "top bottom", end: "bottom top", scrub: true } });
    });
    gsap.fromTo(".styles-media", { scale: 1.08 }, { scale: 1, ease: "none", scrollTrigger: { trigger: ".ch-styles", start: "top bottom", end: "bottom top", scrub: true } });

    window.addEventListener("load", function () { ScrollTrigger.refresh(); });
  }

  if (document.readyState === "complete") motion();
  else window.addEventListener("load", function () { motion(); });
  // 폰트·이미지 로딩이 너무 늦어도 2.6초 뒤에는 커튼이 반드시 걷힌다 (CSS 안전장치와 별개)
  setTimeout(motion, 2600);
})();
