import react from '@vitejs/plugin-react';
import { defineConfig, type Plugin } from 'vite';
import { profile } from './src/data/profile.ts';

/**
 * URL publique du site, utilisée pour les balises canoniques, Open Graph,
 * le sitemap et les données structurées.
 *  1. VITE_SITE_URL (à définir sur Vercel si tu as un domaine personnalisé)
 *  2. VERCEL_PROJECT_PRODUCTION_URL (fournie automatiquement par Vercel)
 *  3. localhost, en local
 */
function resolveSiteUrl(): string {
  const explicit = process.env.VITE_SITE_URL?.trim();
  const vercel = process.env.VERCEL_PROJECT_PRODUCTION_URL?.trim();
  const url = explicit || (vercel ? `https://${vercel}` : 'http://localhost:5173');
  return url.replace(/\/+$/, '');
}

function siteMeta(): Plugin {
  const siteUrl = resolveSiteUrl();
  const sameAs = [profile.contact.github, profile.contact.linkedin].map((value) => value.trim()).filter(Boolean);

  const jsonLd = JSON.stringify(
    {
      '@context': 'https://schema.org',
      '@type': 'Person',
      name: profile.name,
      url: `${siteUrl}/`,
      image: `${siteUrl}/og.png`,
      jobTitle: 'Ingénieur logiciel full-stack',
      description:
        'Ingénieur logiciel full-stack et développeur freelance. Plateformes en microservices (Go, React, TypeScript, GraphQL, Keycloak, Redpanda).',
      address: { '@type': 'PostalAddress', addressLocality: profile.city, addressCountry: 'CM' },
      knowsAbout: ['Microservices', 'Go', 'React', 'TypeScript', 'GraphQL', 'gRPC', 'Docker', 'PostgreSQL', 'Keycloak', 'Redpanda'],
      knowsLanguage: ['fr', 'en', 'es'],
      ...(sameAs.length > 0 ? { sameAs } : {}),
    },
    null,
    2,
  );

  const hasContact = Object.values(profile.contact).some((value) => value.trim() !== '');

  return {
    name: 'portfolio:site-meta',

    buildStart() {
      if (!hasContact) {
        this.warn(
          '[portfolio] Aucun moyen de contact configuré : complète `contact` dans src/data/profile.ts (e-mail, WhatsApp, GitHub, LinkedIn).',
        );
      }
      if (!process.env.VITE_SITE_URL && !process.env.VERCEL_PROJECT_PRODUCTION_URL) {
        this.info(`[portfolio] URL du site : ${siteUrl} (définis VITE_SITE_URL pour un domaine personnalisé).`);
      }
    },

    transformIndexHtml: {
      order: 'pre',
      handler(html) {
        return html.replaceAll('__SITE_URL__', siteUrl).replace('__JSON_LD__', jsonLd);
      },
    },

    generateBundle() {
      this.emitFile({
        type: 'asset',
        fileName: 'robots.txt',
        source: `User-agent: *\nAllow: /\n\nSitemap: ${siteUrl}/sitemap.xml\n`,
      });
      this.emitFile({
        type: 'asset',
        fileName: 'sitemap.xml',
        source: `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n  <url>\n    <loc>${siteUrl}/</loc>\n    <lastmod>${new Date().toISOString().slice(0, 10)}</lastmod>\n    <changefreq>monthly</changefreq>\n    <priority>1.0</priority>\n  </url>\n</urlset>\n`,
      });
    },
  };
}

export default defineConfig({
  plugins: [react(), siteMeta()],
  server: { host: true },
  preview: { host: true },
});
