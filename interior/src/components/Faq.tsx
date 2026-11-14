import { faq } from "@/content/sections";
import SectionHead from "./SectionHead";

/** 08 FAQ — <details> 아코디언이라 자바스크립트 없이도 열리고 닫혀요. 하나를 열면 나머지는 닫혀요(name 속성). */
export default function Faq() {
  return (
    <section id="faq" className="sec" aria-labelledby="faq-title">
      <div className="wrap faq-grid">
        <SectionHead no="08" label="FAQ" id="faq-title" title={faq.title} subtitle={faq.subtitle} />
        <div className="faq-list">
          {faq.items.map((f, i) => (
            <details key={f.q} className="faq-item" name="faq" open={i === 0}>
              <summary>
                <span className="no">{String(i + 1).padStart(2, "0")}</span>
                <span>{f.q}</span>
                <span className="pm" aria-hidden="true" />
              </summary>
              <div className="faq-a">
                <p>{f.a}</p>
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
