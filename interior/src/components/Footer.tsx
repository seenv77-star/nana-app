import { site } from "@/content/site";

const tbd = <em className="tbd">입력 필요</em>;

export default function Footer({ home = "" }: { home?: string }) {
  const c = site.company;
  const rows: [string, string][] = [
    ["회사명", c.name],
    ["대표자", c.ceo],
    ["사업자등록번호", c.bizNumber],
    ["주소", c.address],
    ["연락처", c.phone],
    ["이메일", c.email],
  ];
  return (
    <footer className="ft">
      <div className="wrap">
        <p className="ft-brand" lang="en">
          KING YENA
          <br />
          INTERIOR
        </p>
        <div className="ft-grid">
          <dl>
            {rows.map(([k, v]) => (
              <div key={k}>
                <dt>{k}</dt>
                <dd>{v || tbd}</dd>
              </div>
            ))}
          </dl>
          <nav className="ft-links" aria-label="바로가기">
            {site.nav.map((n) => (
              <a key={n.href} href={home + n.href} className="w-fit">
                {n.label}
              </a>
            ))}
          </nav>
          <div className="ft-links">
            {c.sns.map((s) =>
              s.url ? (
                <a key={s.label} href={s.url} target="_blank" rel="noopener noreferrer" className="w-fit">
                  {s.label} ↗
                </a>
              ) : (
                <span key={s.label}>
                  {s.label} {tbd}
                </span>
              ),
            )}
            <a href="/privacy/" className="w-fit link-line">
              개인정보처리방침
            </a>
          </div>
        </div>
        <div className="ft-bottom">
          <p>Copyright © KING YENA INTERIOR. All Rights Reserved.</p>
          <p>사이트의 사진과 프로젝트는 데모(AI 생성 이미지)이며 실제 시공 사례가 아닙니다.</p>
        </div>
      </div>
    </footer>
  );
}
