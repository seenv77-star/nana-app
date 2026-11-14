/** 섹션 제목 공통 형태: 번호 라벨 · 영문 제목(세리프) · 한글 부제 */
export default function SectionHead({ no, label, title, subtitle, id }: { no: string; label: string; title: string; subtitle: string; id: string }) {
  return (
    <div className="sec-head">
      <p className="eyebrow" data-reveal>
        {no} — {label}
      </p>
      <h2 id={id} className="sec-title" lang="en" data-split>
        {title}
      </h2>
      <p className="sec-sub" data-reveal>
        {subtitle}
      </p>
    </div>
  );
}
