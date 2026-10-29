import assert from 'node:assert/strict';
import test from 'node:test';
import { detectLang, localizedUrl } from '../src/lib/language.ts';

test('detectLang honors explicit URL language before route, preference, and browser', () => {
  assert.equal(detectLang(new URL('https://example.com/en/?lang=fr'), 'en', 'en-US'), 'fr');
  assert.equal(detectLang(new URL('https://example.com/en/'), 'fr', 'fr-FR'), 'en');
  assert.equal(detectLang(new URL('https://example.com/'), 'en', 'fr-FR'), 'en');
  assert.equal(detectLang(new URL('https://example.com/'), null, 'fr-CA'), 'fr');
  assert.equal(detectLang(new URL('https://example.com/'), null, 'es-ES'), 'en');
});

test('localizedUrl updates the language route and preserves other URL state', () => {
  assert.equal(
    localizedUrl(new URL('https://example.com/?lang=en&campaign=spring#contact'), 'en').href,
    'https://example.com/en/?campaign=spring#contact',
  );
  assert.equal(
    localizedUrl(new URL('https://example.com/en/?campaign=spring#contact'), 'fr').href,
    'https://example.com/?campaign=spring#contact',
  );
});
