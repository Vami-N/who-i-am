import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import type { L, Lang } from '../data/i18n';
import { ui } from '../data/ui';

interface I18nValue {
  lang: Lang;
  setLang: (lang: Lang) => void;
  /** Choisit la valeur correspondant à la langue active. */
  t: <T>(value: L<T>) => T;
}

const I18nContext = createContext<I18nValue | null>(null);

const isLang = (value: unknown): value is Lang => value === 'fr' || value === 'en';

/** Priorité : ?lang=en → choix mémorisé → langue du navigateur → français. */
function detectLang(): Lang {
  try {
    const fromUrl = new URLSearchParams(window.location.search).get('lang');
    if (isLang(fromUrl)) return fromUrl;
    const stored = window.localStorage.getItem('lang');
    if (isLang(stored)) return stored;
  } catch {
    /* stockage indisponible : on continue */
  }
  const browser = (navigator.languages?.[0] ?? navigator.language ?? 'fr').toLowerCase();
  return browser.startsWith('fr') ? 'fr' : 'en';
}

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(detectLang);

  const setLang = useCallback((next: Lang) => {
    setLangState(next);
    try {
      window.localStorage.setItem('lang', next);
    } catch {
      /* ignore */
    }
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
    document.title = ui.meta.title[lang];
    document.querySelector('meta[name="description"]')?.setAttribute('content', ui.meta.description[lang]);
    document.querySelector('meta[property="og:title"]')?.setAttribute('content', ui.meta.title[lang]);
    document.querySelector('meta[property="og:description"]')?.setAttribute('content', ui.meta.description[lang]);
    document.querySelector('meta[property="og:locale"]')?.setAttribute('content', lang === 'fr' ? 'fr_FR' : 'en_US');
  }, [lang]);

  const value = useMemo<I18nValue>(() => ({ lang, setLang, t: (v) => v[lang] }), [lang, setLang]);

  return <I18nContext value={value}>{children}</I18nContext>;
}

export function useI18n(): I18nValue {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error('useI18n doit être utilisé dans <I18nProvider>');
  return ctx;
}
