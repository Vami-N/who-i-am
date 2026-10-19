import type { L } from './i18n';

/**
 * Textes de l’interface (FR / EN).
 * Astuce : entoure un mot de *astérisques* pour l’afficher en italique serif accentué.
 * En français, \u00a0 = espace insécable (avant « : », « ? », « ! »).
 */
export const ui = {
  meta: {
    title: {
      fr: 'Yvo Vami Neguem · Ingénieur logiciel full-stack',
      en: 'Yvo Vami Neguem · Full-stack software engineer',
    },
    description: {
      fr: 'Yvo Vami Neguem, ingénieur logiciel full-stack à Yaoundé (Cameroun). Plateformes en microservices — Go, React, TypeScript, GraphQL — : EasyTravel, Skolix, AfriWave.',
      en: 'Yvo Vami Neguem, full-stack software engineer based in Yaoundé, Cameroon. Microservice platforms built with Go, React, TypeScript and GraphQL: EasyTravel, Skolix, AfriWave.',
    },
  } satisfies Record<string, L>,

  a11y: {
    skip: { fr: 'Aller au contenu', en: 'Skip to content' },
    home: { fr: 'Yvo Neguem — retour en haut de page', en: 'Yvo Neguem — back to top' },
    lang: { fr: 'Langue', en: 'Language' },
    toLight: { fr: 'Passer en mode clair', en: 'Switch to light mode' },
    toDark: { fr: 'Passer en mode sombre', en: 'Switch to dark mode' },
    openMenu: { fr: 'Ouvrir le menu', en: 'Open menu' },
    closeMenu: { fr: 'Fermer le menu', en: 'Close menu' },
    mainNav: { fr: 'Navigation principale', en: 'Main navigation' },
    external: { fr: '(s’ouvre dans un nouvel onglet)', en: '(opens in a new tab)' },
  },

  nav: {
    profile: { fr: 'Profil', en: 'About' },
    projects: { fr: 'Projets', en: 'Projects' },
    stack: { fr: 'Stack', en: 'Stack' },
    journey: { fr: 'Parcours', en: 'Journey' },
    beyond: { fr: 'Hors code', en: 'Beyond code' },
    contact: { fr: 'Contact', en: 'Contact' },
    cta: { fr: 'Me contacter', en: 'Get in touch' },
  },

  hero: {
    available: { fr: 'Ouvert aux missions freelance', en: 'Open to freelance work' },
    country: { fr: 'Cameroun', en: 'Cameroon' },
    role: { fr: 'Ingénieur logiciel full-stack', en: 'Full-stack software engineer' },
    tagline: {
      fr: 'Je conçois des plateformes en *microservices* pour le terrain camerounais\u00a0: transport, éducation, médias.',
      en: 'I design *microservice* platforms for real-world Cameroon: transport, education, media.',
    },
    lead: {
      fr: 'Étudiant en Licence 3 d’informatique à l’Université de Yaoundé 1 et développeur freelance (≈\u00a030\u00a0h par semaine). Services découplés, contrats d’API stricts, événements, infrastructure conteneurisée.',
      en: 'Third-year computer science student at the University of Yaoundé 1 and freelance developer (≈\u00a030\u00a0h a week). Decoupled services, strict API contracts, events, containerized infrastructure.',
    },
    ctaProjects: { fr: 'Voir les projets', en: 'See the projects' },
    ctaContact: { fr: 'Me contacter', en: 'Get in touch' },
    ctaCv: { fr: 'Télécharger le CV', en: 'Download CV' },
    stats: {
      freelance: { fr: 'de freelance par semaine, en plus des cours', en: 'of freelance work a week, on top of classes' },
      platforms: { fr: 'plateformes en développement ou en maintenance', en: 'platforms in development or maintenance' },
      core: { fr: 'technologies dans la stack centrale', en: 'technologies in the core stack' },
      languages: { fr: 'langues : français, anglais, espagnol', en: 'languages: French, English, Spanish' },
    },
  },

  diagram: {
    eyebrow: { fr: 'Architecture de référence', en: 'Reference architecture' },
    note: { fr: 'Schéma simplifié, à titre illustratif', en: 'Simplified, illustrative diagram' },
    hint: { fr: 'Survole (ou sélectionne) un composant pour voir son rôle.', en: 'Hover (or focus) a component to see its role.' },
    hintTouch: { fr: 'Touche un composant pour voir son rôle.', en: 'Tap a component to see its role.' },
    label: {
      fr: 'Schéma de l’architecture : un client React derrière Nginx et une passerelle GraphQL, deux microservices Go qui communiquent par un bus Redpanda, PostgreSQL, Redis et Keycloak, le tout dans Docker Compose.',
      en: 'Architecture diagram: a React client behind Nginx and a GraphQL gateway, two Go microservices talking through a Redpanda bus, PostgreSQL, Redis and Keycloak, all inside Docker Compose.',
    },
    scenarios: { fr: 'Scénarios', en: 'Scenarios' },
    stepsLabel: { fr: 'Étapes du scénario', en: 'Scenario steps' },
    step: { fr: 'étape', en: 'step' },
    boundary: { fr: 'docker compose', en: 'docker compose' },
  },

  about: {
    index: '01',
    title: {
      fr: 'Entre l’amphi et la *production*.',
      en: 'Between the lecture hall and *production*.',
    },
    p1: {
      fr: 'Je suis étudiant en Licence 3 d’informatique à l’Université de Yaoundé 1 et ingénieur logiciel full-stack. En parallèle de mes cours, je consacre environ 30\u00a0heures par semaine à des projets logiciels pour des clients, en freelance.',
      en: 'I’m a third-year computer science student at the University of Yaoundé 1 and a full-stack software engineer. Alongside my classes, I spend about 30 hours a week on freelance software projects for clients.',
    },
    p2: {
      fr: 'Mon terrain\u00a0: les systèmes distribués. Je pars du contrat d’API, je découpe en services autonomes, je fais circuler les événements et je conteneurise le tout. Mes plateformes répondent à des contraintes bien réelles\u00a0: paiements locaux, géocodage des réseaux de transport camerounais, gestion multi-établissements.',
      en: 'My ground: distributed systems. I start from the API contract, split the system into autonomous services, let events flow between them and containerize everything. My platforms deal with very real constraints: local payments, geocoding for Cameroonian transport networks, multi-school management.',
    },
    principlesTitle: { fr: 'Principes d’ingénierie', en: 'Engineering principles' },
    principles: [
      {
        title: { fr: 'Services découplés', en: 'Decoupled services' },
        text: {
          fr: 'Architecture hexagonale et principes SOLID\u00a0: chaque service possède son périmètre et peut évoluer sans casser les autres.',
          en: 'Hexagonal architecture and SOLID principles: each service owns its scope and can evolve without breaking the others.',
        },
      },
      {
        title: { fr: 'Contrats d’API stricts', en: 'Strict API contracts' },
        text: {
          fr: 'gRPC et Protocol Buffers entre les services, GraphQL vers les clients. Le contrat d’abord, l’implémentation ensuite.',
          en: 'gRPC and Protocol Buffers between services, GraphQL toward clients. Contract first, implementation second.',
        },
      },
      {
        title: { fr: 'Événements d’abord', en: 'Events first' },
        text: {
          fr: 'Redpanda pour la messagerie orientée événements\u00a0: les services réagissent aux faits plutôt que de s’appeler en cascade.',
          en: 'Redpanda for event-driven messaging: services react to facts instead of calling each other in cascades.',
        },
      },
      {
        title: { fr: 'Infra conteneurisée', en: 'Containerized infra' },
        text: {
          fr: 'Docker et Docker Compose, Nginx en frontal\u00a0: des environnements reproductibles, de ma machine au serveur.',
          en: 'Docker and Docker Compose, Nginx up front: reproducible environments, from my machine to the server.',
        },
      },
    ],
    ai: {
      eyebrow: { fr: 'Méthode de travail', en: 'Working method' },
      title: { fr: 'L’IA, *sous contrôle*.', en: 'AI, *kept on a leash*.' },
      text: {
        fr: 'J’utilise Cursor, Windsurf, Trae AI et OpenCode avec des règles personnalisées\u00a0: avant chaque modification, l’assistant doit analyser l’architecture globale du système. L’objectif\u00a0: aller plus vite sans introduire de régressions.',
        en: 'I use Cursor, Windsurf, Trae AI and OpenCode with custom rules: before every change, the assistant has to analyze the system’s overall architecture. The goal: move faster without introducing regressions.',
      },
      steps: [
        { fr: 'Règles personnalisées', en: 'Custom rules' },
        { fr: 'Analyse de l’architecture globale', en: 'Whole-system architecture analysis' },
        { fr: 'Modification, sans régression', en: 'Change, with no regressions' },
      ],
    },
    sheet: {
      title: { fr: 'Fiche technique', en: 'Spec sheet' },
      location: { fr: 'Localisation', en: 'Location' },
      locationValue: { fr: 'Yaoundé, Cameroun (UTC+1)', en: 'Yaoundé, Cameroon (UTC+1)' },
      studies: { fr: 'Études', en: 'Studies' },
      studiesValue: {
        fr: 'Licence 3 en informatique, Université de Yaoundé 1 (2026–2027)',
        en: 'Licence 3 (Bachelor, year 3) in Computer Science, University of Yaoundé 1 (2026–2027)',
      },
      training: { fr: 'Formation', en: 'Training' },
      trainingValue: { fr: 'Web@cademie, EPITECH Cameroun', en: 'Web@cademie, EPITECH Cameroon' },
      activity: { fr: 'Activité', en: 'Activity' },
      activityValue: {
        fr: 'Ingénieur full-stack, freelance ≈\u00a030\u00a0h/semaine',
        en: 'Full-stack engineer, freelance ≈\u00a030\u00a0h/week',
      },
      languages: { fr: 'Langues', en: 'Languages' },
      languagesValue: { fr: 'Français, English, Español', en: 'French, English, Spanish' },
      env: { fr: 'Environnement', en: 'Environment' },
      envValue: {
        fr: 'Windows + PowerShell, Linux (Arch, Kali), Docker, Git, pnpm, VS Code',
        en: 'Windows + PowerShell, Linux (Arch, Kali), Docker, Git, pnpm, VS Code',
      },
    },
    portraitAlt: { fr: 'Portrait de Yvo Vami Neguem', en: 'Portrait of Yvo Vami Neguem' },
  },

  projects: {
    index: '02',
    title: { fr: 'Plateformes, infra, *expériences*.', en: 'Platforms, infra, *experiments*.' },
    lead: {
      fr: 'Trois plateformes au cœur de mon activité, puis l’infrastructure et des projets plus courts.',
      en: 'Three platforms at the core of my work, then infrastructure and shorter projects.',
    },
    role: { fr: 'Mon rôle', en: 'My role' },
    architecture: { fr: 'Architecture (schéma simplifié)', en: 'Architecture (simplified)' },
    integrations: { fr: 'Intégrations', en: 'Integrations' },
    infraTitle: { fr: 'Infra & laboratoire', en: 'Infra & lab' },
    archiveTitle: { fr: 'Autres réalisations', en: 'More work' },
    status: {
      active: { fr: 'En cours', en: 'Ongoing' },
      building: { fr: 'En construction', en: 'In the works' },
      done: { fr: 'Réalisé', en: 'Shipped' },
    },
    seeCode: { fr: 'Code', en: 'Code' },
    seeDemo: { fr: 'Démo', en: 'Demo' },
    spec: {
      title: { fr: 'Fiche du serveur', en: 'Server sheet' },
    },
  },

  stack: {
    index: '03',
    title: { fr: 'Une stack *pragmatique*, couche par couche.', en: 'A *pragmatic* stack, layer by layer.' },
    lead: {
      fr: 'Chaque outil a une raison d’être. Je choisis la robustesse et la maintenabilité avant l’effet de mode.',
      en: 'Every tool earns its place. I pick robustness and maintainability over trends.',
    },
    legendLabel: { fr: 'Légende', en: 'Legend' },
    legend: {
      core: { fr: 'Stack centrale', en: 'Core stack' },
      regular: { fr: 'Dans ma boîte à outils', en: 'In my toolbox' },
      explore: { fr: 'En exploration', en: 'Exploring' },
    },
  },

  journey: {
    index: '04',
    title: { fr: 'Parcours & *jalons*.', en: 'Journey & *milestones*.' },
    lead: {
      fr: 'Études, freelance et projets : tout avance en parallèle, avec un planning structuré.',
      en: 'Studies, freelance and side projects: everything moves in parallel, on a structured schedule.',
    },
    experience: { fr: 'Expérience', en: 'Experience' },
    education: { fr: 'Formation', en: 'Education' },
    milestones: { fr: 'Jalons', en: 'Milestones' },
    now: { fr: 'Aujourd’hui', en: 'Now' },
  },

  beyond: {
    index: '05',
    title: { fr: 'Ce qui nourrit le *code*.', en: 'What feeds the *code*.' },
    lead: {
      fr: 'Un emploi du temps tenu, de la curiosité et quelques passions qui n’ont rien à voir avec un terminal.',
      en: 'A schedule that holds, curiosity, and a few passions that have nothing to do with a terminal.',
    },
    exploring: { fr: 'En ce moment, j’explore', en: 'Currently exploring' },
  },

  contact: {
    index: '06',
    title: { fr: 'Un projet à *construire*\u202f?', en: 'Something to *build*?' },
    text: {
      fr: 'Parlons architecture, périmètre et délais. Je réponds directement, sans détour.',
      en: 'Let’s talk architecture, scope and timelines. I reply directly, no fluff.',
    },
    email: { fr: 'Écrire un e-mail', en: 'Send an email' },
    whatsapp: { fr: 'WhatsApp', en: 'WhatsApp' },
    github: { fr: 'GitHub', en: 'GitHub' },
    linkedin: { fr: 'LinkedIn', en: 'LinkedIn' },
    copy: { fr: 'Copier l’adresse', en: 'Copy address' },
    copied: { fr: 'Copié\u202f!', en: 'Copied!' },
    emailSubject: { fr: 'Projet — prise de contact', en: 'Project inquiry' },
    emailBody: {
      fr: 'Bonjour Yvo,\n\nJe vous écris à propos d’un projet…',
      en: 'Hi Yvo,\n\nI’m reaching out about a project…',
    },
    whatsappText: { fr: 'Bonjour Yvo, je vous contacte à propos d’un projet.', en: 'Hi Yvo, I’m reaching out about a project.' },
    timezone: { fr: 'Fuseau horaire', en: 'Time zone' },
    timezoneValue: { fr: 'WAT (UTC+1)', en: 'WAT (UTC+1)' },
    languages: { fr: 'Langues de travail', en: 'Working languages' },
    languagesValue: { fr: 'Français, English', en: 'French, English' },
    empty: {
      fr: 'Les coordonnées arrivent très bientôt.',
      en: 'Contact details are coming very soon.',
    },
    devHint: {
      fr: 'Mode dev — complète `contact` dans src/data/profile.ts pour afficher e-mail, WhatsApp, GitHub et LinkedIn ici.',
      en: 'Dev mode — fill in `contact` in src/data/profile.ts to show email, WhatsApp, GitHub and LinkedIn here.',
    },
  },

  footer: {
    built: {
      fr: 'Conçu et codé à Yaoundé avec React, TypeScript et Vite — déployé sur Vercel.',
      en: 'Designed and coded in Yaoundé with React, TypeScript and Vite — deployed on Vercel.',
    },
    top: { fr: 'Haut de page', en: 'Back to top' },
  },
};
