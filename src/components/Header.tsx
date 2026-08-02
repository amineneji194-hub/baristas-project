import { useState } from 'react';
import { Share2, Check } from 'lucide-react';
import { motion } from 'framer-motion';
import ThemeToggle from './ThemeToggle';
import LanguageToggle from './LanguageToggle';
import OpenStatus from './OpenStatus';
import { useLanguage } from '../context/LanguageContext';
import type { ShopInfo } from '../types';

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
            {/* Real brand logo — save your artwork as public/logo.png.
               `dark:brightness-0 dark:invert` renders a dark wordmark in white
               on dark mode. If the file is missing we show a styled wordmark. */}
            {logoFailed ? (
              <span className="font-display text-3xl font-bold italic tracking-tight text-primary">
                Barista&rsquo;s
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
