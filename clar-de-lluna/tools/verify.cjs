// Layout + interaction checks at phone and desktop widths, with screenshots.
// Needs a local server:  (cd site && python3 -m http.server 8765)
// Run:  node tools/verify.cjs [baseUrl]
const { chromium } = require('playwright');
const path = require('path');
const BASE = process.argv[2] || 'http://localhost:8765/';
const OUT = path.join(__dirname, '..', 'screenshots');
const WIDTHS = [360, 375, 390, 430, 1280];
const fails = [];
const { execFileSync } = require('child_process');
const UA = 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36';
const fontCache = new Map();
// Sandbox only: fetch Google Fonts with curl (the browser here can't reach them directly).
async function routeFonts(page) {
  await page.route(/fonts\.(googleapis|gstatic)\.com/, async (route) => {
    const url = route.request().url();
    try {
      if (!fontCache.has(url)) fontCache.set(url, execFileSync('curl', ['-sSfL', '-A', UA, url], { maxBuffer: 1 << 24 }));
      const type = url.includes('googleapis') ? 'text/css; charset=utf-8' : 'font/woff2';
      await route.fulfill({ body: fontCache.get(url), contentType: type, headers: { 'access-control-allow-origin': '*' } });
    } catch { await route.abort(); }
  });
}
const check = (ok, msg) => { if (!ok) fails.push(msg); };

