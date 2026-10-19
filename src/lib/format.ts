import type { Lang } from '../data/i18n';

/** '2026-07' → « juil. 2026 » / « Jul 2026 » */
export function formatMonth(ym: string, lang: Lang): string {
  const [year, month] = ym.split('-').map(Number);
  const date = new Date(Date.UTC(year, month - 1, 1));
  return new Intl.DateTimeFormat(lang === 'fr' ? 'fr-FR' : 'en-GB', {
    month: 'short',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(date);
}

/** Construit un lien externe sûr, ou `null` si la valeur est vide. */
export function cleanUrl(value: string): string | null {
  const v = value.trim();
  return v ? v : null;
}
