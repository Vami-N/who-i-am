import type { L } from './i18n';

export type NodeKind = 'client' | 'edge' | 'gateway' | 'service' | 'bus' | 'data' | 'identity' | 'external';

export interface DiagramNode {
  id: string;
  kind: NodeKind;
  x: number;
  y: number;
  w: number;
  h: number;
  title: string;
  sub?: L;
  desc: L;
}

export interface DiagramEdge {
  id: string;
  from: string;
  to: string;
  /** Points de passage (coins arrondis automatiquement). */
  points: [number, number][];
  dashed?: boolean;
}

export interface ScenarioStep {
  edge: string;
  /** true = le paquet circule de `to` vers `from` (réponse). */
  reverse?: boolean;
  label: L;
}

export interface Scenario {
  id: string;
  title: L;
  summary: L;
  steps: ScenarioStep[];
}

export const VIEW = { w: 400, h: 470 } as const;

export const boundary = { x: 8, y: 84, w: 384, h: 378 } as const;

export const nodes: DiagramNode[] = [
  {
    id: 'client',
    kind: 'client',
    x: 130,
    y: 12,
    w: 140,
    h: 48,
    title: 'React SPA',
    sub: { fr: 'TypeScript · Vite', en: 'TypeScript · Vite' },
    desc: {
      fr: 'Interface React + TypeScript (Vite). Elle ne parle qu’à la passerelle\u00a0: jamais directement aux services.',
      en: 'React + TypeScript UI (Vite). It only talks to the gateway — never directly to the services.',
    },
  },
  {
    id: 'nginx',
    kind: 'edge',
    x: 130,
    y: 116,
    w: 140,
    h: 44,
    title: 'Nginx',
    sub: { fr: 'reverse proxy', en: 'reverse proxy' },
    desc: {
      fr: 'Point d’entrée unique\u00a0: routage vers les bons backends, en frontal de toute la plateforme.',
      en: 'Single entry point: routes traffic to the right backends, in front of the whole platform.',
    },
  },
  {
    id: 'gateway',
    kind: 'gateway',
    x: 130,
    y: 196,
    w: 140,
    h: 48,
    title: 'API Gateway',
    sub: { fr: 'GraphQL', en: 'GraphQL' },
    desc: {
      fr: 'Un schéma GraphQL pour les clients\u00a0; la passerelle orchestre les appels gRPC vers les services.',
      en: 'One GraphQL schema for clients; the gateway orchestrates the gRPC calls to the services.',
    },
  },
  {
    id: 'keycloak',
    kind: 'identity',
    x: 296,
    y: 196,
    w: 88,
    h: 48,
    title: 'Keycloak',
    sub: { fr: 'OIDC · JWT', en: 'OIDC · JWT' },
    desc: {
      fr: 'Identité et SSO\u00a0: un seul endroit pour authentifier, des jetons JWT que la passerelle vérifie.',
      en: 'Identity and SSO: one place to authenticate, with JWTs that the gateway verifies.',
    },
  },
  {
    id: 'svcA',
    kind: 'service',
    x: 18,
    y: 300,
    w: 106,
    h: 48,
    title: 'Service A',
    sub: { fr: 'Go · gRPC', en: 'Go · gRPC' },
    desc: {
      fr: 'Microservice Go avec son périmètre et son contrat Protocol Buffers. Architecture hexagonale, couplage minimal.',
      en: 'Go microservice with its own scope and Protocol Buffers contract. Hexagonal architecture, minimal coupling.',
    },
  },
  {
    id: 'bus',
    kind: 'bus',
    x: 147,
    y: 300,
    w: 106,
    h: 48,
    title: 'Redpanda',
    sub: { fr: 'événements', en: 'events' },
    desc: {
      fr: 'Bus d’événements\u00a0: les services publient des faits, d’autres y réagissent — sans se connaître.',
      en: 'Event bus: services publish facts, others react to them — without knowing each other.',
    },
  },
  {
    id: 'svcB',
    kind: 'service',
    x: 276,
    y: 300,
    w: 106,
    h: 48,
    title: 'Service B',
    sub: { fr: 'Go · gRPC', en: 'Go · gRPC' },
    desc: {
      fr: 'Autre microservice Go. Il consomme les événements qui l’intéressent et reste déployable seul.',
      en: 'Another Go microservice. It consumes the events it cares about and stays independently deployable.',
    },
  },
  {
    id: 'pg',
    kind: 'data',
    x: 18,
    y: 396,
    w: 106,
    h: 44,
    title: 'PostgreSQL',
    sub: { fr: 'transactionnel', en: 'transactional' },
    desc: {
      fr: 'Base relationnelle\u00a0: la source de vérité transactionnelle des données métier.',
      en: 'Relational database: the transactional source of truth for business data.',
    },
  },
  {
    id: 'redis',
    kind: 'data',
    x: 276,
    y: 396,
    w: 106,
    h: 44,
    title: 'Redis',
    sub: { fr: 'cache', en: 'cache' },
    desc: {
      fr: 'Cache en mémoire pour servir vite les données chaudes sans solliciter la base.',
      en: 'In-memory cache to serve hot data fast without hitting the database.',
    },
  },
];

