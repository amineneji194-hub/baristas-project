import type { MenuData } from '../types';

/* ============================================================================
 *  ☕  BARISTAS MENU — THE ONLY FILE YOU NEED TO EDIT  ☕
 * ============================================================================
 *
 *  This is the single source of truth for the whole menu. No coding needed —
 *  just careful copy/paste. After saving, the website updates automatically.
 *
 *  ────────────────────────────────────────────────────────────────────────
 *  HOW TO CHANGE A PRICE
 *  ────────────────────────────────────────────────────────────────────────
 *  Find the item, change the `price` number (or the price inside `sizes`).
 *  Use a DOT for decimals here (it is shown to customers as "6,500 DT"):
 *      price: 6.5      ->  shows  "6,500 DT"
 *      price: 12       ->  shows  "12,000 DT"
 *
 *  ────────────────────────────────────────────────────────────────────────
 *  SIZES (S / M / L)
 *  ────────────────────────────────────────────────────────────────────────
 *  Drinks with several sizes use a `sizes: [...]` list, each with its own
 *  price. The card shows "from <smallest price>" and the popup lets the
 *  customer pick a size. For single-price items just use `price`.
 *
 *  ────────────────────────────────────────────────────────────────────────
 *  HOW TO ADD / REMOVE / HIDE AN ITEM
 *  ────────────────────────────────────────────────────────────────────────
 *  Add:    copy a whole item block (from `{` to `},`) and paste it into the
 *          `items: [ ... ]` list, then change the fields.
 *  Remove: delete the whole block (from `{` to its `},`).
 *  Hide:   set `isAvailable: false` to grey it out / mark "Sold out".
 *  Feature:set `isFeatured: true` to add it to the "Customer favorites" rail.
 *
 *  ⚠️  Keep every comma and bracket exactly as shown. If the site shows an
 *      error after an edit, you probably removed a comma or a `}` — undo it.
 *
 *  🖼️  PHOTOS: each `image` is a placeholder stock photo for now. Replace the
 *      URL with Baristas' own product photo (a link, or a file you put in
 *      /public, e.g. image: '/photos/cappuccino.jpg').
 * ========================================================================== */

// Reusable size labels (kept here so they're written once).
const S = { en: 'Small', fr: 'Petit', ar: 'صغير' };
const M = { en: 'Medium', fr: 'Moyen', ar: 'وسط' };
const L = { en: 'Large', fr: 'Grand', ar: 'كبير' };

// Reusable placeholder photos (swap for real Baristas photos when ready).
const PIC = {
  espresso: 'https://images.unsplash.com/photo-1510707577719-ae7c14805e3a?w=800&q=70&auto=format&fit=crop',
  americano: 'https://images.unsplash.com/photo-1485808191679-5f86510681a2?w=800&q=70&auto=format&fit=crop',
  cappuccino: 'https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=800&q=70&auto=format&fit=crop',
  latte: 'https://images.unsplash.com/photo-1561882468-9110e03e0f78?w=800&q=70&auto=format&fit=crop',
  latteArt: 'https://images.unsplash.com/photo-1543253687-c931c8e01820?w=800&q=70&auto=format&fit=crop',
  flatWhite: 'https://images.unsplash.com/photo-1517256064527-09c73fc73e38?w=800&q=70&auto=format&fit=crop',
  hotChocolate: 'https://images.unsplash.com/photo-1542990253-0d0f5be5f0ed?w=800&q=70&auto=format&fit=crop',
  tea: 'https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9?w=800&q=70&auto=format&fit=crop',
  iceLatte: 'https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?w=800&q=70&auto=format&fit=crop',
  iceAmericano: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=800&q=70&auto=format&fit=crop',
  frappuccino: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=800&q=70&auto=format&fit=crop',
  iceTea: 'https://images.unsplash.com/photo-1499638673689-79a0b5115d87?w=800&q=70&auto=format&fit=crop',
  mojito: 'https://images.unsplash.com/photo-1551538827-9c037cb4f32a?w=800&q=70&auto=format&fit=crop',
  lemonade: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=800&q=70&auto=format&fit=crop',
  smoothie: 'https://images.unsplash.com/photo-1505252585461-04db1eb84625?w=800&q=70&auto=format&fit=crop',
  matcha: 'https://images.unsplash.com/photo-1536256263959-770b48d82b0a?w=800&q=70&auto=format&fit=crop',
  croissant: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=800&q=70&auto=format&fit=crop',
  cookie: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=800&q=70&auto=format&fit=crop',
};

