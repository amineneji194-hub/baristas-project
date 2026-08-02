import DietaryBadge from './DietaryBadge';
import { useLanguage } from '../context/LanguageContext';
import type { DietaryTag } from '../types';

/** Small legend explaining the dietary icons that actually appear in the menu. */
export default function DietaryLegend({ tags }: { tags: DietaryTag[] }) {
  const { ui } = useLanguage();
  if (!tags.length) return null;
  return (
    <section className="mx-auto max-w-2xl px-4 pt-6">
      <details className="rounded-2xl bg-surface/60 p-4 ring-1 ring-line">
        <summary className="cursor-pointer select-none text-sm font-semibold text-ink">
          {ui('legend')}
        </summary>
        <div className="mt-3 flex flex-wrap gap-2">
          {tags.map((tag) => (
            <DietaryBadge key={tag} tag={tag} showLabel />
          ))}
        </div>
      </details>
    </section>
  );
}
