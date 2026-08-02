import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import type { LanguageCode, Localized } from '../types';
import { STRINGS, type StringKey } from '../data/i18n';

interface LanguageCtx {
  lang: LanguageCode;
  setLang: (l: LanguageCode) => void;
  dir: 'ltr' | 'rtl';
  /** Translate a UI string key. */
  ui: (key: StringKey) => string;
  /** Pick the active language out of a Localized object. */
  tr: (value: Localized) => string;
}

const Ctx = createContext<LanguageCtx | null>(null);
const STORAGE_KEY = 'baristas-lang';
const DEFAULT_LANG: LanguageCode = 'en'; // confirmed default; FR/AR via toggle

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<LanguageCode>(() => {
    const stored = localStorage.getItem(STORAGE_KEY) as LanguageCode | null;
    return stored && ['en', 'fr', 'ar'].includes(stored) ? stored : DEFAULT_LANG;
  });

  const dir: 'ltr' | 'rtl' = lang === 'ar' ? 'rtl' : 'ltr';

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = dir;
    localStorage.setItem(STORAGE_KEY, lang);
  }, [lang, dir]);

  const setLang = useCallback((l: LanguageCode) => setLangState(l), []);
  const ui = useCallback((key: StringKey) => STRINGS[key][lang], [lang]);
  const tr = useCallback((value: Localized) => value[lang] ?? value.en, [lang]);

  const value = useMemo(() => ({ lang, setLang, dir, ui, tr }), [lang, setLang, dir, ui, tr]);
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useLanguage(): LanguageCtx {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error('useLanguage must be used within LanguageProvider');
  return ctx;
}
