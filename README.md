# ☕ Baristas — Digital QR Menu

A fast, beautiful, mobile-first digital menu for **Baristas**. Customers scan a QR
code on the table and instantly see the menu on their phone — no app, no login.
It's a **static site** (no backend), so it's free to host forever and never sleeps,
and it's an installable **PWA** that keeps working on weak café Wi-Fi.

> _"Coffee first. Everything else can wait."_

---

## ✨ Features

- Mobile-first premium design — espresso/caramel palette, Fraunces + Plus Jakarta Sans.
- Sticky category tabs with scroll-spy.
- Search + dietary filters (the filter bar only shows tags that actually apply).
- Item cards → detail popup with **S/M/L size picker**, allergens, dietary tags.
- Customer-favorites rail.
- Trilingual: **English / Français / العربية** with full **RTL** for Arabic.
- Dark mode (auto + manual toggle).
- Live open/closed status from opening hours.
- Wi-Fi card with copy-password + a scannable "join Wi-Fi" QR.
- PWA / offline support, lazy blur-up images, skeleton loaders.
- Accessible (semantic HTML, focus rings, alt text, WCAG-AA contrast).
- Print-ready QR + branded table-tent generator.

---

## 🚀 Run locally

```bash
npm install      # first time only
npm run dev      # http://localhost:5173
```

Other scripts:

```bash
npm run build    # type-check + production build into /dist
npm run preview  # preview the production build
npm run qr -- <url>   # regenerate the QR + table-tent for a deployed URL
npm run icons    # (optional) regenerate raster PWA icons from public/icon.svg
```

---

## ✏️ Edit the menu (no coding needed)

Everything lives in one file: [`src/data/menu.ts`](src/data/menu.ts), with a big
how-to comment at the top. In short:

- **Change a price** → edit the `price` number (or a price inside `sizes`). Dinars use
  a dot here: `price: 6.5` shows as **`6,500 DT`**.
- **Add / remove / hide an item** → copy a `{ … }` block, delete a block, or set
  `isAvailable: false`.
- **Feature an item** → `isFeatured: true` adds it to "Customer favorites".

UI wording lives in [`src/data/i18n.ts`](src/data/i18n.ts) (all three languages).

### Swap in the real brand assets

| What | Where |
|---|---|
| Logo | Save your logo as `public/logo.png` (transparent PNG ideal) — header shows it automatically |
| Photos | Set each item's `image` to a real photo URL, or a file in `public/photos/…` |
| Shop info (address, phone, hours, Wi-Fi, socials) | the `shop` block in `src/data/menu.ts` |

---

## 🖨️ QR code + table-tent

```bash
npm run qr -- https://your-deployed-url
```

Writes to **`qr-output/`**: a vector `baristas-qr.svg`, a hi-res `baristas-qr.png`, and
a print-ready A6 `baristas-table-tent.svg` ("Scan to see our menu").

---

## ☁️ Deploy to Cloudflare Pages (free)

1. Push to GitHub.
2. Cloudflare Dashboard → **Workers & Pages → Create → Pages → Connect to Git**.
3. Build command `npm run build`, output directory `dist`, framework preset **Vite**.
4. **Save and Deploy** → you get `https://baristas-menu.pages.dev`.
5. Run `npm run qr -- <your-url>` and print the table-tent.

Every push redeploys. Alternatives: **Netlify** / **Vercel** (same build + `dist`).

---

## 🧱 Tech

React + Vite + TypeScript · Tailwind (CSS-variable theming) · Framer Motion ·
lucide-react · self-hosted fonts (@fontsource) · vite-plugin-pwa · fully static.

```
src/
  data/menu.ts        ← the menu (edit this)
  data/i18n.ts        ← UI strings (EN/FR/AR)
  components/          ← Header, CategoryTabs, SearchFilter, ItemCard, ItemModal, …
  context/ · lib/      ← theme + language providers, price/hours helpers
scripts/qr.ts · icons.ts
public/               ← logo, favicon, brand icon, manifest
```

---

## 🔧 Optional: a no-code web admin (later)

The MVP has no backend dependency. If the owner later wants to edit from a web UI:
**Decap CMS** (git-based, stays free/static) or **Supabase** free tier (note: free
projects pause after ~7 days of inactivity). Neither is required.
