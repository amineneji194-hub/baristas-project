import clsx from 'clsx';
import { Vegan, Salad, WheatOff, Flame, Bean, Moon, type LucideIcon } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { TAG_LABELS } from '../data/i18n';
import type { DietaryTag } from '../types';

/** Clean line icon for each dietary tag (no emoji). */
export const TAG_ICON: Record<DietaryTag, LucideIcon> = {
  vegan: Vegan,
  vegetarian: Salad,
  'gluten-free': WheatOff,
  spicy: Flame,
  'contains-nuts': Bean,
  decaf: Moon,
};

export const ALL_TAGS: DietaryTag[] = [
  'vegan',
  'vegetarian',
  'gluten-free',
  'spicy',
  'contains-nuts',
  'decaf',
];

export default function DietaryBadge({
  tag,
  showLabel = false,
  className,
}: {
  tag: DietaryTag;
  showLabel?: boolean;
  className?: string;
}) {
  const { tr } = useLanguage();
  const label = tr(TAG_LABELS[tag]);
  const Icon = TAG_ICON[tag];
  return (
    <span
      className={clsx(
        'inline-flex items-center gap-1 rounded-full bg-foam/70 font-medium text-ink/80',
        showLabel ? 'px-2 py-0.5 text-[0.72rem]' : 'h-6 w-6 justify-center',
        className
      )}
      title={label}
      aria-label={label}
    >
      <Icon size={showLabel ? 13 : 14} className="text-accent" aria-hidden />
      {showLabel && <span>{label}</span>}
    </span>
  );
}
