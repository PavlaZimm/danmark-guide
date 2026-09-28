// Vercel Routing Middleware: one deployment, two domains.
// kastrup.pl gets the Polish build (dist/pl/…, Polish articles, Polish sitemap and 404);
// kastrup.cz stays exactly as before and never exposes the Polish files under /pl.
// On preview and local hosts ?lang=pl switches the Polish version on (cookie), ?lang=cs off.
import { findStaticPage, isPolishHost, isProductionHost } from './api/_lib/sites.js';

export const config = {
  matcher: '/((?!assets/|images/).*)',
};

const PREVIEW_COOKIE = 'kastrup_site';

const rewrite = (url, headers = {}) =>
  new Response(null, { headers: { ...headers, 'x-middleware-rewrite': url.toString() } });
const next = (headers = {}) => new Response(null, { headers: { ...headers, 'x-middleware-next': '1' } });

export default function middleware(request) {
  const url = new URL(request.url);
  const host = request.headers.get('host') || url.host;
  const path = url.pathname;

  if (/^www\.kastrup\.pl$/i.test(host)) {
    return Response.redirect(`https://kastrup.pl${path}${url.search}`, 308);
  }

  // Preview switch (never on the production domains)
  let polish = isPolishHost(host);
  const extraHeaders = {};
  if (!isProductionHost(host)) {
    const requested = url.searchParams.get('lang');
    const cookie = request.headers.get('cookie') || '';
    if (requested === 'pl' || requested === 'cs') {
      polish = requested === 'pl';
      extraHeaders['set-cookie'] = `${PREVIEW_COOKIE}=${requested}; Path=/; SameSite=Lax`;
    } else {
      polish = new RegExp(`(?:^|;\\s*)${PREVIEW_COOKIE}=pl(?:;|$)`).test(cookie);
    }
  }

  if (!polish) {
    // The Polish build files must not be reachable on the Czech domain (duplicate content)
    if (path === '/pl' || path.startsWith('/pl/')) {
      return rewrite(new URL('/api/article?notfound=1', url), extraHeaders);
    }
    return next(extraHeaders);
  }

  if (path.startsWith('/api/')) return next(extraHeaders);
  if (path === '/sitemap.xml') return rewrite(new URL('/api/sitemap?lang=pl', url), extraHeaders);
  if (path === '/robots.txt') return rewrite(new URL('/pl/robots.txt', url), extraHeaders);

  const article = path.match(/^\/artykul\/([^/]+)$/);
  if (article) {
    return rewrite(new URL(`/api/article?lang=pl&slug=${encodeURIComponent(article[1])}`, url), extraHeaders);
  }

  const page = findStaticPage(path, 'pl');
  if (page) {
    return rewrite(new URL(page.pl === '/' ? '/pl' : `/pl${page.pl}`, url), extraHeaders);
  }

  // Shared static files (icons, manifest…) are served as they are
  if (/\.[a-z0-9]+$/i.test(path)) return next(extraHeaders);

  // Anything else on the Polish site (including the Czech-only admin) is a Polish 404
  return rewrite(new URL('/api/article?lang=pl&notfound=1', url), extraHeaders);
}
