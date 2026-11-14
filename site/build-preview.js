// 홈페이지를 미리보기용 파일 하나로 묶기 (CSS·JS·이미지 포함, 글꼴은 Google Fonts에서 불러옴)
// 사용법: node site/build-preview.js dist/king-yena-site-preview.html
// 실제 배포는 site/ 폴더를 그대로 올리세요 (README.md 참고).
const fs = require('fs');
const path = require('path');
const out = process.argv[2] || 'dist/king-yena-site-preview.html';
const dir = __dirname;
const read = f => fs.readFileSync(path.join(dir, f), 'utf8');
let h = read('index.html');
h = h.replace('<link rel="stylesheet" href="assets/css/site.css">', () => '<style>' + read('assets/css/site.css') + '</style>');
h = h.replace(/<script src="(assets\/[^"]+\.js)" defer><\/script>/g, (m, f) => '<script>' + read(f) + '</script>');
// 인라인 스크립트는 바로 실행되므로 DOM이 준비된 뒤 실행되도록 body 끝으로 옮겨져 있어야 함 (이미 body 끝에 있음)
h = h.replace(/(["(])assets\/img\/([^")]+\.(jpe?g|png|webp))/g, (m, q, f, ext) => {
  const file = path.join(dir, 'assets/img', f);
  if (!fs.existsSync(file)) return m;
  const mime = ext === 'png' ? 'image/png' : ext === 'webp' ? 'image/webp' : 'image/jpeg';
  return q + 'data:' + mime + ';base64,' + fs.readFileSync(file).toString('base64');
});
fs.mkdirSync(path.dirname(out), { recursive: true });
fs.writeFileSync(out, h);
console.log('preview', out, Math.round(h.length / 1024) + 'KB');
