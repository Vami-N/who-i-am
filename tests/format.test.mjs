import assert from 'node:assert/strict';
import test from 'node:test';
import { cleanUrl, formatMonth } from '../src/lib/format.ts';

test('cleanUrl trims values and treats empty values as absent', () => {
  assert.equal(cleanUrl('  https://example.com/profile  '), 'https://example.com/profile');
  assert.equal(cleanUrl('   '), null);
});

test('formatMonth formats project dates in French and English', () => {
  assert.equal(formatMonth('2026-07', 'fr'), 'juil. 2026');
  assert.equal(formatMonth('2026-07', 'en'), 'Jul 2026');
});
