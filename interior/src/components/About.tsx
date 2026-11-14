import { site } from "@/content/site";
import SectionHead from "./SectionHead";

export default function About() {
  const a = site.about;
  return (
    <section id="about" className="sec" aria-labelledby="about-title">
      <div className="wrap">
        <SectionHead no="02" label="About" id="about-title" title={a.title} subtitle={a.subtitle} />
        <div className="about-grid">
          <figure className="media about-media" data-wipe>
            <img src={a.image} alt={a.imageAlt} width={900} height={1125} loading="lazy" decoding="async" data-parallax />
            <span className="demo-badge">DEMO 이미지</span>
          </figure>
          <div className="grid gap-10">
            <p className="about-statement" data-reveal>
              {a.story[0]}
            </p>
            <div className="about-story">
              {a.story.slice(1).map((p) => (
                <p key={p.slice(0, 12)} data-reveal>
                  {p}
                </p>
              ))}
            </div>
          </div>
        </div>

        <ul className="values" aria-label="KING YENA INTERIOR의 디자인 가치">
          {a.values.map((v, i) => (
            <li key={v.en} className="value" data-reveal>
              <span className="value-no">0{i + 1}</span>
              <h3 lang="en">{v.en}</h3>
              <p>{v.ko}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
