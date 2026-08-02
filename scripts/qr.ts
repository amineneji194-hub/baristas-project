/**
 * Generate print-ready QR assets that point to the deployed menu.
 *
 *   npm run qr -- https://baristas-menu.pages.dev
 *
 * Outputs into ./qr-output:
 *   - baristas-qr.svg          vector QR (scales to any size, perfect for print)
 *   - baristas-qr.png          high-resolution raster QR (1600px)
 *   - baristas-table-tent.svg  a brandable A6 table-tent / sticker with the logo,
 *                              "Scan to see our menu" and the QR embedded.
 *
 * Re-run for any URL to regenerate everything.
 */
import QRCode from 'qrcode';
import { mkdirSync, writeFileSync, readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const outDir = resolve(root, 'qr-output');
mkdirSync(outDir, { recursive: true });

// ── Read the URL from the command line ────────────────────────────────────
const url = process.argv[2] ?? 'https://baristas-menu.pages.dev';
if (!process.argv[2]) {
  console.warn(`⚠  No URL passed — using default "${url}".`);
  console.warn('   Usage: npm run qr -- https://your-deployed-url\n');
}

// Brand colors (keep in sync with src/index.css).
const DARK = '#3B2417'; // espresso (QR modules)
const LIGHT = '#FAF6F0'; // latte cream (QR background)
const ACCENT = '#C68B59';

const qrOpts = {
  errorCorrectionLevel: 'H' as const, // robust: survives a logo overlay / smudges
  margin: 2,
  color: { dark: DARK, light: LIGHT },
};

async function main() {
  // 1) SVG QR
  const svg = await QRCode.toString(url, { ...qrOpts, type: 'svg' });
  writeFileSync(resolve(outDir, 'baristas-qr.svg'), svg);

  // 2) High-res PNG QR
  await QRCode.toFile(resolve(outDir, 'baristas-qr.png'), url, { ...qrOpts, width: 1600 });

  // 3) Branded table-tent (A6 portrait, 105 × 148 mm) with the QR embedded.
  const qrDataUrl = await QRCode.toDataURL(url, { ...qrOpts, width: 600, margin: 1 });
  const logoSvg = readFileSync(resolve(root, 'public', 'logo.svg'), 'utf8');
  const logoDataUrl =
    'data:image/svg+xml;base64,' + Buffer.from(logoSvg).toString('base64');

  const tent = `<svg xmlns="http://www.w3.org/2000/svg" width="105mm" height="148mm" viewBox="0 0 420 592">
  <rect width="420" height="592" fill="${LIGHT}"/>
  <rect x="16" y="16" width="388" height="560" rx="28" fill="none" stroke="${ACCENT}" stroke-width="2" stroke-dasharray="2 6"/>
  <image href="${logoDataUrl}" x="162" y="48" width="96" height="96"/>
  <text x="210" y="186" text-anchor="middle" font-family="Georgia, 'Times New Roman', serif" font-size="40" font-weight="700" fill="${DARK}">Baristas</text>
  <text x="210" y="220" text-anchor="middle" font-family="Georgia, serif" font-style="italic" font-size="17" fill="${ACCENT}">Coffee first. Everything else can wait.</text>
  <g>
    <rect x="95" y="256" width="230" height="230" rx="18" fill="#ffffff" stroke="${DARK}" stroke-width="1.5"/>
    <image href="${qrDataUrl}" x="110" y="271" width="200" height="200"/>
  </g>
  <text x="210" y="524" text-anchor="middle" font-family="Helvetica, Arial, sans-serif" font-size="22" font-weight="700" fill="${DARK}">Scan to see our menu</text>
  <text x="210" y="550" text-anchor="middle" font-family="Helvetica, Arial, sans-serif" font-size="13" fill="${DARK}" opacity="0.6">Scannez pour voir le menu · امسح لرؤية القائمة</text>
</svg>`;
  writeFileSync(resolve(outDir, 'baristas-table-tent.svg'), tent);

  console.log('✓ QR assets written to qr-output/');
  console.log(`  • baristas-qr.svg`);
  console.log(`  • baristas-qr.png (1600px)`);
  console.log(`  • baristas-table-tent.svg (A6 print-ready)`);
  console.log(`\n  Encoded URL: ${url}`);
}

main().catch((err) => {
  console.error('QR generation failed:', err);
  process.exit(1);
});
