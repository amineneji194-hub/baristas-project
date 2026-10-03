import { useEffect, useMemo, useRef, useState } from 'react';
import { menu } from './data/menu';
import { useLanguage } from './context/LanguageContext';
import Header from './components/Header';
import CategoryTabs from './components/CategoryTabs';
import SearchFilter from './components/SearchFilter';
import FeaturedRail from './components/FeaturedRail';
import ItemCard from './components/ItemCard';
import ItemModal from './components/ItemModal';
import DietaryLegend from './components/DietaryLegend';
import WifiCard from './components/WifiCard';
import InstallPrompt from './components/InstallPrompt';
import Footer from './components/Footer';
import MenuSkeleton from './components/MenuSkeleton';
import CategoryIcon from './components/CategoryIcon';
import { ALL_TAGS } from './components/DietaryBadge';
import type { DietaryTag, MenuItem } from './types';

export default function App() {
  const { tr, ui } = useLanguage();
  const { shop, categories, items } = menu;

  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState('');
  const [activeTags, setActiveTags] = useState<DietaryTag[]>([]);
  const [selected, setSelected] = useState<MenuItem | null>(null);
  const [activeCat, setActiveCat] = useState<string | null>(categories[0]?.id ?? null);

  // Brief skeleton so the UI feels intentional even on instant loads.
  useEffect(() => {
    const id = setTimeout(() => setLoading(false), 450);
    return () => clearTimeout(id);
  }, []);

  const sortedCats = useMemo(
    () => [...categories].sort((a, b) => a.order - b.order),
    [categories]
  );

  const featured = useMemo(
    () => items.filter((i) => i.isFeatured && i.isAvailable !== false),
    [items]
  );

  // Only the dietary tags actually used somewhere in the menu (canonical order).
  // This keeps the filter bar relevant — no chips that match zero items.
  const availableTags = useMemo(() => {
    const used = new Set<DietaryTag>();
    items.forEach((i) => i.tags?.forEach((t) => used.add(t)));
    return ALL_TAGS.filter((t) => used.has(t));
  }, [items]);

  // Apply search + dietary filters across all items.
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return items.filter((item) => {
      if (activeTags.length && !activeTags.every((t) => item.tags?.includes(t))) {
        return false;
      }
      if (!q) return true;
      const haystack = [tr(item.name), tr(item.description)].join(' ').toLowerCase();
      return haystack.includes(q);
    });
  }, [items, query, activeTags, tr]);

  const isFiltering = query.trim().length > 0 || activeTags.length > 0;

  // Items grouped by category (only categories that still have matches).
  const grouped = useMemo(
    () =>
      sortedCats
        .map((cat) => ({ cat, list: filtered.filter((i) => i.categoryId === cat.id) }))
        .filter((g) => g.list.length > 0),
    [sortedCats, filtered]
  );

  // ── Scroll-spy: highlight the tab of the section currently in view ──
  const sectionRefs = useRef<Map<string, HTMLElement>>(new Map());
  useEffect(() => {
    if (loading || isFiltering) return;
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActiveCat(visible[0].target.id.replace('cat-', ''));
      },
      { rootMargin: '-40% 0px -55% 0px', threshold: 0 }
    );
    sectionRefs.current.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [loading, isFiltering, grouped]);

  function scrollToCategory(id: string) {
    setActiveCat(id);
    sectionRefs.current.get(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  function toggleTag(tag: DietaryTag) {
    setActiveTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  }

  function clearFilters() {
    setQuery('');
    setActiveTags([]);
  }

  return (
    <div className="min-h-dvh pb-4">
      <Header shop={shop} />

      {!isFiltering && featured.length > 0 && (
        <FeaturedRail items={featured} currency={shop.currency} onOpen={setSelected} />
      )}

      <div className="mt-4">
        <CategoryTabs
          categories={sortedCats}
          activeId={activeCat}
          onSelect={scrollToCategory}
        />
      </div>

      <SearchFilter
        query={query}
        onQuery={setQuery}
        tags={availableTags}
        activeTags={activeTags}
        onToggleTag={toggleTag}
        onClear={clearFilters}
      />

      {loading ? (
        <MenuSkeleton />
      ) : grouped.length === 0 ? (
        <p className="mx-auto max-w-2xl px-4 py-16 text-center text-muted">
          {ui('noResults')}
        </p>
      ) : (
        <main className="mx-auto max-w-2xl px-4 pt-2">
          {grouped.map(({ cat, list }) => (
            <section
              key={cat.id}
              id={`cat-${cat.id}`}
              data-scroll-anchor
              ref={(el) => {
                if (el) sectionRefs.current.set(cat.id, el);
                else sectionRefs.current.delete(cat.id);
              }}
              className="scroll-mt-28 pt-6"
            >
              <h2 className="mb-3 flex items-center gap-2 font-display text-xl font-semibold text-primary">
                <CategoryIcon name={cat.icon} size={20} className="text-accent" />
                {tr(cat.name)}
              </h2>
              <div className="grid grid-cols-1 gap-3">
                {list.map((item) => (
                  <ItemCard
                    key={item.id}
                    item={item}
                    currency={shop.currency}
                    onOpen={setSelected}
                  />
                ))}
              </div>
            </section>
          ))}
        </main>
      )}

      {!isFiltering && (
        <>
          <DietaryLegend tags={availableTags} />
          {shop.wifi && <WifiCard ssid={shop.wifi.ssid} password={shop.wifi.password} />}
        </>
      )}

      <Footer shop={shop} />

      <ItemModal item={selected} currency={shop.currency} onClose={() => setSelected(null)} />
      <InstallPrompt />
    </div>
  );
}
