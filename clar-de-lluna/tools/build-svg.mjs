// Generates the hand-drawn vector identity of Clar de Lluna and injects it into
// site/index.html between <!--svg:NAME--> … <!--/svg:NAME--> markers.
// Also writes site/favicon.svg.  Run:  node tools/build-svg.mjs
import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const root = join(dirname(fileURLToPath(import.meta.url)), '..', 'site');
const r2 = (n) => Math.round(n * 100) / 100;

// ---- Glyphs: cap height 100, baseline y=100, drawn as thin strokes --------
const star = (cx, cy, r) => {
  const k = r * 0.16;
  return `M${cx} ${cy - r}Q${cx + k} ${cy - k} ${cx + r} ${cy}Q${cx + k} ${cy + k} ${cx} ${cy + r}` +
    `Q${cx - k} ${cy + k} ${cx - r} ${cy}Q${cx - k} ${cy - k} ${cx} ${cy - r}Z`;
};

const GLYPHS = {
  C: { w: 90, stroke: 'M88.3 17.9A50 50 0 1 0 88.3 82.1' },
  L: { w: 52, stroke: 'M0 0V100H52' },
  A: { w: 72, stroke: 'M0 100L36 0L72 100' }, // Λ — no crossbar, as on the print
  R: { w: 60, stroke: 'M0 100V0H28A26 26 0 0 1 28 52H0M26 52L60 100' },
  N: { w: 66, stroke: 'M0 100V0L66 100V0' },
  // the U of LLUNA is a crescent moon
  U: { w: 80, fill: 'M0 30A46.43 46.43 0 1 0 80 30A43.33 43.33 0 1 1 0 30Z' },
  // "DE" — two back-to-back crescents with a tiny four-point star
  DE: {
    w: 86,
    stroke: 'M5 2A60.5 60.5 0 0 1 5 98',
    fill: 'M60 2A57.96 57.96 0 0 0 60 98A75.7 75.7 0 0 1 60 2Z' + star(73, 50, 11),
  },
};

const TRACK = 34; // letter spacing
const WORD = 84;  // word spacing
const WORDS = [['C', 'L', 'A', 'R'], ['DE'], ['L', 'L', 'U', 'N', 'A']];

// Lay glyphs out on a straight baseline → [{g, x}], total width
function layout() {
  const out = [];
  let x = 0;
  WORDS.forEach((word, wi) => {
    if (wi) x += WORD - TRACK;
    word.forEach((g, gi) => {
      if (gi || wi) x += TRACK;
      out.push({ g, x });
      x += GLYPHS[g].w;
    });
  });
  return { glyphs: out, width: x };
}

const glyph = (g) => {
  const G = GLYPHS[g];
  return (G.stroke ? `<path class="wm-s" d="${G.stroke}"/>` : '') +
    (G.fill ? `<path class="wm-f" d="${G.fill}"/>` : '');
};

// ---- Straight wordmark (header / footer) ----------------------------------
function straightWordmark(cls) {
  const { glyphs, width } = layout();
  const pad = 6;
  const body = glyphs.map(({ g, x }) => `<g transform="translate(${x} 0)">${glyph(g)}</g>`).join('');
  return `<svg class="${cls}" viewBox="${-pad} ${-pad} ${width + pad * 2} ${100 + pad * 2}" role="img" aria-label="Clar de Lluna"><g class="wm-glyphs">${body}</g></svg>`;
}

