// Portfolio generator: renders Amazon listing image sets for fictional K-beauty brands.
const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

const brands = require('./brands.js');

const css = (b) => `
*{box-sizing:border-box;margin:0;padding:0}
body{font-family:Inter,sans-serif;background:#ccc;color:${b.ink}}
.f{position:relative;overflow:hidden;background:#fff}
.sq{width:1000px;height:1000px}
.ap{width:1464px;height:600px}
.k{font-size:22px;font-weight:700;letter-spacing:2px;color:${b.accent};text-transform:uppercase}
h1{font-weight:800;letter-spacing:-1.5px}
h2{font-weight:800;letter-spacing:-1px}
.sub{color:${b.muted}}
.note{position:absolute;left:60px;right:60px;bottom:26px;font-size:15px;color:${b.muted}}
.pill{display:inline-block;border-radius:999px;padding:10px 20px;font-weight:700;font-size:20px;background:${b.accent};color:#fff}
.card{background:${b.soft};border-radius:28px}
`;

// ---------- SVG product renders ----------
function jar(b, w = 420) {
  return `<svg width="${w}" height="${w * 1.0}" viewBox="0 0 400 400">
  <defs>
    <linearGradient id="jb" x1="0" x2="1"><stop offset="0" stop-color="${b.pack[0]}"/><stop offset=".45" stop-color="${b.pack[1]}"/><stop offset="1" stop-color="${b.pack[2]}"/></linearGradient>
    <linearGradient id="jl" x1="0" x2="1"><stop offset="0" stop-color="${b.lid[0]}"/><stop offset=".5" stop-color="${b.lid[1]}"/><stop offset="1" stop-color="${b.lid[0]}"/></linearGradient>
    <filter id="sh" x="-20%" y="-20%" width="140%" height="160%"><feGaussianBlur stdDeviation="12"/></filter>
  </defs>
  <ellipse cx="200" cy="372" rx="150" ry="16" fill="#000" opacity=".18" filter="url(#sh)"/>
  <path d="M60 130 v220 q0 18 18 18 h244 q18 0 18 -18 v-220z" fill="url(#jb)"/>
  <rect x="60" y="128" width="280" height="10" fill="#000" opacity=".06"/>
  <path d="M52 70 q0 -14 14 -14 h268 q14 0 14 14 v58 q0 6 -6 6 h-284 q-6 0 -6 -6z" fill="url(#jl)"/>
  <rect x="52" y="120" width="296" height="14" rx="4" fill="#000" opacity=".08"/>
  <rect x="88" y="175" width="224" height="150" rx="10" fill="${b.label}"/>
  <text x="200" y="212" text-anchor="middle" font-family="Inter" font-weight="800" font-size="26" letter-spacing="4" fill="${b.ink}">${b.name}</text>
  <line x1="130" y1="226" x2="270" y2="226" stroke="${b.accent}" stroke-width="2"/>
  <text x="200" y="256" text-anchor="middle" font-family="Inter" font-weight="700" font-size="17" fill="${b.ink}">${b.packLine1}</text>
  <text x="200" y="278" text-anchor="middle" font-family="Inter" font-weight="500" font-size="14" fill="${b.accent}">${b.packLine2}</text>
  <text x="200" y="310" text-anchor="middle" font-family="Inter" font-size="11" fill="${b.muted}">${b.packSize}</text>
  <rect x="70" y="140" width="16" height="200" rx="8" fill="#fff" opacity=".35"/>
  </svg>`;
}

function bottle(b, w = 300) {
  return `<svg width="${w}" height="${w * 2}" viewBox="0 0 200 400">
  <defs>
    <linearGradient id="bb" x1="0" x2="1"><stop offset="0" stop-color="${b.pack[0]}"/><stop offset=".5" stop-color="${b.pack[1]}"/><stop offset="1" stop-color="${b.pack[2]}"/></linearGradient>
    <linearGradient id="bl" x1="0" x2="1"><stop offset="0" stop-color="${b.lid[0]}"/><stop offset=".5" stop-color="${b.lid[1]}"/><stop offset="1" stop-color="${b.lid[0]}"/></linearGradient>
    <filter id="sh2" x="-30%" y="-30%" width="160%" height="160%"><feGaussianBlur stdDeviation="8"/></filter>
  </defs>
  <ellipse cx="100" cy="388" rx="80" ry="9" fill="#000" opacity=".22" filter="url(#sh2)"/>
  <path d="M84 8 q16 -10 32 0 v70 h-32z" fill="url(#bl)"/>
  <rect x="74" y="74" width="52" height="46" rx="5" fill="url(#bl)"/>
  <path d="M70 120 h60 q34 8 38 46 v198 q0 22 -22 22 h-92 q-22 0 -22 -22 v-198 q4 -38 38 -46z" fill="url(#bb)"/>
  <rect x="44" y="200" width="112" height="140" rx="6" fill="${b.label}"/>
  <text x="100" y="230" text-anchor="middle" font-family="Inter" font-weight="800" font-size="15" letter-spacing="2.5" fill="${b.ink}">${b.name}</text>
  <line x1="66" y1="240" x2="134" y2="240" stroke="${b.accent}" stroke-width="1.5"/>
  <text x="100" y="262" text-anchor="middle" font-family="Inter" font-weight="700" font-size="11" fill="${b.ink}">${b.packLine1}</text>
  <text x="100" y="278" text-anchor="middle" font-family="Inter" font-weight="500" font-size="8.6" fill="${b.accent}">${b.packLine2}</text>
  <text x="100" y="322" text-anchor="middle" font-family="Inter" font-size="8" fill="${b.muted}">${b.packSize}</text>
  <rect x="40" y="150" width="9" height="200" rx="4.5" fill="#fff" opacity=".22"/>
  </svg>`;
}

