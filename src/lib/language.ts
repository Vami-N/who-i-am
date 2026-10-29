import type { Lang } from '../data/i18n';

const isLang = (value: string | null): value is Lang => value === 'fr' || value === 'en';

export function detectLang(url: URL, stored: string | null, browserLanguage: string | undefined): Lang {
  const fromQuery = url.searchParams.get('lang');
  if (isLang(fromQuery)) return fromQuery;
  if (/\/en\/?$/.test(url.pathname)) return 'en';
  if (isLang(stored)) return stored;
  return (browserLanguage ?? 'fr').toLowerCase().startsWith('fr') ? 'fr' : 'en';
}

export function localizedUrl(currentUrl: URL, lang: Lang): URL {
  const url = new URL(currentUrl);
  url.searchParams.delete('lang');
  const basePath = /\/en\/?$/.test(url.pathname) ? url.pathname.replace(/en\/?$/, '') : url.pathname;
  const normalizedBase = basePath.endsWith('/') ? basePath : `${basePath}/`;
  url.pathname = lang === 'en' ? `${normalizedBase}en/` : normalizedBase;
  return url;
}
