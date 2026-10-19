export type Lang = 'fr' | 'en';

/** Une valeur localisée : { fr: '…', en: '…' } */
export type L<T = string> = Record<Lang, T>;

export const LANGS: readonly Lang[] = ['fr', 'en'];
