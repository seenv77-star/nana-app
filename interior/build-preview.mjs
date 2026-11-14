// 인테리어 홈페이지를 파일 하나로 묶은 미리보기 만들기 (빌드 후 실행)
//   npm run build && node build-preview.mjs ../dist/king-yena-interior-preview.html
// - CSS·JS·사진을 HTML 안에 넣어서 인터넷 주소 없이 파일만 열어도 보이게 해요.
// - Pretendard(한글 글꼴)는 용량이 커서 jsDelivr CDN에서 불러와요(인터넷 연결 필요).
import { readFileSync, writeFileSync, readdirSync } from "node:fs";
import { join, dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = dirname(fileURLToPath(import.meta.url));
const out = join(root, "out");
const dest = resolve(process.argv[2] ?? join(root, "..", "dist", "king-yena-interior-preview.html"));
let html = readFileSync(join(out, "index.html"), "utf8");

const b64 = (p, type) => `data:${type};base64,${readFileSync(p).toString("base64")}`;

// 1) 사진 → data URI (HTML과 React 데이터 안의 경로 모두)
const imgs = {};
for (const f of readdirSync(join(out, "images"))) {
  const type = f.endsWith(".webp") ? "image/webp" : f.endsWith(".svg") ? "image/svg+xml" : "image/jpeg";
  imgs[`/images/${f}`] = b64(join(out, "images", f), type);
}

// 2) CSS: Pretendard @font-face는 CDN으로, Newsreader 글꼴 파일은 data URI로
html = html.replace(/<link rel="stylesheet" href="([^"]+)"[^>]*\/>/g, (_, href) => {
  let css = readFileSync(join(out, href), "utf8");
  css = css.replace(/@font-face\{[^}]*Pretendard Variable[^}]*\}/g, "");
  css = css.replace(/url\((\.\.\/media\/[^)]+)\)/g, (m, u) => `url(${b64(join(out, dirname(href), u), "font/woff2")})`);
  return (
    `<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.min.css"/>` +
    `<style>${css}</style>`
  );
});
html = html.replace(/<link rel="preload"[^>]*as="font"[^>]*\/>/g, "");
html = html.replace(/<link rel="preload"[^>]*as="image"[^>]*\/>/g, "");

// 3) JS 청크 → 인라인 (Turbopack이 청크를 다시 불러오지 않도록 등록 URL 유지)
html = html.replace(/<script src="(\/_next\/[^"]+)"([^>]*)><\/script>/g, (_, src) => {
  const fake = `({src:new URL(${JSON.stringify(src)},location.href).href,getAttribute:function(n){return n==="src"?${JSON.stringify(src)}:null}})`;
  const js = readFileSync(join(out, src), "utf8")
    .replace(/<\/script/g, "<\\/script")
    .split("document.currentScript").join(fake);
  return `<script>${js}</script>`;
});
html = html.replace(/<link[^>]*href="\/_next\/[^"]*"[^>]*\/>/g, "");
// React 데이터 안의 CSS 경로는 이미 인라인했으니 빈 스타일시트로 바꿔요
html = html.replace(/\/_next\/static\/chunks\/[\w-]+\.css/g, "data:text/css,");

// 4) 사진 경로 치환
for (const [k, v] of Object.entries(imgs)) html = html.split(k).join(v);
// 개인정보처리방침 링크는 미리보기에서 열 수 없으니 안내
html = html.split('href="/privacy/"').join('href="#" title="배포 후 /privacy/ 페이지로 열려요"');

writeFileSync(dest, html);
console.log(dest, (html.length / 1024 / 1024).toFixed(2) + "MB");
