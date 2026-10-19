export interface Profile {
  name: string;
  initials: string;
  city: string;
  /** Fuseau IANA — le Cameroun est en UTC+1 (WAT), toute l'année. */
  timeZone: string;
  coordinates: { lat: number; lon: number };
  /** Affiche la pastille « ouvert aux missions » dans le hero. */
  availableForWork: boolean;
  contact: {
    /** ex. 'toi@exemple.com' */
    email: string;
    /** Numéro au format international, sans « + » ni espaces. ex. '237600000000' */
    whatsapp: string;
    /** URL complète, ex. 'https://github.com/ton-pseudo' */
    github: string;
    /** URL complète, ex. 'https://www.linkedin.com/in/ton-profil' */
    linkedin: string;
  };
  /** Chemin d'un CV PDF placé dans /public, ex. '/cv-yvo-neguem.pdf'. Vide = bouton masqué. */
  cvUrl: string;
}

export const profile: Profile = {
  name: 'Yvo Vami Neguem',
  initials: 'YVN',
  city: 'Yaoundé',
  timeZone: 'Africa/Douala',
  coordinates: { lat: 3.848, lon: 11.502 },

  availableForWork: true,

  contact: {
    email: 'vami.n.sec@gmail.com',
    whatsapp: '+237690138467',
    github: 'https://github.com/Vami-N',
    linkedin: 'https://www.linkedin.com/in/vami-undefined-3a641a445/',
  },

  cvUrl: '/minerex.pdf',
};