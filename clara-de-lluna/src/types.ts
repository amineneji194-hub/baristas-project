/**
 * Type definitions for the Clara de Lluna menu data.
 * These power editor autocomplete and catch typos in src/data/menu.ts.
 */

/** A localized string: provide all three languages. */
export interface Localized {
  en: string;
  fr: string;
  ar: string;
}

export type LanguageCode = 'en' | 'fr' | 'ar';

/** Dietary / informational badges shown on items. */
export type DietaryTag =
  | 'vegan'
  | 'vegetarian'
  | 'gluten-free'
  | 'spicy'
  | 'contains-nuts'
  | 'decaf';

/** Common allergens (free to extend). */
export type Allergen =
  | 'milk'
  | 'eggs'
  | 'gluten'
  | 'nuts'
  | 'peanuts'
  | 'soy'
  | 'sesame';

/** An optional size variant with its own price (e.g. Small / Medium / Large). */
export interface SizeVariant {
  /** Short label, localized. */
  label: Localized;
  /** Price in the shop's currency unit (TND). e.g. 6.5 -> "6,500 DT" */
  price: number;
}

export interface MenuCategory {
  id: string;
  name: Localized;
  /** A lucide icon name (e.g. 'Coffee'). See src/components/CategoryIcon.tsx. */
  icon: string;
  /** Lower numbers appear first. */
  order: number;
}

export interface MenuItem {
  id: string;
  /** Must match a MenuCategory id. */
  categoryId: string;
  name: Localized;
  description: Localized;
  /** Base price in TND. Ignored if `sizes` is provided (sizes take precedence). */
  price: number;
  /** Remote or local image URL. Leave '' to show a branded fallback. */
  image: string;
  /** A tiny solid color or data-URI used as a blur-up placeholder while loading. */
  blur?: string;
  tags?: DietaryTag[];
  allergens?: Allergen[];
  /** Shown in the "Customer favorites" featured rail. */
  isFeatured?: boolean;
  /** Set false to grey-out and mark "Sold out". Defaults to available. */
  isAvailable?: boolean;
  /** Optional multi-size pricing (e.g. drinks). */
  sizes?: SizeVariant[];
  /** Optional calorie count. */
  calories?: number;
}

export interface OpeningHours {
  /** 0 = Sunday … 6 = Saturday. Use null for closed days. */
  [day: number]: { open: string; close: string } | null;
}

export interface ShopInfo {
  name: string;
  /** Path to logo in /public, or '' to use the text wordmark. */
  logo: string;
  tagline: Localized;
  /** Currency suffix shown after the number, e.g. "DT". */
  currency: string;
  languages: LanguageCode[];
  socials: {
    instagram?: string;
    facebook?: string;
    tiktok?: string;
    website?: string;
  };
  address: Localized;
  phone?: string;
  /** Keyed 0..6 (Sun..Sat). */
  hours: OpeningHours;
  wifi?: {
    ssid: string;
    password: string;
  };
}

export interface MenuData {
  shop: ShopInfo;
  categories: MenuCategory[];
  items: MenuItem[];
}
