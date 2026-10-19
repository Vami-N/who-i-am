import type { L } from './i18n';
import type { NodeKind } from './architecture';

export type ProjectStatus = 'active' | 'building' | 'done';

export interface PipelineItem {
  label: L;
  sub?: L;
  kind: NodeKind;
}

export interface Integration {
  label: string;
  role: L;
}

export interface FeaturedProject {
  id: string;
  name: string;
  tagline: L;
  description: L;
  role: L;
  highlights: L<string[]>;
  status: ProjectStatus;
  /** Technologies (noms neutres, identiques en FR / EN). */
  stack: string[];
  /** Concepts d’architecture (localisés). */
  concepts?: L<string[]>;
  pipeline: PipelineItem[];
  integrations: Integration[];
  links?: { demo?: string; repo?: string };
}

export interface SpecRow {
  label: L;
  value: L;
}

export interface InfraProject {
  id: string;
  name: L;
  tagline: L;
  description: L;
  status: ProjectStatus;
  /** Format 'AAAA-MM' */
  date?: string;
  /** Étiquette affichée à la place de la date, si elle est inconnue. */
  label?: L;
  stack: string[];
  specs?: SpecRow[];
  links?: { demo?: string; repo?: string };
}

export interface ArchiveProject {
  id: string;
  name: L;
  description: L;
  /** Format 'AAAA-MM' — laisse vide si inconnu. */
  date?: string;
  category: L;
  tags: L<string[]>;
  links?: { demo?: string; repo?: string };
}

/* -------------------------------------------------------------------------- */
/*  Plateformes principales                                                    */
/* -------------------------------------------------------------------------- */

