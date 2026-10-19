import type { L } from './i18n';

export interface Tile {
  id: string;
  /** Étiquette façon chemin de fichier : ~/routine */
  path: string;
  title: L;
  text: L;
  size?: 'wide' | 'half';
}

export interface Exploration {
  id: string;
  title: L;
  text: L;
}

export const tiles: Tile[] = [
  {
    id: 'routine',
    path: '~/routine',
    title: { fr: 'Discipline', en: 'Discipline' },
    text: {
      fr: 'Sport tous les jours et un emploi du temps structuré entre cours, freelance et développement personnel. La régularité avant l’intensité.',
      en: 'Daily workouts and a structured schedule across classes, freelance and personal growth. Consistency over intensity.',
    },
    size: 'wide',
  },
  {
    id: 'design',
    path: '~/design',
    title: { fr: 'Design graphique', en: 'Graphic design' },
    text: {
      fr: 'Visuels et flyers promotionnels réalisés avec Affinity.',
      en: 'Visuals and promotional flyers made with Affinity.',
    },
  },
  {
    id: 'cuisine',
    path: '~/cuisine',
    title: { fr: 'Cuisine camerounaise', en: 'Cameroonian cooking' },
    text: {
      fr: 'Sauce tomate traditionnelle, banane malaxée aux arachides — et une vraie méthode de planification de repas d’étudiant avec des produits locaux.',
      en: 'Traditional tomato sauce, mashed plantain with groundnuts (banane malaxée) — and a practical student meal-planning method built on local ingredients.',
    },
  },
  {
    id: 'games',
    path: '~/jeux',
    title: { fr: 'Jeux vidéo', en: 'Video games' },
    text: {
      fr: 'FC 26 sur PS4\u00a0: je peaufine les réglages défensifs et les manettes. Et je ne peux pas m’empêcher de regarder sous le capot…',
      en: 'FC 26 on PS4: I fine-tune defensive settings and controllers. And I can’t help looking under the hood…',
    },
  },
  {
    id: 'anime',
    path: '~/anime',
    title: { fr: 'Anime', en: 'Anime' },
    text: {
      fr: 'Mon actu du moment\u00a0: The Eminence in Shadow.',
      en: 'Currently following: The Eminence in Shadow.',
    },
  },
  {
    id: 'linux',
    path: '~/linux',
    title: { fr: 'Linux & réseaux', en: 'Linux & networks' },
    text: {
      fr: 'Arch et Kali Linux, un serveur maison, Pi-hole… J’aime comprendre ce qui se passe sous le capot\u00a0: systèmes, réseaux, sécurité.',
      en: 'Arch and Kali Linux, a home server, Pi-hole… I like understanding what happens under the hood: systems, networks, security.',
    },
    size: 'half',
  },
  {
    id: 'languages',
    path: '~/langues',
    title: { fr: 'Langues', en: 'Languages' },
    text: {
      fr: 'Français au quotidien, anglais (je travaille les verbes irréguliers au prétérit) et espagnol, que je parle avec ma mère.',
      en: 'French day to day, English (I’m drilling irregular past-tense verbs) and Spanish, which I speak with my mother.',
    },
    size: 'half',
  },
];

export const exploring: Exploration[] = [
  {
    id: 'local-llm',
    title: { fr: 'LLM locaux', en: 'Local LLMs' },
    text: {
      fr: 'Avec LM Studio\u00a0: faire tourner des modèles sur du matériel local pour traiter du code d’entreprise sans transmission de données externes.',
      en: 'With LM Studio: running models on local hardware to process company code without sending data to third parties.',
    },
  },
  {
    id: 'engines',
    title: { fr: 'Moteurs de jeu', en: 'Game engines' },
    text: {
      fr: 'Algorithmes physiques en C++ et machines à états pour l’IA tactique, en décortiquant un jeu de simulation de football inspiré d’EA Sports FC\u00a026.',
      en: 'C++ physics algorithms and state machines for tactical AI, by dissecting a football simulation inspired by EA Sports FC 26.',
    },
  },
  {
    id: 'webgl',
    title: { fr: 'WebGL & UI 3D', en: 'WebGL & 3D UI' },
    text: {
      fr: 'Des interfaces immersives, d’abord pour AfriWave.',
      en: 'Immersive interfaces, starting with AfriWave.',
    },
  },
];
