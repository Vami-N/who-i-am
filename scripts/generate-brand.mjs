/**
 * Régénère les visuels de marque : og.png (aperçu de partage 1200×630) et les
 * icônes PNG (favicon-32, apple-touch-icon, icon-192, icon-512) dans /public.
 *
 * Outil ponctuel, pas nécessaire au build Vercel. Il utilise Playwright :
 *   pnpm dlx playwright install chromium     (une seule fois)
 *   pnpm add -D playwright                   (à retirer ensuite si tu veux)
 *   node scripts/generate-brand.mjs
 *
 * Les polices viennent de /public/fonts et la géométrie du schéma de
 * src/data/architecture.ts (Node ≥ 22.18 lit le TypeScript « effaçable »).
 */
import { mkdtemp, writeFile } from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const { chromium } = await import(process.env.PLAYWRIGHT_MODULE ?? 'playwright');
const { nodes, edges, boundary, VIEW } = await import('../src/data/architecture.ts');
const { profile } = await import('../src/data/profile.ts');

const C = { bg: '#080c0a', ink: '#eaf1ed', dim: '#a6b5ad', faint: '#74857c', green: '#1fb67f', red: '#e5283b', yellow: '#fcd116', blue: '#7db0ff', card: '#131c17' };
const KIND = { client: C.dim, edge: C.yellow, gateway: C.yellow, service: C.green, bus: C.red, data: C.blue, identity: C.dim, external: C.dim };

/* ---------- Le « Y » (même dessin que <LogoMark />) ---------- */
const logoSvg = (size, { bg = C.bg, ink = C.ink, tile = false, square = false, pad = 0 } = {}) => `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="${size}" height="${size}">
  ${tile ? `<rect width="64" height="64" rx="${square ? 0 : 15}" fill="#0b120e"/>` : ''}
  <g transform="translate(${32 - 32 * (1 - pad)} ${32 - 32 * (1 - pad)}) scale(${1 - pad})">
    <g fill="none" stroke="${ink}" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M16 15 32 33 48 15"/><path d="M32 33v18"/>
    </g>
    <g stroke="${bg}" stroke-width="3">
      <circle cx="16" cy="15" r="6.3" fill="${C.green}"/>
      <circle cx="48" cy="15" r="6.3" fill="${C.yellow}"/>
      <circle cx="32" cy="33" r="5.3" fill="${C.red}"/>
      <circle cx="32" cy="51" r="6.3" fill="${ink}"/>
    </g>
  </g>
</svg>`;

/* ---------- Schéma d'architecture, version statique ---------- */
const roundedPath = (pts, r = 12) => {
  let d = `M ${pts[0][0]} ${pts[0][1]}`;
  for (let i = 1; i < pts.length; i++) {
    const p = pts[i], prev = pts[i - 1], next = pts[i + 1];
    if (!next) { d += ` L ${p[0]} ${p[1]}`; continue; }
    const v1 = [p[0] - prev[0], p[1] - prev[1]], v2 = [next[0] - p[0], next[1] - p[1]];
    const l1 = Math.hypot(...v1), l2 = Math.hypot(...v2), rr = Math.min(r, l1 / 2, l2 / 2);
    d += ` L ${p[0] - (v1[0] / l1) * rr} ${p[1] - (v1[1] / l1) * rr} Q ${p[0]} ${p[1]} ${p[0] + (v2[0] / l2) * rr} ${p[1] + (v2[1] / l2) * rr}`;
  }
  return d;
};
const lit = new Set(['client-nginx', 'nginx-gateway', 'gateway-svcA', 'svcA-pg']);
const diagramSvg = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${VIEW.w} ${VIEW.h}" width="100%" height="100%">
  <defs><marker id="a" viewBox="0 0 10 10" refX="8.5" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M1 1.5 8.8 5 1 8.5z" fill="${C.yellow}"/></marker>
  <marker id="d" viewBox="0 0 10 10" refX="8.5" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M1 1.5 8.8 5 1 8.5z" fill="${C.faint}"/></marker></defs>
  <rect x="${boundary.x}" y="${boundary.y}" width="${boundary.w}" height="${boundary.h}" rx="22" fill="rgba(8,12,10,.35)" stroke="rgba(234,241,237,.2)" stroke-width="1.2" stroke-dasharray="5 6"/>
  <text x="${boundary.x + 18}" y="${boundary.y + 21}" font-family="JetBrains Mono" font-size="10.5" letter-spacing="1.1" fill="${C.faint}">DOCKER COMPOSE</text>
  ${edges.map((e) => `<path d="${roundedPath(e.points)}" fill="none" stroke="${lit.has(e.id) ? C.yellow : 'rgba(234,241,237,.28)'}" stroke-width="${lit.has(e.id) ? 2 : 1.4}" ${e.dashed ? 'stroke-dasharray="4 4"' : ''} stroke-linecap="round" marker-end="url(#${lit.has(e.id) ? 'a' : 'd'})"/>`).join('\n  ')}
  ${nodes.map((n) => `<g transform="translate(${n.x} ${n.y})">
    <rect width="${n.w}" height="${n.h}" rx="11" fill="${C.card}" stroke="rgba(234,241,237,.2)" stroke-width="1.2"/>
    <rect x="0" y="10" width="3" height="${n.h - 20}" rx="1.5" fill="${KIND[n.kind]}"/>
    <text x="${n.w / 2}" y="${n.sub ? n.h / 2 - 2 : n.h / 2 + 5}" text-anchor="middle" font-family="JetBrains Mono" font-weight="600" font-size="13.5" fill="${C.ink}">${n.title}</text>
    ${n.sub ? `<text x="${n.w / 2}" y="${n.h / 2 + 13}" text-anchor="middle" font-family="JetBrains Mono" font-weight="500" font-size="10" fill="${C.faint}">${n.sub.en}</text>` : ''}
  </g>`).join('\n  ')}
  <circle cx="200" cy="178" r="10" fill="${C.yellow}" opacity=".22"/><circle cx="200" cy="178" r="4" fill="${C.yellow}"/>
