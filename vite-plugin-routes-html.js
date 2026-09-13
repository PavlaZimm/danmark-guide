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
          title: 'Dánská kultura a tradice | Kastrup.cz',
          description: 'Objevte dánskou kulturu, tradice, hygge a životní styl. Články o dánském designu, architektuře, umění a způsobu života v Dánsku.',
          canonical: 'https://kastrup.cz/kultura',
          heading: 'Dánská kultura a tradice'
        },
        {
          path: 'cestovani',
          title: 'Cestování po Dánsku | Tipy a průvodce | Kastrup.cz',
          description: 'Praktické tipy pro cestování po Dánsku. Kam jet, co vidět, kde spát a jíst. Itineráře, doprava a rady pro vaši cestu do Dánska.',
          canonical: 'https://kastrup.cz/cestovani',
          heading: 'Cestování po Dánsku'
        },
        {
          path: 'ubytovani',
          title: 'Ubytování v Dánsku | Mapa hotelů a apartmánů | Kastrup.cz',
          description: 'Porovnejte ubytování v Dánsku na interaktivní mapě. Praktické tipy pro výběr hotelu v Kodani, u letiště Kastrup i v dalších dánských městech.',
          canonical: 'https://kastrup.cz/ubytovani',
          heading: 'Ubytování v Dánsku'
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
          heading: 'Dánsko: kompletní průvodce'
        },
        {
          path: 'autorka',
          title: 'Pavla Zimmermannová – autorka Kastrup.cz',
          description: 'Poznejte Pavlu Zimmermannovou, autorku Kastrup.cz. Sdílí praktické tipy, vlastní zkušenosti a inspiraci pro cesty po Dánsku.',
          canonical: 'https://kastrup.cz/autorka',
          heading: 'Pavla Zimmermannová – autorka Kastrup.cz',
          image: 'https://kastrup.cz/images/pavla-author.jpg',
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
