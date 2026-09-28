// Which language version is running: kastrup.pl → Polish, everything else → Czech.
// On preview and local hosts the middleware sets the kastrup_site cookie from ?lang=pl / ?lang=cs.
import {
  SITES,
  STATIC_PAGES,
  articleAlternates,
  categoryName as categoryNameFor,
  isPolishHost,
  isProductionHost,
  pagePath,
  staticAlternates,
} from "../../api/_lib/sites.js";

export type Lang = "cs" | "pl";
export type PageKey = (typeof STATIC_PAGES)[number]["key"];

const detectLang = (): Lang => {
  if (typeof window === "undefined") return "cs";
  const host = window.location.hostname;
  if (isPolishHost(host)) return "pl";
  if (isProductionHost(host)) return "cs";
  const requested = new URLSearchParams(window.location.search).get("lang");
  if (requested === "pl" || requested === "cs") return requested;
  return /(?:^|;\s*)kastrup_site=pl(?:;|$)/.test(document.cookie) ? "pl" : "cs";
};

export const LANG: Lang = detectLang();
export const SITE = SITES[LANG];

/** Path of a static page in the current language (falls back to the home page). */
export const pathTo = (key: PageKey): string => pagePath(key, LANG) ?? "/";

/** Link to an article in the current language. */
export const articlePath = (slug: string): string => `${SITE.articlePrefix}${slug}`;

/** Absolute URL on the current site. */
export const absoluteUrl = (path: string): string => `${SITE.origin}${path}`;

export const categoryName = (category: { name: string; slug?: string } | null | undefined): string =>
  categoryNameFor(category, LANG);

export { articleAlternates, staticAlternates, STATIC_PAGES };
