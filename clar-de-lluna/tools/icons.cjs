// Renders the PNG app icons from site/favicon.svg.  Run: node tools/icons.cjs
const { chromium } = require('playwright');
const path = require('path');
const site = path.join(__dirname, '..', 'site');
(async () => {
  const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome' }).catch(() => chromium.launch());
  for (const size of [180, 192, 512]) {
    const p = await b.newPage({ viewport: { width: size, height: size } });
    // pad the mark for maskable/rounded launchers
    await p.goto('file://' + path.join(site, 'index.html')).catch(() => {});
    await p.setContent(`<body style="margin:0;background:#0B1020"><img src="file://${path.join(site, 'favicon.svg')}" style="display:block;width:${size}px;height:${size}px;transform:scale(.78)"></body>`);
    await p.waitForTimeout(100);
    await p.screenshot({ path: path.join(site, `icon-${size}.png`) });
    await p.close();
  }
  await b.close();
  console.log('icons written');
})();
