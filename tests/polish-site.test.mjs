import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import middleware from '../middleware.js';
import { renderArticlePage } from '../api/_lib/article-html.js';
import { resolveArticleResponse } from '../api/article.js';
import { STATIC_PAGES, articleAlternates, findStaticPage, isPolishHost, isProductionHost, staticAlternates, HREFLANG_LIVE } from '../api/_lib/sites.js';
import { PL_ROUTES } from '../seo/pl-routes.js';

const shell = readFileSync(new URL('../index.html', import.meta.url), 'utf8')
  .replace(/\s*<link rel="canonical"[^>]*>/, '');

const request = (url, headers = {}) => new Request(url, { headers: { host: new URL(url).host, ...headers } });
const rewriteOf = (response) => response.headers.get('x-middleware-rewrite');
const isNext = (response) => response.headers.get('x-middleware-next') === '1';

const polishArticle = {
  id: 'b', translation_of: 'a', lang: 'pl', slug: 'ribe', title: 'Ribe samochodem', perex: 'Gdzie zaparkować.',
  content: '<h2>Parking</h2><p>Parking <strong>za darmo</strong>.</p>',
  meta_title: null, meta_description: 'Ribe samochodem: parking.', image_url: null, og_image: null,
  created_at: '2026-09-17T10:00:00+00:00', updated_at: '2026-09-17T10:00:00+00:00', focus_keyword: null,
  categories: { name: 'Cestování', slug: 'cestovani' },
};

test('hosts are recognised', () => {
  assert.equal(isPolishHost('kastrup.pl'), true);
  assert.equal(isPolishHost('www.kastrup.pl'), true);
  assert.equal(isPolishHost('kastrup.cz'), false);
  assert.equal(isPolishHost('kastrup.pl.evil.com'), false);
  assert.equal(isProductionHost('kastrup.cz'), true);
  assert.equal(isProductionHost('danmark-guide-abc.vercel.app'), false);
});

test('every Polish static page has SEO data and a unique path', () => {
  const plPaths = STATIC_PAGES.map((page) => page.pl).filter(Boolean);
  assert.equal(new Set(plPaths).size, plPaths.length);
  for (const path of plPaths) {
    const route = PL_ROUTES.find((item) => (item.isHomepage ? '/' : `/${item.path}`) === path);
    assert.ok(route, `missing PL route for ${path}`);
    assert.ok(route.title.length >= 20 && route.title.length <= 70, `${path} title length ${route.title.length}`);
    assert.ok(route.description.length >= 100 && route.description.length <= 160, `${path} description length ${route.description.length}`);
    assert.equal(route.canonical, `https://kastrup.pl${path === '/' ? '/' : path}`);
  }
});

test('Polish article page is in Polish with its own canonical', () => {
  const html = renderArticlePage(shell, polishArticle, { lang: 'pl' });
  assert.match(html, /<html lang="pl">/);
  assert.match(html, /<meta property="og:locale" content="pl_PL"/);
  assert.match(html, /<meta property="og:site_name" content="Kastrup.pl"/);
  assert.match(html, /<title>Ribe samochodem \| Kastrup.pl<\/title>/);
  assert.match(html, /<link rel="canonical" href="https:\/\/kastrup\.pl\/artykul\/ribe"/);
  assert.match(html, /"inLanguage":"pl-PL"/);
  assert.match(html, /"articleSection":"Podróże"/);
  assert.match(html, /Autorka: <a href="\/o-autorce">/);
  assert.match(html, /opublikowano <time datetime="2026-09-17T10:00:00\+00:00">17 września 2026<\/time>/);
  assert.equal(html.match(/rel="canonical"/g).length, 1);
});

test('hreflang links are written only when alternates are given', () => {
  const alternates = [
    { hreflang: 'cs', href: 'https://kastrup.cz/clanek/ribe' },
    { hreflang: 'pl', href: 'https://kastrup.pl/artykul/ribe' },
    { hreflang: 'x-default', href: 'https://kastrup.cz/clanek/ribe' },
  ];
  const html = renderArticlePage(shell, polishArticle, { lang: 'pl', alternates });
  assert.equal(html.match(/rel="alternate" hreflang=/g).length, 3);
  assert.doesNotMatch(renderArticlePage(shell, polishArticle, { lang: 'pl' }), /hreflang=/);
});

