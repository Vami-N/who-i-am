import assert from 'node:assert/strict';
import { readdir, readFile } from 'node:fs/promises';
import test from 'node:test';

const readOutput = (path) => readFile(new URL(path, import.meta.url));

test('production build includes language-specific static metadata and CV downloads', async () => {
  const [frenchHtml, englishHtml, frenchCv, englishCv, builtAssets] = await Promise.all([
    readOutput('../dist/index.html').then((file) => file.toString()),
    readOutput('../dist/en/index.html').then((file) => file.toString()),
    readOutput('../dist/CV_Vami_FR.pdf'),
    readOutput('../dist/CV_Vami_EN.pdf'),
    readdir(new URL('../dist/assets/', import.meta.url)),
  ]);

  assert.match(frenchHtml, /<html lang="fr"/);
  assert.match(frenchHtml, /Yvo Vami Neguem · Ingénieur logiciel full-stack/);
  assert.match(englishHtml, /<html lang="en"/);
  assert.match(englishHtml, /Yvo Vami Neguem · Full-stack software engineer/);
  assert.match(englishHtml, /property="og:locale" content="en_US"/);
  assert.match(englishHtml, /content="Yvo Vami Neguem, full-stack software engineer/);
  assert.match(englishHtml, /<link rel="canonical" href="[^"]+\/en\/"/);
  assert.match(frenchCv.toString('ascii', 0, 5), /^%PDF-/);
  assert.match(englishCv.toString('ascii', 0, 5), /^%PDF-/);
  assert.ok(builtAssets.some((asset) => /^portrait-.*\.jpeg$/.test(asset)), 'production build includes the portrait');
});
