import fs from 'fs';
import path from 'path';
import { createClient } from '@supabase/supabase-js';
import {
  DEFAULT_SOCIAL_IMAGE,
  applyRouteMeta,
  escapeHtml,
} from './api/_lib/article-html.js';
import { SITES, findStaticPage, staticAlternates } from './api/_lib/sites.js';
import { PL_ROUTES, PL_FALLBACK_LINKS } from './seo/pl-routes.js';

// Polish variant of the built index.html: document language, Open Graph locale and the
// no-JS fallback navigation. The H1/lead placeholders stay so applyRouteMeta fills them.
const toPolishTemplate = (html) => {
  const navLinks = PL_FALLBACK_LINKS
    .map(([href, label]) => `<a href="${href}" style="margin: 0 0.5rem; color: var(--fg, inherit);">${escapeHtml(label)}</a>`)
    .join('\n            ');
  const sectionLinks = PL_FALLBACK_LINKS.slice(1)
    .map(([href, label]) => `<li><a href="${href}">${escapeHtml(label)}</a></li>`)
    .join('\n              ');
  const fallback = `<div class="fallback-content">
        <header style="padding: 1rem; background: var(--bg, #f5f5f5); border-bottom: 2px solid #dc2626;">
          <nav>
            <a href="/" style="margin: 0 1rem; color: #dc2626; font-weight: bold;">Kastrup.pl</a>
            ${navLinks}
          </nav>
        </header>
        <main style="padding: 2rem; max-width: 1200px; margin: 0 auto;">
          <h1>Kastrup.cz - Váš průvodce po Dánsku</h1>
          <p>Načítání stránky... Pro plné zobrazení prosím zapněte JavaScript.</p>
          <nav style="margin-top: 2rem;">
            <h2>Główne sekcje:</h2>
            <ul>
              ${sectionLinks}
            </ul>
          </nav>
        </main>
        <footer style="padding: 2rem; background: #1f2937; color: white; margin-top: 3rem;">
          <div style="max-width: 1200px; margin: 0 auto;">
            <p>&copy; ${new Date().getFullYear()} Kastrup.pl - Twój przewodnik po Danii</p>
          </div>
        </footer>
      </div>`;
  const polished = html
    .replace(/<html lang="[a-z-]+">/, '<html lang="pl">')
    .replace(/<meta property="og:locale" content="[^"]*"/, `<meta property="og:locale" content="${SITES.pl.locale}"`)
    .replace(/<meta property="og:site_name" content="[^"]*"/, `<meta property="og:site_name" content="${SITES.pl.name}"`)
    .replace(/<div class="fallback-content">[\s\S]*?<\/footer>\s*<\/div>/, fallback);
  if (!polished.includes('Główne sekcje')) throw new Error('Polish fallback navigation was not inserted into index.html');
  return polished;
};

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
          heading: 'Průvodce po Dánsku: Kodaň, hygge a cestování',
          isHomepage: true,
          // Hashed file names are resolved from dist/assets after the build
          preloadImage: {
            assets: [
              { pattern: /^hero-denmark-768-[\w-]{8}\.webp$/, width: 768 },
              { pattern: /^hero-denmark-1280-[\w-]{8}\.webp$/, width: 1280 },
              { pattern: /^hero-denmark-[\w-]{8}\.webp$/, width: 1920 }
            ],
            sizes: '100vw'
          }
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
            <p><a href="/clanek/dansky-design">Dánský design: muzeum a obchody v Kodani</a></p>
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
          path: 'danstina',
          title: 'Dánština: jazyk, výslovnost a fráze | Kastrup.cz',
          description: 'Jak se mluví v Dánsku? Poznejte dánštinu, její výslovnost, abecedu a praktické fráze na cestu bez zavádějícího fonetického přepisu.',
          canonical: 'https://kastrup.cz/danstina',
          heading: 'Dánština: jak se mluví v Dánsku a co se hodí znát',
          image: 'https://kastrup.cz/images/IMG_20230712_091836.webp',
          type: 'article',
          article: {
            title: 'Dánština: jak se mluví v Dánsku a co se hodí znát',
            perex: 'Dánština vypadá na papíře přístupněji, než zní. Poznejte její abecedu, výslovnost a praktické fráze na cestu.',
            meta_description: 'Jak se mluví v Dánsku? Poznejte dánštinu, její výslovnost, abecedu a praktické fráze na cestu bez zavádějícího fonetického přepisu.',
            image_url: 'https://kastrup.cz/images/IMG_20230712_091836.webp',
            og_image: 'https://kastrup.cz/images/IMG_20230712_091836.webp',
            created_at: '2026-09-13T00:00:00+02:00',
            updated_at: '2026-09-13T00:00:00+02:00',
            focus_keyword: 'dánština, dánsko jazyk, jak se mluví v Dánsku, dánská abeceda',
            categories: { name: 'Dánská kultura' }
          },
          fallbackHtml: `
          <article style="margin-top: 2rem; max-width: 800px;">
            <p>V Dánsku se mluví <strong>dánsky</strong>. Dánština je severogermánský jazyk s přibližně šesti miliony mluvčích. Je příbuzná norštině a švédštině, ale její mluvená podoba bývá pro cizince obtížnější než psaný text.</p>
            <h2>Jak se mluví v Dánsku</h2>
            <p>Dánská abeceda má za písmenem Z ještě Æ, Ø a Å. Výslovnost komplikuje redukce hlásek a zvuk zvaný stød, proto je lepší spojit psané fráze s poslechem rodilých mluvčích.</p>
            <h2>Základní dánské fráze</h2>
            <p>Hej znamená ahoj, tak děkuji, undskyld promiňte a Taler du engelsk? znamená Mluvíte anglicky?</p>
            <p><a href="/kultura">Další témata o dánské kultuře</a></p>
          </article>`
        },
        {
          path: 'danske-ostrovy',
          title: 'Dánské ostrovy: kam jet a co vidět | Kastrup.cz',
          description: 'Dánské ostrovy přehledně: Sjælland, Fyn, Møn, Bornholm, Samsø, Ærø, Fanø a Rømø. Mapa, doprava a výběr ostrova podle typu cesty.',
          canonical: 'https://kastrup.cz/danske-ostrovy',
          heading: 'Dánské ostrovy: které vybrat, co vidět a jak se tam dostat',
          image: 'https://kastrup.cz/images/20240811_202640.jpg',
          type: 'article',
          article: {
            title: 'Dánské ostrovy: které vybrat, co vidět a jak se tam dostat',
            perex: 'Dánsko tvoří Jutsko a stovky ostrovů. Vyberte si Sjælland, Fyn, Møn, Bornholm nebo menší ostrov podle typu cesty.',
            meta_description: 'Dánské ostrovy přehledně: Sjælland, Fyn, Møn, Bornholm, Samsø, Ærø, Fanø a Rømø. Mapa, doprava a výběr ostrova podle typu cesty.',
            image_url: 'https://kastrup.cz/images/20240811_202640.jpg',
            og_image: 'https://kastrup.cz/images/20240811_202640.jpg',
            created_at: '2026-09-13T00:00:00+02:00',
            updated_at: '2026-09-13T00:00:00+02:00',
            focus_keyword: 'dánské ostrovy, Dánsko ostrovy, dánský ostrov, Fyn',
            categories: { name: 'Cestování' }
          },
          fallbackHtml: `
          <article style="margin-top: 2rem; max-width: 800px;">
            <p>VisitDenmark uvádí 444 pojmenovaných ostrovů. Na první městskou cestu zvolte <strong>Sjælland</strong> s Kodaní, pro Odense a klidnější venkov <strong>Fyn</strong>.</p>
            <h2>Který dánský ostrov vybrat</h2>
            <p>Møn láká na křídové útesy, Bornholm na skalnaté pobřeží a delší aktivní dovolenou. Samsø a Ærø se hodí pro kolo a pomalejší cestu, Fanø a Rømø pro pláže Wattového moře.</p>
            <h2>Jak se na dánské ostrovy dostat</h2>
            <p>Sjælland a Fyn spojují mosty a vlaky. Na menší ostrovy jezdí trajekty; s autem je vhodné rezervovat místo předem.</p>
            <p><a href="/o-dansku">Kompletní průvodce Dánskem</a></p>
          <p><a href="/clanek/mons-klint">Møns Klint: parkování a schody</a> · <a href="/clanek/mosty-v-dansku">Ceny mostů Storebælt a Øresund</a> · <a href="/clanek/ribe">Ribe při cestě Jutskem</a></p>
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
            <p><a href="/clanek/dansky-design">Dánský design v Kodani: ceny muzea a obchody</a></p>
            <h2>Kodaň mapa a praktické trasy</h2>
            <p>Dva dny stačí na hlavní památky. Třetí den přidejte Nørrebro, Christianshavn a Refshaleøen. Centrum lze projít pěšky; pro vzdálenější čtvrti využijte metro, autobus, přístavní autobus nebo kolo.</p>
            <h2>Kodaň letiště a cesta do centra</h2>
            <p>Z terminálu 3 jezdí do centra metro i vlak. Jízdenku si kupte před nástupem a aktuální spojení ověřte v Rejseplanen.</p>
            <p><a href="/clanek/letiste-kodan-kastrup-doprava-do-centra">Podrobná doprava z letiště Kodaň do centra</a></p>
          <p><a href="/clanek/mosty-v-dansku">Cesta autem do Dánska: ceny mostů</a> · <a href="/clanek/mons-klint">Výlet k Møns Klint autem</a></p>
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
          title: 'Co vidět v Dánsku: kompletní průvodce a tipy | Kastrup.cz',
          description: 'Co vidět v Dánsku a co navštívit? Kodaň, Jutsko, ostrovy, hrady i příroda. Praktický průvodce s itineráři, dopravou a tipy, kdy jet.',
          canonical: 'https://kastrup.cz/o-dansku',
          heading: 'Co vidět v Dánsku: kompletní průvodce',
          fallbackHtml: `
          <section style="margin-top: 2rem;">
            <h2>Začněte plánovat cestu</h2>
            <p>Pro první návštěvu využijte průvodce <a href="/kodan">co vidět v Kodani</a>, praktický přehled <a href="/clanek/letiste-kodan-kastrup-doprava-do-centra">dopravy z letiště</a> a vysvětlení, <a href="/hygge">co je hygge</a>.</p>
          <p><a href="/clanek/mosty-v-dansku">Mosty v Dánsku a mýtné</a> · <a href="/clanek/mons-klint">Møns Klint autem</a> · <a href="/clanek/ribe">Ribe: parkování a procházka</a></p>
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

      // Published articles per language, for the article lists (/clanky, /artykuly)
      const articlesByLang = { cs: [], pl: [] };

      // Fallback article (in case Supabase fetch fails in build environment)
      const fallbackArticle = {
        slug: 'kastrup-kodansky-poklad-moderni-architektury-more-a-volnosti',
        title: 'Kastrup: Kodaňský poklad moderní architektury, moře a volnosti',
      };

      try {
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
            .select('slug, title, lang')
            .eq('published', true)
            .order('created_at', { ascending: false });

          if (error) {
            console.warn('Failed to fetch articles from Supabase:', error.message);
          } else {
            // Articles are not written as static files: api/article.js renders them on request
            // (always current text, real 404 for unknown slugs). The lists feed /clanky and /artykuly.
            (articles || []).forEach((article) => articlesByLang[article.lang || 'cs']?.push(article));
            console.log(`Found ${articlesByLang.cs.length} Czech and ${articlesByLang.pl.length} Polish published articles`);
          }
        } else {
          console.warn('Supabase credentials not found - /clanky gets the fallback article list');
        }
      } catch (error) {
        console.error('Error fetching articles:', error);
      }

      if (articlesByLang.cs.length === 0) {
        console.log('Using fallback article for build');
        articlesByLang.cs.push(fallbackArticle);
      }

      const distPath = path.resolve(process.cwd(), 'dist');
      const indexHtmlPath = path.join(distPath, 'index.html');

      if (!fs.existsSync(indexHtmlPath)) {
        console.warn('index.html not found in dist folder');
        return;
      }

      const indexHtml = fs.readFileSync(indexHtmlPath, 'utf-8');
      const indexHtmlPl = toPolishTemplate(indexHtml);
      const assetFiles = fs.readdirSync(path.join(distPath, 'assets'));

      const buildPreloadTag = (preload) => {
        const entries = preload.assets.map(({ pattern, width }) => {
          const file = assetFiles.find(name => pattern.test(name));
          return file ? { url: `/assets/${file}`, width } : null;
        });
        if (entries.some(entry => !entry)) {
          console.warn('Hero image for preload not found in dist/assets');
          return '';
        }
        const href = entries[0].url;
        const srcset = entries.map(entry => `${entry.url} ${entry.width}w`).join(', ');
        return `    <link rel="preload" as="image" type="image/webp" href="${escapeHtml(href)}" imagesrcset="${escapeHtml(srcset)}" imagesizes="${escapeHtml(preload.sizes)}" fetchpriority="high" />\n`;
      };

      const buildNotFound = (template, title, description) => template
        .replace(/<title>.*?<\/title>/, `<title>${title}</title>`)
        .replace(/<meta name="description" content=".*?"/, `<meta name="description" content="${description}"`)
        .replace('</head>', '    <meta name="robots" content="noindex, follow" />\n  </head>');
      // Templates for api/article.js. They carry no canonical or og:url; the function
      // fills in the real meta tags, schema and article text for each request.
      const buildArticleShell = (template, title, description) => template
        .replace(/<title>.*?<\/title>/, `<title>${title}</title>`)
        .replace(/<meta name="description" content=".*?"/, `<meta name="description" content="${description}"`)
        .replace(/\s*<link rel="canonical"[^>]*>/, '')
        .replace(/\s*<meta property="og:url"[^>]*>/, '');

      const templates = {
        cs: {
          notFoundHtml: buildNotFound(indexHtml, '404 - Stránka nenalezena | Kastrup.cz', 'Požadovaná stránka na Kastrup.cz nebyla nalezena.'),
          articleShellHtml: buildArticleShell(indexHtml, 'Článek | Kastrup.cz', 'Článek o Dánsku na Kastrup.cz.'),
        },
        pl: {
          notFoundHtml: buildNotFound(indexHtmlPl, '404 - Nie znaleziono strony | Kastrup.pl', 'Nie znaleziono strony na Kastrup.pl.')
            .replace('<h1>Kastrup.cz - Váš průvodce po Dánsku</h1>', '<h1>Nie znaleziono strony</h1>')
            .replace('<p>Načítání stránky... Pro plné zobrazení prosím zapněte JavaScript.</p>', '<p>Strona, której szukasz, nie istnieje.</p>'),
          articleShellHtml: buildArticleShell(indexHtmlPl, 'Artykuł | Kastrup.pl', 'Artykuł o Danii na Kastrup.pl.'),
        },
      };

      fs.writeFileSync(path.join(distPath, '404.html'), templates.cs.notFoundHtml);
      console.log('✓ Generated 404.html');
      fs.writeFileSync(path.join(distPath, 'clanek-shell.html'), templates.cs.articleShellHtml);
      console.log('✓ Generated clanek-shell.html');

      // Vercel bundles functions after the build command, so api/article.js can import
      // the templates of this exact build (the folder is git-ignored)
      const generatedDir = path.resolve(process.cwd(), 'api', '_generated');
      fs.mkdirSync(generatedDir, { recursive: true });
      fs.writeFileSync(
        path.join(generatedDir, 'templates.js'),
        `// Generated by vite-plugin-routes-html.js during the build. Do not edit.\n` +
        `export const templates = ${JSON.stringify(templates)};\n`
      );
      console.log('✓ Generated api/_generated/templates.js');

      const articleListHtml = (lang, heading) => {
        const list = articlesByLang[lang];
        if (!list.length) return '';
        return `
          <section style="margin-top: 2rem;">
            <h2>${heading}</h2>
            <ul>
              ${list.map(article => `<li><a href="${SITES[lang].articlePrefix}${encodeURIComponent(article.slug)}">${escapeHtml(article.title)}</a></li>`).join('\n              ')}
            </ul>
          </section>`;
      };

      const writeRoute = (route, lang, template) => {
        const rootDir = lang === 'pl' ? path.join(distPath, 'pl') : distPath;
        const targetDir = route.isHomepage ? rootDir : path.join(rootDir, route.path);
        fs.mkdirSync(targetDir, { recursive: true });
        const targetHtmlPath = path.join(targetDir, 'index.html');

        const page = findStaticPage(route.isHomepage ? '/' : `/${route.path}`, lang);
        let routeHtml = applyRouteMeta(template, {
          ...route,
          lang,
          alternates: page ? staticAlternates(page.key) : [],
        });

        if (route.preloadImage) {
          routeHtml = routeHtml.replace('</head>', `${buildPreloadTag(route.preloadImage)}  </head>`);
        }

        // Article lists for crawlers
        const listPath = lang === 'pl' ? 'artykuly' : 'clanky';
        if (route.path === listPath) {
          const listHtml = articleListHtml(lang, lang === 'pl' ? 'Nasze artykuły:' : 'Naše články:');
          routeHtml = routeHtml.replace(/<\/nav>\s*<\/main>/, `</nav>${listHtml}\n      </main>`);
        }

        if (route.fallbackHtml) {
          routeHtml = routeHtml.replace('</main>', `${route.fallbackHtml}\n        </main>`);
        }

        fs.writeFileSync(targetHtmlPath, routeHtml);
        console.log(`✓ Generated ${path.relative(distPath, targetHtmlPath)}`);
      };

      routes.forEach(route => writeRoute(route, 'cs', indexHtml));
      PL_ROUTES.forEach(route => writeRoute(route, 'pl', indexHtmlPl));

      fs.writeFileSync(
        path.join(distPath, 'pl', 'robots.txt'),
        'User-agent: *\nAllow: /\n\nSitemap: https://kastrup.pl/sitemap.xml\n'
      );
      console.log('✓ Generated pl/robots.txt');
    }
  };
}
