import { motion } from 'framer-motion';
import clsx from 'clsx';
import SmartImage from './SmartImage';
import DietaryBadge from './DietaryBadge';
import { useLanguage } from '../context/LanguageContext';
import { formatPrice } from '../lib/format';
import type { MenuItem } from '../types';

interface Props {
  item: MenuItem;
  currency: string;
  onOpen: (item: MenuItem) => void;
  eager?: boolean;
}

export default function ItemCard({ item, currency, onOpen, eager }: Props) {
  const { tr, ui } = useLanguage();
  const soldOut = item.isAvailable === false;
  const basePrice = item.sizes?.length
    ? Math.min(...item.sizes.map((s) => s.price))
    : item.price;

  return (
    <motion.button
      layout
      onClick={() => !soldOut && onOpen(item)}
      disabled={soldOut}
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.35 }}
      whileTap={soldOut ? undefined : { scale: 0.98 }}
      className={clsx(
        'group flex w-full items-stretch gap-3 overflow-hidden rounded-2xl bg-surface p-3 text-start shadow-soft ring-1 ring-line transition hover:shadow-lift',
        soldOut && 'opacity-60'
      )}
    >
      <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-xl">
        <SmartImage
          src={item.image}
          alt={tr(item.name)}
          blur={item.blur}
          loading={eager ? 'eager' : 'lazy'}
          className="h-full w-full transition duration-500 group-hover:scale-105"
        />
        {soldOut && (
          <span className="absolute inset-0 grid place-items-center bg-bg/70 text-xs font-bold uppercase tracking-wide text-terracotta">
            {ui('soldOut')}
          </span>
        )}
      </div>

      <div className="flex min-w-0 flex-1 flex-col">
        <div className="flex items-baseline justify-between gap-2">
          <h3 className="truncate font-display text-lg font-semibold text-primary">
            {tr(item.name)}
          </h3>
        </div>
        <p className="mt-0.5 line-clamp-2 text-sm leading-snug text-muted">
          {tr(item.description)}
        </p>
        <div className="mt-auto flex items-end justify-between gap-2 pt-2">
          <div className="flex flex-wrap gap-1">
            {item.tags?.slice(0, 3).map((tag) => (
              <DietaryBadge key={tag} tag={tag} />
            ))}
          </div>
          <span className="shrink-0 whitespace-nowrap font-semibold text-ink">
            {item.sizes?.length && (
              <span className="me-1 text-xs font-normal text-muted">{ui('from')}</span>
            )}
            {formatPrice(basePrice, currency)}
          </span>
        </div>
      </div>
    </motion.button>
  );
}
