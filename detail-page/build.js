// 상세페이지를 파일 하나로 묶기 (CSS·JS·이미지 포함) — 배포(Netlify 등)용
// 사용법: node detail-page/build.js detail-page/pages/king-yena-love.html dist/king-yena/index.html
const fs = require('fs');
const path = require('path');
const [page, out] = process.argv.slice(2);
const dir = path.dirname(page);
const assets = path.join(dir, '..', 'assets');
let h = fs.readFileSync(page, 'utf8');
h = h.replace('<link rel="stylesheet" href="../assets/detail-page.css">', () => '<style>' + fs.readFileSync(path.join(assets, 'detail-page.css'), 'utf8') + '</style>');
h = h.replace('<script src="../assets/detail-page.js"></script>', () => '<script>' + fs.readFileSync(path.join(assets, 'detail-page.js'), 'utf8') + '</script>');
h = h.replace(/"\.\.\/images\/([^"]+\.(jpe?g|png|webp))"/g, (m, f, ext) => {
  const file = path.join(dir, '..', 'images', f);
  if (!fs.existsSync(file)) return m;
  const mime = ext === 'png' ? 'image/png' : ext === 'webp' ? 'image/webp' : 'image/jpeg';
  return '"data:' + mime + ';base64,' + fs.readFileSync(file).toString('base64') + '"';
});
fs.mkdirSync(path.dirname(out), { recursive: true });
fs.writeFileSync(out, h);
console.log('bundled', out, Math.round(h.length / 1024) + 'KB');
