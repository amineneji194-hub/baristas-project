# 🌙 Clara de Lluna — Digital QR Menu (demo)

A mobile-first QR menu demo for **Clara de Lluna**, café in Boumhal (Ben Arous).
It's built on the same engine as the Baristas menu in the repo root: a static PWA,
no backend, no admin panel yet.

> ⚠️ **Demo content.** The items, prices, address, phone and Wi-Fi in
> `src/data/menu.ts` are realistic placeholders. Swap in the owner's real menu
> and photos before going live.

## What's in the demo

- Midnight-blue + moon-gold branding with a crescent wordmark, plus light and dark modes.
- French first, with Arabic (full RTL) and English.
- 9 categories and about 50 items: Tunisian café classics (express, capucin, direct, thé aux
  pignons, citronnade), iced drinks & milkshakes, juices & mojitos, **signature chimney
  cakes**, crêpes & waffles, desserts, breakfast & savoury, extras.
- Search, dietary filters, size picker, allergens, "Les préférés" rail, live open/closed,
  Wi-Fi card.

## Run

```bash
npm install
npm run dev                      # http://localhost:5173
npm run build                    # production build into dist/
npx tsx scripts/build-preview.ts # single-file preview.html to send to the owner
npm run qr -- <deployed-url>     # QR code + table tent
```

## Edit

- Menu, prices, hours, address and Wi-Fi: `src/data/menu.ts`
- Colors: `src/index.css` (CSS variables)
- Real logo: save as `public/logo.png` and set `shop.logo: '/logo.png'`
- Chimney cake photos: the illustration at `public/photos/chimney-cake.svg` is a stand-in.
