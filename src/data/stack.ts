import type { L } from './i18n';

export type Level = 'core' | 'regular' | 'explore';

export interface StackItem {
  name: string;
  level: Level;
}

export interface StackLayer {
  id: string;
  name: L;
  items: StackItem[];
}

/** Stack centrale, dans l’ordre d’affichage du bandeau du hero. */
export const coreStack = [
  'Go',
  'React',
  'TypeScript',
  'GraphQL',
  'Vite',
  'Docker',
  'PostgreSQL',
  'Keycloak',
  'Nginx',
  'Redis',
  'Redpanda',
] as const;

const c = (name: string): StackItem => ({ name, level: 'core' });
const r = (name: string): StackItem => ({ name, level: 'regular' });
const x = (name: string): StackItem => ({ name, level: 'explore' });

/** Couches, de l’interface vers l’infrastructure — comme un schéma d’architecture. */
export const layers: StackLayer[] = [
  {
    id: 'interface',
    name: { fr: 'Interface', en: 'Interface' },
    items: [c('React'), c('TypeScript'), c('Vite'), x('WebGL')],
  },
  {
    id: 'api',
    name: { fr: 'API & contrats', en: 'APIs & contracts' },
    items: [c('GraphQL'), r('gRPC'), r('Protocol Buffers')],
  },
  {
    id: 'services',
    name: { fr: 'Services', en: 'Services' },
    items: [c('Go'), r('GORM'), r('Python'), r('FastAPI'), r('Celery')],
  },
  {
    id: 'data',
    name: { fr: 'Données & événements', en: 'Data & events' },
    items: [c('PostgreSQL'), c('Redis'), c('Redpanda'), r('Pandas'), r('Scikit-learn')],
  },
  {
    id: 'security',
    name: { fr: 'Sécurité & réseau', en: 'Security & network' },
    items: [c('Keycloak'), c('Nginx'), r('Kali Linux'), r('Pi-hole'), r('DuckDNS')],
  },
  {
    id: 'infra',
    name: { fr: 'Infra & systèmes', en: 'Infra & systems' },
    items: [c('Docker'), r('Docker Compose'), r('Portainer'), r('Linux (Arch)'), r('Git'), r('PowerShell'), r('pnpm')],
  },
  {
    id: 'lowlevel',
    name: { fr: 'Bas niveau', en: 'Low level' },
    items: [r('C'), x('C++')],
  },
  {
    id: 'tooling',
    name: { fr: 'Outils & création', en: 'Tooling & craft' },
    items: [r('VS Code'), r('Claude Code'), r('OpenCode'), x('LM Studio'), r('Affinity')],
  },
];
