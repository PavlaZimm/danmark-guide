import fs from 'fs';
import path from 'path';
import { createClient } from '@supabase/supabase-js';

const DEFAULT_SOCIAL_IMAGE = 'https://kastrup.cz/images/atterseebook.jpg';

const escapeHtml = (value = '') => String(value)
  .replaceAll('&', '&amp;')
  .replaceAll('"', '&quot;')
  .replaceAll('<', '&lt;')
  .replaceAll('>', '&gt;');

const serializeJsonLd = (value) => JSON.stringify(value).replaceAll('<', '\\u003c');

/**
 * Vite plugin to generate separate HTML files for each route with proper meta tags
 * This helps with SEO by ensuring crawlers see the right content
 * Automatically fetches all published articles from Supabase during build
 */
export default function routesHtmlPlugin() {
  return {
    name: 'routes-html-plugin',
    apply: 'build',
    transformIndexHtml: {
      order: 'post',
      handler(html) {
        return html;
      }
    },
    async closeBundle() {

      const routes = [
        {
          path: '', // Homepage - will modify dist/index.html directly
          title: 'Kastrup.cz - Váš průvodce po Dánsku | Cestování, Ubytování, Kultura',
          description: 'Objevte krásy Dánska s Kastrup.cz. Najděte nejlepší ubytování, poznejte dánskou kulturu, hygge a moderní design. Praktický průvodce pro cestovatele.',
          canonical: 'https://kastrup.cz/',
          heading: 'Kastrup.cz – průvodce po Dánsku',
          isHomepage: true
        },
        {
          path: 'clanky',
          title: 'Články o Dánsku | Cestování, Kultura, Tipy | Kastrup.cz',
          description: 'Čtěte zajímavé články o Dánsku, dánské kultuře, cestování, hygge a životě v severní Evropě. Praktické tipy a inspirace pro vaši cestu do Dánska.',
          canonical: 'https://kastrup.cz/clanky',
          heading: 'Průvodce a články o Dánsku'
        },
        {
          path: 'kultura',
          title: 'Hygge a dánská kultura bez klišé | Kastrup.cz',
          description: 'Poznejte hygge a dánskou kulturu bez klišé. Ověřené články o každodenním životě, jídle, tradicích, jazyce, designu a cestování po Dánsku.',
          canonical: 'https://kastrup.cz/kultura',
          heading: 'Hygge a dánská kultura bez klišé',
          fallbackHtml: `
          <section style="margin-top: 2rem;">
            <h2>Dánská kultura v souvislostech</h2>
            <p>Dánsko nejsou jen barevné domy, designové židle a žebříčky štěstí. Poznejte jazyk, jídlo, tradice a každodenní zvyky, které pomáhají pochopit, jak se v zemi skutečně žije.</p>
            <h2>Začněte u hygge</h2>
            <p>Hygge je dánské označení pro příjemnou, bezpečnou a uvolněnou atmosféru. Není to výrobek ani pouze styl bydlení.</p>
            <p><a href="/hygge">Přečíst průvodce: co je hygge, jak se vyslovuje a jak ho zažít</a></p>
          </section>`
        },
        {
          path: 'hygge',
          title: 'Hygge: co znamená a jak ho zažít v Dánsku | Kastrup.cz',
          description: 'Co je hygge, jak se vyslovuje a proč není jen o svíčkách? Poznejte skutečný význam hygge i konkrétní způsoby, jak ho zažít v Dánsku.',
          canonical: 'https://kastrup.cz/hygge',
          heading: 'Hygge bez klišé: co opravdu znamená a jak ho zažít',
          type: 'article',
          article: {
            title: 'Hygge bez klišé: co opravdu znamená a jak ho zažít',
            perex: 'Co je hygge, jak se vyslovuje a proč není jen o svíčkách? Poznejte skutečný význam hygge i konkrétní způsoby, jak ho zažít v Dánsku.',
            meta_description: 'Co je hygge, jak se vyslovuje a proč není jen o svíčkách? Poznejte skutečný význam hygge i konkrétní způsoby, jak ho zažít v Dánsku.',
            image_url: DEFAULT_SOCIAL_IMAGE,
            og_image: DEFAULT_SOCIAL_IMAGE,
            created_at: '2026-09-13T00:00:00+02:00',
            updated_at: '2026-09-13T00:00:00+02:00',
            focus_keyword: 'hygge, co je hygge, hygge význam, hygge výslovnost',
            categories: { name: 'Dánská kultura' }
          },
          fallbackHtml: `
          <article style="margin-top: 2rem; max-width: 800px;">
            <p><strong>Hygge je dánské označení pro příjemnou, bezpečnou a uvolněnou atmosféru,</strong> ve které člověk na chvíli zpomalí a užívá si obyčejný okamžik. Může vzniknout při společném jídle, rozhovoru nebo výletu, ale také o samotě. Není to výrobek ani pouze styl bydlení.</p>
            <h2>Jak se hygge vyslovuje</h2>
            <p>Dánský slovník uvádí výslovnost [ˈhygə]. České přepisy jako „hü-ge“ jsou jen orientační, protože dánské hlásky nemají přesný český protějšek.</p>
            <h2>Hygge není jen zimní</h2>
            <p>V zimě může mít podobu společné večeře, pečení nebo deskové hry. V létě je hygge piknik, projížďka na kole, dlouhá večeře venku nebo klidný den u moře.</p>
            <h2>Jak ho zažít v Dánsku</h2>
            <p>Nechte v programu volné místo, sdílejte jídlo, odložte telefon a nesnažte se najít podnik, který má hygge napsané na ceduli. Často vznikne v obyčejné chvíli bez turistického scénáře.</p>
            <p><a href="/kultura">Další články o dánské kultuře</a></p>
          </article>`
        },
        {
          path: 'cestovani',
          title: 'Cestování po Dánsku | Tipy a průvodce | Kastrup.cz',
          description: 'Praktické tipy pro cestování po Dánsku. Kam jet, co vidět, kde spát a jíst. Itineráře, doprava a rady pro vaši cestu do Dánska.',
          canonical: 'https://kastrup.cz/cestovani',
          heading: 'Cestování po Dánsku',
          fallbackHtml: `
          <section style="margin-top: 2rem;">
            <h2>Co vidět v Kodani</h2>
            <p>Pro první návštěvu jsme připravili vlastní fotografie, mapu památek a trasy seskupené podle čtvrtí.</p>
            <p><a href="/kodan">Otevřít praktického průvodce Kodaní</a></p>
          </section>`
        },
        {
          path: 'kodan',
          title: 'Co vidět v Kodani: mapa, místa a itinerář | Kastrup.cz',
          description: 'Co vidět v Kodani při první návštěvě? Vlastní fotografie, mapa památek, smysluplný itinerář, doprava z letiště a praktické tipy.',
          canonical: 'https://kastrup.cz/kodan',
          heading: 'Co vidět v Kodani: místa, která dávají smysl při první návštěvě',
          image: 'https://kastrup.cz/images/20240813_130726.jpg',
          type: 'article',
          article: {
            title: 'Co vidět v Kodani: místa, která dávají smysl při první návštěvě',
            perex: 'Co vidět v Kodani při první návštěvě? Vlastní fotografie, mapa památek, smysluplný itinerář, doprava z letiště a praktické tipy.',
            meta_description: 'Co vidět v Kodani při první návštěvě? Vlastní fotografie, mapa památek, smysluplný itinerář, doprava z letiště a praktické tipy.',
            image_url: 'https://kastrup.cz/images/20240813_130726.jpg',
            og_image: 'https://kastrup.cz/images/20240813_130726.jpg',
            created_at: '2026-09-13T00:00:00+02:00',
            updated_at: '2026-09-13T00:00:00+02:00',
            focus_keyword: 'Kodaň, co vidět v Kodani, Kodaň mapa, Kodaň zajímavosti',
            categories: { name: 'Cestování' }
          },
          fallbackHtml: `
          <article style="margin-top: 2rem; max-width: 800px;">
            <p>Při první návštěvě spojte <strong>Nyhavn, Amalienborg, Kastellet a Malou mořskou vílu</strong> do jedné pěší trasy. Druhý den projděte Rosenborg, Rundetårn, Christiansborg a Tivoli. Další čas věnujte Christianshavnu, Nørrebru nebo přístavnímu Refshaleøenu.</p>
            <h2>Co vidět v Kodani při první návštěvě</h2>
            <p>Kodaň je kompaktní, ale jednotlivé zajímavosti je nejlepší seskupit podle čtvrtí. Nyhavn spojte s královským Amalienborgem a pobřežní trasou přes Kastellet. Historické centrum projděte od Rosenborgu přes Rundetårn k Christiansborgu.</p>
            <h2>Kodaň mapa a praktické trasy</h2>
            <p>Dva dny stačí na hlavní památky. Třetí den přidejte Nørrebro, Christianshavn a Refshaleøen. Centrum lze projít pěšky; pro vzdálenější čtvrti využijte metro, autobus, přístavní autobus nebo kolo.</p>
            <h2>Kodaň letiště a cesta do centra</h2>
            <p>Z terminálu 3 jezdí do centra metro i vlak. Jízdenku si kupte před nástupem a aktuální spojení ověřte v Rejseplanen.</p>
            <p><a href="/clanek/letiste-kodan-kastrup-doprava-do-centra">Podrobná doprava z letiště Kodaň do centra</a></p>
          </article>`
        },
        {
          path: 'ubytovani',
          title: 'Ubytování v Dánsku | Mapa hotelů a apartmánů | Kastrup.cz',
          description: 'Porovnejte ubytování v Dánsku na interaktivní mapě. Praktické tipy pro výběr hotelu v Kodani, u letiště Kastrup i v dalších dánských městech.',
          canonical: 'https://kastrup.cz/ubytovani',
          heading: 'Ubytování v Dánsku',
          fallbackHtml: `
          <section style="margin-top: 2rem;">
            <h2>Naplánujte si pobyt</h2>
            <p>Než vyberete čtvrť, projděte si <a href="/kodan">co vidět v Kodani</a> a porovnejte si <a href="/clanek/letiste-kodan-kastrup-doprava-do-centra">dopravu z letiště Kodaň do centra</a>.</p>
          </section>`
        },
        {
          path: 'kontakt',
          title: 'Kontakt | Kastrup.cz',
          description: 'Kontaktujte nás pro dotazy ohledně cestování do Dánska. Pavla Zimmermannová, váš průvodce dánskou kulturou, ubytováním a tipy na cesty.',
          canonical: 'https://kastrup.cz/kontakt',
          heading: 'Kontakt'
        },
        {
          path: 'o-dansku',
          title: 'Dánsko: Kompletní průvodce | Kastrup.cz',
          description: 'Kompletní průvodce po Dánsku: příroda, hrady, design, hygge. Praktické informace, itineráře, doprava a tipy kdy jet.',
          canonical: 'https://kastrup.cz/o-dansku',
          heading: 'Dánsko: kompletní průvodce',
          fallbackHtml: `
          <section style="margin-top: 2rem;">
            <h2>Začněte plánovat cestu</h2>
            <p>Pro první návštěvu využijte průvodce <a href="/kodan">co vidět v Kodani</a>, praktický přehled <a href="/clanek/letiste-kodan-kastrup-doprava-do-centra">dopravy z letiště</a> a vysvětlení, <a href="/hygge">co je hygge</a>.</p>
          </section>`
        },
        {
          path: 'autorka',
          title: 'Pavla Zimmermannová – autorka Kastrup.cz',
          description: 'Poznejte Pavlu Zimmermannovou, autorku Kastrup.cz. Sdílí praktické tipy, vlastní zkušenosti a inspiraci pro cesty po Dánsku.',
          canonical: 'https://kastrup.cz/autorka',
          heading: 'Pavla Zimmermannová – autorka Kastrup.cz',
          image: DEFAULT_SOCIAL_IMAGE,
          type: 'profile'
        },
        {
          path: 'ochrana-soukromi',
          title: 'Ochrana soukromí a cookies | Kastrup.cz',
          description: 'Informace o ochraně osobních údajů, používání cookies a službě Google Analytics na webu Kastrup.cz včetně možnosti změnit souhlas.',
          canonical: 'https://kastrup.cz/ochrana-soukromi',
          heading: 'Ochrana soukromí a cookies'
        }
      ];

      // Store articles list for later use
      let articlesList = [];

      // Fallback article (in case Supabase fetch fails in build environment)
      // This will be replaced by actual articles from Supabase in production
      const fallbackArticle = {
        slug: 'kastrup-kodansky-poklad-moderni-architektury-more-a-volnosti',
        title: 'Kastrup: Kodaňský poklad moderní architektury, moře a volnosti',
        meta_title: 'Kastrup: Kodaňský poklad moderní architektury, moře a volnosti | Kastrup.cz',
        meta_description: 'Objevte Kastrup - kodaňskou čtvrť u moře s moderní architekturou, plážemi a unikátní atmosférou. Průvodce po klidné části Kodaně blízko letiště.',
        image_url: DEFAULT_SOCIAL_IMAGE,
        og_image: null,
        created_at: '2025-12-01T00:00:00+01:00',
        updated_at: '2025-12-01T00:00:00+01:00',
        focus_keyword: 'Kastrup',
        categories: { name: 'Cestování' }
      };

      // Fetch all published articles from Supabase and add them to routes
      try {
        // Try to read env from process.env (works in production/CI)
        // or import.meta.env (not available here), so we'll try to read .env file directly
        let supabaseUrl = process.env.VITE_SUPABASE_URL;
        let supabaseKey = process.env.VITE_SUPABASE_PUBLISHABLE_KEY;

        // If not in process.env, try to read from .env file
        if (!supabaseUrl || !supabaseKey || supabaseKey === 'your_supabase_anon_key_here') {
          try {
            const envPath = path.resolve(process.cwd(), '.env');
            if (fs.existsSync(envPath)) {
              const envContent = fs.readFileSync(envPath, 'utf-8');
              const urlMatch = envContent.match(/VITE_SUPABASE_URL=(.+)/);
              const keyMatch = envContent.match(/VITE_SUPABASE_PUBLISHABLE_KEY=(.+)/);

              if (urlMatch) supabaseUrl = urlMatch[1].trim();
              if (keyMatch) supabaseKey = keyMatch[1].trim();
            }
          } catch (e) {
            console.warn('Could not read .env file:', e.message);
          }
        }

        if (supabaseUrl && supabaseKey && supabaseKey !== 'your_supabase_anon_key_here') {
          console.log('Fetching articles from Supabase...');

          const supabase = createClient(supabaseUrl, supabaseKey);
          const { data: articles, error } = await supabase
            .from('articles')
            .select('slug, title, perex, meta_title, meta_description, image_url, og_image, created_at, updated_at, focus_keyword, categories(name)')
            .eq('published', true)
            .order('created_at', { ascending: false });

          if (error) {
            console.warn('Failed to fetch articles from Supabase:', error.message);
          } else if (articles && articles.length > 0) {
            console.log(`Found ${articles.length} published articles`);

            articles.forEach(article => {
              articlesList.push(article); // Store for article links
              routes.push({
                path: `clanek/${article.slug}`,
                title: article.meta_title || `${article.title} | Kastrup.cz`,
                description: article.meta_description || article.perex || `Přečtěte si článek ${article.title} na Kastrup.cz`,
                canonical: `https://kastrup.cz/clanek/${article.slug}`,
                image: article.og_image || article.image_url || DEFAULT_SOCIAL_IMAGE,
                type: 'article',
                heading: article.title,
                article
              });
            });
          } else {
            console.log('No published articles found');
          }
        } else {
          console.warn('Supabase credentials not found - skipping article prerendering');
        }
      } catch (error) {
        console.error('Error fetching articles:', error);
      }

      // Fallback: If no articles were fetched (build environment without network),
      // use the fallback article to ensure at least one article link exists
      if (articlesList.length === 0) {
        console.log('Using fallback article for build');
        articlesList.push(fallbackArticle);
        routes.push({
          path: `clanek/${fallbackArticle.slug}`,
          title: fallbackArticle.meta_title,
          description: fallbackArticle.meta_description,
          canonical: `https://kastrup.cz/clanek/${fallbackArticle.slug}`,
          image: fallbackArticle.image_url,
          type: 'article',
          heading: fallbackArticle.title,
          article: fallbackArticle
        });
      }

      const distPath = path.resolve(process.cwd(), 'dist');
      const indexHtmlPath = path.join(distPath, 'index.html');

      if (!fs.existsSync(indexHtmlPath)) {
        console.warn('index.html not found in dist folder');
        return;
      }

      const indexHtml = fs.readFileSync(indexHtmlPath, 'utf-8');

      const notFoundHtml = indexHtml
        .replace(/<title>.*?<\/title>/, '<title>404 - Stránka nenalezena | Kastrup.cz</title>')
        .replace(/<meta name="description" content=".*?"/, '<meta name="description" content="Požadovaná stránka na Kastrup.cz nebyla nalezena."')
        .replace('</head>', '    <meta name="robots" content="noindex, follow" />\n  </head>');
      fs.writeFileSync(path.join(distPath, '404.html'), notFoundHtml);
      console.log('✓ Generated 404.html');

      routes.forEach(route => {
        // For homepage, modify the main index.html directly
        let targetHtmlPath;
        if (route.isHomepage) {
          targetHtmlPath = indexHtmlPath;
        } else {
          // Create directory for other routes
          const routeDir = path.join(distPath, route.path);
          if (!fs.existsSync(routeDir)) {
            fs.mkdirSync(routeDir, { recursive: true });
          }
          targetHtmlPath = path.join(routeDir, 'index.html');
        }

        // Modify HTML with route-specific meta tags
        const safeTitle = escapeHtml(route.title);
        const safeDescription = escapeHtml(route.description);
        const safeCanonical = escapeHtml(route.canonical);
        const safeImage = escapeHtml(route.image || DEFAULT_SOCIAL_IMAGE);
        const safeType = route.type === 'article' ? 'article' : route.type === 'profile' ? 'profile' : 'website';
        const imageSizeMeta = safeImage === DEFAULT_SOCIAL_IMAGE
          ? '\n    <meta property="og:image:width" content="1600" />\n    <meta property="og:image:height" content="1200" />'
          : '';

        let routeHtml = indexHtml
          .replace(/<title>.*?<\/title>/, `<title>${safeTitle}</title>`)
          .replace(/<meta name="description" content=".*?"/, `<meta name="description" content="${safeDescription}"`);

        // Add canonical link if not present
        if (!routeHtml.includes('rel="canonical"')) {
          routeHtml = routeHtml.replace(
            '</head>',
            `    <link rel="canonical" href="${safeCanonical}" />\n  </head>`
          );
        } else {
          routeHtml = routeHtml.replace(
            /<link rel="canonical" href=".*?".*?\/>/,
            `<link rel="canonical" href="${safeCanonical}" />`
          );
        }

        // Add OG tags
        routeHtml = routeHtml.replace(
          /<meta property="og:type".*?>/,
          `<meta property="og:type" content="${safeType}" />
    <meta property="og:url" content="${safeCanonical}" />
    <meta property="og:title" content="${safeTitle}" />
    <meta property="og:description" content="${safeDescription}" />
    <meta property="og:image" content="${safeImage}" />${imageSizeMeta}
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${safeTitle}" />
    <meta name="twitter:description" content="${safeDescription}" />
    <meta name="twitter:image" content="${safeImage}" />`
        );

        if (route.type === 'article' && route.article) {
          const article = route.article;
          const articleUrl = route.canonical;
          const articleImage = article.og_image || article.image_url || DEFAULT_SOCIAL_IMAGE;
          const articleSchema = serializeJsonLd({
            '@context': 'https://schema.org',
            '@type': 'Article',
            '@id': `${articleUrl}#article`,
            headline: article.title,
            description: article.meta_description || article.perex,
            image: articleImage,
            datePublished: article.created_at,
            dateModified: article.updated_at || article.created_at,
            author: {
              '@type': 'Person',
              name: 'Pavla Zimmermannová',
              url: 'https://kastrup.cz/autorka'
            },
            publisher: {
              '@type': 'Organization',
              name: 'Kastrup.cz',
              url: 'https://kastrup.cz',
              logo: {
                '@type': 'ImageObject',
                url: 'https://kastrup.cz/icon-512.svg',
                width: 512,
                height: 512
              }
            },
            mainEntityOfPage: {
              '@type': 'WebPage',
              '@id': articleUrl
            },
            articleSection: article.categories?.name,
            keywords: article.focus_keyword || undefined,
            inLanguage: 'cs-CZ'
          });
          const articleMeta = [
            article.created_at
              ? `    <meta property="article:published_time" content="${escapeHtml(article.created_at)}" />`
              : '',
            article.updated_at
              ? `    <meta property="article:modified_time" content="${escapeHtml(article.updated_at)}" />`
              : '',
            `    <script id="server-article-schema" type="application/ld+json">${articleSchema}</script>`
          ].filter(Boolean).join('\n');

          routeHtml = routeHtml.replace('</head>', `${articleMeta}\n  </head>`);
        }

        const safeHeading = escapeHtml(route.heading || route.title);
        routeHtml = routeHtml
          .replace(
            /<h1>Kastrup\.cz - Váš průvodce po Dánsku<\/h1>/,
            `<h1>${safeHeading}</h1>`
          )
          .replace(
            /<p>Načítání stránky\.\.\. Pro plné zobrazení prosím zapněte JavaScript\.<\/p>/,
            `<p>${safeDescription}</p>`
          );

        // For /clanky page, add list of article links for crawlers
        if (route.path === 'clanky' && articlesList.length > 0) {
          const articlesLinksHtml = `
          <section style="margin-top: 2rem;">
            <h2>Naše články:</h2>
            <ul>
              ${articlesList.map(article => `<li><a href="/clanek/${encodeURIComponent(article.slug)}">${escapeHtml(article.title)}</a></li>`).join('\n              ')}
            </ul>
          </section>`;

          // Insert article links before the closing </main> tag
          routeHtml = routeHtml.replace(
            /<\/nav>\s*<\/main>/,
            `</nav>${articlesLinksHtml}\n      </main>`
          );
        }

        if (route.fallbackHtml) {
          routeHtml = routeHtml.replace(
            '</main>',
            `${route.fallbackHtml}\n        </main>`
          );
        }

        // Note: Basic HTML structure with links is now in index.html
        // React will replace the content of #root when JS loads
        // Crawlers that don't execute JS will see the fallback content with links

        // Write the HTML file
        fs.writeFileSync(targetHtmlPath, routeHtml);
        if (route.isHomepage) {
          console.log(`✓ Updated index.html (homepage)`);
        } else {
          console.log(`✓ Generated ${route.path}/index.html`);
        }
      });
    }
  };
}
