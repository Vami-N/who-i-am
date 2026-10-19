# Portfolio · Yvo Vami Neguem

Portfolio bilingue (FR / EN) d’ingénieur logiciel full-stack, construit avec **ta propre stack** :
**Vite + React 19 + TypeScript**, installé avec **pnpm**, déployable sur **Vercel** sans configuration.

- Schéma d’architecture interactif et animé (Nginx → passerelle GraphQL → services Go → Redpanda…) avec 3 scénarios
- Mode sombre / clair (suit le système, mémorisé), français / anglais (`?lang=en`, mémorisé)
- Horloge locale de Yaoundé (utile pour caler une réunion avec un client à l’étranger)
- SEO : balises Open Graph, image de partage, JSON-LD `Person`, sitemap, robots.txt
- Accessible (axe-core : 0 violation en sombre/clair, FR/EN, bureau/mobile), clavier, `prefers-reduced-motion`
- Aucune dépendance runtime hors React · polices auto-hébergées · ~91 Ko de JS gzippé

---

## ✅ À faire avant de déployer (≈ 3 min)

1. **`src/data/profile.ts`** — renseigne tes contacts (un champ vide = bouton masqué) :
   ```ts
   contact: {
     email: 'toi@exemple.com',
     whatsapp: '237600000000',                       // format international, sans « + »
     github: 'https://github.com/ton-pseudo',
     linkedin: 'https://www.linkedin.com/in/ton-profil',
   },
   availableForWork: true,   // false = masque la pastille « Ouvert aux missions »
   cvUrl: '/cv-yvo-neguem.pdf', // optionnel : dépose le PDF dans /public
   ```
   > Tant que `contact` est vide, la section Contact affiche « Les coordonnées arrivent très bientôt ».
2. **Ta photo (optionnel)** — dépose `src/assets/portrait.jpg` (ou `.png`, `.webp`, `.avif`) : elle remplace automatiquement le monogramme du « Y » dans la section Profil. Aucun code à toucher.
3. **Relis les textes** dans `src/data/` — voir « Points à valider » plus bas.

---

## Lancer en local (PowerShell)

```powershell
cd yvo-portfolio
pnpm install
pnpm dev            # http://localhost:5173
pnpm build          # vérifie les types (tsc) puis construit dans dist/
pnpm preview        # sert le build de production sur http://localhost:4173
```

`packageManager` fixe pnpm 10 : si ton pnpm est plus récent, il bascule tout seul sur la bonne version. Node 22 recommandé.

---

## Déployer sur Vercel

### Option A — via GitHub (recommandé : chaque `git push` redéploie)

```powershell
git init
git add .
git commit -m "feat: portfolio"
git branch -M main
git remote add origin https://github.com/<ton-pseudo>/<ton-repo>.git
git push -u origin main
```

Puis sur [vercel.com/new](https://vercel.com/new) → **Import** du dépôt → **Deploy**.
Vercel détecte Vite et pnpm tout seul (script `build` du `package.json`, dossier de sortie `dist/`, lockfile `pnpm-lock.yaml`). **N’ajoute pas d’« Install Command » personnalisée** : Vercel utiliserait alors un très vieux pnpm incapable de lire le lockfile.

### Option B — Vercel CLI

```powershell
pnpm dlx vercel@latest          # déploiement de prévisualisation
pnpm dlx vercel@latest --prod   # production
```

### Domaine personnalisé

Ajoute ton domaine dans *Project → Settings → Domains*, puis définis la variable d’environnement
`VITE_SITE_URL=https://ton-domaine.com` (voir `.env.example`) et redéploie : elle alimente l’URL canonique,
l’image de partage, le sitemap et le JSON-LD. Sans domaine, l’URL `*.vercel.app` est utilisée automatiquement.

---

## Où modifier quoi

| Je veux changer…                                  | Fichier                          |
| ------------------------------------------------- | -------------------------------- |
| Contacts, disponibilité, CV, fuseau horaire       | `src/data/profile.ts`            |
| Textes de l’interface (hero, titres, fiche…)      | `src/data/ui.ts`                 |
| Projets (plateformes, infra, tableau des autres)  | `src/data/projects.ts`           |
| Stack par couches + bandeau défilant              | `src/data/stack.ts`              |
| Expérience, formation, jalons                     | `src/data/journey.ts`            |
| Section « Hors code » (cuisine, jeux, langues…)   | `src/data/beyond.ts`             |
| Schéma d’architecture (nœuds, flux, scénarios)    | `src/data/architecture.ts`       |
| Couleurs, polices, espacements                    | `src/styles/tokens.css`          |

Chaque texte est un couple `{ fr: '…', en: '…' }` ; TypeScript refuse un oubli de traduction.
Entoure un mot de `*astérisques*` pour l’afficher en italique serif accentué. Pour ajouter un projet, copie une entrée du tableau `archive` (ou `featured`).
Ajoute `links: { demo: 'https://…', repo: 'https://…' }` à un projet pour afficher ses boutons.

## Régénérer l’image de partage et les icônes

`public/og.png` (1200×630), `favicon-32.png`, `apple-touch-icon.png`, `icon-192/512.png` sont générés par
`scripts/generate-brand.mjs` à partir du schéma et du logo (nécessite Playwright, ponctuel — voir l’en-tête du script).

## Qualité mesurée (build de production)

Lighthouse — performance **96–98** (mobile simulé, 4G lente) / **100** (bureau), accessibilité **100**, bonnes pratiques **100**, SEO **100**, CLS 0.

---

## Points à valider (déduits de tes informations)

- **Niveau d’études** : *Licence 3 (2026–2027)* d’après ta synthèse la plus récente ; *Licence 2 (2025–2026)* est déduit.
- **« Ouvert aux missions freelance »** : à retirer (`availableForWork: false`) si ce n’est pas le cas.
- **Schéma d’architecture** : illustratif, les services s’appellent « Service A / B » ; adapte `architecture.ts` si tu veux refléter tes vrais services.
- **Skolix et AfriWave** : seules les technologies que tu as citées sont listées (pas de langage supposé).
- **Volontairement laissés de côté** (sphère privée / sans intérêt pour un recruteur) : âge, prénoms de ta famille, horaires de la salle de sport, analyses « angles morts » et revenus, recherche TikTok « faceless ». Le cadeau pour ta sœur est mentionné sans prénom.

## Licences

Code : à toi. Polices (Bricolage Grotesque, Instrument Sans, Instrument Serif, JetBrains Mono) sous licence OFL — textes dans `public/fonts/`.
