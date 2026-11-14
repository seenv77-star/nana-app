import { reasons } from "@/content/sections";
import SectionHead from "./SectionHead";

export default function Why() {
  return (
    <section id="why" className="sec why" aria-labelledby="why-title">
      <div className="wrap why-grid">
        <SectionHead no="05" label="Why King Yena" id="why-title" title={reasons.title} subtitle={reasons.subtitle} />
        <ol className="why-list">
          {reasons.items.map((r, i) => (
            <li key={r.title} className="why-item" data-reveal>
              <span className="no" aria-hidden="true">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3>{r.title}</h3>
              <p>{r.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
