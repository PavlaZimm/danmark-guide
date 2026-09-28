// Two language versions of one site: kastrup.cz (Czech) and kastrup.pl (Polish).
// Shared by the React app, the build plugin, the article/sitemap functions and the middleware,
// so every place agrees on which page exists in which language and where.

export const SITES = {
  cs: { lang: 'cs', origin: 'https://kastrup.cz', host: 'kastrup.cz', locale: 'cs_CZ', name: 'Kastrup.cz', articlePrefix: '/clanek/' },
  pl: { lang: 'pl', origin: 'https://kastrup.pl', host: 'kastrup.pl', locale: 'pl_PL', name: 'Kastrup.pl', articlePrefix: '/artykul/' },
};

// On since kastrup.pl serves the Polish site. Turning it off removes every hreflang link,
// e.g. if kastrup.pl ever stops resolving (hreflang to a dead domain is worse than none).
export const HREFLANG_LIVE = true;

// Static pages. `pl: null` = not translated yet (no Polish page, no hreflang).
export const STATIC_PAGES = [
  { key: 'home', cs: '/', pl: '/' },
  { key: 'articles', cs: '/clanky', pl: '/artykuly' },
  { key: 'travel', cs: '/cestovani', pl: null },
  { key: 'about', cs: '/o-dansku', pl: '/co-zobaczyc-w-danii' },
  { key: 'accommodation', cs: '/ubytovani', pl: '/noclegi' },
  { key: 'culture', cs: '/kultura', pl: '/kultura-dunska' },
  { key: 'hygge', cs: '/hygge', pl: '/hygge' },
  { key: 'copenhagen', cs: '/kodan', pl: '/kopenhaga' },
  { key: 'language', cs: '/danstina', pl: '/jezyk-dunski' },
  { key: 'islands', cs: '/danske-ostrovy', pl: '/wyspy-dunskie' },
  { key: 'contact', cs: '/kontakt', pl: '/kontakt' },
  { key: 'author', cs: '/autorka', pl: '/o-autorce' },
  { key: 'privacy', cs: '/ochrana-soukromi', pl: '/polityka-prywatnosci' },
];

export const LANGS = Object.keys(SITES);

export const isPolishHost = (host = '') => /(^|\.)kastrup\.pl$/i.test(String(host).split(':')[0]);
export const isProductionHost = (host = '') => /(^|\.)kastrup\.(cz|pl)$/i.test(String(host).split(':')[0]);

export const pagePath = (key, lang) => STATIC_PAGES.find((page) => page.key === key)?.[lang] ?? null;

export const findStaticPage = (path, lang) => {
  const clean = path !== '/' ? path.replace(/\/+$/, '') : path;
  return STATIC_PAGES.find((page) => page[lang] === clean) ?? null;
};

// hreflang alternates for a static page: every language that has the page, plus x-default (Czech original)
export const staticAlternates = (key) => {
  if (!HREFLANG_LIVE) return [];
  const page = STATIC_PAGES.find((item) => item.key === key);
  if (!page) return [];
  const available = LANGS.filter((lang) => page[lang]);
  if (available.length < 2) return [];
  return [
    ...available.map((lang) => ({ hreflang: lang, href: SITES[lang].origin + page[lang] })),
    { hreflang: 'x-default', href: SITES.cs.origin + page.cs },
  ];
};

// hreflang alternates for an article given its slugs per language ({ cs: 'ribe', pl: 'ribe' })
export const articleAlternates = (slugs) => {
  if (!HREFLANG_LIVE) return [];
  const available = LANGS.filter((lang) => slugs[lang]);
  if (available.length < 2) return [];
  const links = available.map((lang) => ({ hreflang: lang, href: SITES[lang].origin + SITES[lang].articlePrefix + slugs[lang] }));
  if (slugs.cs) links.push({ hreflang: 'x-default', href: SITES.cs.origin + SITES.cs.articlePrefix + slugs.cs });
  return links;
};

// Category names are stored in Czech; the Polish site shows them translated by slug
const CATEGORY_NAMES = {
  pl: {
    cestovani: 'Podróże',
    kultura: 'Kultura',
    gastronomie: 'Kuchnia',
    historie: 'Historia',
    lifestyle: 'Styl życia',
    ubytovani: 'Noclegi',
  },
};

export const categoryName = (category, lang) =>
  (category && CATEGORY_NAMES[lang]?.[category.slug]) || category?.name || '';