const product = (b, w) => (b.form === 'jar' ? jar(b, w) : bottle(b, w * 0.72));

// ---------- frames ----------
function frames(b) {
  const F = {};
  F['01_main'] = `<div class="f sq" style="display:flex;align-items:center;justify-content:center;background:#fff">${b.form === 'jar' ? jar(b, 860) : bottle(b, 470)}</div>`;

  F['02_hero'] = `<div class="f sq" style="background:${b.bg}">
    <div style="position:absolute;left:64px;top:76px;width:520px">
      <span class="pill">${b.category}</span>
      <h1 style="font-size:66px;line-height:1.04;margin:28px 0 20px">${b.headline}</h1>
      <p class="sub" style="font-size:26px;line-height:1.45">${b.subhead}</p>
    </div>
    <div style="position:absolute;right:30px;top:${b.form === 'jar' ? 300 : 150}px">${product(b, b.form === 'jar' ? 470 : 520)}</div>
    <div style="position:absolute;left:64px;bottom:96px;display:flex;gap:16px">
      ${b.benefits.map(([ic, t]) => `<div style="width:150px;text-align:center"><div style="width:84px;height:84px;margin:0 auto;border-radius:50%;background:#fff;display:flex;align-items:center;justify-content:center">${ic}</div><div style="font-size:20px;font-weight:700;margin-top:12px;line-height:1.2">${t}</div></div>`).join('')}
    </div>
  </div>`;

  F['03_ingredients'] = `<div class="f sq">
    <div style="padding:72px 64px 0"><div class="k">Key Ingredients</div><h2 style="font-size:54px;line-height:1.08;margin-top:12px">${b.ingHeadline}</h2></div>
    <div style="display:flex;gap:22px;padding:48px 64px 0">
      ${b.ingredients.map(([svg, n, d]) => `<div class="card" style="flex:1;padding:30px 26px;text-align:center"><div style="height:150px;display:flex;align-items:center;justify-content:center">${svg}</div><div style="font-size:25px;font-weight:800;margin:16px 0 10px">${n}</div><div class="sub" style="font-size:19px;line-height:1.45">${d}</div></div>`).join('')}
    </div>
    <div style="margin:36px 64px 0;display:flex;gap:10px;flex-wrap:wrap">${b.freeFrom.map(t => `<span style="border:2px solid ${b.line};border-radius:999px;padding:9px 16px;font-size:17px;font-weight:600;color:${b.muted}">${t}</span>`).join('')}</div>
  </div>`;

  F['04_texture'] = `<div class="f sq" style="background:${b.bg2}">
    <div style="position:absolute;left:64px;top:76px;width:470px">
      <div class="k">${b.textureKicker}</div>
      <h2 style="font-size:56px;line-height:1.06;margin:14px 0 26px">${b.textureHeadline}</h2>
      ${b.texturePoints.map(([t, d]) => `<div style="margin-bottom:24px"><div style="font-size:24px;font-weight:800">${t}</div><div class="sub" style="font-size:20px;line-height:1.4;margin-top:4px">${d}</div></div>`).join('')}
    </div>
    <div style="position:absolute;right:40px;top:160px">${b.textureArt}</div>
  </div>`;

  F['05_results'] = `<div class="f sq">
    <div style="padding:72px 64px 0"><div class="k">${b.resultKicker}</div><h2 style="font-size:54px;line-height:1.08;margin-top:12px">${b.resultHeadline}</h2></div>
    <div style="padding:46px 64px 0">
      ${b.results.map(([p, t]) => `<div style="display:flex;align-items:center;gap:26px;margin-bottom:30px"><div style="font-size:64px;font-weight:800;color:${b.accent};width:190px">${p}%</div><div style="flex:1"><div style="font-size:23px;font-weight:700;margin-bottom:10px">${t}</div><div style="height:16px;background:${b.soft};border-radius:8px"><div style="height:16px;width:${p}%;background:${b.accent};border-radius:8px"></div></div></div></div>`).join('')}
    </div>
    <div style="position:absolute;right:64px;bottom:70px">${product(b, b.form === 'jar' ? 280 : 230)}</div>
    <div class="note">${b.resultNote}</div>
  </div>`;

  F['06_howto'] = `<div class="f sq" style="background:${b.bg}">
    <div style="padding:72px 64px 0"><div class="k">How to Use</div><h2 style="font-size:54px;line-height:1.08;margin-top:12px">${b.howHeadline}</h2></div>
    <div style="display:flex;gap:22px;padding:56px 64px 0">
      ${b.steps.map(([n, t, d], i) => `<div style="flex:1;background:#fff;border-radius:28px;padding:34px 28px;min-height:420px"><div style="width:64px;height:64px;border-radius:50%;background:${b.accent};color:#fff;font-size:30px;font-weight:800;display:flex;align-items:center;justify-content:center">${i + 1}</div><div style="font-size:28px;font-weight:800;margin:26px 0 12px">${t}</div><div class="sub" style="font-size:20px;line-height:1.5">${d}</div></div>`).join('')}
    </div>
    <div class="note">${b.howNote}</div>
  </div>`;

  F['07_whofor'] = `<div class="f sq">
    <div style="padding:72px 64px 0"><div class="k">Made For You If...</div><h2 style="font-size:54px;line-height:1.08;margin-top:12px">${b.whoHeadline}</h2></div>
    <div style="padding:40px 64px 0;width:600px">
      ${b.whoList.map(t => `<div style="display:flex;gap:16px;align-items:flex-start;margin-bottom:22px"><div style="flex:none;width:34px;height:34px;border-radius:50%;background:${b.accent};color:#fff;font-weight:800;display:flex;align-items:center;justify-content:center">✓</div><div style="font-size:23px;line-height:1.4;font-weight:600">${t}</div></div>`).join('')}
    </div>
    <div style="position:absolute;right:56px;bottom:120px;text-align:center">${product(b, b.form === 'jar' ? 330 : 380)}<div style="font-size:22px;font-weight:800;margin-top:8px">${b.packSize}</div></div>
    <div style="position:absolute;left:64px;bottom:90px;display:flex;gap:10px">${b.skinTypes.map(t => `<span class="card" style="padding:12px 18px;font-size:19px;font-weight:700">${t}</span>`).join('')}</div>
  </div>`;

  F['A1_aplus_hero'] = `<div class="f ap" style="background:${b.apBg};color:${b.apInk}">
    <div style="position:absolute;left:96px;top:110px;width:780px">
      <div style="font-size:26px;font-weight:600;opacity:.85">${b.apKicker}</div>
      <h1 style="font-size:80px;line-height:1.02;margin:18px 0 30px">${b.apHeadline}</h1>
      <div style="display:flex;gap:14px;flex-wrap:wrap">${b.apChips.map(t => `<span style="border:2px solid currentColor;border-radius:999px;padding:12px 22px;font-size:22px;font-weight:700;opacity:.9">${t}</span>`).join('')}</div>
    </div>
    <div style="position:absolute;right:${b.form === 'jar' ? 90 : 200}px;top:${b.form === 'jar' ? 90 : 40}px">${product(b, b.form === 'jar' ? 460 : 360)}</div>
  </div>`;

  F['A2_aplus_routine'] = `<div class="f ap" style="background:${b.bg}">
    <div style="position:absolute;left:96px;top:70px"><div class="k">${b.routineKicker}</div><h2 style="font-size:52px;margin-top:10px">${b.routineHeadline}</h2></div>
    <div style="position:absolute;left:96px;right:96px;top:230px;display:flex;gap:20px;align-items:stretch">
      ${b.routine.map(([t, d, me]) => `<div style="flex:1;border-radius:24px;padding:28px 24px;background:${me ? b.accent : '#fff'};color:${me ? '#fff' : b.ink}"><div style="font-size:24px;font-weight:800">${t}</div><div style="font-size:18px;line-height:1.45;margin-top:10px;opacity:.85">${d}</div></div>`).join('<div style="align-self:center;font-size:30px;color:' + b.muted + '">→</div>')}
    </div>
  </div>`;
  return F;
}

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ deviceScaleFactor: 1 });
  for (const b of brands) {
    const F = frames(b);
    const html = `<!doctype html><html><head><meta charset="utf-8"><style>${css(b)}</style></head><body>${Object.entries(F).map(([id, h]) => `<div id="${id}" style="display:inline-block;margin:10px">${h}</div>`).join('')}</body></html>`;
    const dir = path.join(__dirname, b.slug);
    fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(path.join(dir, 'frames.html'), html);
    await page.setContent(html);
    await page.waitForTimeout(400);
    for (const id of Object.keys(F)) await page.locator('[id="' + id + '"] > .f').screenshot({ path: path.join(dir, id + '.png') });
    console.log(b.slug, Object.keys(F).length, 'frames');
  }
  await browser.close();
})();
