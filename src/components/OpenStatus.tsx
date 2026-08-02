import { useEffect, useState } from 'react';
import clsx from 'clsx';
import { useLanguage } from '../context/LanguageContext';
import { getOpenState } from '../lib/hours';
import type { OpeningHours } from '../types';

/** Live "Open now / Closed" pill derived from the shop's opening hours. */
export default function OpenStatus({ hours }: { hours: OpeningHours }) {
  const { ui } = useLanguage();
  const [state, setState] = useState(() => getOpenState(hours));

  useEffect(() => {
    const id = setInterval(() => setState(getOpenState(hours)), 60_000);
    return () => clearInterval(id);
  }, [hours]);

  return (
    <span
      className={clsx(
        'inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold',
        state.isOpen
          ? 'bg-emerald-500/15 text-emerald-700 dark:text-emerald-300'
          : 'bg-terracotta/15 text-terracotta'
      )}
    >
      <span
        className={clsx(
          'h-1.5 w-1.5 rounded-full',
          state.isOpen ? 'bg-emerald-500' : 'bg-terracotta'
        )}
      />
      {state.isOpen ? ui('open') : ui('closed')}
      {state.nextChange && (
        <span className="font-normal opacity-75">
          · {state.isOpen ? ui('closesAt') : ui('opensAt')} {state.nextChange}
        </span>
      )}
    </span>
  );
}
