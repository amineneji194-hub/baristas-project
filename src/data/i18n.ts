import type { LanguageCode } from '../types';

/**
 * UI translation strings (NOT menu content — that lives in menu.ts).
 * To add/adjust wording, edit the three values (en / fr / ar) for each key.
 * Arabic strings drive RTL layout automatically.
 */
export const STRINGS = {
  searchPlaceholder: {
    en: 'Search the menu…',
    fr: 'Rechercher au menu…',
    ar: '…ابحث في القائمة',
  },
  all: { en: 'All', fr: 'Tout', ar: 'الكل' },
  featured: {
    en: 'Customer favorites',
    fr: 'Les préférés',
    ar: 'الأكثر طلباً',
  },
  filters: { en: 'Filters', fr: 'Filtres', ar: 'تصفية' },
  clear: { en: 'Clear', fr: 'Effacer', ar: 'مسح' },
  noResults: {
    en: 'Nothing matches your search.',
    fr: 'Aucun résultat pour votre recherche.',
    ar: 'لا توجد نتائج مطابقة.',
  },
  soldOut: { en: 'Sold out', fr: 'Épuisé', ar: 'نفد' },
  from: { en: 'from', fr: 'à partir de', ar: 'ابتداءً من' },
  sizes: { en: 'Sizes', fr: 'Tailles', ar: 'الأحجام' },
  allergens: { en: 'Allergens', fr: 'Allergènes', ar: 'مسببات الحساسية' },
  calories: { en: 'kcal', fr: 'kcal', ar: 'سعرة' },
  legend: { en: 'Dietary legend', fr: 'Légende', ar: 'دليل الرموز' },
  open: { en: 'Open now', fr: 'Ouvert', ar: 'مفتوح الآن' },
  closed: { en: 'Closed', fr: 'Fermé', ar: 'مغلق' },
  opensAt: { en: 'Opens at', fr: 'Ouvre à', ar: 'يفتح في' },
  closesAt: { en: 'Closes at', fr: 'Ferme à', ar: 'يغلق في' },
  wifi: { en: 'Wi-Fi', fr: 'Wi-Fi', ar: 'واي فاي' },
  wifiPassword: { en: 'Password', fr: 'Mot de passe', ar: 'كلمة السر' },
  scanWifi: {
    en: 'Scan to join Wi-Fi',
    fr: 'Scanner pour le Wi-Fi',
    ar: 'امسح للاتصال بالواي فاي',
  },
  copied: { en: 'Copied!', fr: 'Copié !', ar: '!تم النسخ' },
  share: { en: 'Share menu', fr: 'Partager', ar: 'مشاركة' },
  install: { en: 'Add to home screen', fr: "Ajouter à l'écran", ar: 'أضف للشاشة' },
  dismiss: { en: 'Not now', fr: 'Plus tard', ar: 'لاحقاً' },
  close: { en: 'Close', fr: 'Fermer', ar: 'إغلاق' },
  toggleTheme: { en: 'Toggle theme', fr: 'Changer le thème', ar: 'تبديل السمة' },
  language: { en: 'Language', fr: 'Langue', ar: 'اللغة' },
  address: { en: 'Address', fr: 'Adresse', ar: 'العنوان' },
  callUs: { en: 'Call us', fr: 'Appelez-nous', ar: 'اتصل بنا' },
} satisfies Record<string, Record<LanguageCode, string>>;

export type StringKey = keyof typeof STRINGS;

/** Dietary tag labels (used by the legend and item chips). */
export const TAG_LABELS = {
  vegan: { en: 'Vegan', fr: 'Vegan', ar: 'نباتي صرف' },
  vegetarian: { en: 'Vegetarian', fr: 'Végétarien', ar: 'نباتي' },
  'gluten-free': { en: 'Gluten-free', fr: 'Sans gluten', ar: 'خالٍ من الغلوتين' },
  spicy: { en: 'Spicy', fr: 'Épicé', ar: 'حار' },
  'contains-nuts': { en: 'Contains nuts', fr: 'Contient des noix', ar: 'يحتوي مكسرات' },
  decaf: { en: 'Decaf', fr: 'Décaféiné', ar: 'منزوع الكافيين' },
} satisfies Record<string, Record<LanguageCode, string>>;

export const ALLERGEN_LABELS = {
  milk: { en: 'Milk', fr: 'Lait', ar: 'حليب' },
  eggs: { en: 'Eggs', fr: 'Œufs', ar: 'بيض' },
  gluten: { en: 'Gluten', fr: 'Gluten', ar: 'غلوتين' },
  nuts: { en: 'Nuts', fr: 'Noix', ar: 'مكسرات' },
  peanuts: { en: 'Peanuts', fr: 'Arachides', ar: 'فول سوداني' },
  soy: { en: 'Soy', fr: 'Soja', ar: 'صويا' },
  sesame: { en: 'Sesame', fr: 'Sésame', ar: 'سمسم' },
} satisfies Record<string, Record<LanguageCode, string>>;

export const LANGUAGE_LABELS: Record<LanguageCode, string> = {
  en: 'English',
  fr: 'Français',
  ar: 'العربية',
};
