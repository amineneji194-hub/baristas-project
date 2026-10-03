import { useEffect, useState } from 'react';
import { Download, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';

/** Minimal type for the non-standard beforeinstallprompt event. */
interface BIPEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

const DISMISS_KEY = 'clara-de-lluna-install-dismissed';

/** Subtle "Add to home screen" prompt (Chrome/Android). Stubs cleanly elsewhere. */
export default function InstallPrompt() {
  const { ui } = useLanguage();
  const [deferred, setDeferred] = useState<BIPEvent | null>(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (localStorage.getItem(DISMISS_KEY)) return;
    const handler = (e: Event) => {
      e.preventDefault();
      setDeferred(e as BIPEvent);
      setShow(true);
    };
    window.addEventListener('beforeinstallprompt', handler);
    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  async function install() {
    if (!deferred) return;
    await deferred.prompt();
    await deferred.userChoice;
    setShow(false);
    setDeferred(null);
  }

  function dismiss() {
    localStorage.setItem(DISMISS_KEY, '1');
    setShow(false);
  }

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          className="fixed inset-x-3 bottom-3 z-40 mx-auto flex max-w-md items-center gap-3 rounded-2xl bg-primary p-3 text-bg shadow-lift"
        >
          <Download size={20} className="shrink-0" />
          <p className="flex-1 text-sm font-medium">{ui('install')}</p>
          <button
            onClick={install}
            className="rounded-xl bg-bg px-3 py-1.5 text-sm font-semibold text-primary"
          >
            {ui('install')}
          </button>
          <button onClick={dismiss} aria-label={ui('dismiss')} className="p-1 opacity-80">
            <X size={16} />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
