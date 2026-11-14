"use client";

import { useState } from "react";
import { services } from "@/content/sections";
import SectionHead from "./SectionHead";

/** 04 SERVICES — 데스크톱: 항목에 마우스를 올리거나 포커스하면 오른쪽 사진이 바뀌어요. 모바일: 항목마다 사진이 함께 보여요. */
export default function Services() {
  const [on, setOn] = useState(0);
  return (
    <section id="services" className="sec svc" aria-labelledby="svc-title">
      <div className="wrap">
        <SectionHead no="04" label="Services" id="svc-title" title={services.title} subtitle={services.subtitle} />
        <div className="svc-grid">
          <ul className="svc-list">
            {services.items.map((s, i) => (
              <li key={s.no} className={`svc-row${on === i ? " is-on" : ""}`} onMouseEnter={() => setOn(i)} data-reveal>
                <span className="no">{s.no}</span>
                <h3 lang="en">{s.en}</h3>
                <p className="ko">{s.ko}</p>
                <p className="txt">{s.text}</p>
                <span className="media block">
                  <img src={s.image} alt={s.imageAlt} width={1200} height={900} loading="lazy" decoding="async" />
                  <span className="demo-badge">DEMO 이미지</span>
                </span>
              </li>
            ))}
          </ul>
          <div className="svc-stage media" aria-hidden="true">
            {services.items.map((s, i) => (
              <img key={s.no} src={s.image} alt="" width={1200} height={900} loading="lazy" decoding="async" className={on === i ? "is-on" : ""} />
            ))}
            <span className="demo-badge">DEMO 이미지</span>
          </div>
        </div>
      </div>
    </section>
  );
}
