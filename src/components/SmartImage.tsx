import { useState } from 'react';
import clsx from 'clsx';
import { Coffee } from 'lucide-react';

interface Props {
  src: string;
  alt: string;
  /** Solid color (or data URI) shown blurred while the photo loads. */
  blur?: string;
  className?: string;
  /** eager for above-the-fold (featured); lazy for the rest. */
  loading?: 'lazy' | 'eager';
}

/**
 * Lazy, blur-up image with a graceful branded fallback when no src is given
 * or the photo fails to load.
 */
export default function SmartImage({ src, alt, blur, className, loading = 'lazy' }: Props) {
  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(false);

  if (!src || failed) {
    return (
      <div
        className={clsx('flex items-center justify-center bg-foam text-accent', className)}
        aria-label={alt}
        role="img"
      >
        <Coffee className="h-7 w-7 opacity-60" aria-hidden />
      </div>
    );
  }

  return (
    <div
      className={clsx('relative overflow-hidden bg-foam', className)}
      style={blur ? { backgroundColor: blur } : undefined}
    >
      <img
        src={src}
        alt={alt}
        loading={loading}
        decoding="async"
        onLoad={() => setLoaded(true)}
        onError={() => setFailed(true)}
        className={clsx(
          'h-full w-full object-cover transition-[opacity,filter] duration-700',
          loaded ? 'opacity-100 blur-0 scale-100' : 'opacity-0 blur-lg scale-105'
        )}
      />
    </div>
  );
}
