import { Star } from 'lucide-react';
import { motion } from 'framer-motion';
import SmartImage from './SmartImage';
import { useLanguage } from '../context/LanguageContext';
import { formatPrice } from '../lib/format';
import type { MenuItem } from '../types';

interface Props {
  items: MenuItem[];
  currency: string;
  onOpen: (item: MenuItem) => void;
}

/** Horizontal "Customer favorites" rail shown above the categorized menu. */
export default function FeaturedRail({ items, currency, onOpen }: Props) {
  const { tr, ui } = useLanguage();
  if (!items.length) return null;

  return (
    <section aria-label={ui('featured')} className="mx-auto max-w-2xl px-4 pt-5">
      <h2 className="mb-3 flex items-center gap-2 font-display text-xl font-semibold text-primary">
        <Star size={18} className="fill-accent text-accent" />
        {ui('featured')}
      </h2>
      <div className="no-scrollbar -mx-4 flex gap-3 overflow-x-auto px-4 pb-2 snap-x snap-mandatory">
        {items.map((item, i) => (
          <motion.button
            key={item.id}
            onClick={() => onOpen(item)}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.35, delay: i * 0.05 }}
            whileTap={{ scale: 0.97 }}
            className="group relative w-44 shrink-0 snap-start overflow-hidden rounded-2xl bg-surface text-start shadow-soft ring-1 ring-line transition hover:shadow-lift"
          >
            <div className="h-28 w-full overflow-hidden">
              <SmartImage
                src={item.image}
                alt={tr(item.name)}
                blur={item.blur}
                loading="eager"
                className="h-full w-full transition duration-500 group-hover:scale-105"
              />
            </div>
            <div className="p-3">
              <h3 className="truncate font-display font-semibold text-primary">
                {tr(item.name)}
              </h3>
              <span className="text-sm font-semibold text-accent">
                {formatPrice(
                  item.sizes?.length ? Math.min(...item.sizes.map((s) => s.price)) : item.price,
                  currency
                )}
              </span>
            </div>
          </motion.button>
        ))}
      </div>
    </section>
  );
}
