// Verifies the menu data against the printed menu.  Run: node tools/check-data.cjs
const fs = require('fs'), vm = require('vm');
const MENU = vm.runInNewContext(fs.readFileSync(__dirname + '/../site/menu.js', 'utf8') + ';MENU');
const expected = {
  'Cafés': 7, 'Thé': 4, 'Chocolat chaud': 4, 'Café glacé': 3, 'Café frappé': 5, 'Milkshakes': 5,
  'Smoothies': 5, 'Mojitos': 2, 'Boissons fraîches': 6, 'Chimney cakes': 4, 'Chimney cones': 3,
  'Crêpes sucrées': 4, 'Crêpes salées': 3, 'Crème glacée': 4,
};
const fail = [];
const items = MENU.flatMap((c) => c.items);
const sum = Math.round(items.reduce((s, i) => s + i.price, 0) * 100) / 100;
const sigs = items.filter((i) => i.sig).length;
if (MENU.length !== 14) fail.push(`categories ${MENU.length} ≠ 14`);
if (items.length !== 59) fail.push(`items ${items.length} ≠ 59`);
if (sigs !== 9) fail.push(`signatures ${sigs} ≠ 9`);
if (sum !== 529.8) fail.push(`price sum ${sum} ≠ 529.8`);
for (const c of MENU) {
  const s = Math.round(c.items.reduce((a, i) => a + i.price, 0) * 100) / 100;
  console.log(`${c.title.padEnd(18)} ${String(c.items.length).padStart(2)} items  ${s}`);
  if (expected[c.title] !== c.items.length) fail.push(`${c.title}: ${c.items.length} ≠ ${expected[c.title]}`);
}
console.log(`\n${MENU.length} categories, ${items.length} items, ${sigs} signatures, total ${sum} DT`);
if (fail.length) { console.error('FAIL\n' + fail.join('\n')); process.exit(1); }
console.log('Data check: OK');
