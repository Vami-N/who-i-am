import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import type { L, Lang } from '../data/i18n';
import { ui } from '../data/ui';
import { detectLang as detectLanguage, localizedUrl } from './language';

interface I18nValue {
  lang: Lang;
  setLang: (lang: Lang) => void;
  /** Choisit la valeur correspondant à la langue active. */
  t: <T>(value: L<T>) => T;
}

const I18nContext = createContext<I18nValue | null>(null);

/** Priorité : ?lang=… → route /en/ → choix mémorisé → langue du navigateur → français. */
function detectLang(): Lang {
  try {
    return detectLangFromBrowser();
  } catch {
    return (navigator.languages?.[0] ?? navigator.language ?? 'fr').toLowerCase().startsWith('fr') ? 'fr' : 'en';
  }
}

function detectLangFromBrowser(): Lang {
  let stored: string | null = null;
  try {
    stored = window.localStorage.getItem('lang');
  } catch {
    // The URL and browser language still determine the initial language.
  }
  return detectLanguage(new URL(window.location.href), stored, navigator.languages?.[0] ?? navigator.language);
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
    const url = localizedUrl(new URL(window.location.href), lang);
    if (url.href !== window.location.href) window.history.replaceState(window.history.state, '', url);
    document.documentElement.lang = lang;
    document.title = ui.meta.title[lang];
    document.querySelector('meta[name="description"]')?.setAttribute('content', ui.meta.description[lang]);
    document.querySelector('meta[property="og:title"]')?.setAttribute('content', ui.meta.title[lang]);
    document.querySelector('meta[property="og:description"]')?.setAttribute('content', ui.meta.description[lang]);
    document.querySelector('meta[property="og:locale"]')?.setAttribute('content', lang === 'fr' ? 'fr_FR' : 'en_US');
    document.querySelector('meta[property="og:url"]')?.setAttribute('content', new URL(lang === 'en' ? '/en/' : '/', window.location.origin).href);
    document.querySelector('link[rel="canonical"]')?.setAttribute('href', new URL(lang === 'en' ? '/en/' : '/', window.location.origin).href);
  }, [lang]);

  const value = useMemo<I18nValue>(() => ({ lang, setLang, t: (v) => v[lang] }), [lang, setLang]);

  return <I18nContext value={value}>{children}</I18nContext>;
}

export function useI18n(): I18nValue {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error('useI18n doit être utilisé dans <I18nProvider>');
  return ctx;
}