export const menu: MenuData = {
  // ── Shop details ─────────────────────────────────────────────────────────
  shop: {
    name: "Baristas",
    logo: '/logo.png', // ← your real logo: save it as public/logo.png (transparent background works best)
    tagline: {
      en: 'Coffee first. Everything else can wait.',
      fr: "Le café d'abord. Le reste peut attendre.",
      ar: 'القهوة أولاً. كل شيء آخر ينتظر.',
    },
    currency: 'DT',
    languages: ['en', 'fr', 'ar'],
    socials: {
      instagram: 'https://www.instagram.com/baristascoffeeshops/',
      facebook: 'https://www.facebook.com/baristas.cafe/',
      website: 'https://baristascoffeeshop.com',
    },
    address: {
      en: '1, Rue Ressas, El Menzah 1, Tunis',
      fr: '1, Rue Ressas, El Menzah 1, Tunis',
      ar: '1، نهج الرصاص، المنزه 1، تونس',
    },
    phone: '+21670000000', // ← replace with the branch phone number
    // Opening hours per day: 0 = Sunday … 6 = Saturday. null = closed.
    hours: {
      0: { open: '07:00', close: '00:00' },
      1: { open: '06:30', close: '00:00' },
      2: { open: '06:30', close: '00:00' },
      3: { open: '06:30', close: '00:00' },
      4: { open: '06:30', close: '01:00' },
      5: { open: '06:30', close: '01:00' },
      6: { open: '07:00', close: '01:00' },
    },
    wifi: {
      ssid: 'Baristas_WiFi',
      password: 'coffeefirst', // ← replace with the real Wi-Fi password
    },
  },

  // ── Categories (tabs, in display order) ────────────────────────────────────
  // `icon` is a lucide icon NAME (see src/components/CategoryIcon.tsx). Not an emoji.
  categories: [
    { id: 'hot-drinks', name: { en: 'Hot Drinks', fr: 'Boissons chaudes', ar: 'مشروبات ساخنة' }, icon: 'Coffee', order: 1 },
    { id: 'cold-drinks', name: { en: 'Cold Drinks', fr: 'Boissons fraîches', ar: 'مشروبات باردة' }, icon: 'Snowflake', order: 2 },
    { id: 'mojitos', name: { en: 'Mojitos & Juices', fr: 'Mojitos & Jus', ar: 'موهيتو وعصائر' }, icon: 'Citrus', order: 3 },
    { id: 'matcha', name: { en: 'Matcha', fr: 'Matcha', ar: 'ماتشا' }, icon: 'Leaf', order: 4 },
    { id: 'bites', name: { en: "Bites O'Clock", fr: 'Petite faim', ar: 'وجبات خفيفة' }, icon: 'Croissant', order: 5 },
    { id: 'extras', name: { en: 'Extras', fr: 'Suppléments', ar: 'إضافات' }, icon: 'Plus', order: 6 },
  ],

  // ── Items ──────────────────────────────────────────────────────────────────
  items: [
    /* ═══════════════ HOT DRINKS ═══════════════ */
    // — Classic hot drinks —
    {
      id: 'espresso',
      categoryId: 'hot-drinks',
      name: { en: 'Espresso', fr: 'Espresso', ar: 'إسبريسو' },
      description: {
        en: 'A bold, velvety single shot of our signature house roast.',
        fr: 'Un shot intense et velouté de notre torréfaction maison.',
        ar: 'جرعة جريئة وكثيفة من تحميصة البيت المميزة.',
      },
      price: 3.5,
      image: PIC.espresso,
      blur: '#4B2E1E',
      tags: ['vegan', 'gluten-free'],
      isFeatured: true,
    },
    {
      id: 'double-espresso',
      categoryId: 'hot-drinks',
      name: { en: 'Double Espresso', fr: 'Double Espresso', ar: 'إسبريسو مزدوج' },
      description: {
        en: 'Two full shots for a deeper, stronger lift.',
        fr: 'Deux shots complets pour un réveil plus intense.',
        ar: 'جرعتان كاملتان لانتعاش أقوى وأعمق.',
      },
      price: 4.5,
      image: PIC.espresso,
      blur: '#4B2E1E',
      tags: ['vegan', 'gluten-free'],
    },
    {
      id: 'espresso-macchiato',
      categoryId: 'hot-drinks',
      name: { en: 'Espresso Macchiato', fr: 'Espresso Macchiato', ar: 'إسبريسو ماكياتو' },
      description: {
        en: 'Espresso "stained" with a dollop of milk foam.',
        fr: 'Espresso « taché » d’une touche de mousse de lait.',
        ar: 'إسبريسو مع لمسة من رغوة الحليب.',
      },
      price: 4,
      image: PIC.flatWhite,
      blur: '#C19A6B',
      tags: ['vegetarian'],
      allergens: ['milk'],
    },
    {
      id: 'americano',
      categoryId: 'hot-drinks',
      name: { en: 'Americano', fr: 'Americano', ar: 'أمريكانو' },
      description: {
        en: 'Espresso lengthened with hot water — smooth and clean.',
        fr: 'Espresso allongé à l’eau chaude — doux et net.',
        ar: 'إسبريسو ممدّد بالماء الساخن — ناعم ونقي.',
      },
      price: 4.5,
      image: PIC.americano,
      blur: '#5A3825',
      tags: ['vegan', 'gluten-free'],
    },
    {
      id: 'cappuccino',
      categoryId: 'hot-drinks',
      name: { en: 'Cappuccino', fr: 'Cappuccino', ar: 'كابتشينو' },
      description: {
        en: 'Espresso crowned with steamed milk and a thick cloud of foam.',
        fr: 'Espresso, lait vapeur et un nuage généreux de mousse.',
        ar: 'إسبريسو مع حليب مبخّر وطبقة كثيفة من الرغوة.',
      },
      price: 5.5,
      image: PIC.cappuccino,
      blur: '#A47551',
      tags: ['vegetarian'],
      allergens: ['milk'],
      isFeatured: true,
      sizes: [
        { label: S, price: 5.5 },
        { label: M, price: 6.5 },
        { label: L, price: 6.5 },
      ],
    },
    {
      id: 'vanilla-latte',
      categoryId: 'hot-drinks',
      name: { en: 'Vanilla Latte', fr: 'Latte Vanille', ar: 'لاتيه فانيليا' },
      description: {
        en: 'Silky latte sweetened with smooth vanilla.',
        fr: 'Latte soyeux adouci à la vanille.',
        ar: 'لاتيه حريري محلّى بالفانيليا الناعمة.',
      },
      price: 8.5,
      image: PIC.latteArt,
      blur: '#B98B63',
      tags: ['vegetarian'],
      allergens: ['milk'],
      sizes: [
        { label: M, price: 8.5 },
        { label: L, price: 8.5 },
      ],
    },
    {
      id: 'latte-macchiato',
      categoryId: 'hot-drinks',
      name: { en: 'Latte Macchiato', fr: 'Latte Macchiato', ar: 'لاتيه ماكياتو' },
      description: {
        en: 'Layers of steamed milk gently marked with espresso.',
        fr: 'Lait vapeur en couches, marqué d’un trait d’espresso.',
        ar: 'طبقات من الحليب المبخّر مع لمسة إسبريسو.',
      },
      price: 4.5,
      image: PIC.latte,
      blur: '#B98B63',
      tags: ['vegetarian'],
      allergens: ['milk'],
      isFeatured: true,
      sizes: [
        { label: S, price: 4.5 },
        { label: M, price: 5.5 },
        { label: L, price: 5.5 },
      ],
    },
    {
      id: 'hot-chocolate',
      categoryId: 'hot-drinks',
      name: { en: 'Hot Chocolate', fr: 'Chocolat Chaud', ar: 'شوكولاتة ساخنة' },
      description: {
        en: 'Rich melted chocolate and steamed milk.',
        fr: 'Chocolat fondu riche et lait vapeur.',
        ar: 'شوكولاتة ذائبة غنية وحليب مبخّر.',
      },
      price: 7.5,
      image: PIC.hotChocolate,
      blur: '#5A3825',
      tags: ['vegetarian'],
      allergens: ['milk', 'soy'],
      sizes: [
        { label: S, price: 7.5 },
        { label: M, price: 9 },
        { label: L, price: 9 },
      ],
    },
    {
      id: 'moccacino',
      categoryId: 'hot-drinks',
      name: { en: 'Moccacino', fr: 'Moccacino', ar: 'موكاتشينو' },
      description: {
        en: 'Espresso, chocolate and steamed milk in perfect balance.',
        fr: 'Espresso, chocolat et lait vapeur, parfaitement équilibrés.',
        ar: 'إسبريسو وشوكولاتة وحليب مبخّر بتوازن مثالي.',
      },
      price: 7,
      image: PIC.hotChocolate,
      blur: '#5A3825',
      tags: ['vegetarian'],
      allergens: ['milk'],
      sizes: [
        { label: S, price: 7 },
        { label: M, price: 8.5 },
        { label: L, price: 8.5 },
      ],
    },
    {
      id: 'tea',
      categoryId: 'hot-drinks',
      name: { en: 'Tea', fr: 'Thé', ar: 'شاي' },
      description: {
        en: 'A pot of freshly brewed tea.',
        fr: 'Une théière de thé fraîchement infusé.',
        ar: 'إبريق من الشاي الطازج.',
      },
      price: 5.5,
      image: PIC.tea,
      blur: '#A8B57A',
      tags: ['vegan', 'gluten-free'],
      sizes: [
        { label: S, price: 5.5 },
        { label: L, price: 5.5 },
      ],
    },
    // — Classic macchiato (flavored) —
    {
      id: 'macchiato-classic-choco',
      categoryId: 'hot-drinks',
      name: {
        en: 'Macchiato — Chocolate / Moka / Tiramisu',
        fr: 'Macchiato — Chocolat / Moka / Tiramisu',
        ar: 'ماكياتو — شوكولاتة / موكا / تيراميسو',
      },
      description: {
        en: 'Flavoured macchiato. Choose chocolate, moka or tiramisu.',
        fr: 'Macchiato aromatisé. Au choix : chocolat, moka ou tiramisu.',
        ar: 'ماكياتو منكّه. اختر شوكولاتة أو موكا أو تيراميسو.',
      },
      price: 7,
      image: PIC.latteArt,
      blur: '#7A4E32',
      tags: ['vegetarian'],
      allergens: ['milk'],
      sizes: [
        { label: S, price: 7 },
        { label: M, price: 8.5 },
        { label: L, price: 8.5 },
      ],
    },
    {
      id: 'macchiato-classic-toffee',
      categoryId: 'hot-drinks',
      name: {
        en: 'Macchiato — Toffee / Caramel',
        fr: 'Macchiato — Toffee / Caramel',
        ar: 'ماكياتو — توفي / كراميل',
      },
      description: {
        en: 'Flavoured macchiato with toffee or caramel.',
        fr: 'Macchiato aromatisé au toffee ou caramel.',
        ar: 'ماكياتو منكّه بالتوفي أو الكراميل.',
      },
      price: 8.5,
      image: PIC.latteArt,
      blur: '#B07B47',
      tags: ['vegetarian'],
      allergens: ['milk'],
      sizes: [
        { label: S, price: 8.5 },
        { label: M, price: 9.5 },
        { label: L, price: 9.5 },
      ],
    },
    {
      id: 'macchiato-classic-dolce',
      categoryId: 'hot-drinks',
      name: { en: 'Macchiato — Dolce', fr: 'Macchiato — Dolce', ar: 'ماكياتو — دولتشي' },
      description: {
        en: 'Sweet, creamy "dolce" flavoured macchiato.',
        fr: 'Macchiato « dolce » doux et crémeux.',
        ar: 'ماكياتو "دولتشي" حلو وكريمي.',
      },
      price: 9,
      image: PIC.latteArt,
      blur: '#B07B47',
      tags: ['vegetarian'],
      allergens: ['milk'],
      sizes: [
        { label: M, price: 9 },
        { label: L, price: 9 },
      ],
    },
    // — Yummy macchiato —
    {
      id: 'macchiato-yummy-rose',
      categoryId: 'hot-drinks',
      name: { en: 'Yummy Macchiato — Rose', fr: 'Yummy Macchiato — Rose', ar: 'يامي ماكياتو — ورد' },
      description: {
        en: 'Indulgent macchiato with delicate rose.',
        fr: 'Macchiato gourmand délicatement parfumé à la rose.',
        ar: 'ماكياتو فاخر بنكهة الورد اللطيفة.',
      },
      price: 10,
      image: PIC.latteArt,
      blur: '#C98B8B',
      tags: ['vegetarian'],
      allergens: ['milk'],
      sizes: [
        { label: M, price: 10 },
        { label: L, price: 10 },
      ],
    },
    {
      id: 'macchiato-yummy-peanut',
      categoryId: 'hot-drinks',
      name: { en: 'Yummy Macchiato — Peanut Butter', fr: 'Yummy Macchiato — Beurre de Cacahuète', ar: 'يامي ماكياتو — زبدة الفول السوداني' },
      description: {
        en: 'Creamy peanut-butter macchiato.',
        fr: 'Macchiato crémeux au beurre de cacahuète.',
        ar: 'ماكياتو كريمي بزبدة الفول السوداني.',
      },
      price: 11,
      image: PIC.latteArt,
      blur: '#B07B47',
      tags: ['vegetarian', 'contains-nuts'],
      allergens: ['milk', 'peanuts'],
      sizes: [
        { label: M, price: 11 },
        { label: L, price: 11 },
      ],
    },
    {
      id: 'macchiato-yummy-speculoos',
      categoryId: 'hot-drinks',
      name: { en: 'Yummy Macchiato — Speculoos / Nutella', fr: 'Yummy Macchiato — Spéculoos / Nutella', ar: 'يامي ماكياتو — سبيكولوس / نوتيلا' },
      description: {
        en: 'Macchiato with speculoos or Nutella.',
        fr: 'Macchiato au spéculoos ou Nutella.',
        ar: 'ماكياتو بالسبيكولوس أو النوتيلا.',
      },
      price: 11.5,
      image: PIC.latteArt,
      blur: '#7A4E32',
      tags: ['vegetarian', 'contains-nuts'],
      allergens: ['milk', 'gluten', 'nuts'],
      sizes: [
        { label: M, price: 11.5 },
        { label: L, price: 11.5 },
      ],
    },
    {
      id: 'macchiato-yummy-praline-hazelnut',
      categoryId: 'hot-drinks',
      name: { en: 'Yummy Macchiato — Praline Hazelnut', fr: 'Yummy Macchiato — Praliné Noisette', ar: 'يامي ماكياتو — برالين بندق' },
      description: {
        en: 'Rich hazelnut-praline macchiato.',
        fr: 'Macchiato riche au praliné noisette.',
        ar: 'ماكياتو غني ببرالين البندق.',
      },
      price: 12,
      image: PIC.latteArt,
      blur: '#7A4E32',
      tags: ['vegetarian', 'contains-nuts'],
      allergens: ['milk', 'nuts'],
    },
    {
      id: 'macchiato-yummy-praline-pistachio',
      categoryId: 'hot-drinks',
      name: { en: 'Yummy Macchiato — Praline Pistachio', fr: 'Yummy Macchiato — Praliné Pistache', ar: 'يامي ماكياتو — برالين فستق' },
      description: {
        en: 'Luxurious pistachio-praline macchiato.',
        fr: 'Macchiato luxueux au praliné pistache.',
        ar: 'ماكياتو فاخر ببرالين الفستق.',
      },
      price: 14,
      image: PIC.matcha,
      blur: '#8FAE6B',
      tags: ['vegetarian', 'contains-nuts'],
      allergens: ['milk', 'nuts'],
      isFeatured: true,
    },
    // — Yummy hot (no coffee) —
    {
      id: 'yummy-hot-snickers',
      categoryId: 'hot-drinks',
      name: { en: 'Yummy Hot — Snickers (no coffee)', fr: 'Yummy Hot — Snickers (sans café)', ar: 'يامي هوت — سنيكرز (بدون قهوة)' },
      description: {
        en: 'Warm caffeine-free Snickers-style chocolate drink.',
        fr: 'Boisson chocolatée chaude façon Snickers, sans caféine.',
        ar: 'مشروب شوكولاتة دافئ بنكهة سنيكرز بدون كافيين.',
      },
      price: 8.5,
      image: PIC.hotChocolate,
      blur: '#5A3825',
      tags: ['vegetarian', 'contains-nuts'],
      allergens: ['milk', 'peanuts', 'gluten'],
      sizes: [
        { label: S, price: 8.5 },
        { label: M, price: 10 },
        { label: L, price: 10 },
      ],
    },
    {
      id: 'yummy-hot-speculoos',
      categoryId: 'hot-drinks',
      name: { en: 'Yummy Hot — Speculoos / Nutella (no coffee)', fr: 'Yummy Hot — Spéculoos / Nutella (sans café)', ar: 'يامي هوت — سبيكولوس / نوتيلا (بدون قهوة)' },
      description: {
        en: 'Warm caffeine-free speculoos or Nutella drink.',
        fr: 'Boisson chaude sans caféine au spéculoos ou Nutella.',
        ar: 'مشروب دافئ بدون كافيين بالسبيكولوس أو النوتيلا.',
      },
      price: 12,
      image: PIC.hotChocolate,
      blur: '#7A4E32',
      tags: ['vegetarian', 'contains-nuts'],
      allergens: ['milk', 'gluten', 'nuts'],
      sizes: [
        { label: S, price: 12 },
        { label: M, price: 13.5 },
        { label: L, price: 13.5 },
      ],
    },
    {
      id: 'yummy-hot-latte-matcha',
      categoryId: 'hot-drinks',
      name: { en: 'Yummy Hot — Latte Matcha (no coffee)', fr: 'Yummy Hot — Latte Matcha (sans café)', ar: 'يامي هوت — لاتيه ماتشا (بدون قهوة)' },
      description: {
        en: 'Warm matcha latte, no coffee.',
        fr: 'Latte matcha chaud, sans café.',
        ar: 'لاتيه ماتشا دافئ بدون قهوة.',
      },
      price: 11.5,
      image: PIC.matcha,
      blur: '#8FAE6B',
      tags: ['vegetarian'],
      allergens: ['milk'],
      sizes: [
        { label: M, price: 11.5 },
        { label: L, price: 11.5 },
      ],
    },

    /* ═══════════════ COLD DRINKS ═══════════════ */
    // — Classic ice coffee —
    {
      id: 'ice-americano',
      categoryId: 'cold-drinks',
      name: { en: 'Ice Americano', fr: 'Ice Americano', ar: 'آيس أمريكانو' },
      description: {
        en: 'Espresso over ice with cold water — crisp and refreshing.',
        fr: 'Espresso sur glace et eau froide — net et rafraîchissant.',
        ar: 'إسبريسو على الثلج مع ماء بارد — منعش ونقي.',
      },
      price: 6.5,
      image: PIC.iceAmericano,
      blur: '#5A3825',
      tags: ['vegan', 'gluten-free'],
      isFeatured: true,
      sizes: [
        { label: M, price: 6.5 },
        { label: L, price: 7.5 },
      ],
    },
    {
      id: 'ice-latte',
      categoryId: 'cold-drinks',
      name: { en: 'Ice Latte', fr: 'Ice Latte', ar: 'آيس لاتيه' },
      description: {
        en: 'Chilled espresso over ice with cold milk.',
        fr: 'Espresso glacé sur glaçons et lait froid.',
        ar: 'إسبريسو بارد على الثلج مع حليب بارد.',
      },
      price: 7.5,
      image: PIC.iceLatte,
      blur: '#CBB293',
      tags: ['vegetarian'],
      allergens: ['milk'],
      isFeatured: true,
      sizes: [
        { label: M, price: 7.5 },
        { label: L, price: 8.5 },
      ],
    },
    // — Ice macchiato —
    {
      id: 'ice-macchiato-dolce',
      categoryId: 'cold-drinks',
      name: { en: 'Ice Macchiato — Dolce', fr: 'Ice Macchiato — Dolce', ar: 'آيس ماكياتو — دولتشي' },
      description: {
        en: 'Iced macchiato, sweet and creamy.',
        fr: 'Macchiato glacé, doux et crémeux.',
        ar: 'ماكياتو مثلج، حلو وكريمي.',
      },
      price: 8.5,
      image: PIC.iceLatte,
      blur: '#CBB293',
      tags: ['vegetarian'],
      allergens: ['milk'],
      sizes: [
        { label: M, price: 8.5 },
        { label: L, price: 10 },
      ],
    },
    {
      id: 'ice-macchiato-moka',
      categoryId: 'cold-drinks',
      name: { en: 'Ice Macchiato — Moka / Chocolate', fr: 'Ice Macchiato — Moka / Chocolat', ar: 'آيس ماكياتو — موكا / شوكولاتة' },
      description: {
        en: 'Iced macchiato with moka or chocolate.',
        fr: 'Macchiato glacé au moka ou chocolat.',
        ar: 'ماكياتو مثلج بالموكا أو الشوكولاتة.',
      },
      price: 9,
      image: PIC.iceLatte,
      blur: '#7A4E32',
      tags: ['vegetarian'],
      allergens: ['milk'],
      sizes: [
        { label: M, price: 9 },
        { label: L, price: 10.5 },
      ],
    },
    {
      id: 'ice-macchiato-caramel',
      categoryId: 'cold-drinks',
      name: { en: 'Ice Macchiato — Caramel / Toffee', fr: 'Ice Macchiato — Caramel / Toffee', ar: 'آيس ماكياتو — كراميل / توفي' },
      description: {
        en: 'Iced macchiato with caramel or toffee.',
        fr: 'Macchiato glacé au caramel ou toffee.',
        ar: 'ماكياتو مثلج بالكراميل أو التوفي.',
      },
      price: 9.5,
      image: PIC.iceLatte,
      blur: '#B07B47',
      tags: ['vegetarian'],
      allergens: ['milk'],
      sizes: [
        { label: M, price: 9.5 },
        { label: L, price: 11 },
      ],
    },
    // — Ice (no coffee) —
    {
      id: 'ice-chocolate',
      categoryId: 'cold-drinks',
      name: { en: 'Iced Chocolate (no coffee)', fr: 'Chocolat Glacé (sans café)', ar: 'شوكولاتة مثلجة (بدون قهوة)' },
      description: {
        en: 'Cold chocolate milk over ice, no coffee.',
        fr: 'Lait chocolaté froid sur glace, sans café.',
        ar: 'حليب بالشوكولاتة بارد على الثلج بدون قهوة.',
      },
      price: 9,
      image: PIC.iceLatte,
      blur: '#5A3825',
      tags: ['vegetarian'],
      allergens: ['milk'],
      sizes: [
        { label: M, price: 9 },
        { label: L, price: 10.5 },
      ],
    },
    {
      id: 'ice-mocaccino',
      categoryId: 'cold-drinks',
      name: { en: 'Iced Mocaccino', fr: 'Mocaccino Glacé', ar: 'موكاتشينو مثلج' },
      description: {
        en: 'Iced mocha — coffee, chocolate and milk.',
        fr: 'Moka glacé — café, chocolat et lait.',
        ar: 'موكا مثلج — قهوة وشوكولاتة وحليب.',
      },
      price: 10.5,
      image: PIC.iceLatte,
      blur: '#5A3825',
      tags: ['vegetarian'],
      allergens: ['milk'],
      sizes: [
        { label: M, price: 10.5 },
        { label: L, price: 12 },
      ],
    },
    {
      id: 'ice-nutella-speculoos',
      categoryId: 'cold-drinks',
      name: { en: 'Iced Nutella / Speculoos / Praline Hazelnut', fr: 'Glacé Nutella / Spéculoos / Praliné Noisette', ar: 'مثلج نوتيلا / سبيكولوس / برالين بندق' },
      description: {
        en: 'Cold, creamy and rich — choose your flavour.',
        fr: 'Froid, crémeux et riche — au choix.',
        ar: 'بارد كريمي وغني — اختر نكهتك.',
      },
      price: 12.5,
      image: PIC.iceLatte,
      blur: '#7A4E32',
      tags: ['vegetarian', 'contains-nuts'],
      allergens: ['milk', 'nuts', 'gluten'],
      sizes: [
        { label: M, price: 12.5 },
        { label: L, price: 14 },
      ],
    },
    {
      id: 'ice-praline-pistachio',
      categoryId: 'cold-drinks',
      name: { en: 'Iced Praline Pistachio', fr: 'Praliné Pistache Glacé', ar: 'برالين فستق مثلج' },
      description: {
        en: 'Our most indulgent iced pistachio-praline drink.',
        fr: 'Notre boisson glacée la plus gourmande, praliné pistache.',
        ar: 'أكثر مشروباتنا المثلجة فخامة ببرالين الفستق.',
      },
      price: 15.5,
      image: PIC.matcha,
      blur: '#8FAE6B',
      tags: ['vegetarian', 'contains-nuts'],
      allergens: ['milk', 'nuts'],
      sizes: [
        { label: M, price: 15.5 },
        { label: L, price: 17 },
      ],
    },
    // — Ice tea —
    {
      id: 'ice-tea-green',
      categoryId: 'cold-drinks',
      name: { en: 'Green Ice Tea', fr: 'Thé Glacé Vert', ar: 'شاي أخضر مثلج' },
      description: {
        en: 'House-brewed green tea over ice.',
        fr: 'Thé vert maison sur glace.',
        ar: 'شاي أخضر محضّر بالبيت على الثلج.',
      },
      price: 6,
      image: PIC.iceTea,
      blur: '#A8B57A',
      tags: ['vegan', 'gluten-free'],
      sizes: [
        { label: M, price: 6 },
        { label: L, price: 7 },
      ],
    },
    {
      id: 'ice-tea-peach',
      categoryId: 'cold-drinks',
      name: { en: 'Peach Ice Tea', fr: 'Thé Glacé Pêche', ar: 'شاي مثلج بالخوخ' },
      description: {
        en: 'Iced tea with ripe peach.',
        fr: 'Thé glacé à la pêche mûre.',
        ar: 'شاي مثلج بالخوخ الناضج.',
      },
      price: 7.5,
      image: PIC.iceTea,
      blur: '#D8A24A',
      tags: ['vegan', 'gluten-free'],
      sizes: [
        { label: M, price: 7.5 },
        { label: L, price: 9.5 },
      ],
    },
    {
      id: 'ice-tea-strawberry',
      categoryId: 'cold-drinks',
      name: { en: 'Strawberry Ice Tea', fr: 'Thé Glacé Fraise', ar: 'شاي مثلج بالفراولة' },
      description: {
        en: 'Iced tea with sweet strawberry.',
        fr: 'Thé glacé à la fraise.',
        ar: 'شاي مثلج بالفراولة.',
      },
      price: 9,
      image: PIC.iceTea,
      blur: '#C65A5A',
      tags: ['vegan', 'gluten-free'],
      sizes: [
        { label: M, price: 9 },
        { label: L, price: 10 },
      ],
    },
    {
      id: 'ice-tea-jabuticaba',
      categoryId: 'cold-drinks',
      name: { en: 'Jabuticaba Ice Tea', fr: 'Thé Glacé Jabuticaba', ar: 'شاي مثلج جابوتيكابا' },
      description: {
        en: 'Iced tea with exotic jabuticaba berry.',
        fr: 'Thé glacé à la baie exotique jabuticaba.',
        ar: 'شاي مثلج بتوت الجابوتيكابا الاستوائي.',
      },
      price: 11,
      image: PIC.iceTea,
      blur: '#6B3B5A',
      tags: ['vegan', 'gluten-free'],
      sizes: [
        { label: M, price: 11 },
        { label: L, price: 13 },
      ],
    },
    // — Frappuccino —
    {
      id: 'frappuccino-classic',
      categoryId: 'cold-drinks',
      name: { en: 'Frappuccino — Chocolate / Moka / Coffee', fr: 'Frappuccino — Chocolat / Moka / Café', ar: 'فرابتشينو — شوكولاتة / موكا / قهوة' },
      description: {
        en: 'Blended iced coffee, topped with cream.',
        fr: 'Café glacé mixé, chantilly sur le dessus.',
        ar: 'قهوة مثلجة مخفوقة مع طبقة كريمة.',
      },
      price: 10.5,
      image: PIC.frappuccino,
      blur: '#7A4E32',
      tags: ['vegetarian'],
      allergens: ['milk'],
      isFeatured: true,
      sizes: [
        { label: M, price: 10.5 },
        { label: L, price: 12 },
      ],
    },
    {
      id: 'frappuccino-strawberry',
      categoryId: 'cold-drinks',
      name: { en: 'Frappuccino — Strawberry / Caramel / Cookies', fr: 'Frappuccino — Fraise / Caramel / Cookies', ar: 'فرابتشينو — فراولة / كراميل / كوكيز' },
      description: {
        en: 'Blended frappé, choose strawberry, caramel or cookies.',
        fr: 'Frappé mixé : fraise, caramel ou cookies.',
        ar: 'فرابيه مخفوق: فراولة أو كراميل أو كوكيز.',
      },
      price: 11.5,
      image: PIC.frappuccino,
      blur: '#C9A06A',
      tags: ['vegetarian'],
      allergens: ['milk', 'gluten'],
      sizes: [
        { label: M, price: 11.5 },
        { label: L, price: 13 },
      ],
    },
    {
      id: 'frappuccino-speculoos',
      categoryId: 'cold-drinks',
      name: { en: 'Frappuccino — Speculoos / Nutella / Snickers / Praline Hazelnut', fr: 'Frappuccino — Spéculoos / Nutella / Snickers / Praliné Noisette', ar: 'فرابتشينو — سبيكولوس / نوتيلا / سنيكرز / برالين بندق' },
      description: {
        en: 'Decadent blended frappé — choose your flavour.',
        fr: 'Frappé mixé gourmand — au choix.',
        ar: 'فرابيه مخفوق فاخر — اختر نكهتك.',
      },
      price: 12.5,
      image: PIC.frappuccino,
      blur: '#7A4E32',
      tags: ['vegetarian', 'contains-nuts'],
      allergens: ['milk', 'nuts', 'gluten'],
      sizes: [
        { label: M, price: 12.5 },
        { label: L, price: 14 },
      ],
    },
    {
      id: 'frappuccino-banaboom',
      categoryId: 'cold-drinks',
      name: { en: 'Frappuccino — Banaboom', fr: 'Frappuccino — Banaboom', ar: 'فرابتشينو — بانابوم' },
      description: {
        en: 'Banana blended frappé treat.',
        fr: 'Frappé mixé gourmand à la banane.',
        ar: 'فرابيه مخفوق بالموز.',
      },
      price: 12.5,
      image: PIC.frappuccino,
      blur: '#C9A06A',
      tags: ['vegetarian'],
      allergens: ['milk'],
      sizes: [
        { label: M, price: 12.5 },
        { label: L, price: 14 },
      ],
    },
    {
      id: 'frappuccino-praline-pistachio',
      categoryId: 'cold-drinks',
      name: { en: 'Frappuccino — Praline Pistachio', fr: 'Frappuccino — Praliné Pistache', ar: 'فرابتشينو — برالين فستق' },
      description: {
        en: 'Our richest pistachio-praline frappé.',
        fr: 'Notre frappé le plus riche, praliné pistache.',
        ar: 'أغنى فرابيه لدينا ببرالين الفستق.',
      },
      price: 15.5,
      image: PIC.matcha,
      blur: '#8FAE6B',
      tags: ['vegetarian', 'contains-nuts'],
      allergens: ['milk', 'nuts'],
      sizes: [
        { label: M, price: 15.5 },
        { label: L, price: 17 },
      ],
    },

    /* ═══════════════ MOJITOS & JUICES ═══════════════ */
    {
      id: 'mojito-virgin',
      categoryId: 'mojitos',
      name: { en: 'Mojito — Virgin', fr: 'Mojito — Virgin', ar: 'موهيتو — فيرجن' },
      description: {
        en: 'Classic alcohol-free mojito: lime, mint and soda.',
        fr: 'Mojito sans alcool : citron vert, menthe et soda.',
        ar: 'موهيتو كلاسيكي بدون كحول: ليمون ونعناع وصودا.',
      },
      price: 9,
      image: PIC.mojito,
      blur: '#7BA05B',
      tags: ['vegan', 'gluten-free'],
      isFeatured: true,
      sizes: [
        { label: M, price: 9 },
        { label: L, price: 10.5 },
      ],
    },
    {
      id: 'mojito-red-blue',
      categoryId: 'mojitos',
      name: { en: 'Mojito — Red / Blue', fr: 'Mojito — Rouge / Bleu', ar: 'موهيتو — أحمر / أزرق' },
      description: {
        en: 'Fruity mojito, choose red or blue.',
        fr: 'Mojito fruité, au choix rouge ou bleu.',
        ar: 'موهيتو بالفواكه، اختر أحمر أو أزرق.',
      },
      price: 10,
      image: PIC.mojito,
      blur: '#7BA05B',
      tags: ['vegan', 'gluten-free'],
      sizes: [
        { label: M, price: 10 },
        { label: L, price: 11.5 },
      ],
    },
    {
      id: 'mojito-jabuticaba',
      categoryId: 'mojitos',
      name: { en: 'Mojito — Jabuticaba', fr: 'Mojito — Jabuticaba', ar: 'موهيتو — جابوتيكابا' },
      description: {
        en: 'Exotic jabuticaba-berry mojito.',
        fr: 'Mojito exotique à la baie de jabuticaba.',
        ar: 'موهيتو استوائي بتوت الجابوتيكابا.',
      },
      price: 14,
      image: PIC.mojito,
      blur: '#6B3B5A',
      tags: ['vegan', 'gluten-free'],
      sizes: [
        { label: M, price: 14 },
        { label: L, price: 16 },
      ],
    },
    {
      id: 'mojito-energetic-blue',
      categoryId: 'mojitos',
      name: { en: 'Energetic Mojito — Blue Lemon Crush', fr: 'Mojito Énergétique — Blue Lemon Crush', ar: 'موهيتو الطاقة — بلو ليمون كراش' },
      description: {
        en: 'Energising mojito with a blue-lemon kick.',
        fr: 'Mojito énergisant au blue lemon.',
        ar: 'موهيتو منشّط بنكهة الليمون الأزرق.',
      },
      price: 12,
      image: PIC.mojito,
      blur: '#4F86C6',
      tags: ['vegan', 'gluten-free'],
      sizes: [
        { label: M, price: 12 },
        { label: L, price: 13.5 },
      ],
    },
    {
      id: 'mojito-energetic-red',
      categoryId: 'mojitos',
      name: { en: 'Energetic Mojito — Red Energy / Energy', fr: 'Mojito Énergétique — Red Energy / Energy', ar: 'موهيتو الطاقة — ريد إنرجي / إنرجي' },
      description: {
        en: 'Energy-drink mojito, red or classic.',
        fr: 'Mojito à la boisson énergisante, rouge ou classique.',
        ar: 'موهيتو بمشروب الطاقة، أحمر أو كلاسيكي.',
      },
      price: 12,
      image: PIC.mojito,
      blur: '#C6504F',
      tags: ['vegan', 'gluten-free'],
      sizes: [
        { label: M, price: 12 },
        { label: L, price: 13.5 },
      ],
    },
    {
      id: 'fruit-addict',
      categoryId: 'mojitos',
      name: { en: 'Fruit Addict — 100% Fruit', fr: 'Fruit Addict — 100% Fruits', ar: 'فروت أديكت — 100٪ فواكه' },
      description: {
        en: '100% fruit blends: Pinklady, Moonlight, Detox, Tikiwi, Good Morning Vietnam, Tropic Mania, Strawmango Basil, Red Experience, Peachy Bango, Strawpple Zest, Iced Mojito.',
        fr: 'Mélanges 100% fruits : Pinklady, Moonlight, Detox, Tikiwi, Good Morning Vietnam, Tropic Mania, Strawmango Basil, Red Experience, Peachy Bango, Strawpple Zest, Iced Mojito.',
        ar: 'خلطات 100٪ فواكه: بينك ليدي، مونلايت، ديتوكس، تيكيوي، غود مورنينغ فيتنام، تروبيك مانيا، سترومانغو بازيل، ريد إكسبيرينس، بيتشي بانغو، سترابل زست، آيسد موهيتو.',
      },
      price: 12,
      image: PIC.lemonade,
      blur: '#D6E3B5',
      tags: ['vegan', 'gluten-free'],
      isFeatured: true,
    },
    {
      id: 'smoothie-jabuticaba',
      categoryId: 'mojitos',
      name: { en: 'Smoothie — Jabuticaba', fr: 'Smoothie — Jabuticaba', ar: 'سموذي — جابوتيكابا' },
      description: {
        en: 'Thick, creamy jabuticaba smoothie.',
        fr: 'Smoothie onctueux à la jabuticaba.',
        ar: 'سموذي كثيف وكريمي بالجابوتيكابا.',
      },
      price: 13,
      image: PIC.smoothie,
      blur: '#7B4B6B',
      tags: ['vegetarian'],
      allergens: ['milk'],
      sizes: [
        { label: M, price: 13 },
        { label: L, price: 15 },
      ],
    },

    /* ═══════════════ MATCHA (NEW) ═══════════════ */
    {
      id: 'matcha-latte',
      categoryId: 'matcha',
      name: { en: 'Matcha — Latte / Rose / Passion', fr: 'Matcha — Latte / Rose / Passion', ar: 'ماتشا — لاتيه / ورد / باشن' },
      description: {
        en: 'Ceremonial matcha with milk — classic, rose or passion.',
        fr: 'Matcha cérémonial au lait — classique, rose ou passion.',
        ar: 'ماتشا احتفالي بالحليب — كلاسيكي أو ورد أو باشن.',
      },
      price: 12,
      image: PIC.matcha,
      blur: '#8FAE6B',
      tags: ['vegetarian'],
      allergens: ['milk'],
      isFeatured: true,
      sizes: [
        { label: M, price: 12 },
        { label: L, price: 13.5 },
      ],
    },
    {
      id: 'matcha-strawberry',
      categoryId: 'matcha',
      name: { en: 'Matcha — Strawberry', fr: 'Matcha — Fraise', ar: 'ماتشا — فراولة' },
      description: {
        en: 'Matcha latte layered with strawberry.',
        fr: 'Latte matcha à la fraise.',
        ar: 'لاتيه ماتشا مع الفراولة.',
      },
      price: 14,
      image: PIC.matcha,
      blur: '#9BB06B',
      tags: ['vegetarian'],
      allergens: ['milk'],
      sizes: [
        { label: M, price: 14 },
        { label: L, price: 15.5 },
      ],
    },
    {
      id: 'matcha-ice-praline-pistachio',
      categoryId: 'matcha',
      name: { en: 'Iced Matcha — Praline Pistachio', fr: 'Matcha Glacé — Praliné Pistache', ar: 'ماتشا مثلج — برالين فستق' },
      description: {
        en: 'Iced matcha with rich pistachio praline.',
        fr: 'Matcha glacé au praliné pistache.',
        ar: 'ماتشا مثلج ببرالين الفستق الغني.',
      },
      price: 16.5,
      image: PIC.matcha,
      blur: '#8FAE6B',
      tags: ['vegetarian', 'contains-nuts'],
      allergens: ['milk', 'nuts'],
      sizes: [
        { label: M, price: 16.5 },
        { label: L, price: 18 },
      ],
    },

    /* ═══════════════ BITES O'CLOCK ═══════════════ */
    {
      id: 'wakey-wakey',
      categoryId: 'bites',
      name: { en: 'Wakey! Wakey!', fr: 'Wakey ! Wakey !', ar: 'وايكي! وايكي!' },
      description: {
        en: 'Breakfast (until 9:00): a hot classic drink (Espresso / Espresso Macchiato / Latte) + a pure-butter pastry (pain au chocolat / croissant).',
        fr: 'Petit-déjeuner (jusqu’à 9h00) : une boisson chaude classique (Espresso / Espresso Macchiato / Latte) + une viennoiserie pur beurre (pain au chocolat / croissant).',
        ar: 'فطور (حتى الساعة 9:00): مشروب ساخن كلاسيكي (إسبريسو / إسبريسو ماكياتو / لاتيه) + معجنات بالزبدة (بان أو شوكولا / كرواسون).',
      },
      price: 5,
      image: PIC.croissant,
      blur: '#D8A85F',
      tags: ['vegetarian'],
      allergens: ['gluten', 'milk', 'eggs'],
      isFeatured: true,
    },
    {
      id: 'hottie-sweetness',
      categoryId: 'bites',
      name: { en: 'Hottie Sweetness', fr: 'Hottie Sweetness', ar: 'هوتي سويتنس' },
      description: {
        en: 'Snack (10:00–11:30): a classic coffee + a Nutella cookie.',
        fr: 'Snack (10h–11h30) : un café classique + un cookie Nutella.',
        ar: 'وجبة خفيفة (10:00–11:30): قهوة كلاسيكية + كوكي نوتيلا.',
      },
      price: 7,
      image: PIC.cookie,
      blur: '#4A2E20',
      tags: ['vegetarian', 'contains-nuts'],
      allergens: ['gluten', 'milk', 'nuts'],
    },
    {
      id: 'icy-sweetness',
      categoryId: 'bites',
      name: { en: 'Icy Sweetness', fr: 'Icy Sweetness', ar: 'آيسي سويتنس' },
      description: {
        en: 'Snack (15:00–17:00): a Frappuccino (Nutella / Snickers) + a crispy cookie.',
        fr: 'Snack (15h–17h) : un Frappuccino (Nutella / Snickers) + un cookie croustillant.',
        ar: 'وجبة خفيفة (15:00–17:00): فرابتشينو (نوتيلا / سنيكرز) + كوكي مقرمش.',
      },
      price: 15,
      image: PIC.frappuccino,
      blur: '#7A4E32',
      tags: ['vegetarian', 'contains-nuts'],
      allergens: ['gluten', 'milk', 'nuts', 'peanuts'],
    },

    /* ═══════════════ EXTRAS (add to any drink) ═══════════════ */
    {
      id: 'extra-shot-arabica',
      categoryId: 'extras',
      name: { en: '+ Arabica Shot', fr: '+ Shot Arabica', ar: '+ جرعة أرابيكا' },
      description: {
        en: 'Add an extra Arabica espresso shot to any drink.',
        fr: 'Ajoutez un shot d’espresso Arabica à votre boisson.',
        ar: 'أضف جرعة إسبريسو أرابيكا إضافية لأي مشروب.',
      },
      price: 0.5,
      image: '',
      tags: ['vegan', 'gluten-free'],
    },
    {
      id: 'extra-shot-coffee',
      categoryId: 'extras',
      name: { en: '+ Coffee Shot', fr: '+ Shot Café', ar: '+ جرعة قهوة' },
      description: {
        en: 'Add an extra coffee shot.',
        fr: 'Ajoutez un shot de café.',
        ar: 'أضف جرعة قهوة إضافية.',
      },
      price: 1,
      image: '',
      tags: ['vegan', 'gluten-free'],
    },
    {
      id: 'extra-nutella',
      categoryId: 'extras',
      name: { en: '+ Nutella', fr: '+ Nutella', ar: '+ نوتيلا' },
      description: {
        en: 'Add a swirl of Nutella.',
        fr: 'Ajoutez une touche de Nutella.',
        ar: 'أضف لمسة من النوتيلا.',
      },
      price: 1.5,
      image: '',
      tags: ['vegetarian', 'contains-nuts'],
      allergens: ['nuts', 'milk'],
    },
    {
      id: 'extra-syrup',
      categoryId: 'extras',
      name: { en: '+ Flavour Syrup', fr: '+ Sirop Aromatisé', ar: '+ شراب منكّه' },
      description: {
        en: 'Caramel / Hazelnut / Cookie / Chocolate / Strawberry.',
        fr: 'Caramel / Noisette / Cookie / Chocolat / Fraise.',
        ar: 'كراميل / بندق / كوكي / شوكولاتة / فراولة.',
      },
      price: 1,
      image: '',
      tags: ['vegetarian'],
    },
    {
      id: 'extra-chocolate-disc',
      categoryId: 'extras',
      name: { en: '+ Chocolate Disc (NEW)', fr: '+ Palet Chocolat (NOUVEAU)', ar: '+ قرص شوكولاتة (جديد)' },
      description: {
        en: 'Add a melting chocolate disc.',
        fr: 'Ajoutez un palet de chocolat fondant.',
        ar: 'أضف قرص شوكولاتة ذائب.',
      },
      price: 1,
      image: '',
      tags: ['vegetarian'],
      allergens: ['milk', 'soy'],
    },
    {
      id: 'extra-speculoos',
      categoryId: 'extras',
      name: { en: '+ Speculoos Biscuit', fr: '+ Biscuit Spéculoos', ar: '+ بسكويت سبيكولوس' },
      description: {
        en: 'Add a crunchy speculoos biscuit.',
        fr: 'Ajoutez un biscuit spéculoos croquant.',
        ar: 'أضف بسكويت سبيكولوس مقرمش.',
      },
      price: 1.5,
      image: '',
      tags: ['vegetarian'],
      allergens: ['gluten'],
    },
    {
      id: 'extra-marshmallow',
      categoryId: 'extras',
      name: { en: '+ Marshmallow', fr: '+ Marshmallow', ar: '+ مارشميلو' },
      description: {
        en: 'Top your drink with marshmallows.',
        fr: 'Garnissez votre boisson de marshmallows.',
        ar: 'زيّن مشروبك بالمارشميلو.',
      },
      price: 3,
      image: '',
      tags: ['vegetarian'],
    },
    {
      id: 'extra-non-dairy-milk',
      categoryId: 'extras',
      name: { en: '+ Non-Dairy Milk', fr: '+ Lait Végétal', ar: '+ حليب نباتي' },
      description: {
        en: 'Swap to almond or oat milk (Délice Végétal).',
        fr: 'Optez pour un lait d’amande ou d’avoine (Délice Végétal).',
        ar: 'استبدل بحليب اللوز أو الشوفان (دليس فيجيتال).',
      },
      price: 2,
      image: '',
      tags: ['vegan'],
    },
  ],
};
