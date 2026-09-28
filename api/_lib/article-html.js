// Shared HTML rendering for crawlers. Used by the build plugin (vite-plugin-routes-html.js)
// and by the article function (api/article.js), so both produce the same markup.
// Files and folders starting with "_" inside api/ are not deployed as endpoints.

import { SITES, categoryName, pagePath } from './sites.js';

export const SITE_URL = 'https://kastrup.cz';
export const DEFAULT_SOCIAL_IMAGE = 'https://kastrup.cz/images/og-kastrup.jpg';
export const AUTHOR_NAME = 'Pavla Zimmermannová';

export const ARTICLE_SELECT =
  'id, lang, translation_of, slug, title, perex, content, meta_title, meta_description, image_url, og_image, created_at, updated_at, focus_keyword, categories(name, slug)';

const TEXT = {
  cs: { author: 'Autorka', published: 'publikováno', updated: 'aktualizováno', readArticle: 'Přečtěte si článek', on: 'na', dateLocale: 'cs-CZ', inLanguage: 'cs-CZ' },
  pl: { author: 'Autorka', published: 'opublikowano', updated: 'zaktualizowano', readArticle: 'Przeczytaj artykuł', on: 'na', dateLocale: 'pl-PL', inLanguage: 'pl-PL' },
};

export const escapeHtml = (value = '') => String(value)
  .replaceAll('&', '&amp;')
  .replaceAll('"', '&quot;')
  .replaceAll('<', '&lt;')
  .replaceAll('>', '&gt;');

export const serializeJsonLd = (value) => JSON.stringify(value).replaceAll('<', '\\u003c');

// ---------------------------------------------------------------------------
// Sanitizer for article HTML placed into the no-JS fallback.
// Article HTML is written in the MFA-protected admin, but it is still treated
// as untrusted: only an allowlist of tags and attributes survives, everything
// executable is removed together with its content.

const DROP_WITH_CONTENT = [
  'script', 'style', 'iframe', 'object', 'embed', 'noscript', 'template',
  'form', 'svg', 'math', 'textarea', 'select', 'button', 'canvas', 'video', 'audio', 'head', 'title',
];

const ALLOWED_TAGS = {
  p: [], br: [], hr: [], strong: [], b: [], em: [], i: [], u: [], s: [], small: [], sup: [], sub: [],
  mark: [], abbr: ['title'], cite: [], q: [], code: [], pre: [], blockquote: [],
  h2: ['id'], h3: ['id'], h4: ['id'], h5: ['id'], h6: ['id'],
  ul: [], ol: ['start'], li: [], dl: [], dt: [], dd: [],
  a: ['href', 'title'],
  img: ['src', 'alt', 'width', 'height'],
  figure: [], figcaption: [],
  table: [], caption: [], thead: [], tbody: [], tfoot: [], tr: [],
  th: ['colspan', 'rowspan', 'scope'], td: ['colspan', 'rowspan'],
  details: ['open'], summary: [],
};

const VOID_TAGS = new Set(['br', 'hr', 'img']);
const URL_ATTRS = new Set(['href', 'src']);

