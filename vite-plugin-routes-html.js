import fs from 'fs';
import path from 'path';

/**
 * Vite plugin to generate separate HTML files for each route with proper meta tags
 * This helps with SEO by ensuring crawlers see the right content
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
    closeBundle() {

      const routes = [
        {
          path: 'clanky',
          title: 'Články o Dánsku | Cestování, Kultura, Tipy | Kastrup.cz',
          description: 'Čtěte zajímavé články o Dánsku, dánské kultuře, cestování, hygge a životě v severní Evropě. Praktické tipy a inspirace pro vaši cestu do Dánska.',
          canonical: 'https://kastrup.cz/clanky'
        },
        {
          path: 'kultura',
          title: 'Dánská kultura a tradice | Kastrup.cz',
          description: 'Objevte dánskou kulturu, tradice, hygge a životní styl. Články o dánském designu, architektuře, umění a způsobu života v Dánsku.',
          canonical: 'https://kastrup.cz/kultura'
        },
        {
          path: 'cestovani',
          title: 'Cestování po Dánsku | Tipy a průvodce | Kastrup.cz',
          description: 'Praktické tipy pro cestování po Dánsku. Kam jet, co vidět, kde spát a jíst. Itineráře, doprava a rady pro vaši cestu do Dánska.',
          canonical: 'https://kastrup.cz/cestovani'
        },
        {
          path: 'ubytovani',
          title: 'Ubytování v Dánsku | Hotely, AirBnB, Kempy | Kastrup.cz',
          description: 'Najděte nejlepší ubytování v Dánsku. Hotely, apartmány, kempy a další možnosti pro váš pobyt v Dánsku.',
          canonical: 'https://kastrup.cz/ubytovani'
        },
        {
          path: 'kontakt',
          title: 'Kontakt | Kastrup.cz',
          description: 'Kontaktujte nás pro dotazy ohledně cestování do Dánska. Pavla Zimmermannová, váš průvodce dánskou kulturou, ubytováním a tipy na cesty.',
          canonical: 'https://kastrup.cz/kontakt'
        },
        {
          path: 'o-dansku',
          title: 'Dánsko: Kompletní průvodce 2025 | Kastrup.cz',
          description: 'Kompletní průvodce po Dánsku 2025: příroda, hrady, design, hygge. Praktické informace, itineráře, doprava a tipy kdy jet.',
          canonical: 'https://kastrup.cz/o-dansku'
        }
      ];

      const distPath = path.resolve(process.cwd(), 'dist');
      const indexHtmlPath = path.join(distPath, 'index.html');

      if (!fs.existsSync(indexHtmlPath)) {
        console.warn('index.html not found in dist folder');
        return;
      }

      const indexHtml = fs.readFileSync(indexHtmlPath, 'utf-8');

      routes.forEach(route => {
        // Create directory if needed
        const routeDir = path.join(distPath, route.path);
        if (!fs.existsSync(routeDir)) {
          fs.mkdirSync(routeDir, { recursive: true });
        }

        // Modify HTML with route-specific meta tags
        let routeHtml = indexHtml
          .replace(/<title>.*?<\/title>/, `<title>${route.title}</title>`)
          .replace(/<meta name="description" content=".*?"/, `<meta name="description" content="${route.description}"`);

        // Add canonical link if not present
        if (!routeHtml.includes('rel="canonical"')) {
          routeHtml = routeHtml.replace(
            '</head>',
            `    <link rel="canonical" href="${route.canonical}" />\n  </head>`
          );
        } else {
          routeHtml = routeHtml.replace(
            /<link rel="canonical" href=".*?".*?\/>/,
            `<link rel="canonical" href="${route.canonical}" />`
          );
        }

        // Add OG tags
        routeHtml = routeHtml.replace(
          /<meta property="og:type".*?>/,
          `<meta property="og:type" content="website" />
    <meta property="og:url" content="${route.canonical}" />
    <meta property="og:title" content="${route.title}" />
    <meta property="og:description" content="${route.description}" />
    <meta property="og:image" content="https://kastrup.cz/icon-512.svg" />`
        );

        // Note: Basic HTML structure with links is now in index.html
        // React will replace the content of #root when JS loads
        // Crawlers that don't execute JS will see the fallback content with links

        // Write the HTML file
        fs.writeFileSync(path.join(routeDir, 'index.html'), routeHtml);
        console.log(`✓ Generated ${route.path}/index.html`);
      });
    }
  };
}
