import { reviews } from "@/content/sections";
import SectionHead from "./SectionHead";

/** 07 REVIEWS — 실제 후기가 없으면 sections.ts 에서 visible: false 로 숨기세요. 별점은 표시하지 않아요. */
export default function Reviews() {
  if (!reviews.visible || reviews.items.length === 0) return null;
  const hasSample = reviews.items.some((r) => r.sample);
  return (
    <section id="reviews" className="sec rv" aria-labelledby="rv-title">
      <div className="wrap">
        <SectionHead no="07" label="Reviews" id="rv-title" title={reviews.title} subtitle={reviews.subtitle} />
        {hasSample && (
          <p className="rv-notice" style={{ marginTop: -40, marginBottom: 64 }}>
            <span className="demo-badge is-inline">SAMPLE</span>
            아래 내용은 후기 영역 예시입니다. 실제 고객 후기가 아닙니다.
          </p>
        )}
        <ul className="rv-grid">
          {reviews.items.map((r, i) => (
            <li key={i}>
              <figure className="rv-item" data-reveal>
                <span className="media block">
                  <img src={r.image} alt={r.imageAlt} width={900} height={1125} loading="lazy" decoding="async" />
                  {r.sample && <span className="demo-badge">SAMPLE</span>}
                </span>
                <blockquote>{r.text}</blockquote>
                <figcaption>
                  <span>{r.name}</span>
                  <span aria-hidden="true">·</span>
                  <span>{r.projectType}</span>
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
