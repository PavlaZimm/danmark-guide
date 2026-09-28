import { createClient } from '@supabase/supabase-js';
import { ARTICLE_SELECT, SITE_URL, renderArticlePage } from './_lib/article-html.js';
import { articleAlternates, HREFLANG_LIVE, LANGS } from './_lib/sites.js';

// Serves every article page: /clanek/:slug on kastrup.cz (vercel.json rewrite) and
// /artykul/:slug on kastrup.pl (middleware.js). Crawlers get the real title, meta, schema,
// hreflang and article text in the HTML; unknown slugs get a real 404 in the site's language.
// React then renders the page as before. ?notfound=1 renders just the 404 page.

const CACHE_OK = 'public, max-age=0, s-maxage=300, stale-while-revalidate=86400';
const CACHE_NOT_FOUND = 'public, max-age=0, s-maxage=300';
const CACHE_TRANSIENT = 'public, max-age=0, s-maxage=30';

let templatesPromise;

async function loadTemplates() {
  try {
    const generated = await import('./_generated/templates.js');
    return { ...generated, source: 'build' };
  } catch {
    // Build output missing (local run): use the templates of the live Czech site
    const [shell, notFound] = await Promise.all(
      ['/clanek-shell.html', '/404.html'].map(async (file) => {
        const response = await fetch(`${SITE_URL}${file}`);
        if (!response.ok) throw new Error(`Template ${file} returned ${response.status}`);
        return response.text();
      })
    );
    return { templates: { cs: { articleShellHtml: shell, notFoundHtml: notFound } }, source: 'live' };
  }
}

export const isValidSlug = (slug) => typeof slug === 'string' && /^[a-z0-9][a-z0-9-]{0,199}$/.test(slug);
export const resolveLang = (value) => (LANGS.includes(value) ? value : 'cs');

export async function resolveArticleResponse({ slug, lang = 'cs', notFound = false, fetchArticle, fetchAlternates, templates }) {
  const own = templates[lang] || templates.cs;
  if (notFound || !isValidSlug(slug)) {
    return { status: 404, cache: CACHE_NOT_FOUND, html: own.notFoundHtml };
  }

  let article;
  try {
    article = await fetchArticle(slug, lang);
  } catch (error) {
    // Database hiccup: never answer 404 for an article that may exist, hand the page to React
    console.error('Article lookup failed:', error?.message || error);
    return { status: 200, cache: CACHE_TRANSIENT, html: own.articleShellHtml };
  }

  if (!article) {
    return { status: 404, cache: CACHE_NOT_FOUND, html: own.notFoundHtml };
  }

  let alternates = [];
  if (HREFLANG_LIVE && fetchAlternates) {
    try {
      alternates = articleAlternates(await fetchAlternates(article));
    } catch (error) {
      console.error('Alternate lookup failed:', error?.message || error);
    }
  }

  return { status: 200, cache: CACHE_OK, html: renderArticlePage(own.articleShellHtml, article, { lang, alternates }) };
}

export default async function handler(req, res) {
  if (req.method !== 'GET' && req.method !== 'HEAD') {
    res.setHeader('Allow', 'GET, HEAD');
    return res.status(405).send('Method not allowed');
  }

  templatesPromise ??= loadTemplates().catch((error) => {
    templatesPromise = undefined;
    throw error;
  });

  let loaded;
  try {
    loaded = await templatesPromise;
  } catch (error) {
    console.error('Article templates unavailable:', error?.message || error);
    res.setHeader('Cache-Control', 'no-store');
    return res.status(503).send('Služba je dočasně nedostupná. Zkuste to prosím za chvíli.');
  }

  const supabaseUrl = process.env.VITE_SUPABASE_URL;
  const supabaseKey = process.env.VITE_SUPABASE_PUBLISHABLE_KEY;
  const supabase = supabaseUrl && supabaseKey ? createClient(supabaseUrl, supabaseKey) : null;

  const lang = resolveLang(String(req.query.lang ?? 'cs'));
  const result = await resolveArticleResponse({
    slug: String(req.query.slug ?? ''),
    lang,
    notFound: req.query.notfound === '1',
    templates: loaded.templates,
    fetchArticle: async (slug, articleLang) => {
      if (!supabase) throw new Error('Missing Supabase credentials');
      const { data, error } = await supabase
        .from('articles')
        .select(ARTICLE_SELECT)
        .eq('lang', articleLang)
        .eq('slug', slug)
        .eq('published', true)
        .maybeSingle();
      if (error) throw error;
      return data;
    },
    // Slugs of the same article in every language: the Czech original plus its translations
    fetchAlternates: async (article) => {
      const originalId = article.translation_of || article.id;
      const { data, error } = await supabase
        .from('articles')
        .select('lang, slug')
        .eq('published', true)
        .or(`id.eq.${originalId},translation_of.eq.${originalId}`);
      if (error) throw error;
      return Object.fromEntries((data || []).map((row) => [row.lang, row.slug]));
    },
  });

  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  res.setHeader('Cache-Control', result.cache);
  res.setHeader('X-Kastrup-Template', loaded.source);
  return res.status(result.status).send(req.method === 'HEAD' ? '' : result.html);
}
