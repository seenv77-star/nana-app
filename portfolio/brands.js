// Fictional brands for portfolio use only. Results data is illustrative.
const ic = {
  drop: (c) => `<svg width="46" height="46" viewBox="0 0 48 48"><path d="M24 5 C24 5 9 22 9 31 a15 15 0 0 0 30 0 C39 22 24 5 24 5z" fill="${c}"/><ellipse cx="18" cy="31" rx="3" ry="6" fill="#fff" opacity=".5"/></svg>`,
  glow: (c) => `<svg width="48" height="48" viewBox="0 0 48 48"><path d="M24 4 l4 14 14 6 -14 6 -4 14 -4 -14 -14 -6 14 -6z" fill="${c}"/></svg>`,
  smooth: (c) => `<svg width="50" height="46" viewBox="0 0 50 46"><path d="M4 14 q11 -9 21 0 t21 0" stroke="${c}" stroke-width="5" fill="none" stroke-linecap="round"/><path d="M4 26 q11 -9 21 0 t21 0" stroke="${c}" stroke-width="5" fill="none" stroke-linecap="round"/><path d="M4 38 q11 -9 21 0 t21 0" stroke="${c}" stroke-width="5" fill="none" stroke-linecap="round"/></svg>`,
  bounce: (c) => `<svg width="48" height="48" viewBox="0 0 48 48"><circle cx="24" cy="18" r="11" fill="${c}"/><path d="M8 42 q16 -14 32 0" stroke="${c}" stroke-width="5" fill="none" stroke-linecap="round"/></svg>`,
  lines: (c) => `<svg width="48" height="48" viewBox="0 0 48 48"><path d="M6 14 h36 M6 24 h24 M6 34 h30" stroke="${c}" stroke-width="5" stroke-linecap="round"/><path d="M36 30 l6 6 m0 -6 l-6 6" stroke="${c}" stroke-width="4" stroke-linecap="round"/></svg>`,
  shield: (c) => `<svg width="46" height="48" viewBox="0 0 46 48"><path d="M23 3 l18 7 v12 c0 12 -8 20 -18 24 c-10 -4 -18 -12 -18 -24 v-12z" fill="${c}"/><path d="M14 24 l7 7 12 -13" stroke="#fff" stroke-width="4" fill="none" stroke-linecap="round"/></svg>`,
};

const pear = `<svg width="130" height="150" viewBox="0 0 130 150"><defs><radialGradient id="pr" cx=".38" cy=".35" r=".75"><stop offset="0" stop-color="#fbf6d8"/><stop offset=".55" stop-color="#e9dc95"/><stop offset="1" stop-color="#c9b45a"/></radialGradient></defs>
<path d="M65 22 c-14 0 -18 14 -20 26 c-2 12 -22 24 -22 52 c0 26 20 42 42 42 c22 0 42 -16 42 -42 c0 -28 -20 -40 -22 -52 c-2 -12 -6 -26 -20 -26z" fill="url(#pr)"/>
<path d="M65 24 q2 -14 8 -20" stroke="#6b4e2a" stroke-width="5" fill="none" stroke-linecap="round"/>
<path d="M72 12 q22 -10 34 4 q-20 10 -34 -4z" fill="#8fae4a"/>
<g fill="#b9a24c" opacity=".6"><circle cx="50" cy="96" r="1.6"/><circle cx="80" cy="110" r="1.6"/><circle cx="62" cy="122" r="1.6"/><circle cx="88" cy="88" r="1.6"/><circle cx="44" cy="116" r="1.6"/></g></svg>`;

const molecule = (c) => `<svg width="140" height="130" viewBox="0 0 140 130"><g stroke="${c}" stroke-width="5"><line x1="40" y1="40" x2="75" y2="62"/><line x1="75" y1="62" x2="110" y2="40"/><line x1="75" y1="62" x2="75" y2="102"/><line x1="40" y1="40" x2="22" y2="80"/></g>
<g fill="${c}"><circle cx="40" cy="40" r="15"/><circle cx="110" cy="40" r="12"/><circle cx="75" cy="102" r="13"/><circle cx="22" cy="80" r="9"/></g><circle cx="75" cy="62" r="19" fill="#fff" stroke="${c}" stroke-width="6"/></svg>`;

