import react from '@vitejs/plugin-react';
import { defineConfig, type Plugin } from 'vite';
import type { Lang } from './src/data/i18n.ts';
import { profile } from './src/data/profile.ts';
import { ui } from './src/data/ui.ts';

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

function escapeAttribute(value: string): string {
  return value.replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll('<', '&lt;');
}

function replaceMetaContent(html: string, key: string, value: string): string {
  return html.replace(/<meta\b[^>]*>/g, (tag) =>
    tag.includes(key) ? tag.replace(/content="[^"]*"/, `content="${escapeAttribute(value)}"`) : tag,
  );
}

function siteMeta(): Plugin {
  const siteUrl = resolveSiteUrl();
  const sameAs = [profile.contact.github, profile.contact.linkedin].map((value) => value.trim()).filter(Boolean);

  const jsonLdFor = (lang: Lang) =>
    JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'Person',
      name: profile.name,
      url: `${siteUrl}${lang === 'en' ? '/en/' : '/'}`,
      image: `${siteUrl}/og.png`,
      jobTitle: lang === 'fr' ? 'Ingénieur logiciel full-stack' : 'Full-stack software engineer',
      description: ui.meta.description[lang],
      address: { '@type': 'PostalAddress', addressLocality: profile.city, addressCountry: 'CM' },
      knowsAbout: ['Microservices', 'Go', 'React', 'TypeScript', 'GraphQL', 'gRPC', 'Docker', 'PostgreSQL', 'Keycloak', 'Redpanda'],
      knowsLanguage: ['fr', 'en', 'es'],
      ...(sameAs.length > 0 ? { sameAs } : {}),
    }, null, 2);

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
        return html.replaceAll('__SITE_URL__', siteUrl).replace('__JSON_LD__', jsonLdFor('fr'));
      },
    },

    generateBundle: {
      order: 'post',
      handler(_, bundle) {
        const index = bundle['index.html'];
        if (!index || index.type !== 'asset' || typeof index.source !== 'string') {
          this.error('Impossible de générer la page anglaise : index.html est absent du bundle.');
        }

        let englishHtml = index.source
          .replace('<html lang="fr"', '<html lang="en"')
          .replace(/<title>[\s\S]*?<\/title>/, `<title>${ui.meta.title.en}</title>`)
          .replace(/<link rel="canonical" href="[^"]*"/, `<link rel="canonical" href="${siteUrl}/en/"`)
          .replace(/<meta property="og:url" content="[^"]*"/, `<meta property="og:url" content="${siteUrl}/en/"`)
          .replace(
            /<script type="application\/ld\+json">[\s\S]*?<\/script>/,
            `<script type="application/ld+json">\n      ${jsonLdFor('en')}\n    </script>`,
          );
        englishHtml = replaceMetaContent(englishHtml, 'name="description"', ui.meta.description.en);
        englishHtml = replaceMetaContent(englishHtml, 'property="og:title"', ui.meta.title.en);
        englishHtml = replaceMetaContent(englishHtml, 'property="og:description"', ui.meta.description.en);
        englishHtml = replaceMetaContent(englishHtml, 'property="og:locale"', 'en_US');
        englishHtml = replaceMetaContent(englishHtml, 'property="og:locale:alternate"', 'fr_FR');
        this.emitFile({ type: 'asset', fileName: 'en/index.html', source: englishHtml });

        this.emitFile({
          type: 'asset',
          fileName: 'robots.txt',
          source: `User-agent: *\nAllow: /\n\nSitemap: ${siteUrl}/sitemap.xml\n`,
        });
        this.emitFile({
          type: 'asset',
          fileName: 'sitemap.xml',
          source: `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n  <url>\n    <loc>${siteUrl}/</loc>\n    <lastmod>${new Date().toISOString().slice(0, 10)}</lastmod>\n    <changefreq>monthly</changefreq>\n    <priority>1.0</priority>\n  </url>\n  <url>\n    <loc>${siteUrl}/en/</loc>\n    <lastmod>${new Date().toISOString().slice(0, 10)}</lastmod>\n    <changefreq>monthly</changefreq>\n    <priority>1.0</priority>\n  </url>\n</urlset>\n`,
        });
      },
    },
  };
}

export default defineConfig({
  plugins: [react(), siteMeta()],
  server: { host: true },
  preview: { host: true },
});
