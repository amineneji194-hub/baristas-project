/**
 * Generate PWA + Apple touch PNG icons from public/icon.svg.
 * Run:  npm run icons
 * Re-run this whenever you replace public/icon.svg / logo.
 */
import sharp from 'sharp';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const pub = resolve(root, 'public');
const svg = readFileSync(resolve(pub, 'icon.svg'));

const targets = [
  { file: 'pwa-192.png', size: 192 },
  { file: 'pwa-512.png', size: 512 },
  { file: 'apple-touch-icon.png', size: 180 },
];

for (const { file, size } of targets) {
  await sharp(svg, { density: 384 })
    .resize(size, size, { fit: 'contain', background: { r: 59, g: 36, b: 23, alpha: 1 } })
    .png()
    .toFile(resolve(pub, file));
  console.log(`✓ ${file} (${size}×${size})`);
}
console.log('Icons generated in /public.');
