import { Moon, Sun } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';

export default function ThemeToggle() {
  const { theme, toggle } = useTheme();
  const { ui } = useLanguage();
  const dark = theme === 'dark';
  return (
    <button
      onClick={toggle}
      aria-label={ui('toggleTheme')}
      className="grid h-10 w-10 place-items-center rounded-full bg-surface/80 text-ink shadow-soft ring-1 ring-line transition hover:bg-foam"
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={dark ? 'moon' : 'sun'}
          initial={{ y: -8, opacity: 0, rotate: -30 }}
          animate={{ y: 0, opacity: 1, rotate: 0 }}
          exit={{ y: 8, opacity: 0, rotate: 30 }}
          transition={{ duration: 0.18 }}
        >
          {dark ? <Moon size={18} /> : <Sun size={18} />}
        </motion.span>
      </AnimatePresence>
    </button>
  );
}
