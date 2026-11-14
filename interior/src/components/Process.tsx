import { process } from "@/content/sections";
import SectionHead from "./SectionHead";

/** 06 PROCESS — 데스크톱에서는 스크롤하면 단계가 가로로 흘러가요(Motion.tsx). 모바일·모션 줄이기 설정에서는 세로 목록. */
export default function Process() {
  return (
    <section id="process" className="proc" aria-labelledby="proc-title">
      <div className="proc-pin">
        <div className="wrap">
          <SectionHead no="06" label="Process" id="proc-title" title={process.title} subtitle={process.subtitle} />
        </div>
        <div className="wrap proc-viewport">
          <ol className="proc-track">
            {process.steps.map((s) => (
              <li key={s.no} className="proc-step">
                <span className="lbl">STEP {s.no}</span>
                <span className="no" aria-hidden="true">
                  {s.no}
                </span>
                <h3 lang="en">{s.en}</h3>
                <p>{s.ko}</p>
              </li>
            ))}
          </ol>
          <div className="proc-bar" aria-hidden="true">
            <i />
          </div>
        </div>
      </div>
    </section>
  );
}
