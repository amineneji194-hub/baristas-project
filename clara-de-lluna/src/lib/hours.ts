import type { OpeningHours } from '../types';

export interface OpenState {
  isOpen: boolean;
  /** "HH:MM" of the next relevant transition (open time if closed, close time if open). */
  nextChange: string | null;
}

/** Convert "HH:MM" to minutes since midnight. */
function toMinutes(hhmm: string): number {
  const [h, m] = hhmm.split(':').map(Number);
  return h * 60 + m;
}

/**
 * Decide whether the shop is open right now, handling windows that cross
 * midnight (e.g. open 06:30 → close 01:00 the next day).
 */
export function getOpenState(hours: OpeningHours, now: Date = new Date()): OpenState {
  const day = now.getDay();
  const minutes = now.getHours() * 60 + now.getMinutes();

  const today = hours[day];
  if (today) {
    const open = toMinutes(today.open);
    let close = toMinutes(today.close);
    const crossesMidnight = close <= open;
    if (crossesMidnight) close += 24 * 60;

    const cur = minutes < open && crossesMidnight ? minutes + 24 * 60 : minutes;
    if (cur >= open && cur < close) {
      return { isOpen: true, nextChange: today.close };
    }
  }

  // Closed now: also check if yesterday's window spilled past midnight into today.
  const prevDay = (day + 6) % 7;
  const prev = hours[prevDay];
  if (prev) {
    const open = toMinutes(prev.open);
    const close = toMinutes(prev.close);
    if (close <= open && minutes < close) {
      return { isOpen: true, nextChange: prev.close };
    }
  }

  return { isOpen: false, nextChange: today ? today.open : null };
}
