import { useState, useRef, useEffect } from 'react';
import { Languages, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { LANGUAGE_LABELS } from '../data/i18n';
import type { LanguageCode } from '../types';

const ORDER: LanguageCode[] = ['en', 'fr', 'ar'];

export default function LanguageToggle() {
  const { lang, setLang, ui, dir } = useLanguage();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener('mousedown', onClick);
    return () => document.removeEventListener('mousedown', onClick);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={ui('language')}
        className="flex h-10 items-center gap-1.5 rounded-full bg-surface/80 px-3 text-sm font-semibold text-ink shadow-soft ring-1 ring-line transition hover:bg-foam"
      >
        <Languages size={16} />
        <span className="uppercase">{lang}</span>
      </button>
      <AnimatePresence>
        {open && (
          <motion.ul
            role="listbox"
            initial={{ opacity: 0, y: -6, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.97 }}
            transition={{ duration: 0.15 }}
            className={`absolute z-50 mt-2 min-w-[10rem] overflow-hidden rounded-2xl bg-surface p-1.5 shadow-lift ring-1 ring-line ${
              dir === 'rtl' ? 'left-0' : 'right-0'
            }`}
          >
            {ORDER.map((code) => (
              <li key={code}>
                <button
                  role="option"
                  aria-selected={lang === code}
                  onClick={() => {
                    setLang(code);
                    setOpen(false);
                  }}
                  className="flex w-full items-center justify-between gap-3 rounded-xl px-3 py-2 text-sm text-ink transition hover:bg-foam"
                >
                  <span className={code === 'ar' ? 'font-arabic' : ''}>
                    {LANGUAGE_LABELS[code]}
                  </span>
                  {lang === code && <Check size={15} className="text-accent" />}
                </button>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}
