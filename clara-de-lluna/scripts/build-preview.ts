/**
 * Builds a single self-contained HTML file (preview.html) for the Clara de Lluna menu:
 * real menu data (imported from src/data/menu.ts) + photos embedded as data URIs,
 * with working tabs, search, dietary filters, size popup, EN/FR/AR + RTL, dark mode.
 * Run: npx tsx scripts/build-preview.ts
 */
import { menu } from '../src/data/menu';
import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const assets = resolve(root, 'preview-assets');
mkdirSync(assets, { recursive: true });

// Collect every Unsplash photo id used by the menu, so this stays in sync with
// src/data/menu.ts automatically.
const ID: Record<string, string> = {};
for (const it of menu.items) {
  const m = it.image.match(/photo-([0-9a-f-]+)/);
  if (m) ID[m[1]] = m[1];
}

// Download any missing photos (small, for embedding) via curl, so this runs
// on a fresh clone without a separate step.
for (const id of Object.keys(ID)) {
  const file = resolve(assets, id + '.jpg');
  if (existsSync(file)) continue;
  const url = `https://images.unsplash.com/photo-${id}?w=500&q=60&auto=format&fit=crop&fm=jpg`;
  try {
    execFileSync('curl', ['-sSL', '--max-time', '30', '-o', file, url]);
    console.log('fetched', id);
  } catch {
    console.warn('could not fetch', id, '— it will use the moon-icon fallback');
  }
}

// Build { image url or photo id -> dataURI }
const IMG: Record<string, string> = {};
for (const id of Object.keys(ID)) {
  const file = resolve(assets, id + '.jpg');
  if (!existsSync(file)) continue;
  IMG[id] = 'data:image/jpeg;base64,' + readFileSync(file).toString('base64');
}
// Local images from /public (e.g. the chimney-cake illustration).
for (const it of menu.items) {
  if (!it.image.startsWith('/') || IMG[it.image]) continue;
  const file = resolve(root, 'public', it.image.slice(1));
  if (!existsSync(file)) continue;
  const mime = file.endsWith('.svg') ? 'image/svg+xml' : 'image/jpeg';
  IMG[it.image] = `data:${mime};base64,` + readFileSync(file).toString('base64');
}

const DATA = JSON.stringify({ shop: menu.shop, categories: menu.categories, items: menu.items });
const IMGJSON = JSON.stringify(IMG);

