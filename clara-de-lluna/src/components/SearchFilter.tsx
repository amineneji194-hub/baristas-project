import { Search, X, SlidersHorizontal } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import clsx from 'clsx';
import { useLanguage } from '../context/LanguageContext';
import { TAG_LABELS } from '../data/i18n';
import { TAG_ICON } from './DietaryBadge';
import type { DietaryTag } from '../types';

interface Props {
  query: string;
  onQuery: (q: string) => void;
  /** Only the dietary tags that actually appear in the menu. */
  tags: DietaryTag[];
  activeTags: DietaryTag[];
  onToggleTag: (tag: DietaryTag) => void;
  onClear: () => void;
}

export default function SearchFilter({
  query,
  onQuery,
  tags,
  activeTags,
  onToggleTag,
  onClear,
}: Props) {
  const { ui, tr } = useLanguage();
  const hasFilters = query.length > 0 || activeTags.length > 0;

  return (
    <div className="mx-auto max-w-2xl px-4 pt-4">
      <div className="relative">
        <Search
          size={18}
          className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-muted rtl:left-auto rtl:right-4"
        />
        <input
          type="search"
          inputMode="search"
          value={query}
          onChange={(e) => onQuery(e.target.value)}
          placeholder={ui('searchPlaceholder')}
          aria-label={ui('searchPlaceholder')}
          className="w-full rounded-2xl border border-line bg-surface py-3 pl-11 pr-11 text-ink shadow-soft outline-none transition placeholder:text-muted focus:border-accent"
        />
        {hasFilters && (
          <button
            onClick={onClear}
            aria-label={ui('clear')}
            className="absolute right-3 top-1/2 grid h-7 w-7 -translate-y-1/2 place-items-center rounded-full bg-foam text-ink transition hover:bg-accent hover:text-bg rtl:right-auto rtl:left-3"
          >
            <X size={15} />
          </button>
        )}
      </div>

      {tags.length > 0 && (
        <div className="mt-3 flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
          <span className="flex shrink-0 items-center gap-1 text-xs font-semibold text-muted">
            <SlidersHorizontal size={13} />
            {ui('filters')}
          </span>
          {tags.map((tag) => {
            const active = activeTags.includes(tag);
            const Icon = TAG_ICON[tag];
            return (
              <button
                key={tag}
                onClick={() => onToggleTag(tag)}
                aria-pressed={active}
                className={clsx(
                  'flex shrink-0 items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium transition',
                  active
                    ? 'bg-accent text-bg shadow-soft'
                    : 'bg-surface text-ink ring-1 ring-line hover:bg-foam'
                )}
              >
                <Icon size={13} aria-hidden />
                {tr(TAG_LABELS[tag])}
              </button>
            );
          })}
        </div>
      )}

      <AnimatePresence>
        {hasFilters && (
          <motion.button
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            onClick={onClear}
            className="mt-1 text-xs font-semibold text-accent underline-offset-2 hover:underline"
          >
            {ui('clear')}
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
