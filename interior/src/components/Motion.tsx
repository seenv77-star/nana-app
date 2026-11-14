"use client";

import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/**
 * 스크롤 모션 (GSAP + ScrollTrigger)
 *  - [data-reveal]  : 아래에서 천천히 떠오름
 *  - [data-split]   : 영문 제목을 단어 단위로 올림
 *  - [data-wipe]    : 사진이 아래에서 위로 열리듯 드러남
 *  - [data-parallax]: 사진이 프레임 안에서 살짝 움직임
 *  - Process        : 데스크톱에서 세로 스크롤 → 가로 이동
 * '동작 줄이기'를 켠 사용자에게는 모든 모션을 끄고 바로 보여 줘요.
 * 화면에 이미 보이는 요소는 숨겼다가 다시 보여 주지 않아요(깜빡임 방지).
 */
export default function Motion() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const below = (el: Element) => el.getBoundingClientRect().top > window.innerHeight * 0.92;

      // 제목 단어 분리
      gsap.utils.toArray<HTMLElement>("[data-split]").forEach((el) => {
        if (!below(el) || el.dataset.splitDone) return;
        el.dataset.splitDone = "1";
        const label = el.textContent ?? "";
        el.setAttribute("aria-label", label);
        el.innerHTML = label
          .split(" ")
          .map((w) => `<span aria-hidden="true" style="display:inline-block;overflow:hidden;vertical-align:top;padding-bottom:.08em"><span class="w" style="display:inline-block">${w}</span></span>`)
          .join(" ");
        gsap.from(el.querySelectorAll(".w"), {
          yPercent: 110,
          duration: 1.2,
          ease: "power4.out",
          stagger: 0.07,
          scrollTrigger: { trigger: el, start: "top 88%", once: true },
        });
      });

      gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((el) => {
        if (!below(el)) return;
        gsap.from(el, {
          opacity: 0,
          y: 36,
          duration: 1.1,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 90%", once: true },
        });
      });

      gsap.utils.toArray<HTMLElement>("[data-wipe]").forEach((el) => {
        if (!below(el)) return;
        const img = el.querySelector("img");
        const tl = gsap.timeline({ scrollTrigger: { trigger: el, start: "top 86%", once: true } });
        tl.from(el, { clipPath: "inset(100% 0% 0% 0%)", duration: 1.4, ease: "expo.inOut" });
        if (img) tl.from(img, { scale: 1.25, duration: 1.8, ease: "expo.out" }, 0.1);
      });

      gsap.utils.toArray<HTMLElement>("[data-parallax]").forEach((img) => {
        gsap.fromTo(img, { yPercent: -6, scale: 1.12 }, { yPercent: 6, scale: 1.12, ease: "none", scrollTrigger: { trigger: img.parentElement, start: "top bottom", end: "bottom top", scrub: true } });
      });
    });

    // Process: 넓은 화면 + 모션 허용 시 가로 스크롤
    mm.add("(min-width: 1024px) and (prefers-reduced-motion: no-preference)", () => {
      const sec = document.querySelector<HTMLElement>(".proc");
      const track = sec?.querySelector<HTMLElement>(".proc-track");
      const bar = sec?.querySelector<HTMLElement>(".proc-bar i");
      if (!sec || !track) return;
      sec.classList.add("is-pinned");
      const dist = () => Math.max(0, track.scrollWidth - (track.parentElement?.clientWidth ?? window.innerWidth));
      const tween = gsap.to(track, {
        x: () => -dist(),
        ease: "none",
        scrollTrigger: {
          trigger: sec.querySelector(".proc-pin"),
          start: "top top",
          end: () => `+=${dist() + window.innerHeight * 0.3}`,
          pin: true,
          scrub: 0.6,
          invalidateOnRefresh: true,
          onUpdate: (st) => bar && gsap.set(bar, { scaleX: st.progress }),
        },
      });
      return () => {
        tween.scrollTrigger?.kill();
        tween.kill();
        gsap.set(track, { clearProps: "x" });
        sec.classList.remove("is-pinned");
      };
    });

    // 폰트·이미지 로드 후 위치 다시 계산
    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener("load", refresh);
    document.fonts?.ready.then(refresh);
    return () => {
      window.removeEventListener("load", refresh);
      mm.revert();
    };
  }, []);
  return null;
}