(async () => {
  const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome' }).catch(() => chromium.launch());
  for (const w of WIDTHS) {
    const h = w < 1000 ? Math.round(w * 2.1) : 800;
    const page = await browser.newPage({ viewport: { width: w, height: h }, deviceScaleFactor: 2 });
    const errors = [];
    page.on('pageerror', (e) => errors.push(e.message));
    await routeFonts(page);
    await page.goto(BASE, { waitUntil: 'networkidle' });
    await page.evaluate(() => document.fonts.ready);
    const fonts = await page.evaluate(() => [...document.fonts].filter((f) => f.status === 'loaded').map((f) => f.family).join(','));
    check(/Jost/.test(fonts) && /Cormorant Garamond/.test(fonts), `${w}: web fonts not loaded (${fonts})`);
    await page.waitForTimeout(2200); // opening animation
    await page.screenshot({ path: `${OUT}/${w}-opening.png` });

    // reveal everything by scrolling through, then back to top
    await page.evaluate(async () => {
      for (let y = 0; y < document.documentElement.scrollHeight; y += 400) { window.scrollTo(0, y); await new Promise((r) => setTimeout(r, 30)); }
      window.scrollTo(0, 0);
    });
    await page.waitForTimeout(600);

    const r = await page.evaluate(() => {
      const vw = window.innerWidth;
      const res = { scrollWidth: document.documentElement.scrollWidth, vw, overflow: [], wordmark: [], arch: [] };
      const skip = (el) => el.closest('.chips, .sig-row, .sr-only, .sky');
      for (const el of document.body.querySelectorAll('*')) {
        if (skip(el)) continue;
        const b = el.getBoundingClientRect();
        if (!b.width && !b.height) continue;
        if (b.left < -0.5 || b.right > vw + 0.5) res.overflow.push(`${el.tagName.toLowerCase()}.${el.className && el.className.baseVal !== undefined ? el.className.baseVal : el.className} [${Math.round(b.left)},${Math.round(b.right)}]`);
      }
      // straight wordmarks: content bbox inside viewBox
      for (const svg of document.querySelectorAll('svg.wm')) {
        const vb = svg.viewBox.baseVal; const bb = svg.querySelector('.wm-glyphs').getBBox();
        if (bb.x < vb.x || bb.y < vb.y || bb.x + bb.width > vb.x + vb.width || bb.y + bb.height > vb.y + vb.height) res.wordmark.push(svg.className.baseVal);
      }
      // arched wordmark + tagline: every glyph inside the disc
      const disc = document.querySelector('.disc-art').getBoundingClientRect();
      const cx = disc.left + disc.width / 2, cy = disc.top + disc.height / 2, R = disc.width * 0.492;
      const tp = document.querySelector('.tagline');
      for (let i = 0; i < tp.getNumberOfChars(); i++) {
        const e = tp.getExtentOfChar(i); // viewBox units, disc centre 500,500 radius 492
        const far = Math.max(...[[e.x, e.y], [e.x + e.width, e.y], [e.x, e.y + e.height], [e.x + e.width, e.y + e.height]].map(([x, y]) => Math.hypot(x - 500, y - 500)));
        if (far > 492) res.arch.push('tagline char ' + i);
      }
      for (const g of document.querySelectorAll('.wm-glyph')) {
        const b = g.getBoundingClientRect();
        for (const [x, y] of [[b.left, b.top], [b.right, b.top], [b.left, b.bottom], [b.right, b.bottom]]) {
          // corners of an axis-aligned box over a rotated glyph overshoot; allow a small tolerance
          if (Math.hypot(x - cx, y - cy) > R + disc.width * 0.06) { res.arch.push(g.getAttribute('class')); break; }
        }
      }
      const tl = document.querySelector('.tagline textPath');
      res.tagLen = tl.getComputedTextLength();
      res.discInView = disc.top >= 0 && disc.bottom <= window.innerHeight;
      const btn = document.getElementById('toMenu').getBoundingClientRect();
      res.btnInView = btn.bottom <= window.innerHeight;
      return res;
    });
    check(r.scrollWidth === r.vw, `${w}: scrollWidth ${r.scrollWidth} ≠ ${r.vw}`);
    check(!r.overflow.length, `${w}: overflow → ${r.overflow.slice(0, 8).join(' | ')}`);
    check(!r.wordmark.length, `${w}: wordmark clipped → ${r.wordmark.join(',')}`);
    check(!r.arch.length, `${w}: arched glyphs outside disc → ${r.arch.join(',')}`);
    check(r.discInView && r.btnInView, `${w}: opening screen does not fit (disc ${r.discInView}, button ${r.btnInView})`);
    check(!errors.length, `${w}: JS errors → ${errors.join(' | ')}`);

    await page.screenshot({ path: `${OUT}/${w}-full.png`, fullPage: true });

    if (w === 390) {
      // VOIR LA CARTE
      await page.click('#toMenu');
      await page.waitForTimeout(1200);
      const atMenu = await page.evaluate(() => Math.abs(document.getElementById('carte').getBoundingClientRect().top - document.getElementById('bars').getBoundingClientRect().height) < 30);
      check(atMenu, 'VOIR LA CARTE did not land on the menu');
      await page.screenshot({ path: `${OUT}/390-menu.png` });

      // chip tap → section lands below the bars and chip is active
      for (const id of ['smoothies', 'crepes-salees', 'cafes']) {
        await page.click(`.chip[data-cat="${id}"]`);
        await page.waitForTimeout(1300);
        const st = await page.evaluate((id) => {
          const top = document.getElementById(id).getBoundingClientRect().top;
          const bars = document.getElementById('bars').getBoundingClientRect().bottom;
          const chip = document.querySelector(`.chip[data-cat="${id}"]`);
          const cr = chip.getBoundingClientRect(), row = document.getElementById('chips').getBoundingClientRect();
          return { delta: top - bars, active: chip.getAttribute('aria-current') === 'true', chipVisible: cr.left >= row.left - 1 && cr.right <= row.right + 1 };
        }, id);
        check(st.delta >= -2 && st.delta < 24, `chip ${id}: section offset ${st.delta}px from bars`);
        check(st.active, `chip ${id}: not active after tap`);
        check(st.chipVisible, `chip ${id}: active chip scrolled out of view`);
        if (id === 'smoothies') await page.screenshot({ path: `${OUT}/390-chip-smoothies.png` });
      }

      // scroll-spy: manual scroll into Mojitos
      await page.evaluate(() => {
        const y = document.getElementById('mojitos').getBoundingClientRect().top + window.scrollY - document.getElementById('bars').offsetHeight - 40;
        window.scrollTo({ top: y + 60, behavior: 'instant' });
      });
      await page.waitForTimeout(700);
      const spy = await page.evaluate(() => document.querySelector('.chip[aria-current="true"]')?.dataset.cat);
      check(spy === 'mojitos', `scroll-spy: expected mojitos, got ${spy}`);

      // search
      await page.click('#searchJump');
      await page.waitForTimeout(900);
      await page.fill('#q', 'nutella');
      const s1 = await page.evaluate(() => ({
        items: document.querySelectorAll('.item:not([hidden])').length,
        allMatch: [...document.querySelectorAll('.item:not([hidden])')].every((li) => /nutella/i.test(li.textContent)),
        empty: !document.getElementById('empty').hidden,
        sig: !document.getElementById('signatures').hidden,
      }));
      check(s1.items > 5 && s1.allMatch && !s1.empty && !s1.sig, `search nutella: ${JSON.stringify(s1)}`);
      await page.screenshot({ path: `${OUT}/390-search-nutella.png` });
      await page.fill('#q', 'creme glacee');
      const s2 = await page.evaluate(() => document.querySelectorAll('.item:not([hidden])').length);
      check(s2 >= 6, `search accent-insensitive "creme glacee": ${s2} items`);
      await page.fill('#q', 'zzz');
      const s3 = await page.evaluate(() => ({ empty: !document.getElementById('empty').hidden, items: document.querySelectorAll('.item:not([hidden])').length, groups: document.querySelectorAll('.group:not([hidden])').length }));
      check(s3.empty && s3.items === 0 && s3.groups === 0, `search zzz: ${JSON.stringify(s3)}`);
      await page.screenshot({ path: `${OUT}/390-search-empty.png` });
      await page.click('#qClear');
      const s4 = await page.evaluate(() => document.querySelectorAll('.item:not([hidden])').length);
      check(s4 === 59, `search clear: ${s4} items visible`);
      const sw = await page.evaluate(() => document.documentElement.scrollWidth === window.innerWidth);
      check(sw, 'horizontal overflow after interactions');
    }
    console.log(`${w}px: tagline length ${Math.round(r.tagLen)}, checked`);
    await page.close();
  }
  await browser.close();
  if (fails.length) { console.error('\nFAIL\n- ' + fails.join('\n- ')); process.exit(1); }
  console.log('\nAll layout and interaction checks passed.');
})();