export const featured: FeaturedProject[] = [
  {
    id: 'easytravel',
    name: 'EasyTravel',
    tagline: {
      fr: 'Réservation de transport de passagers, de la recherche du trajet au paiement.',
      en: 'Passenger transport booking, from route search to payment.',
    },
    description: {
      fr: 'Plateforme multi-tenant de réservation de tickets et de voyages, bâtie en microservices Go. Une passerelle GraphQL expose l’API au frontend React\u00a0; les services communiquent en gRPC et s’échangent des événements via Redpanda.',
      en: 'Multi-tenant platform for booking tickets and trips, built as Go microservices. A GraphQL gateway exposes the API to the React frontend; services talk over gRPC and exchange events through Redpanda.',
    },
    role: {
      fr: 'Conception, développement et maintenance',
      en: 'Design, development and maintenance',
    },
    highlights: {
      fr: [
        'Passerelle GraphQL devant des services Go qui communiquent en gRPC',
        'Authentification centralisée avec Keycloak',
        'Événements entre services via Redpanda',
        'Paiements intégrés avec Flutterwave',
        'Géocodage Komoot Photon adapté aux réseaux de transport camerounais',
      ],
      en: [
        'GraphQL gateway in front of Go services talking over gRPC',
        'Centralized authentication with Keycloak',
        'Events between services through Redpanda',
        'Payments integrated with Flutterwave',
        'Komoot Photon geocoding adapted to Cameroonian transport networks',
      ],
    },
    status: 'active',
    stack: ['Go', 'gRPC', 'GraphQL', 'GORM', 'PostgreSQL', 'Redis', 'Keycloak', 'Redpanda', 'React', 'TypeScript', 'Vite', 'Docker'],
    concepts: {
      fr: ['Multi-tenant', 'Microservices'],
      en: ['Multi-tenant', 'Microservices'],
    },
    pipeline: [
      { label: { fr: 'React + Vite', en: 'React + Vite' }, sub: { fr: 'interface', en: 'frontend' }, kind: 'client' },
      { label: { fr: 'Passerelle GraphQL', en: 'GraphQL gateway' }, sub: { fr: 'point d’entrée de l’API', en: 'API entry point' }, kind: 'gateway' },
      { label: { fr: 'Services Go + gRPC', en: 'Go services + gRPC' }, sub: { fr: 'un périmètre par service', en: 'one scope per service' }, kind: 'service' },
      { label: { fr: 'PostgreSQL + Redis', en: 'PostgreSQL + Redis' }, sub: { fr: 'données & cache', en: 'data & cache' }, kind: 'data' },
    ],
    integrations: [
      { label: 'Keycloak', role: { fr: 'authentification', en: 'authentication' } },
      { label: 'Redpanda', role: { fr: 'événements', en: 'events' } },
      { label: 'Flutterwave', role: { fr: 'paiements', en: 'payments' } },
      { label: 'Komoot Photon', role: { fr: 'géocodage', en: 'geocoding' } },
    ],
  },
  {
    id: 'skolix',
    name: 'Skolix',
    tagline: {
      fr: 'SaaS de gestion scolaire pour le primaire et le secondaire.',
      en: 'School management SaaS for primary and secondary schools.',
    },
    description: {
      fr: 'Application multi-tenant pensée pour les établissements d’enseignement primaire et secondaire du Cameroun. Microservices hexagonaux, principes SOLID et interfaces web multi-portails dédiées à chaque profil d’utilisateur.',
      en: 'Multi-tenant application designed for primary and secondary schools in Cameroon. Hexagonal microservices, SOLID principles and multi-portal web interfaces dedicated to each user profile.',
    },
    role: { fr: 'Conception et architecture', en: 'Design and architecture' },
    highlights: {
      fr: [
        'Multi-tenant\u00a0: une seule plateforme pour de nombreux établissements',
        'Microservices hexagonaux\u00a0: le domaine métier isolé des détails techniques',
        'Interfaces web multi-portails, dédiées à chaque profil d’utilisateur',
        'Conception guidée par les principes SOLID',
      ],
      en: [
        'Multi-tenant: one platform serving many schools',
        'Hexagonal microservices: business domain isolated from technical details',
        'Multi-portal web interfaces, dedicated to each user profile',
        'Design guided by SOLID principles',
      ],
    },
    status: 'building',
    stack: [],
    concepts: {
      fr: ['Architecture hexagonale', 'SOLID', 'Multi-tenant', 'Microservices', 'Multi-portails'],
      en: ['Hexagonal architecture', 'SOLID', 'Multi-tenant', 'Microservices', 'Multi-portal'],
    },
    pipeline: [
      { label: { fr: 'Portails web', en: 'Web portals' }, sub: { fr: 'un par profil d’utilisateur', en: 'one per user profile' }, kind: 'client' },
      { label: { fr: 'Microservices hexagonaux', en: 'Hexagonal microservices' }, sub: { fr: 'domaine · ports · adaptateurs', en: 'domain · ports · adapters' }, kind: 'service' },
      { label: { fr: 'Données multi-tenant', en: 'Multi-tenant data' }, sub: { fr: 'un espace par établissement', en: 'one space per school' }, kind: 'data' },
    ],
    integrations: [],
  },
  {
    id: 'afriwave',
    name: 'AfriWave',
    tagline: {
      fr: 'Streaming média pensé comme une expérience visuelle.',
      en: 'Media streaming designed as a visual experience.',
    },
    description: {
      fr: 'Application web de streaming adossée à des microservices qui résolvent des catalogues open-source. Authentification Keycloak, routage Nginx et exploration d’une interface 3D en WebGL.',
      en: 'Streaming web app backed by microservices that resolve open-source catalogs. Keycloak authentication, Nginx routing and an exploration of a WebGL 3D interface.',
    },
    role: { fr: 'Développement', en: 'Development' },
    highlights: {
      fr: [
        'Microservices de résolution de catalogues open-source',
        'Routage Nginx et authentification Keycloak',
        'Exploration d’une interface 3D en WebGL',
      ],
      en: [
        'Microservices that resolve open-source catalogs',
        'Nginx routing and Keycloak authentication',
        'Exploration of a WebGL 3D interface',
      ],
    },
    status: 'building',
    stack: ['WebGL', 'Keycloak', 'Nginx'],
    concepts: {
      fr: ['Microservices', 'UI 3D'],
      en: ['Microservices', '3D UI'],
    },
    pipeline: [
      { label: { fr: 'Interface web + WebGL', en: 'Web UI + WebGL' }, sub: { fr: 'concepts 3D', en: '3D concepts' }, kind: 'client' },
      { label: { fr: 'Nginx', en: 'Nginx' }, sub: { fr: 'routage', en: 'routing' }, kind: 'edge' },
      { label: { fr: 'Microservices de catalogue', en: 'Catalog microservices' }, sub: { fr: 'résolution de sources open-source', en: 'open-source source resolution' }, kind: 'service' },
    ],
    integrations: [{ label: 'Keycloak', role: { fr: 'authentification', en: 'authentication' } }],
  },
];

/* -------------------------------------------------------------------------- */
/*  Infra & laboratoire                                                        */
/* -------------------------------------------------------------------------- */

