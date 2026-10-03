import type { LanguageCode, Localized } from '../types';

/**
 * Format a price the Tunisian way: 3 decimal millimes, comma separator,
 * then the currency suffix. e.g. formatPrice(6.5) -> "6,500 DT".
 */
export function formatPrice(value: number, currency = 'DT'): string {
  const millimes = Math.round(value * 1000);
  const dinars = Math.floor(millimes / 1000);
  const frac = (millimes % 1000).toString().padStart(3, '0');
  return `${dinars},${frac} ${currency}`;
}

/** Pick the right language out of a Localized object. */
export function t(localized: Localized, lang: LanguageCode): string {
  return localized[lang] ?? localized.en;
}
