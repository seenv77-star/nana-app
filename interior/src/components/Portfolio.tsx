"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { categories, projects, type Category, type Project } from "@/content/portfolio";
import SectionHead from "./SectionHead";

const LAYOUT = ["l-a", "l-b", "l-c", "l-d"];

export default function Portfolio() {
  const [filter, setFilter] = useState<"ALL" | Category>("ALL");
  const [openId, setOpenId] = useState<string | null>(null);
  const dlg = useRef<HTMLDialogElement>(null);
  const opener = useRef<HTMLElement | null>(null);

  const list = useMemo(() => (filter === "ALL" ? projects : projects.filter((p) => p.category === filter)), [filter]);
  const counts = useMemo(() => {
    const c: Record<string, number> = { ALL: projects.length };
    projects.forEach((p) => (c[p.category] = (c[p.category] ?? 0) + 1));
    return c;
  }, []);
  const current = projects.find((p) => p.id === openId) ?? null;
  const idx = current ? list.findIndex((p) => p.id === current.id) : -1;

  const open = useCallback((id: string, from?: HTMLElement) => {
    if (from) opener.current = from;
    setOpenId(id);
    if (location.hash !== `#project-${id}`) history.pushState(null, "", `#project-${id}`);
  }, []);

  const close = useCallback(() => {
    setOpenId(null);
    if (location.hash.startsWith("#project-")) history.pushState(null, "", "#portfolio");
  }, []);

  // 주소(#project-...)로 바로 열기 + 뒤로 가기로 닫기
  useEffect(() => {
    const sync = () => {
      const m = location.hash.match(/^#project-(.+)$/);
      setOpenId(m && projects.some((p) => p.id === m[1]) ? m[1] : null);
    };
    sync();
    window.addEventListener("popstate", sync);
    window.addEventListener("hashchange", sync);
    return () => {
      window.removeEventListener("popstate", sync);
      window.removeEventListener("hashchange", sync);
    };
  }, []);

  useEffect(() => {
    const d = dlg.current;
    if (!d) return;
    if (current && !d.open) {
      d.showModal();
      document.documentElement.classList.add("is-locked");
    } else if (!current && d.open) {
      d.close();
    }
    if (current) {
      d.scrollTop = 0;
      d.querySelector<HTMLElement>(".pd-close")?.focus();
    }
  }, [current]);

  const onDialogClose = () => {
    document.documentElement.classList.remove("is-locked");
    if (openId) close();
    opener.current?.focus({ preventScroll: false });
  };

  const toContact = () => {
    opener.current = null;
    setOpenId(null);
    history.replaceState(null, "", "#contact");
    setTimeout(() => {
      document.documentElement.classList.remove("is-locked");
      const el = document.getElementById("contact");
      el?.scrollIntoView({ behavior: "instant" });
      el?.querySelector<HTMLElement>("input:not(.hp input)")?.focus({ preventScroll: true });
    }, 80);
  };

  const go = (dir: 1 | -1) => {
    if (idx < 0) return;
    const next = list[(idx + dir + list.length) % list.length];
    history.replaceState(null, "", `#project-${next.id}`);
    setOpenId(next.id);
  };

  return (
    <section id="portfolio" className="sec" aria-labelledby="pf-title">
      <div className="wrap">
        <SectionHead no="03" label="Portfolio" id="pf-title" title="Selected Projects" subtitle="공간마다 다른 이야기, 변하지 않는 디자인의 기준." />

        <div className="pf-bar">
          <div className="pf-filters" role="group" aria-label="프로젝트 분류">
            {categories.map((c) => (
              <button key={c.key} type="button" className="pf-filter" aria-pressed={filter === c.key} onClick={() => setFilter(c.key)}>
                {c.label}
                <sup>{counts[c.key] ?? 0}</sup>
              </button>
            ))}
          </div>
          <p className="pf-note" aria-live="polite">
            {list.length}개 프로젝트 · 현재 사례는 모두 <strong>데모</strong>입니다
          </p>
        </div>

        {list.length === 0 ? (
          <p className="pf-empty">이 분류의 프로젝트는 준비 중입니다.</p>
        ) : (
          <ul className="pf-grid" key={filter}>
            {list.map((p, i) => (
              <li key={p.id} className={`pf-item ${LAYOUT[i % 4]}`} style={{ animationDelay: `${(i % 4) * 0.08}s` }}>
                <button type="button" className="pf-open" onClick={(e) => open(p.id, e.currentTarget)} aria-label={`${p.title} — ${p.titleKo} 자세히 보기`}>
                  <span className="media block" data-wipe>
                    <img src={p.images[0].src} alt={p.images[0].alt} width={1200} height={900} loading="lazy" decoding="async" />
                    {p.demo && <span className="demo-badge">DEMO 프로젝트</span>}
                    <span className="pf-view" aria-hidden="true">
                      VIEW PROJECT
                    </span>
                  </span>
                  <span className="pf-meta">
                    <span className="no">{String(projects.indexOf(p) + 1).padStart(2, "0")}</span>
                    <h3 lang="en">{p.title}</h3>
                    <p>
                      {p.location} · {p.spaceType} · {p.area}
                    </p>
                  </span>
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      <dialog ref={dlg} className="pd" aria-labelledby="pd-title" onClose={onDialogClose}>
        {current && <ProjectDetail p={current} onClose={close} onContact={toContact} onPrev={() => go(-1)} onNext={() => go(1)} prev={list[(idx - 1 + list.length) % list.length]} next={list[(idx + 1) % list.length]} />}
      </dialog>
    </section>
  );
}

function ProjectDetail({ p, onClose, onContact, onPrev, onNext, prev, next }: { p: Project; onClose: () => void; onContact: () => void; onPrev: () => void; onNext: () => void; prev?: Project; next?: Project }) {
  const specs: [string, string][] = [
    ["프로젝트명", `${p.title} · ${p.titleKo}`],
    ["지역", p.location],
    ["공간 유형", p.spaceType],
    ["면적", p.area],
    ["디자인 콘셉트", p.concept],
    ["시공 범위", p.scope],
  ];
  return (
    <article>
      <div className="pd-top">
        <div className="wrap">
          <p className="pd-crumb">
            SELECTED PROJECTS / {p.category}
          </p>
          <button type="button" className="pd-close" onClick={onClose}>
            CLOSE <i aria-hidden="true" />
          </button>
        </div>
      </div>
      <header className="wrap pd-head">
        {p.demo && (
          <span className="demo-badge is-inline" style={{ width: "fit-content" }}>
            DEMO 프로젝트 · 실제 시공 사례가 아닙니다
          </span>
        )}
        <h2 id="pd-title" className="pd-title" lang="en">
          {p.title}
        </h2>
        <p className="pd-ko">{p.titleKo}</p>
      </header>
      <div className="wrap">
        <figure className="media pd-hero">
          <img src={p.images[0].src} alt={p.images[0].alt} width={1200} height={900} decoding="async" />
        </figure>
      </div>
      <div className="wrap pd-body">
        <dl className="pd-specs">
          {specs.map(([k, v]) => (
            <div key={k}>
              <dt>{k}</dt>
              <dd>{v}</dd>
            </div>
          ))}
        </dl>
        <div className="pd-intent">
          <p className="eyebrow">Design Notes</p>
          {p.intent.map((t) => (
            <p key={t.slice(0, 10)}>{t}</p>
          ))}
        </div>
      </div>
      <div className="wrap pd-gallery">
        {p.images.slice(1).map((img) => (
          <figure key={img.src} className="media">
            <img src={img.src} alt={img.alt} width={900} height={1125} loading="lazy" decoding="async" />
          </figure>
        ))}
        <div className="grid gap-6 content-end">
          <p className="pd-intent" style={{ fontSize: "clamp(22px,2.4vw,34px)" }}>
            {p.concept}
          </p>
          <a className="btn btn-dark" style={{ width: "fit-content" }} href="#contact" onClick={(e) => { e.preventDefault(); onContact(); }}>
            이런 공간 상담하기 <span className="arr" aria-hidden="true" />
          </a>
        </div>
      </div>
      {prev && next && prev.id !== p.id && (
        <nav className="wrap pd-next" aria-label="다른 프로젝트">
          <button type="button" onClick={onPrev}>
            <small>PREVIOUS</small>
            <span lang="en">{prev.title}</span>
          </button>
          <button type="button" onClick={onNext}>
            <small>NEXT</small>
            <span lang="en">{next.title}</span>
          </button>
        </nav>
      )}
    </article>
  );
}
