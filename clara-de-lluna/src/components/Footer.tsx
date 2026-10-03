import { Instagram, Facebook, Globe, MapPin, Phone } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import type { ShopInfo } from '../types';

export default function Footer({ shop }: { shop: ShopInfo }) {
  const { tr, ui } = useLanguage();
  return (
    <footer className="mx-auto mt-10 max-w-2xl px-5 pb-28 pt-8 text-center">
      <div className="flex justify-center gap-3">
        {shop.socials.instagram && (
          <a
            href={shop.socials.instagram}
            target="_blank"
            rel="noreferrer"
            aria-label="Instagram"
            className="grid h-10 w-10 place-items-center rounded-full bg-surface text-ink shadow-soft ring-1 ring-line transition hover:bg-foam"
          >
            <Instagram size={18} />
          </a>
        )}
        {shop.socials.facebook && (
          <a
            href={shop.socials.facebook}
            target="_blank"
            rel="noreferrer"
            aria-label="Facebook"
            className="grid h-10 w-10 place-items-center rounded-full bg-surface text-ink shadow-soft ring-1 ring-line transition hover:bg-foam"
          >
            <Facebook size={18} />
          </a>
        )}
        {shop.socials.website && (
          <a
            href={shop.socials.website}
            target="_blank"
            rel="noreferrer"
            aria-label="Website"
            className="grid h-10 w-10 place-items-center rounded-full bg-surface text-ink shadow-soft ring-1 ring-line transition hover:bg-foam"
          >
            <Globe size={18} />
          </a>
        )}
      </div>

      <div className="mt-5 space-y-1.5 text-sm text-muted">
        <p className="flex items-center justify-center gap-1.5">
          <MapPin size={14} className="text-accent" />
          {tr(shop.address)}
        </p>
        {shop.phone && (
          <a
            href={`tel:${shop.phone}`}
            className="flex items-center justify-center gap-1.5 hover:text-accent"
          >
            <Phone size={14} className="text-accent" />
            <span dir="ltr">{shop.phone}</span>
            <span className="sr-only">{ui('callUs')}</span>
          </a>
        )}
      </div>

      <p className="mt-6 font-display text-sm italic text-muted">{tr(shop.tagline)}</p>
      <p className="mt-2 text-xs text-muted/70">
        © {new Date().getFullYear()} {shop.name}
      </p>
    </footer>
  );
}
