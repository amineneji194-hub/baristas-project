import { useEffect, useState } from 'react';
import { Wifi, Copy, Check } from 'lucide-react';
import QRCode from 'qrcode';
import { useLanguage } from '../context/LanguageContext';

interface Props {
  ssid: string;
  password: string;
}

/** Card showing the café Wi-Fi with a copy button and a scannable join QR. */
export default function WifiCard({ ssid, password }: Props) {
  const { ui } = useLanguage();
  const [qr, setQr] = useState<string>('');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    // Standard Wi-Fi QR payload; most phones offer "Join network" on scan.
    const payload = `WIFI:T:WPA;S:${ssid};P:${password};;`;
    QRCode.toDataURL(payload, { margin: 1, width: 220 })
      .then(setQr)
      .catch(() => setQr(''));
  }, [ssid, password]);

  async function copy() {
    try {
      await navigator.clipboard.writeText(password);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      /* ignore */
    }
  }

  return (
    <section className="mx-auto max-w-2xl px-4 pt-6">
      <div className="flex items-center gap-4 rounded-2xl bg-surface p-4 shadow-soft ring-1 ring-line">
        {qr && (
          <img
            src={qr}
            alt={ui('scanWifi')}
            className="h-24 w-24 shrink-0 rounded-xl bg-white p-1.5"
          />
        )}
        <div className="min-w-0 flex-1">
          <p className="flex items-center gap-1.5 font-display text-lg font-semibold text-primary">
            <Wifi size={18} className="text-accent" />
            {ui('wifi')}
          </p>
          <p className="mt-1 truncate text-sm text-muted">{ssid}</p>
          <button
            onClick={copy}
            className="mt-2 inline-flex items-center gap-1.5 rounded-xl bg-foam px-3 py-1.5 text-sm font-medium text-ink transition hover:bg-accent hover:text-bg"
          >
            <span className="font-mono">{password}</span>
            {copied ? <Check size={14} /> : <Copy size={14} />}
          </button>
        </div>
      </div>
    </section>
  );
}