</svg>`;

const fontFace = (family, file, weight, style = 'normal') =>
  `@font-face{font-family:'${family}';src:url('${pathToFileURL(path.join(root, 'public/fonts', file))}') format('woff2');font-weight:${weight};font-style:${style}}`;

const ogHtml = `<!doctype html><html><head><meta charset="utf-8"><style>
${fontFace('Bricolage Grotesque', 'bricolage-grotesque.woff2', '200 800')}
${fontFace('Instrument Sans', 'instrument-sans.woff2', '400 700')}
${fontFace('Instrument Serif', 'instrument-serif-italic.woff2', '400', 'italic')}
${fontFace('JetBrains Mono', 'jetbrains-mono.woff2', '100 800')}
*{box-sizing:border-box;margin:0}
body{width:1200px;height:630px;background:${C.bg};color:${C.ink};font-family:'Instrument Sans';position:relative;overflow:hidden}
.glow{position:absolute;inset:0;background:radial-gradient(700px 420px at 8% -10%,rgba(31,182,127,.20),transparent 70%),radial-gradient(620px 420px at 100% 0%,rgba(252,209,22,.12),transparent 70%)}
.dots{position:absolute;inset:0;background-image:radial-gradient(rgba(234,241,237,.09) 1px,transparent 1.5px);background-size:28px 28px;-webkit-mask-image:linear-gradient(to bottom,#000,rgba(0,0,0,.35) 80%,transparent)}
.left{position:absolute;left:72px;top:58px;bottom:58px;width:600px;display:flex;flex-direction:column}
.brand{display:flex;align-items:center;gap:16px;font:700 26px 'Bricolage Grotesque';letter-spacing:-.02em}
.role{margin-top:64px;font:500 19px 'JetBrains Mono';letter-spacing:.16em;text-transform:uppercase;color:${C.yellow}}
h1{margin-top:20px;font:800 128px/.88 'Bricolage Grotesque';letter-spacing:-.055em}
.tag{margin-top:auto;font:400 30px/1.25 'Bricolage Grotesque';letter-spacing:-.02em;color:${C.ink}}
.tag em{font:italic 400 33px 'Instrument Serif';color:${C.yellow}}
.loc{margin-top:18px;font:500 17px 'JetBrains Mono';letter-spacing:.16em;color:${C.faint}}
.diagram{position:absolute;right:56px;top:46px;width:470px;height:538px;padding:18px;border:1px solid rgba(234,241,237,.17);border-radius:26px;background:linear-gradient(180deg,#131c17,#0e1511 70%);box-shadow:0 30px 70px -30px rgba(0,0,0,.9)}
</style></head><body>
<div class="glow"></div><div class="dots"></div>
<div class="left">
  <div class="brand">${logoSvg(44)}<span>${profile.name.split(' ')[0]} ${profile.name.split(' ').slice(-1)[0]}</span></div>
  <p class="role">Ingénieur logiciel full-stack</p>
  <h1>Yvo Vami<br>Neguem</h1>
  <p class="tag">Plateformes en <em>microservices</em> — Go, React, TypeScript, GraphQL</p>
  <p class="loc">${profile.city.toUpperCase()}, CAMEROUN · ${profile.coordinates.lat.toFixed(3)}° N ${profile.coordinates.lon.toFixed(3)}° E</p>
</div>
<div class="diagram">${diagramSvg}</div>
</body></html>`;

const iconHtml = (svg, size, bg) => `<!doctype html><html><body style="margin:0;background:${bg};width:${size}px;height:${size}px;display:grid;place-items:center">${svg}</body></html>`;

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1200, height: 630 } });

const ogPath = path.join(await mkdtemp(path.join(os.tmpdir(), 'brand-')), 'og.html');
await writeFile(ogPath, ogHtml);
await page.goto(pathToFileURL(ogPath).href);
await page.evaluate(() => document.fonts.ready);
await page.waitForTimeout(300);
await page.screenshot({ path: path.join(root, 'public/og.png') });
console.log('✔ public/og.png');

const icons = [
  { file: 'favicon-32.png', size: 32, svg: logoSvg(32, { tile: true, bg: '#0b120e' }), transparent: true },
  { file: 'apple-touch-icon.png', size: 180, svg: logoSvg(180, { tile: true, square: true, bg: '#0b120e', pad: 0.16 }) },
  { file: 'icon-192.png', size: 192, svg: logoSvg(192, { tile: true, square: true, bg: '#0b120e', pad: 0.16 }) },
  { file: 'icon-512.png', size: 512, svg: logoSvg(512, { tile: true, square: true, bg: '#0b120e', pad: 0.16 }) },
];
for (const icon of icons) {
  await page.setViewportSize({ width: icon.size, height: icon.size });
  await page.setContent(iconHtml(icon.svg, icon.size, icon.transparent ? 'transparent' : '#0b120e'));
  await page.screenshot({ path: path.join(root, 'public', icon.file), omitBackground: Boolean(icon.transparent) });
  console.log('✔ public/' + icon.file);
}
await browser.close();
