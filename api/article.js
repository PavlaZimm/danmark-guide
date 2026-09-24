import { createClient } from '@supabase/supabase-js';
import { ARTICLE_SELECT, SITE_URL, renderArticlePage } from './_lib/article-html.js';

// Serves every /clanek/:slug (vercel.json rewrite). Crawlers get the real title, meta,
// schema and article text in the HTML; unknown slugs get a real 404 instead of an
// empty page with status 200. React then renders the page as before.

const CACHE_OK = 'public, max-age=0, s-maxage=300, stale-while-revalidate=86400';
const CACHE_NOT_FOUND = 'public, max-age=0, s-maxage=300';
const CACHE_TRANSIENT = 'public, max-age=0, s-maxage=30';

let templatesPromise;

async function loadTemplates() {
  try {
    const generated = await import('./_generated/templates.js');
    return { ...generated, source: 'build' };
  } catch {
    // Build output missing (local run): use the templates of the live site
    const [shell, notFound] = await Promise.all(
      ['/clanek-shell.html', '/404.html'].map(async (file) => {
        const response = await fetch(`${SITE_URL}${file}`);
        if (!response.ok) throw new Error(`Template ${file} returned ${response.status}`);
        return response.text();
      })
    );
    return { articleShellHtml: shell, notFoundHtml: notFound, source: 'live' };
  }
}

export const isValidSlug = (slug) => typeof slug === 'string' && /^[a-z0-9][a-z0-9-]{0,199}$/.test(slug);

export async function resolveArticleResponse({ slug, fetchArticle, templates }) {
  if (!isValidSlug(slug)) {
    return { status: 404, cache: CACHE_NOT_FOUND, html: templates.notFoundHtml };
  }

  let article;
  try {
    article = await fetchArticle(slug);
  } catch (error) {
    // Database hiccup: never answer 404 for an article that may exist, hand the page to React
    console.error('Article lookup failed:', error?.message || error);
    return { status: 200, cache: CACHE_TRANSIENT, html: templates.articleShellHtml };
  }

  if (!article) {
    return { status: 404, cache: CACHE_NOT_FOUND, html: templates.notFoundHtml };
  }

  return { status: 200, cache: CACHE_OK, html: renderArticlePage(templates.articleShellHtml, article) };
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

  let templates;
  try {
    templates = await templatesPromise;
  } catch (error) {
    console.error('Article templates unavailable:', error?.message || error);
    res.setHeader('Cache-Control', 'no-store');
    return res.status(503).send('Služba je dočasně nedostupná. Zkuste to prosím za chvíli.');
  }

  const supabaseUrl = process.env.VITE_SUPABASE_URL;
  const supabaseKey = process.env.VITE_SUPABASE_PUBLISHABLE_KEY;
  const supabase = supabaseUrl && supabaseKey ? createClient(supabaseUrl, supabaseKey) : null;

  const slug = String(req.query.slug ?? '');
  const result = await resolveArticleResponse({
    slug,
    templates,
    fetchArticle: async (value) => {
      if (!supabase) throw new Error('Missing Supabase credentials');
      const { data, error } = await supabase
        .from('articles')
        .select(ARTICLE_SELECT)
        .eq('slug', value)
        .eq('published', true)
        .maybeSingle();
      if (error) throw error;
      return data;
    },
  });

  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  res.setHeader('Cache-Control', result.cache);
  res.setHeader('X-Kastrup-Template', templates.source);
  return res.status(result.status).send(req.method === 'HEAD' ? '' : result.html);
}
