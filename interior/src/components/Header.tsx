"use client";

import { useEffect, useRef, useState } from "react";
import { site } from "@/content/site";

/** 상단 메뉴 — 히어로 위에서는 투명, 스크롤하면 아이보리 배경. 아래로 내리면 숨고 올리면 다시 보여요. */
export default function Header({ solid = false }: { solid?: boolean }) {
  const [isSolid, setSolid] = useState(solid);
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("");
  const lastY = useRef(0);
  const menuBtn = useRef<HTMLButtonElement>(null);
  const closeBtn = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      const heroH = solid ? 0 : window.innerHeight * 0.82;
      setSolid(solid || y > heroH - 72);
      setHidden(y > lastY.current && y > window.innerHeight);
      lastY.current = y;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [solid]);

  // 현재 보고 있는 섹션 표시
  useEffect(() => {
    const ids = site.nav.map((n) => n.href.slice(1));
    const els = ids.map((id) => document.getElementById(id)).filter(Boolean) as HTMLElement[];
    if (!els.length) return;
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: "-45% 0px -50% 0px" },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("is-locked", open);
    if (!open) return;
    closeBtn.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        menuBtn.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const prefix = solid ? "/" : "";

  return (
    <>
      <header className={`hdr${isSolid ? " is-solid" : ""}${hidden && !open ? " is-hidden" : ""}`}>
        <div className="wrap hdr-inner">
          <a className="logo" href={solid ? "/" : "#top"} aria-label={`${site.brand} 처음으로`}>
            <b>KING YENA</b>
            <small>INTERIOR</small>
          </a>
          <nav className="nav" aria-label="주요 메뉴">
            {site.nav.map((n) => (
              <a key={n.href} href={prefix + n.href} aria-current={active === n.href.slice(1) ? "true" : undefined}>
                {n.label}
              </a>
            ))}
          </nav>
          <a className="hdr-cta" href={prefix + "#contact"}>
            상담 문의
          </a>
          <button ref={menuBtn} className="menu-btn" type="button" aria-expanded={open} aria-controls="mnav" onClick={() => setOpen(true)}>
            Menu <i aria-hidden="true" />
          </button>
        </div>
      </header>

      <div id="mnav" className="mnav" role="dialog" aria-modal="true" aria-label="전체 메뉴" hidden={!open}>
        <div className="mnav-top">
          <span className="logo">
            <b>KING YENA</b>
            <small>INTERIOR</small>
          </span>
          <button ref={closeBtn} className="menu-btn" type="button" onClick={() => { setOpen(false); menuBtn.current?.focus(); }}>
            Close
          </button>
        </div>
        <ol>
          {site.nav.map((n) => (
            <li key={n.href}>
              <a href={prefix + n.href} onClick={() => setOpen(false)}>
                {n.label}
              </a>
            </li>
          ))}
        </ol>
        <div className="mnav-foot">
          <a className="btn btn-light" href={prefix + "#contact"} onClick={() => setOpen(false)}>
            프로젝트 상담 신청하기 <span className="arr" aria-hidden="true" />
          </a>
          <p>{site.sloganEn}</p>
        </div>
      </div>
    </>
  );
}
