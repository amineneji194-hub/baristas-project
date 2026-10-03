import {
  Coffee,
  CupSoda,
  GlassWater,
  Citrus,
  Snowflake,
  Leaf,
  Sparkles,
  Croissant,
  Sandwich,
  Cookie,
  Plus,
  Moon,
  CakeSlice,
  type LucideIcon,
} from 'lucide-react';

/**
 * Maps a category's `icon` name (set in src/data/menu.ts) to a lucide icon.
 * To use a different icon, set `icon: 'Coffee'` (any key below) on the category.
 * Browse names at https://lucide.dev/icons
 */
const CATEGORY_ICONS: Record<string, LucideIcon> = {
  Coffee,
  CupSoda,
  GlassWater,
  Citrus,
  Snowflake,
  Leaf,
  Sparkles,
  Croissant,
  Sandwich,
  Cookie,
  Plus,
  Moon,
  CakeSlice,
};

export default function CategoryIcon({
  name,
  size = 16,
  className,
}: {
  name: string;
  size?: number;
  className?: string;
}) {
  const Icon = CATEGORY_ICONS[name] ?? Coffee;
  return <Icon size={size} className={className} aria-hidden />;
}