export const infra: InfraProject[] = [
  {
    id: 'homelab',
    name: { fr: 'Serveur domestique', en: 'Home server' },
    tagline: { fr: 'Un portable recyclé devenu serveur.', en: 'A recycled laptop turned server.' },
    description: {
      fr: 'Un Dell Latitude E5570 reconverti en serveur local sous Docker\u00a0: Portainer pour l’administration, Pi-hole pour le filtrage DNS, DuckDNS pour le DNS dynamique.',
      en: 'A Dell Latitude E5570 repurposed as a local Docker server: Portainer for administration, Pi-hole for DNS filtering, DuckDNS for dynamic DNS.',
    },
    status: 'done',
    date: '2026-07',
    stack: ['Docker', 'Portainer', 'Pi-hole', 'DuckDNS'],
    specs: [
      { label: { fr: 'Machine', en: 'Machine' }, value: { fr: 'Dell Latitude E5570 (recyclé)', en: 'Dell Latitude E5570 (recycled)' } },
      { label: { fr: 'Processeur', en: 'CPU' }, value: { fr: 'Intel Core i7-6820HQ', en: 'Intel Core i7-6820HQ' } },
      { label: { fr: 'Mémoire', en: 'Memory' }, value: { fr: '8 Go', en: '8 GB' } },
      { label: { fr: 'Stockage', en: 'Storage' }, value: { fr: '2 × SSD 238 Go', en: '2 × 238 GB SSD' } },
    ],
  },
  {
    id: 'udraw',
    name: { fr: 'Udraw', en: 'Udraw' },
    tagline: { fr: 'Déploiements Docker multi-conteneurs.', en: 'Multi-container Docker deployments.' },
    description: {
      fr: 'Gestion des déploiements Docker multi-conteneurs et des configurations de dépôts pour la suite d’applications Udraw.',
      en: 'Managing multi-container Docker deployments and repository configurations for the Udraw application suite.',
    },
    status: 'active',
    label: { fr: 'DevOps', en: 'DevOps' },
    stack: ['Docker', 'Docker Compose', 'Git'],
  },
];

/* -------------------------------------------------------------------------- */
/*  Autres réalisations (tableau)                                              */
/* -------------------------------------------------------------------------- */

export const archive: ArchiveProject[] = [
  {
    id: 'trainme',
    name: { fr: 'TrainMe', en: 'TrainMe' },
    description: {
      fr: 'Étude de marché et projet marketing menés en groupe (cours PPE 212, Université de Yaoundé 1).',
      en: 'Market study and marketing project carried out as a team (PPE 212 course, University of Yaoundé 1).',
    },
    date: '2026-09',
    category: { fr: 'Académique', en: 'Academic' },
    tags: { fr: ['Marketing', 'Étude de marché', 'Équipe'], en: ['Marketing', 'Market research', 'Team'] },
  },
  {
    id: 'gift',
    name: { fr: 'Cadeau interactif', en: 'Interactive gift' },
    description: {
      fr: 'Une application web interactive et une chanson personnalisée en français, créées pour l’anniversaire de ma sœur.',
      en: 'An interactive web app and a custom French song, created for my sister’s birthday.',
    },
    date: '2026-06',
    category: { fr: 'Création', en: 'Creative' },
    tags: { fr: ['Web', 'Création', 'Musique'], en: ['Web', 'Creative', 'Music'] },
  },
  {
    id: 'lan',
    name: { fr: 'Analyse LAN', en: 'LAN analytics' },
    description: {
      fr: 'Architecture microservices d’analyse de données issues d’un réseau local (cours INF 232 EC2).',
      en: 'Microservices architecture for analyzing local-network (LAN) data (INF 232 EC2 course).',
    },
    date: '2026-04',
    category: { fr: 'Académique', en: 'Academic' },
    tags: { fr: ['Microservices', 'Réseau', 'Données'], en: ['Microservices', 'Networking', 'Data'] },
  },
  {
    id: 'antivirus',
    name: { fr: 'Antivirus en C', en: 'Antivirus in C' },
    description: {
      fr: 'Application antivirus écrite en C, conçue avec trois camarades de classe.',
      en: 'An antivirus application written in C, built with three classmates.',
    },
    date: '2025-06',
    category: { fr: 'Équipe', en: 'Team' },
    tags: { fr: ['C', 'Sécurité', 'Équipe'], en: ['C', 'Security', 'Team'] },
  },
  {
    id: 'songo',
    name: { fr: 'Jeu du Songo', en: 'Songo game' },
    description: {
      fr: 'Version web du Songo, jeu de société traditionnel camerounais, avec mode multijoueur.',
      en: 'Web version of Songo, a traditional Cameroonian board game, with a multiplayer mode.',
    },
    category: { fr: 'Jeu web', en: 'Web game' },
    tags: { fr: ['Web', 'Multijoueur'], en: ['Web', 'Multiplayer'] },
  },
];