const html = `<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Clara de Lluna Menu</title>
<style>
@import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,500;0,9..144,600;1,9..144,500&family=Plus+Jakarta+Sans:wght@400;500;600;700&family=Cairo:wght@400;600;700&display=swap');

:root{
  --bg:#f7f3ec; --surface:#ffffff; --foam:#ece4d6; --ink:#1b2233; --muted:#686d80;
  --primary:#1f2a44; --accent:#b08534; --terracotta:#b4533a; --line:#e3dccf; --shadow:20 26 46;
}
@media (prefers-color-scheme:dark){:root:not([data-theme="light"]){
  --bg:#0d1221; --surface:#161d32; --foam:#222b46; --ink:#eee8da; --muted:#a0a6ba;
  --primary:#eee8da; --accent:#e0bd6e; --terracotta:#d46a50; --line:#2a3352; --shadow:0 0 0;
}}
:root[data-theme="dark"]{
  --bg:#0d1221; --surface:#161d32; --foam:#222b46; --ink:#eee8da; --muted:#a0a6ba;
  --primary:#eee8da; --accent:#e0bd6e; --terracotta:#d46a50; --line:#2a3352; --shadow:0 0 0;
}

*{box-sizing:border-box}
body{margin:0;background:
  radial-gradient(120% 60% at 50% 0%, color-mix(in srgb,var(--accent) 12%, transparent), transparent 60%),
  var(--bg);
  color:var(--ink);font-family:'Plus Jakarta Sans',system-ui,sans-serif;min-height:100vh}
[dir="rtl"]{font-family:'Cairo',system-ui,sans-serif}
.wrap{max-width:520px;margin:0 auto;min-height:100vh;background:var(--bg);
  box-shadow:0 0 60px -20px rgb(var(--shadow)/.35)}
img{max-width:100%}
button{font-family:inherit;cursor:pointer}
::-webkit-scrollbar{height:0;width:0}
.hide-sb{scrollbar-width:none}
h1,h2,h3{text-wrap:balance}

/* header */
.hd{position:relative;padding:22px 20px 14px;
  background:linear-gradient(to bottom, color-mix(in srgb,var(--primary) 9%,transparent), transparent)}
.hd-top{display:flex;justify-content:space-between;align-items:flex-start;gap:12px}
.logo{display:flex;align-items:center;gap:10px;font-family:'Fraunces',Georgia,serif;font-weight:600;font-style:italic;font-size:27px;
  letter-spacing:-.5px;color:var(--primary);line-height:1}
.logo svg{width:36px;height:36px;flex:0 0 auto}
.tag{font-family:'Fraunces',Georgia,serif;font-style:italic;font-size:14px;color:var(--muted);margin-top:8px;max-width:22ch}
.ctrls{display:flex;gap:8px;flex-shrink:0}
.icbtn{height:38px;min-width:38px;padding:0 10px;border:1px solid var(--line);background:color-mix(in srgb,var(--surface) 80%,transparent);
  border-radius:999px;color:var(--ink);font-weight:600;font-size:13px;display:inline-flex;align-items:center;gap:6px;
  box-shadow:0 2px 8px -3px rgb(var(--shadow)/.15)}
.pills{display:flex;flex-wrap:wrap;gap:8px;margin-top:14px}
.pill{display:inline-flex;align-items:center;gap:6px;padding:5px 11px;border-radius:999px;font-size:12px;font-weight:600}
.pill.open{background:color-mix(in srgb,#2e9b6b 16%,transparent);color:#2e9b6b}
.pill.closed{background:color-mix(in srgb,var(--terracotta) 16%,transparent);color:var(--terracotta)}
.pill.ghost{background:color-mix(in srgb,var(--surface) 80%,transparent);border:1px solid var(--line);color:var(--ink)}
.dot{width:6px;height:6px;border-radius:50%;background:currentColor}

/* section title */
.sect-h{display:flex;align-items:center;gap:8px;font-family:'Fraunces',Georgia,serif;font-weight:600;
  font-size:20px;color:var(--primary);margin:0 0 12px}
.sect-h svg{width:20px;height:20px;flex:0 0 auto;color:var(--accent)}
.rail-wrap{padding:6px 20px 0}
.rail{display:flex;gap:12px;overflow-x:auto;padding:4px 0 10px;scroll-snap-type:x mandatory}
.fav{flex:0 0 168px;scroll-snap-align:start;background:var(--surface);border:1px solid var(--line);border-radius:18px;
  overflow:hidden;text-align:start;box-shadow:0 4px 16px -8px rgb(var(--shadow)/.2)}
.fav img,.fav .ph{height:104px;width:100%;object-fit:cover;display:block}
.fav .bd{padding:10px 12px}
.fav .nm{font-family:'Fraunces',serif;font-weight:600;color:var(--primary);white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.fav .pr{color:var(--accent);font-weight:700;font-size:14px}

/* tabs */
.tabs{position:sticky;top:0;z-index:20;background:color-mix(in srgb,var(--bg) 88%,transparent);
  backdrop-filter:blur(10px);border-bottom:1px solid var(--line)}
.tabs-in{display:flex;gap:8px;overflow-x:auto;padding:11px 16px}
.tab{flex:0 0 auto;display:inline-flex;align-items:center;gap:7px;padding:8px 15px;border-radius:999px;font-weight:600;
  font-size:14px;border:1px solid var(--line);background:color-mix(in srgb,var(--surface) 70%,transparent);color:var(--ink);white-space:nowrap}
.tab.on{background:var(--primary);color:var(--bg);border-color:var(--primary)}
.tab svg{width:15px;height:15px}

/* search + filters */
.search{padding:16px 16px 0;position:relative}
.search input{width:100%;padding:13px 44px;border-radius:16px;border:1px solid var(--line);background:var(--surface);
  color:var(--ink);font-size:15px;outline:none}
.search input:focus{border-color:var(--accent)}
.search .mag{position:absolute;left:30px;top:29px;color:var(--muted)}
[dir="rtl"] .search .mag{left:auto;right:30px}
.filters{display:flex;gap:8px;overflow-x:auto;padding:12px 16px 0;align-items:center}
.flabel{flex:0 0 auto;font-size:12px;font-weight:700;color:var(--muted);display:inline-flex;gap:5px;align-items:center}
.chip{flex:0 0 auto;display:inline-flex;align-items:center;gap:6px;padding:6px 12px;border-radius:999px;font-size:12px;
  font-weight:600;border:1px solid var(--line);background:var(--surface);color:var(--ink);white-space:nowrap}
.chip.on{background:var(--accent);color:var(--bg);border-color:var(--accent)}
.chip svg,.flabel svg{width:13px;height:13px}

/* cards */
main{padding:4px 16px 0}
.sect{padding-top:22px;scroll-margin-top:70px}
.card{display:flex;gap:12px;width:100%;text-align:start;background:var(--surface);border:1px solid var(--line);
  border-radius:18px;padding:12px;margin-bottom:12px;box-shadow:0 3px 14px -8px rgb(var(--shadow)/.18)}
.card:active{transform:scale(.99)}
.card .thumb{flex:0 0 92px;height:92px;border-radius:13px;overflow:hidden;background:var(--foam);position:relative}
.card .thumb img{height:100%;width:100%;object-fit:cover}
.card .ph{height:100%;display:flex;align-items:center;justify-content:center;color:var(--accent)}
.card .info{min-width:0;flex:1;display:flex;flex-direction:column}
.card .nm{font-family:'Fraunces',serif;font-weight:600;font-size:17px;color:var(--primary);margin:0;
  white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.card .ds{font-size:13px;line-height:1.35;color:var(--muted);margin:3px 0 0;
  display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden}
.card .row{margin-top:auto;padding-top:8px;display:flex;align-items:flex-end;justify-content:space-between;gap:8px}
.badges{display:flex;gap:5px;flex-wrap:wrap}
.bdg{width:24px;height:24px;border-radius:50%;background:color-mix(in srgb,var(--foam) 75%,transparent);
  display:inline-flex;align-items:center;justify-content:center;color:var(--accent)}
.bdg svg{width:14px;height:14px}
.price{font-weight:700;color:var(--ink);white-space:nowrap}
.price .from{font-size:11px;font-weight:500;color:var(--muted);margin-inline-end:4px}

/* modal */
.ov{position:fixed;inset:0;z-index:50;display:flex;align-items:flex-end;justify-content:center;
  background:rgb(13 18 33/.55);backdrop-filter:blur(3px);opacity:0;pointer-events:none;transition:opacity .2s}
.ov.show{opacity:1;pointer-events:auto}
@media(min-width:640px){.ov{align-items:center}}
.sheet{width:100%;max-width:480px;max-height:92vh;overflow:hidden auto;background:var(--bg);border-radius:26px 26px 0 0;
  transform:translateY(100%);transition:transform .28s cubic-bezier(.22,1,.36,1);position:relative}
@media(min-width:640px){.sheet{border-radius:26px}}
.ov.show .sheet{transform:none}
.sheet .hero{height:210px;width:100%;object-fit:cover;background:var(--foam);display:block}
.sheet .hero.ph{display:flex;align-items:center;justify-content:center;color:var(--accent)}
.x{position:absolute;top:14px;inset-inline-end:14px;width:36px;height:36px;border-radius:50%;border:none;
  background:color-mix(in srgb,var(--bg) 80%,transparent);color:var(--ink);display:flex;align-items:center;justify-content:center}
.sbody{padding:18px 20px 26px}
.sbody h2{font-family:'Fraunces',serif;font-weight:600;font-size:23px;color:var(--primary);margin:0}
.sbody .lead{display:flex;justify-content:space-between;gap:12px;align-items:flex-start}
.tagprice{background:color-mix(in srgb,var(--accent) 16%,transparent);color:var(--accent);font-weight:700;
  padding:5px 12px;border-radius:999px;white-space:nowrap}
.sbody p.d{color:var(--ink);opacity:.85;margin:10px 0 0;line-height:1.5}
.lbl{font-size:13px;font-weight:700;color:var(--ink);margin:16px 0 8px}
.sizes{display:flex;flex-wrap:wrap;gap:8px}
.sz{padding:9px 14px;border-radius:13px;border:1px solid var(--line);background:var(--surface);color:var(--ink);font-weight:600;font-size:14px}
.sz.on{background:var(--primary);color:var(--bg);border-color:var(--primary)}
.taglist{display:flex;flex-wrap:wrap;gap:8px;margin-top:14px}
.tg{display:inline-flex;align-items:center;gap:6px;padding:4px 10px;border-radius:999px;background:color-mix(in srgb,var(--foam) 70%,transparent);
  font-size:12px;font-weight:600;color:var(--ink)}
.tg svg{width:13px;height:13px;color:var(--accent)}
.alrg{margin-top:16px;background:color-mix(in srgb,var(--foam) 55%,transparent);border-radius:14px;padding:12px}
.alrg b{font-size:13px}.alrg p{margin:4px 0 0;font-size:13px;color:var(--muted)}

/* footer */
footer{padding:26px 20px 40px;text-align:center;color:var(--muted)}
.soc{display:flex;justify-content:center;gap:10px;margin-bottom:14px}
.soc a{width:40px;height:40px;border-radius:50%;border:1px solid var(--line);background:var(--surface);color:var(--ink);
  display:flex;align-items:center;justify-content:center}
.wifi{display:flex;align-items:center;gap:14px;background:var(--surface);border:1px solid var(--line);border-radius:18px;
  padding:14px;margin:0 4px 20px;text-align:start}
.wifi .qr{width:82px;height:82px;border-radius:12px;background:#fff;padding:5px;flex:0 0 auto}
.foot-t{font-family:'Fraunces',serif;font-style:italic;margin-top:16px}
.demo{position:fixed;left:50%;transform:translateX(-50%);bottom:12px;z-index:60;background:var(--primary);color:var(--bg);
  font-size:12px;font-weight:600;padding:8px 16px;border-radius:999px;white-space:nowrap;max-width:calc(100vw - 32px);overflow:hidden;text-overflow:ellipsis;box-shadow:0 8px 24px -8px rgb(var(--shadow)/.5);opacity:.94}
@media(prefers-reduced-motion:reduce){*{transition:none!important}}
:focus-visible{outline:2px solid var(--accent);outline-offset:2px}
</style>

<div class="wrap" id="app"></div>
<div class="demo" id="demo">Démo · touchez un article, changez la langue</div>

<script>
const MENU = ${DATA};
const IMG = ${IMGJSON};
const T = {
  featured:{en:'Customer favorites',fr:'Les préférés',ar:'الأكثر طلباً'},
  search:{en:'Search the menu…',fr:'Rechercher au menu…',ar:'ابحث في القائمة…'},
  filters:{en:'Filters',fr:'Filtres',ar:'تصفية'},
  from:{en:'from',fr:'dès',ar:'من'},
  sizes:{en:'Sizes',fr:'Tailles',ar:'الأحجام'},
  allergens:{en:'Allergens',fr:'Allergènes',ar:'مسببات الحساسية'},
  none:{en:'Nothing matches your search.',fr:'Aucun résultat.',ar:'لا توجد نتائج.'},
  open:{en:'Open now',fr:'Ouvert',ar:'مفتوح الآن'},
  closed:{en:'Closed',fr:'Fermé',ar:'مغلق'},
  share:{en:'Share',fr:'Partager',ar:'مشاركة'},
  wifi:{en:'Wi-Fi',fr:'Wi-Fi',ar:'واي فاي'},
  soldout:{en:'Sold out',fr:'Épuisé',ar:'نفد'}
};
const TAGL = {
  vegan:{en:'Vegan',fr:'Vegan',ar:'نباتي صرف'},vegetarian:{en:'Vegetarian',fr:'Végétarien',ar:'نباتي'},
  'gluten-free':{en:'Gluten-free',fr:'Sans gluten',ar:'خالٍ من الغلوتين'},spicy:{en:'Spicy',fr:'Épicé',ar:'حار'},
  'contains-nuts':{en:'Contains nuts',fr:'Contient des noix',ar:'يحتوي مكسرات'},decaf:{en:'Decaf',fr:'Décaféiné',ar:'منزوع الكافيين'}
};
const ALL = {milk:{en:'Milk',fr:'Lait',ar:'حليب'},eggs:{en:'Eggs',fr:'Œufs',ar:'بيض'},gluten:{en:'Gluten',fr:'Gluten',ar:'غلوتين'},
  nuts:{en:'Nuts',fr:'Noix',ar:'مكسرات'},peanuts:{en:'Peanuts',fr:'Arachides',ar:'فول سوداني'},soy:{en:'Soy',fr:'Soja',ar:'صويا'},sesame:{en:'Sesame',fr:'Sésame',ar:'سمسم'}};
const TAG_ORDER=['vegan','vegetarian','gluten-free','spicy','contains-nuts','decaf'];

// minimal inline icons
const IC={
  Coffee:'<path d="M17 8h1a4 4 0 010 8h-1M3 8h14v9a4 4 0 01-4 4H7a4 4 0 01-4-4V8zM6 2v2M10 2v2M14 2v2"/>',
  Snowflake:'<path d="M2 12h20M12 2v20m8-16-4 4m-8 8-4 4m16 0-4-4M8 8 4 4"/>',
  Citrus:'<path d="M12 12 3.5 20.5M20 10a8 8 0 01-10 10A8 8 0 0120 10zM12 12l8.5-8.5"/><circle cx="12" cy="12" r="9"/>',
  Leaf:'<path d="M11 20A7 7 0 019.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10zM2 21c0-3 1.85-5.36 5.08-6"/>',
  Croissant:'<path d="M4.6 13.11l5.79-3.21c1.89-1.05 4.79 1.78 3.71 3.71l-3.22 5.81C8.8 23.16.79 15.23 4.6 13.11zM12.94 5.2 8.51 9.3M15 3l-2 2M20.5 13.5 16 18M22 9l-2 2"/>',
  Plus:'<path d="M5 12h14M12 5v14"/>',
  Cookie:'<path d="M12 2a10 10 0 1010 10 4 4 0 01-5-5 4 4 0 01-5-5"/><path d="M8.5 8.5v.01M16 15.5v.01M12 12v.01M11 17v.01M7 14v.01"/>',
  CakeSlice:'<circle cx="9" cy="7" r="2"/><path d="M7.2 7.9 3 11v9c0 .6.4 1 1 1h16c.6 0 1-.4 1-1v-9c0-2-3-6-7-8l-3.6 2.6M16 13H3M16 17H3"/>',
  Vegan:'<path d="M2 22s2-8 8.5-8.5S19 8 22 4C11 4 2 10 2 22zM8 16c3-2 6-3 8-3"/>',
  Salad:'<path d="M7 21h10M12 12v9M11.38 12a2.4 2.4 0 01-.4-4.77 2.4 2.4 0 013.2-2.77 2.4 2.4 0 013.47-.63 2.4 2.4 0 013.37 3.37 2.4 2.4 0 01-1.1 3.7 2.51 2.51 0 01.03 1.1"/>',
  WheatOff:'<path d="m2 22 10-10M16 8l-1.17 1.17M3.47 12.53 5 11l1.53 1.53a3.5 3.5 0 010 4.94L5 19l-1.53-1.53a3.5 3.5 0 010-4.94zM7.47 8.53 9 7M11.47 4.53 13 3M2 2l20 20"/>',
  Flame:'<path d="M8.5 14.5A2.5 2.5 0 0011 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 11-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 002.5 2.5z"/>',
  Bean:'<path d="M10.165 6.598C9.954 7.478 9.64 8.36 9 9c-.64.64-1.521.954-2.402 1.165A6 6 0 108 22a13.96 13.96 0 006-1.5M10.5 6a6 6 0 118 8"/>',
  Moon:'<path d="M12 3a6 6 0 009 9 9 9 0 11-9-9z"/>',
  Star:'<path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01z"/>',
  Search:'<circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>',
  Sliders:'<path d="M4 21v-7M4 10V3M12 21v-9M12 8V3M20 21v-5M20 12V3M1 14h6M9 8h6M17 16h6"/>',
  X:'<path d="M18 6 6 18M6 6l12 12"/>',
  Share:'<circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><path d="m8.6 13.5 6.8 4M15.4 6.5l-6.8 4"/>',
  Wifi:'<path d="M5 13a10 10 0 0114 0M8.5 16.5a5 5 0 017 0M2 8.8a15 15 0 0120 0M12 20h.01"/>',
  Sun:'<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>',
  Insta:'<rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="4"/><path d="M17.5 6.5h.01"/>',
  Globe:'<circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15 15 0 010 20 15 15 0 010-20z"/>',
  Fb:'<path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/>'
};
const TAG_IC={vegan:'Vegan',vegetarian:'Salad','gluten-free':'WheatOff',spicy:'Flame','contains-nuts':'Bean',decaf:'Moon'};
function svg(name,extra){return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" '+(extra||'')+'>'+(IC[name]||'')+'</svg>';}
function idOf(url){const m=(url||'').match(/photo-([0-9a-f-]+)/);return m?m[1]:url;}
function pic(url){const id=idOf(url);return id&&IMG[id]?IMG[id]:null;}
const MARK='<svg viewBox="0 0 40 40" aria-hidden="true"><circle cx="20" cy="20" r="20" fill="#1F2A44"/><path d="M24.5 9.5a11 11 0 1 0 6 19.6A9 9 0 0 1 24.5 9.5z" fill="#E0BD6E"/><circle cx="29" cy="12" r="1.2" fill="#EEE8DA"/><circle cx="32" cy="18" r="0.8" fill="#EEE8DA"/></svg>';

let lang='fr', theme=null, query='', tags=[], sizeIdx=0, current=null;
const $=s=>document.querySelector(s);
function tr(o){return o?(o[lang]||o.en):'';}
function money(v){const mm=Math.round(v*1000);return Math.floor(mm/1000)+','+String(mm%1000).padStart(3,'0')+' '+MENU.shop.currency;}
function base(it){return it.sizes&&it.sizes.length?Math.min.apply(null,it.sizes.map(s=>s.price)):it.price;}
function openState(){
  const h=MENU.shop.hours, now=new Date(), d=now.getDay(), mins=now.getHours()*60+now.getMinutes();
  const toM=s=>{const p=s.split(':');return +p[0]*60+ +p[1]};
  const t=h[d];
  if(t){let o=toM(t.open),c=toM(t.close);const cm=c<=o;if(cm)c+=1440;const cur=(mins<o&&cm)?mins+1440:mins;if(cur>=o&&cur<c)return{open:true,at:t.close};}
  const p=h[(d+6)%7];if(p){const o=toM(p.open),c=toM(p.close);if(c<=o&&mins<c)return{open:true,at:p.close};}
  return{open:false,at:t?t.open:null};
}
const usedTags=(()=>{const s=new Set();MENU.items.forEach(i=>(i.tags||[]).forEach(t=>s.add(t)));return TAG_ORDER.filter(t=>s.has(t));})();

function applyChrome(){
  document.documentElement.dir = lang==='ar'?'rtl':'ltr';
  if(theme) document.documentElement.setAttribute('data-theme',theme); else document.documentElement.removeAttribute('data-theme');
}

function render(){
  applyChrome();
  const s=MENU.shop;
  const q=query.trim().toLowerCase();
  const match=it=>{
    if(tags.length&&!tags.every(t=>(it.tags||[]).includes(t)))return false;
    if(!q)return true;
    return (tr(it.name)+' '+tr(it.description)).toLowerCase().includes(q);
  };
  const filtering = q.length>0 || tags.length>0;
  const cats=MENU.categories.slice().sort((a,b)=>a.order-b.order);
  const featured=MENU.items.filter(i=>i.isFeatured&&i.isAvailable!==false);
  const groups=cats.map(c=>({c,list:MENU.items.filter(i=>i.categoryId===c.id&&match(i))})).filter(g=>g.list.length);
  const os=openState();

  let h='';
  // header
  h+='<div class="hd"><div class="hd-top"><div>'+
     '<h1 class="logo" style="margin:0">'+MARK+s.name+'</h1><div class="tag">'+tr(s.tagline)+'</div></div>'+
     '<div class="ctrls">'+
       '<button class="icbtn" id="lang">'+svg('Globe','width="15" height="15"')+' '+lang.toUpperCase()+'</button>'+
       '<button class="icbtn" id="theme" aria-label="theme">'+svg((theme==='dark')?'Moon':'Sun','width="17" height="17"')+'</button>'+
     '</div></div>'+
     '<div class="pills">'+
       '<span class="pill '+(os.open?'open':'closed')+'"><span class="dot"></span>'+(os.open?tr(T.open):tr(T.closed))+(os.at?' · '+os.at:'')+'</span>'+
       '<button class="pill ghost" id="share">'+svg('Share','width="12" height="12"')+' '+tr(T.share)+'</button>'+
     '</div></div>';

  // featured
  if(!filtering && featured.length){
    h+='<div class="rail-wrap"><h2 class="sect-h">'+svg('Star','width="18" height="18" style="color:var(--accent);fill:var(--accent)"')+tr(T.featured)+'</h2><div class="rail hide-sb">';
    featured.forEach(it=>{const p=pic(it.image);
      h+='<button class="fav" data-open="'+it.id+'">'+(p?'<img src="'+p+'" alt="">':'<div class="ph" style="height:104px;display:flex;align-items:center;justify-content:center;color:var(--accent)">'+svg('Moon','width="26" height="26"')+'</div>')+
         '<div class="bd"><div class="nm">'+tr(it.name)+'</div><div class="pr">'+money(base(it))+'</div></div></button>';
    });
    h+='</div></div>';
  }

  // tabs
  h+='<div class="tabs"><div class="tabs-in hide-sb">';
  cats.forEach((c,i)=>{h+='<button class="tab'+(i===0?' on':'')+'" data-tab="'+c.id+'">'+svg(c.icon,'')+tr(c.name)+'</button>';});
  h+='</div></div>';

  // search + filters
  h+='<div class="search"><span class="mag">'+svg('Search','width="18" height="18"')+'</span>'+
     '<input id="q" type="search" placeholder="'+tr(T.search)+'" value="'+query.replace(/"/g,'&quot;')+'"></div>';
  if(usedTags.length){
    h+='<div class="filters hide-sb"><span class="flabel">'+svg('Sliders','')+tr(T.filters)+'</span>';
    usedTags.forEach(t=>{h+='<button class="chip'+(tags.includes(t)?' on':'')+'" data-tag="'+t+'">'+svg(TAG_IC[t],'')+tr(TAGL[t])+'</button>';});
    h+='</div>';
  }

  // sections
  h+='<main>';
  if(!groups.length){h+='<p style="text-align:center;color:var(--muted);padding:60px 0">'+tr(T.none)+'</p>';}
  groups.forEach(g=>{
    h+='<section class="sect" id="sec-'+g.c.id+'"><h2 class="sect-h">'+svg(g.c.icon,'style="color:var(--accent)"')+tr(g.c.name)+'</h2>';
    g.list.forEach(it=>{
      const p=pic(it.image),sold=it.isAvailable===false;
      h+='<button class="card" data-open="'+it.id+'"'+(sold?' style="opacity:.6"':'')+'>'+
        '<div class="thumb">'+(p?'<img src="'+p+'" alt="">':'<div class="ph">'+svg('Moon','width="24" height="24"')+'</div>')+(sold?'<span style="position:absolute;inset:0;display:flex;align-items:center;justify-content:center;background:rgba(0,0,0,.35);color:#fff;font-size:11px;font-weight:700">'+tr(T.soldout)+'</span>':'')+'</div>'+
        '<div class="info"><h3 class="nm">'+tr(it.name)+'</h3><p class="ds">'+tr(it.description)+'</p>'+
          '<div class="row"><div class="badges">'+(it.tags||[]).slice(0,3).map(t=>'<span class="bdg">'+svg(TAG_IC[t],'')+'</span>').join('')+'</div>'+
          '<span class="price">'+(it.sizes&&it.sizes.length?'<span class="from">'+tr(T.from)+'</span>':'')+money(base(it))+'</span></div>'+
        '</div></button>';
    });
    h+='</section>';
  });
  h+='</main>';

  // footer
  h+='<footer>';
  if(!filtering && s.wifi){
    h+='<div class="wifi"><canvas class="qr" id="wifiqr" width="82" height="82"></canvas><div>'+
       '<div style="font-family:Fraunces,serif;font-weight:600;color:var(--primary);display:flex;gap:6px;align-items:center">'+svg('Wifi','width="16" height="16" style="color:var(--accent)"')+tr(T.wifi)+'</div>'+
       '<div style="font-size:13px;color:var(--muted);margin-top:2px">'+s.wifi.ssid+'</div>'+
       '<code style="display:inline-block;margin-top:6px;background:var(--foam);padding:4px 9px;border-radius:9px;font-size:13px">'+s.wifi.password+'</code></div></div>';
  }
  h+='<div class="soc">'+
     (s.socials.instagram?'<a href="'+s.socials.instagram+'" target="_blank" rel="noreferrer">'+svg('Insta','width="18" height="18"')+'</a>':'')+
     (s.socials.facebook?'<a href="'+s.socials.facebook+'" target="_blank" rel="noreferrer">'+svg('Fb','width="18" height="18"')+'</a>':'')+
     (s.socials.website?'<a href="'+s.socials.website+'" target="_blank" rel="noreferrer">'+svg('Globe','width="18" height="18"')+'</a>':'')+'</div>'+
     '<div style="font-size:13px">'+tr(s.address)+'</div>'+
     '<div class="foot-t">'+tr(s.tagline)+'</div>'+
     '<div style="font-size:12px;opacity:.7;margin-top:6px">© '+new Date().getFullYear()+' '+s.name+'</div>';
  h+='</footer>';

  $('#app').innerHTML=h;
  wire();
  drawWifi();
}

function wire(){
  document.querySelectorAll('[data-open]').forEach(b=>b.onclick=()=>openItem(b.getAttribute('data-open')));
  document.querySelectorAll('[data-tab]').forEach(b=>b.onclick=()=>{
    const el=document.getElementById('sec-'+b.getAttribute('data-tab'));
    if(el)el.scrollIntoView({behavior:'smooth',block:'start'});
    document.querySelectorAll('.tab').forEach(t=>t.classList.remove('on'));b.classList.add('on');
  });
  document.querySelectorAll('[data-tag]').forEach(b=>b.onclick=()=>{const t=b.getAttribute('data-tag');tags=tags.includes(t)?tags.filter(x=>x!==t):tags.concat(t);render();});
  const qi=$('#q');if(qi)qi.oninput=e=>{query=e.target.value;const sel=e.target.selectionStart;render();const n=$('#q');if(n){n.focus();try{n.setSelectionRange(sel,sel)}catch(_){}}};
  $('#lang').onclick=()=>{lang=lang==='fr'?'ar':lang==='ar'?'en':'fr';render();};
  $('#theme').onclick=()=>{const dark=document.documentElement.getAttribute('data-theme')==='dark'||(!theme&&matchMedia('(prefers-color-scheme:dark)').matches);theme=dark?'light':'dark';render();};
  const sh=$('#share');if(sh)sh.onclick=()=>{if(navigator.share)navigator.share({title:MENU.shop.name,url:location.href}).catch(()=>{});};
}

// scroll-spy
addEventListener('scroll',()=>{
  const secs=document.querySelectorAll('.sect');let cur=null;
  secs.forEach(s=>{const r=s.getBoundingClientRect();if(r.top<window.innerHeight*0.4)cur=s.id.replace('sec-','');});
  if(cur){document.querySelectorAll('.tab').forEach(t=>t.classList.toggle('on',t.getAttribute('data-tab')===cur));}
},{passive:true});

function openItem(id){
  current=MENU.items.find(i=>i.id===id);sizeIdx=0;if(!current)return;
  renderSheet();$('#ov').classList.add('show');document.body.style.overflow='hidden';
}
function closeItem(){$('#ov').classList.remove('show');document.body.style.overflow='';}
function renderSheet(){
  const it=current;const p=pic(it.image);
  const price=it.sizes&&it.sizes.length?it.sizes[sizeIdx].price:it.price;
  let h='<button class="x" id="xbtn">'+svg('X','width="18" height="18"')+'</button>';
  h+=p?'<img class="hero" src="'+p+'" alt="">':'<div class="hero ph">'+svg('Moon','width="40" height="40"')+'</div>';
  h+='<div class="sbody"><div class="lead"><h2>'+tr(it.name)+'</h2><span class="tagprice">'+money(price)+'</span></div>';
  h+='<p class="d">'+tr(it.description)+'</p>';
  if(it.sizes&&it.sizes.length){h+='<div class="lbl">'+tr(T.sizes)+'</div><div class="sizes">';
    it.sizes.forEach((sz,i)=>{h+='<button class="sz'+(i===sizeIdx?' on':'')+'" data-sz="'+i+'">'+tr(sz.label)+' · '+money(sz.price)+'</button>';});h+='</div>';}
  if(it.tags&&it.tags.length){h+='<div class="taglist">'+it.tags.map(t=>'<span class="tg">'+svg(TAG_IC[t],'')+tr(TAGL[t])+'</span>').join('')+'</div>';}
  if(it.allergens&&it.allergens.length){h+='<div class="alrg"><b>'+tr(T.allergens)+'</b><p>'+it.allergens.map(a=>tr(ALL[a])).join(' · ')+'</p></div>';}
  h+='</div>';
  $('#sheet').innerHTML=h;
  $('#xbtn').onclick=closeItem;
  document.querySelectorAll('[data-sz]').forEach(b=>b.onclick=()=>{sizeIdx=+b.getAttribute('data-sz');renderSheet();});
}

// tiny QR (numeric-free) — draw a stylized placeholder that scans as text via qr? keep simple: render dots grid deterministic
function drawWifi(){
  const c=$('#wifiqr');if(!c)return;const ctx=c.getContext('2d');const s=MENU.shop.wifi;
  const str='WIFI:T:WPA;S:'+s.ssid+';P:'+s.password+';;';
  // deterministic pseudo-QR purely decorative for the preview
  ctx.fillStyle='#1f2a44';
  let seed=0;for(let i=0;i<str.length;i++)seed=(seed*31+str.charCodeAt(i))>>>0;
  const N=11,cell=82/N;function rnd(){seed=(seed*1103515245+12345)>>>0;return seed/4294967296;}
  for(let y=0;y<N;y++)for(let x=0;x<N;x++){if(rnd()>0.5)ctx.fillRect(x*cell,y*cell,cell-0.5,cell-0.5);}
  // corner markers
  ctx.fillRect(0,0,cell*3,cell*3);ctx.fillRect(82-cell*3,0,cell*3,cell*3);ctx.fillRect(0,82-cell*3,cell*3,cell*3);
  ctx.clearRect(cell,cell,cell,cell);ctx.clearRect(82-cell*2,cell,cell,cell);ctx.clearRect(cell,82-cell*2,cell,cell);
}

// overlay element
const ov=document.createElement('div');ov.className='ov';ov.id='ov';ov.innerHTML='<div class="sheet" id="sheet"></div>';
document.body.appendChild(ov);
ov.addEventListener('click',e=>{if(e.target===ov)closeItem();});
addEventListener('keydown',e=>{if(e.key==='Escape')closeItem();});
setTimeout(()=>{const d=$('#demo');if(d)d.style.display='none';},6000);

render();
</script>`;

writeFileSync(resolve(root, 'preview.html'), html);
console.log('preview.html written:', (Buffer.byteLength(html)/1024).toFixed(0)+' KB');
