import { test } from 'node:test';
import assert from 'node:assert/strict';
import { withTableLabels } from '../api/_lib/table-labels.js';

const table3 = '<table><thead><tr><th>Doprava</th><th>Čas</th><th>Cena&nbsp;DKK</th></tr></thead><tbody>'
  + '<tr><td>Vlak</td><td>41&nbsp;min</td><td>96</td></tr><tr><td>Bus</td><td>50</td><td>od 6,98 €</td></tr></tbody></table>';

test('3+ column table gets mtab class and data-label on every body cell', () => {
  const out = withTableLabels(table3);
  assert.match(out, /<table class="mtab">/);
  assert.equal((out.match(/data-label=/g) || []).length, 6);
  assert.match(out, /<td data-label="Doprava">Vlak<\/td>/);
  assert.match(out, /<td data-label="Cena DKK">96<\/td>/);
  assert.doesNotMatch(out, /<thead[^>]*data-label/);
});

test('two-column tables are left alone', () => {
  const t = '<table><thead><tr><th>A</th><th>B</th></tr></thead><tbody><tr><td>1</td><td>2</td></tr></tbody></table>';
  assert.equal(withTableLabels(t), t);
});

test('empty header cell leaves its column unlabelled (card title)', () => {
  const t = '<table><thead><tr><th></th><th>Billund</th><th>Günzburg</th></tr></thead><tbody><tr><td>Z Prahy</td><td>921 km</td><td>451 km</td></tr></tbody></table>';
  const out = withTableLabels(t);
  assert.match(out, /<td>Z Prahy<\/td>/);
  assert.match(out, /<td data-label="Billund">921 km<\/td>/);
});

test('colspan, missing header, already labelled and nested tables are skipped', () => {
  const colspan = '<table><thead><tr><th>A</th><th>B</th><th>C</th></tr></thead><tbody><tr><td colspan="3">x</td></tr></tbody></table>';
  const noHead = '<table><tbody><tr><td>1</td><td>2</td><td>3</td></tr></tbody></table>';
  const labelled = withTableLabels(table3);
  assert.equal(withTableLabels(colspan), colspan);
  assert.equal(withTableLabels(noHead), noHead);
  assert.equal(withTableLabels(labelled), labelled);
});

test('existing class is kept and attributes in cell values are escaped', () => {
  const t = '<table class="info"><thead><tr><th>A "q"</th><th>B</th><th>C</th></tr></thead><tbody><tr><td>1</td><td>2</td><td>3</td></tr></tbody></table>';
  const out = withTableLabels(t);
  assert.match(out, /<table class="info mtab">/);
  assert.match(out, /data-label="A &quot;q&quot;"/);
});

test('text outside tables is untouched', () => {
  assert.equal(withTableLabels('<p>Ahoj</p>'), '<p>Ahoj</p>');
});