const layers = (c) => `<svg width="140" height="130" viewBox="0 0 140 130"><g fill="none" stroke-linecap="round"><path d="M14 40 q28 -18 56 0 t56 0" stroke="${c}" stroke-width="7" opacity=".35"/><path d="M14 66 q28 -18 56 0 t56 0" stroke="${c}" stroke-width="7" opacity=".65"/><path d="M14 92 q28 -18 56 0 t56 0" stroke="${c}" stroke-width="7"/></g></svg>`;

const beans = `<svg width="150" height="130" viewBox="0 0 150 130"><defs><radialGradient id="bn" cx=".35" cy=".3" r=".8"><stop offset="0" stop-color="#5a524c"/><stop offset=".5" stop-color="#26211e"/><stop offset="1" stop-color="#0d0b0a"/></radialGradient></defs>
<g><ellipse cx="50" cy="70" rx="30" ry="24" fill="url(#bn)" transform="rotate(-18 50 70)"/><ellipse cx="98" cy="58" rx="28" ry="22" fill="url(#bn)" transform="rotate(14 98 58)"/><ellipse cx="82" cy="100" rx="26" ry="20" fill="url(#bn)" transform="rotate(-6 82 100)"/></g>
<g fill="#fff" opacity=".35"><ellipse cx="40" cy="60" rx="7" ry="4" transform="rotate(-30 40 60)"/><ellipse cx="90" cy="48" rx="6" ry="3.5"/><ellipse cx="74" cy="92" rx="6" ry="3.5"/></g>
<g stroke="#c8a77a" stroke-width="3" opacity=".8"><line x1="58" y1="60" x2="64" y2="74"/><line x1="104" y1="50" x2="108" y2="62"/><line x1="88" y1="92" x2="92" y2="104"/></g></svg>`;

const peptide = (c) => `<svg width="150" height="120" viewBox="0 0 150 120"><path d="M16 80 q20 -50 40 -20 t40 -10 t40 -20" stroke="${c}" stroke-width="4" fill="none" opacity=".5"/><g fill="${c}"><circle cx="16" cy="80" r="11"/><circle cx="40" cy="52" r="10"/><circle cx="62" cy="64" r="12"/><circle cx="86" cy="54" r="10"/><circle cx="108" cy="44" r="12"/><circle cx="134" cy="32" r="10"/></g></svg>`;

const bricks = (c) => `<svg width="150" height="120" viewBox="0 0 150 120"><g fill="${c}"><rect x="10" y="20" width="60" height="24" rx="5"/><rect x="76" y="20" width="60" height="24" rx="5" opacity=".7"/><rect x="40" y="50" width="60" height="24" rx="5" opacity=".85"/><rect x="10" y="80" width="60" height="24" rx="5" opacity=".6"/><rect x="76" y="80" width="60" height="24" rx="5"/></g></svg>`;

const padArt = (b) => `<svg width="460" height="680" viewBox="0 0 460 680"><defs>
<pattern id="emb" width="18" height="18" patternUnits="userSpaceOnUse"><circle cx="9" cy="9" r="4" fill="#e6e1cf"/></pattern>
<filter id="ps"><feGaussianBlur stdDeviation="10"/></filter></defs>
<ellipse cx="230" cy="300" rx="170" ry="26" fill="#000" opacity=".12" filter="url(#ps)"/>
<circle cx="230" cy="160" r="150" fill="#fbfaf4" stroke="#e7e2cf" stroke-width="3"/><circle cx="230" cy="160" r="140" fill="url(#emb)"/>
<text x="230" y="340" text-anchor="middle" font-family="Inter" font-weight="800" font-size="28" fill="${b.ink}">EMBOSSED SIDE</text>
<text x="230" y="370" text-anchor="middle" font-family="Inter" font-size="20" fill="${b.muted}">Lifts dead skin and buildup</text>
<ellipse cx="230" cy="625" rx="170" ry="22" fill="#000" opacity=".1" filter="url(#ps)"/>
<circle cx="230" cy="510" r="105" fill="#fffdf4" stroke="#ece6cf" stroke-width="3"/>
<text x="230" y="518" text-anchor="middle" font-family="Inter" font-weight="800" font-size="24" fill="${b.ink}">SOFT SIDE</text>
<text x="230" y="650" text-anchor="middle" font-family="Inter" font-size="20" fill="${b.muted}">Smooths and hydrates</text></svg>`;