// ---- Hero disc: arched wordmark, orbit, planet dot, globe, curved tagline --
function disc() {
  const C = 500;            // centre of a 1000×1000 viewBox
  const R_DISC = 492;
  const R_ORBIT = 392;
  const S = 0.8;            // glyph scale on the disc
  const rBase = R_ORBIT + 4;
  const rMid = rBase + (100 * S) / 2;
  const { glyphs, width } = layout();

  const deg = (rad) => (rad * 180) / Math.PI;
  const span = deg((width * S) / rMid);
  const arched = glyphs.map(({ g, x }) => {
    const w = GLYPHS[g].w;
    const a = deg(((x + w / 2) * S - (width * S) / 2) / rMid);
    return `<g class="wm-glyph" transform="translate(${C} ${C}) rotate(${r2(a)}) translate(0 ${-rBase}) scale(${S}) translate(${-w / 2} -100)">${glyph(g)}</g>`;
  }).join('');

  // tagline on the bottom arc — fixed length so the layout never depends on the font
  const R_TAG = 410;
  const TAG_SPAN = 118; // degrees
  const tagLen = r2((R_TAG * TAG_SPAN * Math.PI) / 180);

  // orbit arcs fill the gaps between wordmark and tagline (angles from 12 o'clock, clockwise)
  const gap = 5;
  const wmEnd = span / 2 + gap;
  const tagEnd = 180 - TAG_SPAN / 2 - gap;
  const pt = (a, r = R_ORBIT) => {
    const t = ((a - 90) * Math.PI) / 180;
    return [r2(C + r * Math.cos(t)), r2(C + r * Math.sin(t))];
  };
  const arc = (a1, a2) => {
    const [x1, y1] = pt(a1);
    const [x2, y2] = pt(a2);
    return `M${x1} ${y1}A${R_ORBIT} ${R_ORBIT} 0 0 1 ${x2} ${y2}`;
  };
  const right = arc(wmEnd, tagEnd);
  const left = arc(360 - tagEnd, 360 - wmEnd);
  const [dx, dy] = pt(360 - wmEnd - 10);           // planet dot, ~10 o'clock
  const [gx, gy] = pt(tagEnd - 3);                // globe, ~4–5 o'clock

  // faint stars inside the disc (deterministic)
  let seed = 7;
  const rnd = () => ((seed = (seed * 16807) % 2147483647) / 2147483647);
  let dots = '';
  for (let i = 0; i < 110; i++) {
    const r = Math.sqrt(rnd()) * (R_DISC - 14);
    const t = rnd() * Math.PI * 2;
    dots += `<circle cx="${r2(C + r * Math.cos(t))}" cy="${r2(C + r * Math.sin(t))}" r="${r2(0.8 + rnd() * 1.6)}" opacity="${r2(0.12 + rnd() * 0.45)}"/>`;
  }

  const tx = C - R_TAG;
  const tagPath = `M${tx} ${C}A${R_TAG} ${R_TAG} 0 0 0 ${C + R_TAG} ${C}`;

  return `<svg class="disc-art" viewBox="0 0 1000 1000" aria-hidden="true" focusable="false">
<defs>
<radialGradient id="dg" cx="44%" cy="38%" r="70%"><stop offset="0" stop-color="#18223D"/><stop offset=".65" stop-color="#0F1629"/><stop offset="1" stop-color="#0B1020"/></radialGradient>
<radialGradient id="nb" cx="50%" cy="50%" r="50%"><stop offset="0" stop-color="#8D97AD" stop-opacity=".10"/><stop offset="1" stop-color="#8D97AD" stop-opacity="0"/></radialGradient>
<path id="tagArc" d="${tagPath}"/>
</defs>
<circle cx="${C}" cy="${C}" r="${R_DISC}" fill="url(#dg)" stroke="rgba(237,234,227,.10)" stroke-width="1.2"/>
<ellipse cx="380" cy="560" rx="300" ry="170" fill="url(#nb)" transform="rotate(-24 380 560)"/>
<ellipse cx="640" cy="380" rx="230" ry="120" fill="url(#nb)" transform="rotate(18 640 380)"/>
<g class="disc-stars" fill="#EDEAE3">${dots}</g>
<g class="orbit" fill="none" stroke="#EDEAE3" stroke-width="1.6">
<path class="orbit-arc" pathLength="1" d="${left}"/>
<path class="orbit-arc" pathLength="1" d="${right}"/>
</g>
<circle class="planet" cx="${dx}" cy="${dy}" r="6" fill="#EDEAE3"/>
<g class="globe" transform="translate(${gx} ${gy})" fill="none" stroke="#EDEAE3" stroke-width="1.6">
<circle r="26" fill="#0E1528"/>
<path d="M-17 -12c6 2 9-3 14 0s2 8 7 9 7-3 11 0M-22 6c5-2 8 3 12 2s3-6 8-5M-6 18c2-4 7-4 9-1s6 2 8-1M2 -24c-1 5 3 7 7 6"/>
</g>
<g class="wordmark-arch" fill="#EDEAE3" stroke="#EDEAE3">${arched}</g>
<text class="tagline" fill="#EDEAE3"><textPath href="#tagArc" startOffset="50%" text-anchor="middle" textLength="${tagLen}" lengthAdjust="spacing">WELCOME TO OUR SPACE</textPath></text>
</svg>`;
}

// ---- Small mark (crescent ligature) ---------------------------------------
const markPaths = `<path d="${GLYPHS.DE.stroke}" fill="none" stroke="currentColor" stroke-width="5"/><path d="${GLYPHS.DE.fill}" fill="currentColor"/>`;

function footerMark() {
  return `<svg class="foot-mark" viewBox="0 0 120 120" aria-hidden="true" focusable="false">
<circle cx="60" cy="60" r="52" fill="none" stroke="currentColor" stroke-width="1" opacity=".55"/>
<circle cx="19.5" cy="27.5" r="2.6" fill="currentColor"/>
<g transform="translate(36 37) scale(.46)">${markPaths}</g>
</svg>`;
}

const favicon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128">
<rect width="128" height="128" rx="0" fill="#0B1020"/>
<g transform="translate(25 21) scale(.9)" color="#EDEAE3">${markPaths}</g>
</svg>
`;

// ---- Inject ----------------------------------------------------------------
const blocks = {
  disc: disc(),
  'wordmark-header': straightWordmark('wm wm-header'),
  'wordmark-footer': straightWordmark('wm wm-footer'),
  'mark-footer': footerMark(),
};

const file = join(root, 'index.html');
let html = readFileSync(file, 'utf8');
for (const [name, svg] of Object.entries(blocks)) {
  const re = new RegExp(`(<!--svg:${name}-->)[\\s\\S]*?(<!--/svg:${name}-->)`);
  if (!re.test(html)) throw new Error(`marker svg:${name} not found`);
  html = html.replace(re, `$1${svg}$2`);
}
writeFileSync(file, html);
writeFileSync(join(root, 'favicon.svg'), favicon);
console.log('SVG injected; arched wordmark span computed from layout.');
