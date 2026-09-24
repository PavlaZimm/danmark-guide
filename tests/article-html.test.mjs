import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { sanitizeArticleHtml, renderArticlePage } from '../api/_lib/article-html.js';
import { resolveArticleResponse, isValidSlug } from '../api/article.js';

const indexHtml = readFileSync(new URL('../index.html', import.meta.url), 'utf8');
// Same transformation as the build plugin applies to create clanek-shell.html
const shell = indexHtml
  .replace(/<title>.*?<\/title>/, '<title>Článek | Kastrup.cz</title>')
  .replace(/\s*<link rel="canonical"[^>]*>/, '')
  .replace(/\s*<meta property="og:url"[^>]*>/, '');
const templates = { articleShellHtml: shell, notFoundHtml: '<title>404 - Stránka nenalezena | Kastrup.cz</title>' };

const article = {
  slug: 'ribe',
  title: 'Ribe v Dánsku autem',
  perex: 'Kde zaparkovat a kudy se projít.',
  content: '<h2 id="parkovani">Parkování</h2><p>Parkoviště <strong>zdarma</strong> u <a href="https://www.ribe.dk">centra</a>.</p>'
    + '<figure><img src="/images/clanky/ribe/domy.webp" alt="Domy u vody" loading="lazy"><figcaption>Foto: autorka</figcaption></figure>'
    + '<table><thead><tr><th>Místo</th><th>Cena</th></tr></thead><tbody><tr><td>P1</td><td>0 Kč</td></tr></tbody></table>',
  meta_title: 'Ribe v Dánsku autem: parkování a procházka 2026',
  meta_description: 'Zastávka v Ribe autem & bez stresu.',
  image_url: 'https://kastrup.cz/images/clanky/ribe/domy-1500.webp',
  og_image: null,
  created_at: '2026-09-17T10:00:00+00:00',
  updated_at: '2026-09-20T10:00:00+00:00',
  focus_keyword: 'Ribe',
  categories: { name: 'Cestování' },
};

test('sanitizer keeps article markup', () => {
  const html = sanitizeArticleHtml(article.content);
  assert.match(html, /<h2 id="parkovani">Parkování<\/h2>/);
  assert.match(html, /<a href="https:\/\/www\.ribe\.dk" rel="noopener">centra<\/a>/);
  assert.match(html, /<img src="\/images\/clanky\/ribe\/domy\.webp" alt="Domy u vody" loading="lazy">/);
  assert.match(html, /<th>Cena<\/th>/);
  assert.match(html, /<figcaption>Foto: autorka<\/figcaption>/);
});

test('sanitizer removes everything executable', () => {
  const attacks = [
    '<script>alert(1)</script>',
    '<SCRIPT src="x.js"></SCRIPT>',
    '<img src="x" onerror="alert(1)">',
    '<a href="javascript:alert(1)">x</a>',
    '<a href="JaVaScRiPt:alert(1)">x</a>',
    '<a href="&#106;avascript:alert(1)">x</a>',
    '<a href="java&#x09;script:alert(1)">x</a>',
    '<a href=" javascript:alert(1)">x</a>',
    '<img src="data:image/svg+xml;base64,AAAA">',
    '<iframe src="https://evil.example"></iframe>',
    '<svg><script>alert(1)</script></svg>',
    '<style>body{display:none}</style>',
    '<div style="background:url(javascript:alert(1))">x</div>',
    '<p onclick="alert(1)">x</p>',
    '<a href="x" onmouseover=alert(1)>x</a>',
    '<!-- <script>alert(1)</script> -->',
    '<scr<script>ipt>alert(1)</script>',
    '<form action="https://evil.example"><input name="p"></form>',
  ];
  for (const attack of attacks) {
    const clean = sanitizeArticleHtml(attack);
    assert.doesNotMatch(clean, /<script|<iframe|<svg|<style|<form|<input|javascript:|data:|on[a-z]+=|style=/i, `${attack} -> ${clean}`);
  }
});

test('sanitizer escapes a stray angle bracket and closes nothing it did not open', () => {
  assert.equal(sanitizeArticleHtml('<p>1 < 2</p>'), '<p>1 &lt; 2</p>');
  assert.equal(sanitizeArticleHtml('<div class="map" data-markers="[]">Mapa</div>'), 'Mapa');
});

test('article page has meta, schema and the full text for crawlers', () => {
  const html = renderArticlePage(shell, article);
  assert.match(html, /<title>Ribe v Dánsku autem: parkování a procházka 2026<\/title>/);
  assert.match(html, /<meta name="description" content="Zastávka v Ribe autem &amp; bez stresu\."/);
  assert.equal(html.match(/rel="canonical"/g).length, 1);
  assert.match(html, /<link rel="canonical" href="https:\/\/kastrup\.cz\/clanek\/ribe"/);
  assert.equal(html.match(/property="og:url"/g).length, 1);
  assert.match(html, /"@type":"Article"/);
  assert.equal(html.match(/<h1[\s>]/g).length, 1);
  assert.match(html, /<h1>Ribe v Dánsku autem<\/h1>/);
  assert.match(html, /Parkoviště <strong>zdarma<\/strong>/);
  assert.match(html, /<p><strong>Kde zaparkovat a kudy se projít\.<\/strong><\/p>/);
  assert.match(html, /publikováno <time datetime="2026-09-17T10:00:00\+00:00">17\. září 2026<\/time>/);
  // Text sits inside the hidden fallback that React replaces, so visitors never see it twice
  const fallback = html.slice(html.indexOf('<div class="fallback-content">'), html.indexOf('<footer'));
  assert.match(fallback, /Parkoviště <strong>zdarma<\/strong>/);
});

test('article page survives "$" sequences in the text', () => {
  const html = renderArticlePage(shell, { ...article, title: "Cena $& a $' v DKK", content: "<p>Za $1 a $$</p>" });
  assert.match(html, /<h1>Cena \$&amp; a \$' v DKK<\/h1>/);
  assert.match(html, /<p>Za \$1 a \$\$<\/p>/);
});

test('slug validation', () => {
  assert.equal(isValidSlug('mosty-v-dansku'), true);
  for (const bad of ['', 'Ribe', 'ribe/', '../x', 'ří', '-x', 'a'.repeat(201), undefined]) {
    assert.equal(isValidSlug(bad), false, String(bad));
  }
});

test('existing article returns 200 with its text', async () => {
  const result = await resolveArticleResponse({ slug: 'ribe', templates, fetchArticle: async () => article });
  assert.equal(result.status, 200);
  assert.match(result.html, /Parkoviště/);
  assert.match(result.cache, /s-maxage=300/);
});

test('unknown or malformed slug returns a real 404 without asking the database', async () => {
  let calls = 0;
  const fetchArticle = async () => { calls += 1; return null; };
  const missing = await resolveArticleResponse({ slug: 'neexistuje', templates, fetchArticle });
  assert.equal(missing.status, 404);
  assert.match(missing.html, /404/);
  const malformed = await resolveArticleResponse({ slug: '../etc', templates, fetchArticle });
  assert.equal(malformed.status, 404);
  assert.equal(calls, 1);
});

test('database failure never turns an article into a 404', async () => {
  const original = console.error;
  console.error = () => {};
  try {
    const result = await resolveArticleResponse({
      slug: 'ribe',
      templates,
      fetchArticle: async () => { throw new Error('timeout'); },
    });
    assert.equal(result.status, 200);
    assert.equal(result.html, shell);
    assert.match(result.cache, /s-maxage=30\b/);
  } finally {
    console.error = original;
  }
});
