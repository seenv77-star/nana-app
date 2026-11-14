"use client";

import { useEffect, useState } from "react";

/** 모바일 하단 고정 상담 버튼 — 첫 화면을 지나면 나타나고, 상담 폼이 보이면 숨어요. */
export default function MobileCta() {
  const [on, setOn] = useState(false);
  useEffect(() => {
    const contact = document.getElementById("contact");
    let contactVisible = false;
    const update = () => setOn(window.scrollY > window.innerHeight * 0.7 && !contactVisible);
    const io = new IntersectionObserver(([e]) => {
      contactVisible = e.isIntersecting;
      update();
    });
    if (contact) io.observe(contact);
    window.addEventListener("scroll", update, { passive: true });
    update();
    return () => {
      io.disconnect();
      window.removeEventListener("scroll", update);
    };
  }, []);
  return (
    <div className={`mcta${on ? " is-on" : ""}`} aria-hidden={!on} inert={!on}>
      <a className="btn btn-dark" href="#contact">
        상담 문의하기 <span className="arr" aria-hidden="true" />
      </a>
    </div>
  );
}
