import { useEffect, useState } from 'react';
import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import clsx from 'clsx';
import SmartImage from './SmartImage';
import DietaryBadge from './DietaryBadge';
import { useLanguage } from '../context/LanguageContext';
import { ALLERGEN_LABELS } from '../data/i18n';
import { formatPrice } from '../lib/format';
import type { MenuItem } from '../types';

interface Props {
  item: MenuItem | null;
  currency: string;
  onClose: () => void;
}

export default function ItemModal({ item, currency, onClose }: Props) {
  const { tr, ui } = useLanguage();
  const [sizeIdx, setSizeIdx] = useState(0);

  // Reset chosen size when a new item opens.
  useEffect(() => setSizeIdx(0), [item?.id]);

  // Close on Escape; lock body scroll while open.
  useEffect(() => {
    if (!item) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [item, onClose]);

  const price = item?.sizes?.length ? item.sizes[sizeIdx].price : item?.price ?? 0;

  return (
    <AnimatePresence>
      {item && (
        <motion.div
          className="fixed inset-0 z-50 flex items-end justify-center sm:items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div
            className="absolute inset-0 bg-primary/40 backdrop-blur-sm"
            onClick={onClose}
            aria-hidden
          />
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={tr(item.name)}
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 320 }}
            className="relative z-10 flex max-h-[92vh] w-full max-w-lg flex-col overflow-hidden rounded-t-3xl bg-bg shadow-lift sm:rounded-3xl"
          >
            <button
              onClick={onClose}
              aria-label={ui('close')}
              className="absolute right-4 top-4 z-20 grid h-9 w-9 place-items-center rounded-full bg-bg/80 text-ink shadow-soft backdrop-blur transition hover:bg-foam rtl:right-auto rtl:left-4"
            >
              <X size={18} />
            </button>

            <div className="h-52 w-full shrink-0 sm:h-60">
              <SmartImage
                src={item.image}
                alt={tr(item.name)}
                blur={item.blur}
                loading="eager"
                className="h-full w-full"
              />
            </div>

            <div className="overflow-y-auto p-5">
              <div className="flex items-start justify-between gap-3">
                <h2 className="font-display text-2xl font-semibold text-primary">
                  {tr(item.name)}
                </h2>
                <span className="shrink-0 rounded-full bg-accent/15 px-3 py-1 font-semibold text-accent">
                  {formatPrice(price, currency)}
                </span>
              </div>

              <p className="mt-2 text-ink/80">{tr(item.description)}</p>

              {item.calories != null && (
                <p className="mt-1 text-sm text-muted">
                  {item.calories} {ui('calories')}
                </p>
              )}

              {/* Multi-size selector */}
              {item.sizes?.length ? (
                <div className="mt-4">
                  <p className="mb-2 text-sm font-semibold text-ink">{ui('sizes')}</p>
                  <div className="flex flex-wrap gap-2">
                    {item.sizes.map((s, i) => (
                      <button
                        key={i}
                        onClick={() => setSizeIdx(i)}
                        aria-pressed={i === sizeIdx}
                        className={clsx(
                          'rounded-xl px-4 py-2 text-sm font-medium transition',
                          i === sizeIdx
                            ? 'bg-primary text-bg shadow-soft'
                            : 'bg-surface text-ink ring-1 ring-line hover:bg-foam'
                        )}
                      >
                        {tr(s.label)} · {formatPrice(s.price, currency)}
                      </button>
                    ))}
                  </div>
                </div>
              ) : null}

              {item.tags?.length ? (
                <div className="mt-4 flex flex-wrap gap-2">
                  {item.tags.map((tag) => (
                    <DietaryBadge key={tag} tag={tag} showLabel />
                  ))}
                </div>
              ) : null}

              {item.allergens?.length ? (
                <div className="mt-4 rounded-2xl bg-foam/50 p-3">
                  <p className="text-sm font-semibold text-ink">{ui('allergens')}</p>
                  <p className="mt-1 text-sm text-muted">
                    {item.allergens.map((a) => tr(ALLERGEN_LABELS[a])).join(' · ')}
                  </p>
                </div>
              ) : null}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