export const edges: DiagramEdge[] = [
  { id: 'client-nginx', from: 'client', to: 'nginx', points: [[200, 60], [200, 116]] },
  { id: 'nginx-gateway', from: 'nginx', to: 'gateway', points: [[200, 160], [200, 196]] },
  { id: 'gateway-svcA', from: 'gateway', to: 'svcA', points: [[200, 244], [200, 272], [71, 272], [71, 300]] },
  { id: 'gateway-svcB', from: 'gateway', to: 'svcB', points: [[200, 244], [200, 272], [329, 272], [329, 300]] },
  { id: 'svcA-bus', from: 'svcA', to: 'bus', points: [[124, 324], [147, 324]], dashed: true },
  { id: 'bus-svcB', from: 'bus', to: 'svcB', points: [[253, 324], [276, 324]], dashed: true },
  { id: 'svcA-pg', from: 'svcA', to: 'pg', points: [[71, 348], [71, 396]] },
  { id: 'svcB-redis', from: 'svcB', to: 'redis', points: [[329, 348], [329, 396]] },
  { id: 'client-keycloak', from: 'client', to: 'keycloak', points: [[270, 36], [340, 36], [340, 196]] },
  { id: 'gateway-keycloak', from: 'gateway', to: 'keycloak', points: [[270, 220], [296, 220]], dashed: true },
];

export const scenarios: Scenario[] = [
  {
    id: 'request',
    title: { fr: 'Requête', en: 'Request' },
    summary: {
      fr: 'Une requête traverse Nginx et la passerelle, atteint un service, puis la réponse remonte.',
      en: 'A request goes through Nginx and the gateway, reaches a service, then the response comes back.',
    },
    steps: [
      { edge: 'client-nginx', label: { fr: 'Le client envoie une requête GraphQL.', en: 'The client sends a GraphQL request.' } },
      { edge: 'nginx-gateway', label: { fr: 'Nginx la route vers la passerelle.', en: 'Nginx routes it to the gateway.' } },
      { edge: 'gateway-svcA', label: { fr: 'La passerelle appelle le bon service en gRPC.', en: 'The gateway calls the right service over gRPC.' } },
      { edge: 'svcA-pg', label: { fr: 'Le service lit ou écrit dans PostgreSQL.', en: 'The service reads or writes PostgreSQL.' } },
      { edge: 'svcA-pg', reverse: true, label: { fr: 'PostgreSQL renvoie les données.', en: 'PostgreSQL returns the data.' } },
      { edge: 'gateway-svcA', reverse: true, label: { fr: 'Le service répond à la passerelle.', en: 'The service answers the gateway.' } },
      { edge: 'nginx-gateway', reverse: true, label: { fr: 'La passerelle assemble la réponse GraphQL.', en: 'The gateway assembles the GraphQL response.' } },
      { edge: 'client-nginx', reverse: true, label: { fr: 'Le client reçoit exactement ce qu’il a demandé.', en: 'The client receives exactly what it asked for.' } },
    ],
  },
  {
    id: 'event',
    title: { fr: 'Événement', en: 'Event' },
    summary: {
      fr: 'Un service publie un fait ; un autre y réagit, sans appel direct entre eux.',
      en: 'One service publishes a fact; another reacts to it, with no direct call between them.',
    },
    steps: [
      { edge: 'gateway-svcA', label: { fr: 'Une commande arrive sur le service A.', en: 'A command reaches service A.' } },
      { edge: 'svcA-pg', label: { fr: 'Il enregistre le changement dans PostgreSQL.', en: 'It persists the change in PostgreSQL.' } },
      { edge: 'svcA-bus', label: { fr: 'Il publie un événement dans Redpanda.', en: 'It publishes an event to Redpanda.' } },
      { edge: 'bus-svcB', label: { fr: 'Redpanda le livre au service B, sans couplage direct.', en: 'Redpanda delivers it to service B, with no direct coupling.' } },
      { edge: 'svcB-redis', label: { fr: 'Le service B met à jour son cache Redis.', en: 'Service B refreshes its Redis cache.' } },
    ],
  },
  {
    id: 'auth',
    title: { fr: 'Authentification', en: 'Auth' },
    summary: {
      fr: 'Keycloak authentifie l’utilisateur ; la passerelle ne fait confiance qu’à un jeton valide.',
      en: 'Keycloak authenticates the user; the gateway only trusts a valid token.',
    },
    steps: [
      { edge: 'client-keycloak', label: { fr: 'L’utilisateur se connecte via Keycloak (OIDC).', en: 'The user signs in through Keycloak (OIDC).' } },
      { edge: 'client-keycloak', reverse: true, label: { fr: 'Keycloak émet un jeton JWT.', en: 'Keycloak issues a JWT.' } },
      { edge: 'client-nginx', label: { fr: 'Le client appelle l’API avec ce jeton.', en: 'The client calls the API with that token.' } },
      { edge: 'nginx-gateway', label: { fr: 'Nginx transmet à la passerelle.', en: 'Nginx forwards it to the gateway.' } },
      { edge: 'gateway-keycloak', label: { fr: 'La passerelle valide le jeton auprès de Keycloak.', en: 'The gateway validates the token against Keycloak.' } },
    ],
  },
];
