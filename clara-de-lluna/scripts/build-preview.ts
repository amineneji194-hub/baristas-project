/**
 * Builds a single self-contained HTML file (preview.html) for the Clara de Lluna menu:
 * real menu data (imported from src/data/menu.ts) + photos embedded as data URIs,
 * with working tabs, search, dietary filters, size picker, FR/AR/EN + RTL, dark mode.
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

// The page itself lives in scripts/preview-template.html; data is injected here.
const html = readFileSync(resolve(root, 'scripts/preview-template.html'), 'utf8')
  .replace('__MENU__', () => DATA)
  .replace('__IMG__', () => IMGJSON);

writeFileSync(resolve(root, 'preview.html'), html);
console.log('preview.html written:', (Buffer.byteLength(html)/1024).toFixed(0)+' KB');
