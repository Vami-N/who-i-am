import type { L } from './i18n';

export interface JourneyEntry {
  id: string;
  title: L;
  org?: L;
  period?: L;
  text?: L;
  current?: boolean;
}

export interface Milestone {
  id: string;
  /** Format 'AAAA-MM' */
  date: string;
  title: L;
}

export const experience: JourneyEntry[] = [
  {
    id: 'freelance',
    title: { fr: 'Ingénieur logiciel full-stack, freelance', en: 'Full-stack software engineer, freelance' },
    org: { fr: 'En ligne, ≈\u00a030\u00a0h par semaine', en: 'Remote, ≈\u00a030\u00a0h a week' },
    period: { fr: 'En cours', en: 'Ongoing' },
    text: {
      fr: 'Missions de développement pour des clients\u00a0: backends Go, interfaces React et TypeScript, conteneurisation Docker. Menées en parallèle de la Licence\u00a03.',
      en: 'Development work for clients: Go backends, React and TypeScript interfaces, Docker containerization. Done alongside the third year of my degree.',
    },
    current: true,
  },
  {
    id: 'platforms',
    title: { fr: 'Plateformes en microservices', en: 'Microservice platforms' },
    org: { fr: 'EasyTravel, Skolix, AfriWave, Udraw', en: 'EasyTravel, Skolix, AfriWave, Udraw' },
    period: { fr: 'En cours', en: 'Ongoing' },
    text: {
      fr: 'Conception, développement, déploiement et maintenance de plateformes full-stack pour le transport, l’éducation et les médias.',
      en: 'Design, development, deployment and maintenance of full-stack platforms for transport, education and media.',
    },
    current: true,
  },
];

export const education: JourneyEntry[] = [
  {
    id: 'l3',
    title: { fr: 'Licence 3 en informatique', en: 'Licence 3 (Bachelor, year 3) in Computer Science' },
    org: { fr: 'Université de Yaoundé 1', en: 'University of Yaoundé 1' },
    period: { fr: '2026 – 2027', en: '2026 – 2027' },
    current: true,
  },
  {
    id: 'l2',
    title: { fr: 'Licence 2 en informatique', en: 'Licence 2 (Bachelor, year 2) in Computer Science' },
    org: { fr: 'Université de Yaoundé 1', en: 'University of Yaoundé 1' },
    period: { fr: '2025 – 2026', en: '2025 – 2026' },
  },
  {
    id: 'webacademie',
    title: { fr: 'Web@cademie', en: 'Web@cademie' },
    org: { fr: 'EPITECH Cameroun', en: 'EPITECH Cameroon' },
    text: {
      fr: 'Programme de formation au développement web.',
      en: 'Web development training programme.',
    },
  },
];

/** Du plus récent au plus ancien. */
export const milestones: Milestone[] = [
  { id: 'trainme', date: '2026-09', title: { fr: 'TrainMe (étude de marché) et rentrée en L3', en: 'TrainMe market study and start of L3' } },
  { id: 'homelab', date: '2026-07', title: { fr: 'Serveur domestique sous Docker', en: 'Home server on Docker' } },
  { id: 'gift', date: '2026-06', title: { fr: 'Cadeau interactif : web app + chanson', en: 'Interactive gift: web app + song' } },
  { id: 'lan', date: '2026-04', title: { fr: 'Analyse LAN en microservices', en: 'LAN analytics in microservices' } },
  { id: 'antivirus', date: '2025-06', title: { fr: 'Antivirus en C, en équipe', en: 'Antivirus in C, as a team' } },
];
