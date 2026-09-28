import { Helmet } from "react-helmet-async";
import { useLocation } from "react-router-dom";
import { LANG, staticAlternates } from "@/lib/site";
import { findStaticPage } from "../../api/_lib/sites.js";

/** Document language and hreflang links of the current static page (articles add their own). */
const SiteAlternates = () => {
  const { pathname } = useLocation();
  const page = findStaticPage(pathname, LANG);
  const alternates = page ? staticAlternates(page.key) : [];

  return (
    <Helmet htmlAttributes={{ lang: LANG }}>
      {alternates.map((alt) => (
        <link key={alt.hreflang} rel="alternate" hrefLang={alt.hreflang} href={alt.href} />
      ))}
    </Helmet>
  );
};

export default SiteAlternates;
