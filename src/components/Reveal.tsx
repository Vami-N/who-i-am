import { useEffect, useRef, useState, type CSSProperties, type ElementType, type ReactNode } from 'react';

interface RevealProps {
  as?: ElementType;
  /** Délai en millisecondes (cascade entre éléments voisins). */
  delay?: number;
  className?: string;
  children: ReactNode;
}

/** Fait apparaître son contenu en douceur lorsqu’il entre dans l’écran. */
export function Reveal({ as: Tag = 'div', delay = 0, className = '', children }: RevealProps) {
  const ref = useRef<HTMLElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!('IntersectionObserver' in window)) {
      setShown(true);
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setShown(true);
          observer.disconnect();
        }
      },
      { rootMargin: '0px 0px -6% 0px', threshold: 0.05 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const style = { '--reveal-delay': `${delay}ms` } as CSSProperties;
  return (
    <Tag ref={ref} className={`reveal${shown ? ' is-in' : ''}${className ? ` ${className}` : ''}`} style={style}>
      {children}
    </Tag>
  );
}