const decodeEntities = (value) => value
  .replace(/&#x([0-9a-f]+);?/gi, (_, hex) => String.fromCodePoint(parseInt(hex, 16)))
  .replace(/&#(\d+);?/g, (_, dec) => String.fromCodePoint(Number(dec)))
  .replace(/&colon;/gi, ':')
  .replace(/&tab;/gi, '\t')
  .replace(/&newline;/gi, '\n')
  .replace(/&amp;/gi, '&');

const isSafeUrl = (raw) => {
  const value = decodeEntities(raw).replace(/[\u0000- \u007f-\u009f]/g, '').toLowerCase();
  if (!value) return false;
  if (/^(https?:|mailto:|tel:)/.test(value)) return true;
  // Relative URLs and fragments; anything else with a scheme (javascript:, data:, vbscript:) is refused
  return !/^[a-z][a-z0-9+.-]*:/.test(value);
};

const ATTR_RE = /([^\s"'<>/=]+)(?:\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s"'=<>`]+)))?/g;

const cleanAttributes = (tag, rawAttrs) => {
  const allowed = ALLOWED_TAGS[tag];
  const kept = [];
  for (const match of rawAttrs.matchAll(ATTR_RE)) {
    const name = match[1].toLowerCase();
    if (!allowed.includes(name)) continue;
    const value = match[2] ?? match[3] ?? match[4] ?? '';
    if (URL_ATTRS.has(name) && !isSafeUrl(value)) continue;
    if ((name === 'width' || name === 'height' || name === 'colspan' || name === 'rowspan' || name === 'start')
      && !/^\d{1,5}$/.test(value)) continue;
    // Values arrive HTML-encoded; only characters that could break out of the quotes are escaped
    kept.push(name === 'open' ? 'open' : `${name}="${value.replaceAll('"', '&quot;').replaceAll('<', '&lt;').replaceAll('>', '&gt;')}"`);
  }
  if (tag === 'img') kept.push('loading="lazy"');
  if (tag === 'a' && kept.some(attr => /^href="https?:/i.test(attr) && !/^href="https?:\/\/(www\.)?kastrup\.cz/i.test(attr))) {
    kept.push('rel="noopener"');
  }
  return kept.length ? ` ${kept.join(' ')}` : '';
};

export const sanitizeArticleHtml = (html = '') => {
  let out = String(html).replace(/<!--[\s\S]*?(-->|$)/g, '');
  for (const tag of DROP_WITH_CONTENT) {
    out = out.replace(new RegExp(`<${tag}\\b[\\s\\S]*?(<\\/${tag}\\s*>|$)`, 'gi'), '');
  }
  out = out.replace(/<(\/?)([a-zA-Z][a-zA-Z0-9]*)\b([^>]*)>/g, (_, slash, rawName, rawAttrs) => {
    const tag = rawName.toLowerCase();
    if (!Object.hasOwn(ALLOWED_TAGS, tag)) return '';
    if (slash) return VOID_TAGS.has(tag) ? '' : `</${tag}>`;
    return `<${tag}${cleanAttributes(tag, rawAttrs)}>`;
  });
  // Any "<" left that does not start an allowed tag is text
  return out.replace(/<(?!\/?(?:[a-z][a-z0-9]*)[\s>])/g, '&lt;');
};

// ---------------------------------------------------------------------------

export const articleRoute = (article, lang = 'cs') => {
  const site = SITES[lang];
  const text = TEXT[lang];
  return {
    lang,
    path: `${site.articlePrefix.slice(1)}${article.slug}`,
    title: article.meta_title || `${article.title} | ${site.name}`,
    description: article.meta_description || article.perex || `${text.readArticle} ${article.title} ${text.on} ${site.name}`,
    canonical: `${site.origin}${site.articlePrefix}${article.slug}`,
    image: article.og_image || article.image_url || DEFAULT_SOCIAL_IMAGE,
    type: 'article',
    heading: article.title,
    article,
  };
};

const formatDate = (value, lang) => {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return '';
  return date.toLocaleDateString(TEXT[lang].dateLocale, { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'Europe/Prague' });
};

/**
 * Applies title, description, canonical, Open Graph and article schema of one route
 * to the index.html template and fills the fallback H1 and lead paragraph.
 */
export function applyRouteMeta(templateHtml, route) {
  const safeTitle = escapeHtml(route.title);
  const safeDescription = escapeHtml(route.description);
  const safeCanonical = escapeHtml(route.canonical);
  const safeImage = escapeHtml(route.image || DEFAULT_SOCIAL_IMAGE);
  const safeType = route.type === 'article' ? 'article' : route.type === 'profile' ? 'profile' : 'website';
  const imageSizeMeta = safeImage === DEFAULT_SOCIAL_IMAGE
    ? '\n    <meta property="og:image:width" content="1200" data-rh="true" />\n    <meta property="og:image:height" content="630" data-rh="true" />'
    : '';

  const lang = route.lang || 'cs';
  const site = SITES[lang];

  let html = templateHtml
    .replace(/<html lang="[a-z-]+">/, () => `<html lang="${lang}">`)
    .replace(/<meta property="og:locale" content="[^"]*"/, () => `<meta property="og:locale" content="${site.locale}"`)
    .replace(/<meta property="og:site_name" content="[^"]*"/, () => `<meta property="og:site_name" content="${site.name}"`)
    .replace(/<title>.*?<\/title>/, () => `<title>${safeTitle}</title>`)
    .replace(/<meta name="description" content=".*?"/, () => `<meta name="description" content="${safeDescription}"`);

  if (!html.includes('rel="canonical"')) {
    html = html.replace('</head>', () => `    <link rel="canonical" href="${safeCanonical}" data-rh="true" />\n  </head>`);
  } else {
    html = html.replace(
      /<link rel="canonical" href=".*?".*?\/>/,
      () => `<link rel="canonical" href="${safeCanonical}" data-rh="true" />`
    );
  }

  // hreflang links to the other language versions (empty until the Polish site is live)
  html = html.replace(/\s*<link rel="alternate" hreflang="[^"]*"[^>]*>/g, '');
  if (route.alternates?.length) {
    const links = route.alternates
      .map((alt) => `    <link rel="alternate" hreflang="${escapeHtml(alt.hreflang)}" href="${escapeHtml(alt.href)}" data-rh="true" />`)
      .join('\n');
    html = html.replace('</head>', () => `${links}\n  </head>`);
  }

  // The article shell template has no og:url; drop any leftover so it is never duplicated
  html = html.replace(/\s*<meta property="og:url"[^>]*>/, '');
  html = html.replace(
    /<meta property="og:type".*?>/,
    () => `<meta property="og:type" content="${safeType}" data-rh="true" />
    <meta property="og:url" content="${safeCanonical}" data-rh="true" />
    <meta property="og:title" content="${safeTitle}" data-rh="true" />
    <meta property="og:description" content="${safeDescription}" data-rh="true" />
    <meta property="og:image" content="${safeImage}" data-rh="true" />${imageSizeMeta}
    <meta name="twitter:card" content="summary_large_image" data-rh="true" />
    <meta name="twitter:title" content="${safeTitle}" data-rh="true" />
    <meta name="twitter:description" content="${safeDescription}" data-rh="true" />
    <meta name="twitter:image" content="${safeImage}" data-rh="true" />`
  );

  if (route.type === 'article' && route.article) {
    const article = route.article;
    const articleSchema = serializeJsonLd({
      '@context': 'https://schema.org',
      '@type': 'Article',
      '@id': `${route.canonical}#article`,
      headline: article.title,
      description: article.meta_description || article.perex,
      image: article.og_image || article.image_url || DEFAULT_SOCIAL_IMAGE,
      datePublished: article.created_at,
      dateModified: article.updated_at || article.created_at,
      author: {
        '@type': 'Person',
        name: AUTHOR_NAME,
        url: `${site.origin}${pagePath('author', lang) || '/autorka'}`
      },
      publisher: {
        '@type': 'Organization',
        name: site.name,
        url: site.origin,
        logo: {
          '@type': 'ImageObject',
          url: `${site.origin}/icon-512.png`,
          width: 512,
          height: 512
        }
      },
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': route.canonical
      },
      articleSection: categoryName(article.categories, lang) || undefined,
      keywords: article.focus_keyword || undefined,
      inLanguage: TEXT[lang].inLanguage
    });
    const articleMeta = [
      article.created_at
        ? `    <meta property="article:published_time" content="${escapeHtml(article.created_at)}" data-rh="true" />`
        : '',
      article.updated_at
        ? `    <meta property="article:modified_time" content="${escapeHtml(article.updated_at)}" data-rh="true" />`
        : '',
      `    <script id="server-article-schema" type="application/ld+json" data-rh="true">${articleSchema}</script>`
    ].filter(Boolean).join('\n');

    html = html.replace('</head>', () => `${articleMeta}\n  </head>`);
  }

  const safeHeading = escapeHtml(route.heading || route.title);
  return html
    .replace(/<h1>Kastrup\.cz - Váš průvodce po Dánsku<\/h1>/, () => `<h1>${safeHeading}</h1>`)
    .replace(
      /<p>Načítání stránky\.\.\. Pro plné zobrazení prosím zapněte JavaScript\.<\/p>/,
      () => `<p>${safeDescription}</p>`
    );
}

/** Full article text for crawlers that do not run JavaScript (hidden for normal visitors). */
export function renderArticleBody(article, lang = 'cs') {
  const text = TEXT[lang];
  const published = formatDate(article.created_at, lang);
  const updated = article.updated_at ? formatDate(article.updated_at, lang) : '';
  const dates = [
    published ? `${text.published} <time datetime="${escapeHtml(article.created_at)}">${published}</time>` : '',
    updated && updated !== published ? `${text.updated} <time datetime="${escapeHtml(article.updated_at)}">${updated}</time>` : '',
  ].filter(Boolean).join(', ');
  const perex = article.perex ? `\n            <p><strong>${escapeHtml(article.perex)}</strong></p>` : '';
  const authorPath = pagePath('author', lang) || '/autorka';

  return `
          <article style="margin-top: 2rem;">
            <p>${text.author}: <a href="${authorPath}">${escapeHtml(AUTHOR_NAME)}</a>${dates ? ` · ${dates}` : ''}</p>${perex}
            ${sanitizeArticleHtml(article.content || '')}
          </article>`;
}

/** Complete HTML document of one article, built from the article shell template of its language. */
export function renderArticlePage(templateHtml, article, { lang = 'cs', alternates = [] } = {}) {
  const html = applyRouteMeta(templateHtml, { ...articleRoute(article, lang), alternates });
  // Article text goes right after the fallback H1 and lead paragraph
  return html.replace(/(<main[^>]*>\s*<h1>[\s\S]*?<\/h1>\s*<p>[\s\S]*?<\/p>)/, (block) => `${block}${renderArticleBody(article, lang)}`);
}
