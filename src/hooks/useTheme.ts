import { useCallback, useEffect, useState } from 'react';

export type Theme = 'dark' | 'light';

const THEME_COLOR: Record<Theme, string> = { dark: '#080c0a', light: '#f4f1e8' };

function readInitial(): Theme {
  return document.documentElement.dataset.theme === 'light' ? 'light' : 'dark';
}

/**
 * Thème sombre / clair. Le script inline de index.html applique le thème avant
 * le premier rendu (pas de flash) ; ce hook ne fait que le piloter ensuite.
 */
export function useTheme() {
  const [theme, setTheme] = useState<Theme>(readInitial);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', THEME_COLOR[theme]);
  }, [theme]);

  // Tant que l’utilisateur n’a pas choisi, on suit le réglage du système.
  useEffect(() => {
    const media = window.matchMedia('(prefers-color-scheme: light)');
    const onChange = () => {
      try {
        if (window.localStorage.getItem('theme')) return;
      } catch {
        /* ignore */
      }
      setTheme(media.matches ? 'light' : 'dark');
    };
    media.addEventListener('change', onChange);
    return () => media.removeEventListener('change', onChange);
  }, []);

  const toggle = useCallback(() => {
    const next: Theme = theme === 'dark' ? 'light' : 'dark';
    setTheme(next);
    try {
      window.localStorage.setItem('theme', next);
    } catch {
      /* ignore */
    }
  }, [theme]);

  return { theme, toggle };
}
