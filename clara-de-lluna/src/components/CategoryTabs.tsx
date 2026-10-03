import { useEffect, useRef } from 'react';
import clsx from 'clsx';
import { useLanguage } from '../context/LanguageContext';
import CategoryIcon from './CategoryIcon';
import type { MenuCategory } from '../types';

interface Props {
  categories: MenuCategory[];
  activeId: string | null;
  onSelect: (id: string) => void;
}

/** Sticky, horizontally-scrollable category tabs that follow scroll-spy. */
export default function CategoryTabs({ categories, activeId, onSelect }: Props) {
  const { tr } = useLanguage();
  const containerRef = useRef<HTMLDivElement>(null);

  // Keep the active tab centered in the strip as the user scrolls.
  // IMPORTANT: scroll ONLY the horizontal strip (scrollBy on the container).
  // Using el.scrollIntoView() here would also scroll the page vertically —
  // and because this bar is `sticky`, that fights the user's scroll and can
  // lock the page partway down. So we move the strip manually instead.
  useEffect(() => {
    if (!activeId || !containerRef.current) return;
    const container = containerRef.current;
    const el = container.querySelector<HTMLButtonElement>(`[data-tab="${activeId}"]`);
    if (!el) return;
    const cRect = container.getBoundingClientRect();
    const eRect = el.getBoundingClientRect();
    const delta = eRect.left - cRect.left - (container.clientWidth - el.clientWidth) / 2;
    container.scrollBy({ left: delta, behavior: 'smooth' });
  }, [activeId]);

  return (
    <div className="sticky top-0 z-30 border-b border-line bg-bg/85 backdrop-blur-md">
      <div
        ref={containerRef}
        className="no-scrollbar mx-auto flex max-w-2xl gap-2 overflow-x-auto px-4 py-3"
      >
        {categories.map((cat) => {
          const active = cat.id === activeId;
          return (
            <button
              key={cat.id}
              data-tab={cat.id}
              onClick={() => onSelect(cat.id)}
              aria-current={active ? 'true' : undefined}
              className={clsx(
                'flex shrink-0 items-center gap-1.5 rounded-full px-4 py-2 text-sm font-semibold transition',
                active
                  ? 'bg-primary text-bg shadow-soft'
                  : 'bg-surface/70 text-ink ring-1 ring-line hover:bg-foam'
              )}
            >
              <CategoryIcon name={cat.icon} size={15} />
              {tr(cat.name)}
            </button>
          );
        })}
      </div>
    </div>
  );
}
