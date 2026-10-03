import { useState } from 'react';
import { Share2, Check } from 'lucide-react';
import { motion } from 'framer-motion';
import ThemeToggle from './ThemeToggle';
import LanguageToggle from './LanguageToggle';
import OpenStatus from './OpenStatus';
import { useLanguage } from '../context/LanguageContext';
import type { ShopInfo } from '../types';

/** Crescent moon brand mark (gold on midnight). */
function MoonMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" className={className} aria-hidden>
      <circle cx="20" cy="20" r="20" fill="#1F2A44" />
      <path d="M24.5 9.5a11 11 0 1 0 6 19.6A9 9 0 0 1 24.5 9.5z" fill="#E0BD6E" />
      <circle cx="29" cy="12" r="1.2" fill="#EEE8DA" />
      <circle cx="32" cy="18" r="0.8" fill="#EEE8DA" />
    </svg>
  );
}

export default function Header({ shop }: { shop: ShopInfo }) {
  const { tr, ui } = useLanguage();
  const [shared, setShared] = useState(false);
  const [logoFailed, setLogoFailed] = useState(false);

  async function onShare() {
    const data = { title: shop.name, text: tr(shop.tagline), url: window.location.href };
    try {
      if (navigator.share) {
        await navigator.share(data);
      } else {
        await navigator.clipboard.writeText(window.location.href);
        setShared(true);
        setTimeout(() => setShared(false), 1800);
      }
    } catch {
      /* user cancelled — ignore */
    }
  }

  return (
    <header className="relative overflow-hidden">
      {/* Warm gradient banner */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/10 via-accent/5 to-transparent" />
      <div className="relative mx-auto max-w-2xl px-5 pt-6 pb-4">
        <div className="flex items-start justify-between gap-3">
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="min-w-0"
          >
            {/* With shop.logo = '' we draw the moon wordmark. To use real artwork,
               save it as public/logo.png and set shop.logo = '/logo.png'.
               `dark:brightness-0 dark:invert` renders a dark logo in white on dark mode. */}
            {!shop.logo || logoFailed ? (
              <span className="flex items-center gap-2.5">
                <MoonMark className="h-9 w-9 shrink-0" />
                <span className="font-display text-[1.7rem] font-semibold italic leading-none tracking-tight text-primary">
                  {shop.name}
                </span>
              </span>
            ) : (
              <img
                src={shop.logo}
                alt={`${shop.name} logo`}
                className="h-10 w-auto max-w-[200px] object-contain object-left dark:brightness-0 dark:invert"
                onError={() => setLogoFailed(true)}
              />
            )}
            <h1 className="sr-only">{shop.name}</h1>
            <p className="mt-2 max-w-xs font-display text-sm italic text-muted">
              {tr(shop.tagline)}
            </p>
          </motion.div>
          <div className="flex shrink-0 items-center gap-2">
            <LanguageToggle />
            <ThemeToggle />
          </div>
        </div>

        <div className="mt-4 flex flex-wrap items-center gap-2">
          <OpenStatus hours={shop.hours} />
          <button
            onClick={onShare}
            className="inline-flex items-center gap-1.5 rounded-full bg-surface/80 px-3 py-1 text-xs font-semibold text-ink shadow-soft ring-1 ring-line transition hover:bg-foam"
          >
            {shared ? <Check size={13} className="text-accent" /> : <Share2 size={13} />}
            {shared ? ui('copied') : ui('share')}
          </button>
        </div>
      </div>
    </header>
  );
}