test('hreflang pairs Czech and Polish pages, x-default is the Czech original', () => {
  assert.equal(HREFLANG_LIVE, true);
  assert.deepEqual(staticAlternates('copenhagen'), [
    { hreflang: 'cs', href: 'https://kastrup.cz/kodan' },
    { hreflang: 'pl', href: 'https://kastrup.pl/kopenhaga' },
    { hreflang: 'x-default', href: 'https://kastrup.cz/kodan' },
  ]);
  assert.deepEqual(articleAlternates({ cs: 'mosty-v-dansku', pl: 'mosty-w-danii' }), [
    { hreflang: 'cs', href: 'https://kastrup.cz/clanek/mosty-v-dansku' },
    { hreflang: 'pl', href: 'https://kastrup.pl/artykul/mosty-w-danii' },
    { hreflang: 'x-default', href: 'https://kastrup.cz/clanek/mosty-v-dansku' },
  ]);
  // Untranslated page or article: no hreflang at all
  assert.deepEqual(staticAlternates('travel'), []);
  assert.deepEqual(articleAlternates({ cs: 'jen-cesky' }), []);
});

test('unknown Polish article is a Polish 404', async () => {
  const templates = { cs: { articleShellHtml: 'cs', notFoundHtml: 'cs-404' }, pl: { articleShellHtml: 'pl', notFoundHtml: 'pl-404' } };
  const missing = await resolveArticleResponse({ slug: 'nie-ma', lang: 'pl', templates, fetchArticle: async () => null });
  assert.equal(missing.status, 404);
  assert.equal(missing.html, 'pl-404');
  const direct = await resolveArticleResponse({ slug: '', lang: 'pl', notFound: true, templates, fetchArticle: async () => polishArticle });
  assert.equal(direct.status, 404);
  assert.equal(direct.html, 'pl-404');
});

test('kastrup.cz passes through and hides the Polish build', () => {
  assert.equal(isNext(middleware(request('https://kastrup.cz/kodan'))), true);
  assert.equal(isNext(middleware(request('https://kastrup.cz/clanek/ribe'))), true);
  assert.match(rewriteOf(middleware(request('https://kastrup.cz/pl/kopenhaga'))), /\/api\/article\?notfound=1$/);
  assert.match(rewriteOf(middleware(request('https://kastrup.cz/pl'))), /\/api\/article\?notfound=1$/);
  // ?lang=pl must not switch the production Czech domain
  assert.equal(isNext(middleware(request('https://kastrup.cz/kodan?lang=pl'))), true);
});

test('kastrup.pl is routed to the Polish build', () => {
  const at = (path) => rewriteOf(middleware(request(`https://kastrup.pl${path}`)));
  assert.match(at('/'), /\/pl$/);
  assert.match(at('/kopenhaga'), /\/pl\/kopenhaga$/);
  assert.match(at('/artykul/ribe'), /\/api\/article\?lang=pl&slug=ribe$/);
  assert.match(at('/sitemap.xml'), /\/api\/sitemap\?lang=pl$/);
  assert.match(at('/robots.txt'), /\/pl\/robots\.txt$/);
  assert.match(at('/kodan'), /\/api\/article\?lang=pl&notfound=1$/);
  assert.match(at('/tajnedvere'), /\/api\/article\?lang=pl&notfound=1$/);
  assert.equal(isNext(middleware(request('https://kastrup.pl/favicon.ico'))), true);
  const www = middleware(request('https://www.kastrup.pl/kopenhaga?x=1'));
  assert.equal(www.status, 308);
  assert.equal(www.headers.get('location'), 'https://kastrup.pl/kopenhaga?x=1');
});

test('preview hosts switch language with ?lang and a cookie', () => {
  const preview = 'https://danmark-guide-abc.vercel.app';
  const on = middleware(request(`${preview}/kopenhaga?lang=pl`));
  assert.match(rewriteOf(on), /\/pl\/kopenhaga$/);
  assert.match(on.headers.get('set-cookie'), /kastrup_site=pl/);
  const withCookie = middleware(request(`${preview}/kopenhaga`, { cookie: 'kastrup_site=pl' }));
  assert.match(rewriteOf(withCookie), /\/pl\/kopenhaga$/);
  assert.equal(isNext(middleware(request(`${preview}/kodan`))), true);
});

test('static page lookup ignores a trailing slash', () => {
  assert.equal(findStaticPage('/kopenhaga/', 'pl')?.key, 'copenhagen');
  assert.equal(findStaticPage('/kodan', 'pl'), null);
});
