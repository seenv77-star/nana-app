import { site } from "@/content/site";

/**
 * 01 HERO — 시그니처 모션: 아이보리 '포켓 도어' 두 장이 양옆으로 열리며 공간이 드러나요.
 * 모션은 CSS만으로 동작해서 자바스크립트가 늦게 로드돼도 화면이 가려진 채 멈추지 않아요.
 */
export default function Hero() {
  const h = site.hero;
  return (
    <section id="top" className="hero" aria-labelledby="hero-title">
      <div className="hero-media">
        <img src={h.image} alt={h.imageAlt} width={1600} height={900} fetchPriority="high" decoding="async" />
      </div>
      <span className="demo-badge" style={{ top: "auto", bottom: 14, left: "auto", right: 14, zIndex: 2 }}>
        DEMO 이미지
      </span>

      <div className="door door-l" aria-hidden="true" />
      <div className="door door-r" aria-hidden="true" />
      <div className="door-mark" aria-hidden="true">
        <span>KING YENA INTERIOR</span>
      </div>

      <div className="wrap hero-body">
        <p className="hero-kicker">{site.brand}</p>
        <h1 id="hero-title">
          <span className="ln">
            <span>{h.titleLines[0]}</span>
          </span>
          <span className="ln">
            <span>
              <strong>{h.titleLines[1]}</strong>
            </span>
          </span>
        </h1>
        <div className="hero-foot">
          <p className="hero-sub" lang="en">
            {h.subtitle}
          </p>
          <div className="hero-actions">
            <a className="btn btn-light" href={h.primary.href}>
              {h.primary.label} <span className="arr" aria-hidden="true" />
            </a>
            <a className="btn btn-ghost-light" href={h.secondary.href}>
              {h.secondary.label}
            </a>
          </div>
        </div>
      </div>
      <span className="hero-scroll" aria-hidden="true">
        Scroll
      </span>
    </section>
  );
}