const dropArt = (b) => `<svg width="460" height="620" viewBox="0 0 460 620"><defs><radialGradient id="dg" cx=".35" cy=".3" r=".8"><stop offset="0" stop-color="#fffaf2"/><stop offset=".6" stop-color="#ead9bd"/><stop offset="1" stop-color="#c8a77a"/></radialGradient><filter id="ds"><feGaussianBlur stdDeviation="12"/></filter></defs>
<path d="M230 40 C230 40 90 230 90 330 a140 140 0 0 0 280 0 C370 230 230 40 230 40z" fill="url(#dg)"/>
<ellipse cx="180" cy="320" rx="22" ry="60" fill="#fff" opacity=".55"/>
<ellipse cx="230" cy="560" rx="200" ry="26" fill="#000" opacity=".14" filter="url(#ds)"/>
<path d="M60 540 q85 -36 170 0 t170 0" stroke="#c8a77a" stroke-width="10" fill="none" stroke-linecap="round" opacity=".7"/></svg>`;

module.exports = [
  {
    slug: 'seolbae', name: 'SEOLBAE', form: 'jar',
    ink: '#2d3418', accent: '#6f8f2e', muted: '#6d7360', soft: '#f1f4e4', line: '#d9dfc4',
    bg: 'linear-gradient(160deg,#fbfaf1 0%,#eef2dc 100%)', bg2: '#f7f5ea',
    pack: ['#f3f1e3', '#fffef8', '#e7e3cd'], lid: ['#b7c98a', '#dfe8c3'], label: '#ffffff',
    packLine1: 'NAJU PEAR GLOW', packLine2: 'Toner Pad · 2% Niacinamide', packSize: '70 Pads · 5.07 fl oz (150 ml)',
    category: 'GLOW TONER PADS',
    headline: 'Swipe On a<br><span style="color:#6f8f2e">Fresh, Pear-Glow</span><br>Finish',
    subhead: 'Hydrating Korean pear toner pads that gently smooth and brighten the look of dull skin in one step.',
    benefits: [[ic.drop('#6f8f2e'), 'Juicy<br>Hydration'], [ic.glow('#6f8f2e'), 'Brighter-<br>Looking Tone'], [ic.smooth('#6f8f2e'), 'Smoother<br>Texture']],
    ingHeadline: 'Fresh From the Orchard,<br>Backed by Skin Science',
    ingredients: [[pear, 'Naju Pear Extract', 'From Korea’s famous pear region. Juicy hydration for dull, thirsty skin'], [molecule('#6f8f2e'), '2% Niacinamide', 'Helps even out the look of skin tone and visible dullness'], [layers('#6f8f2e'), 'Gentle PHA', 'A mild exfoliant that lifts dull surface buildup without stinging']],
    freeFrom: ['Vegan', 'Cruelty-Free', 'No Artificial Fragrance', 'No Alcohol', 'Dermatologist Tested*'],
    textureKicker: 'Dual-Textured Pad', textureHeadline: 'Two Sides.<br>One Smooth Swipe.',
    texturePoints: [['Embossed side', 'Gently buffs away flaky, dull buildup on rough areas'], ['Soft side', 'Sweeps on a juicy layer of essence for a dewy finish'], ['Soaked, not dripping', 'Each pad holds enough essence for your full face and neck']],
    textureArt: '',
    resultKicker: 'Consumer Perception Test', resultHeadline: 'After 2 Weeks,<br>Users Said...',
    results: [[94, 'Skin felt more hydrated'], [91, 'Skin texture looked smoother'], [88, 'Skin looked brighter and more radiant']],
    resultNote: 'ILLUSTRATIVE SAMPLE DATA for portfolio purposes only. Replace with the brand’s verified test results (lab, date, sample size).',
    howHeadline: 'Your 30-Second<br>Glow Step',
    steps: [['1', 'Cleanse', 'Wash your face and gently pat dry.'], ['2', 'Swipe', 'Use the embossed side on rough areas, then flip and sweep the soft side over the face.'], ['3', 'Pat & Layer', 'Pat in the remaining essence. Follow with serum and moisturizer, and SPF in the morning.']],
    howNote: 'Avoid the eye area. Start with once daily if you are new to exfoliating pads.',
    whoHeadline: 'For Dull, Thirsty,<br>Uneven-Looking Skin',
    whoList: ['Your skin looks tired or flat by midday', 'You want glow without a sticky layer', 'You are new to exfoliating and want something gentle', 'You want one quick step instead of toner + cotton pad'],
    skinTypes: ['Dry', 'Normal', 'Combination', 'Sensitive'],
    apBg: 'linear-gradient(100deg,#eef2dc 0%,#f9f7ec 60%,#ffffff 100%)', apInk: '#2d3418',
    apKicker: 'The Korean orchard secret, in a pad', apHeadline: 'Fresh Glow<br>in One Swipe', apChips: ['Naju Pear Extract', '2% Niacinamide', 'Gentle PHA'],
    routineKicker: 'Where It Fits', routineHeadline: 'Morning & Night Routine',
    routine: [['Cleanse', 'Gentle gel or foam cleanser'], ['SEOLBAE Pad', 'Swipe, flip, and pat in', true], ['Serum', 'Your favorite treatment serum'], ['Moisturize', 'Lock in hydration'], ['SPF (AM)', 'Finish with broad-spectrum sunscreen']],
    title: 'SEOLBAE Naju Pear Glow Toner Pads with 2% Niacinamide and PHA, Dual-Textured Hydrating Exfoliating Face Pads for Dull Skin, Vegan Korean Skin Care, 70 Pads',
    bullets: [
      'FRESH GLOW IN ONE SWIPE: Pre-soaked Korean toner pads that hydrate, gently exfoliate, and brighten the look of dull skin in a single 30-second step, no cotton pads needed',
      'NAJU PEAR + 2% NIACINAMIDE: Pear extract from Korea’s Naju orchard region adds juicy hydration while niacinamide helps even out the look of skin tone',
      'GENTLE PHA EXFOLIATION: A mild polyhydroxy acid lifts dull surface buildup for smoother-looking texture, gentle enough for daily use on most skin types',
      'DUAL-TEXTURED PADS: Use the embossed side to buff rough areas, then flip to the soft side to sweep on essence for a dewy, non-sticky finish',
      'CLEAN AND VEGAN: Formulated without alcohol and artificial fragrance; vegan and cruelty-free; 70 pads per jar with a tweezer included',
    ],
    searchTerms: 'korean toner pads glow pads niacinamide pads exfoliating pads for face pha toner pads brightening pads dull skin pads vegan skincare pads glass skin',
  },
  {
    slug: 'kongyeol', name: 'KONGYEOL', form: 'bottle',
    ink: '#1d1b1a', accent: '#a57d4b', muted: '#6e665e', soft: '#f3ece2', line: '#e2d6c5',
    bg: 'linear-gradient(160deg,#faf6f0 0%,#efe5d8 100%)', bg2: '#f6f0e7',
    pack: ['#1b1918', '#3a3532', '#141211'], lid: ['#0e0d0c', '#3b3734'], label: '#f4ede4',
    packLine1: 'BLACK SOYBEAN', packLine2: 'Peptide Firming Serum', packSize: '1.69 fl oz (50 ml)',
    category: 'PEPTIDE SERUM',
    headline: 'Bounce Back<br>to <span style="color:#a57d4b">Firm,<br>Springy Skin</span>',
    subhead: 'A silky Korean serum with fermented black soybean and 5 peptides for firmer, plumper-looking skin.',
    benefits: [[ic.bounce('#a57d4b'), 'Firmer-<br>Looking Skin'], [ic.lines('#a57d4b'), 'Softens Look<br>of Fine Lines'], [ic.shield('#a57d4b'), 'Supports<br>Moisture Barrier']],
    ingHeadline: 'Fermented Tradition<br>Meets Modern Peptides',
    ingredients: [[beans, 'Fermented Black Soybean', 'A Korean kitchen staple, fermented for a nourishing, skin-loving extract'], [peptide('#a57d4b'), '5-Peptide Complex', 'Helps skin look firmer and smoother, with a bouncier feel'], [bricks('#a57d4b'), 'Ceramide NP', 'Supports the moisture barrier so skin stays soft and comfortable']],
    freeFrom: ['Cruelty-Free', 'Fragrance-Free', 'No Parabens', 'No Mineral Oil', 'Dermatologist Tested*'],
    textureKicker: 'Texture', textureHeadline: 'Silky Milk-Serum.<br>Zero Heaviness.',
    texturePoints: [['Absorbs fast', 'A light milky serum that sinks in without film or residue'], ['Plays well with others', 'Layers smoothly under moisturizer, SPF, and makeup'], ['Comfortable all day', 'Ceramide NP helps skin feel soft, not tight']],
    textureArt: '',
    resultKicker: 'Consumer Perception Test', resultHeadline: 'After 4 Weeks,<br>Users Said...',
    results: [[93, 'Skin felt firmer and bouncier'], [89, 'Fine lines looked softer'], [92, 'Skin felt smoother and more nourished']],
    resultNote: 'ILLUSTRATIVE SAMPLE DATA for portfolio purposes only. Replace with the brand’s verified test results (lab, date, sample size).',
    howHeadline: 'Two Drops,<br>Twice a Day',
    steps: [['1', 'Prep', 'After cleansing and toning, leave skin slightly damp.'], ['2', 'Press', 'Warm 2 to 3 drops between your palms and press over face and neck.'], ['3', 'Seal', 'Follow with moisturizer, and SPF in the morning.']],
    howNote: 'Patch test before first use. Store away from direct sunlight.',
    whoHeadline: 'For Skin That’s Losing<br>Its Bounce',
    whoList: ['Your skin feels less firm than it used to', 'Fine lines show up more by the end of the day', 'You want peptides without a heavy cream', 'You prefer fragrance-free formulas'],
    skinTypes: ['Dry', 'Normal', 'Combination', 'Mature'],
    apBg: 'linear-gradient(100deg,#141211 0%,#2a2523 55%,#5a4a38 100%)', apInk: '#f4ede4',
    apKicker: 'A Korean fermentation ritual, bottled', apHeadline: 'Firm. Springy.<br>Skin That Bounces Back.', apChips: ['Fermented Black Soybean', '5-Peptide Complex', 'Ceramide NP'],
    routineKicker: 'Where It Fits', routineHeadline: 'Your AM & PM Routine',
    routine: [['Cleanse', 'Gentle, low-pH cleanser'], ['Tone', 'Hydrating toner or essence'], ['KONGYEOL Serum', '2 to 3 drops, press in', true], ['Moisturize', 'Seal in the serum'], ['SPF (AM)', 'Broad-spectrum sunscreen']],
    title: 'KONGYEOL Black Soybean Peptide Firming Serum with 5-Peptide Complex and Ceramide NP, Lightweight Korean Face Serum for Firmer-Looking Skin and Fine Lines, Fragrance-Free, 1.69 fl oz',
    bullets: [
      'FIRMER, SPRINGIER-LOOKING SKIN: A silky Korean peptide serum that helps skin look firmer and feel bouncier, with a visibly smoother, more rested look',
      'FERMENTED BLACK SOYBEAN: Inspired by Korea’s fermentation tradition, this nourishing extract helps skin feel soft, supple, and replenished',
      '5-PEPTIDE COMPLEX + CERAMIDE NP: Peptides help soften the look of fine lines while ceramide supports the moisture barrier for lasting comfort',
      'LIGHTWEIGHT MILK-SERUM TEXTURE: Absorbs quickly without sticky residue and layers smoothly under moisturizer, sunscreen, and makeup',
      'FRAGRANCE-FREE AND GENTLE: Made without fragrance, parabens, and mineral oil; cruelty-free; use 2 to 3 drops morning and night after toner',
    ],
    searchTerms: 'peptide serum korean firming serum black soybean serum fine lines serum ceramide serum fragrance free serum korean skincare anti aging serum face',
  },
];
// texture art is attached after definition to reference colors
module.exports[0].textureArt = padArt(module.exports[0]);
module.exports[1].textureArt = dropArt(module.exports[1]);
