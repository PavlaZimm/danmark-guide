import { createClient } from '@supabase/supabase-js';
import { writeFileSync, readFileSync, existsSync } from 'fs';
import { join } from 'path';

// Load environment variables from .env file
function loadEnv() {
  const envPath = join(process.cwd(), '.env');
  if (existsSync(envPath)) {
    const envFile = readFileSync(envPath, 'utf8');
    envFile.split('\n').forEach(line => {
      const match = line.match(/^([^=:#]+)=(.*)$/);
      if (match) {
        const key = match[1].trim();
        const value = match[2].trim().replace(/^["']|["']$/g, '');
        process.env[key] = value;
      }
    });
  }
}

loadEnv();

const escapeXml = (value) => String(value)
  .replaceAll('&', '&amp;')
  .replaceAll('<', '&lt;')
  .replaceAll('>', '&gt;')
  .replaceAll('"', '&quot;')
  .replaceAll("'", '&apos;');

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_PUBLISHABLE_KEY;

let supabase = null;

if (!supabaseUrl || !supabaseKey) {
  console.warn('⚠️  Missing Supabase credentials - will generate sitemap with static pages only');
} else {
  supabase = createClient(supabaseUrl, supabaseKey);
}

async function generateSitemap() {
  console.log('Generating sitemap...');

  const baseUrl = 'https://kastrup.cz';
  const staticPages = [
    '/',
    '/clanky',
    '/ubytovani',
    '/o-dansku',
    '/kultura',
    '/hygge',
    '/kodan',
    '/danstina',
    '/danske-ostrovy',
    '/cestovani',
    '/kontakt',
    '/autorka',
    '/ochrana-soukromi',
  ];

  let articles = [];

  try {
    // Only fetch from Supabase if credentials are available
    if (supabase) {
      const { data: articlesData, error: articlesError } = await supabase
        .from('articles')
        .select('slug, created_at, updated_at')
        .eq('published', true)
        .order('created_at', { ascending: false });

      if (articlesError) {
        console.warn('⚠️  Error fetching articles:', articlesError.message);
      } else {
        articles = articlesData || [];
      }

    }

    console.log('Found ' + articles.length + ' articles');

    let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
    xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';

    staticPages.forEach(page => {
      xml += '  <url>\n';
      xml += '    <loc>' + escapeXml(baseUrl + page) + '</loc>\n';
      xml += '  </url>\n';
    });

    if (articles && articles.length > 0) {
      articles.forEach(article => {
        const lastmod = (article.updated_at || article.created_at).split('T')[0];
        xml += '  <url>\n';
        xml += '    <loc>' + escapeXml(baseUrl + '/clanek/' + article.slug) + '</loc>\n';
        xml += '    <lastmod>' + escapeXml(lastmod) + '</lastmod>\n';
        xml += '  </url>\n';
      });
    }

    xml += '</urlset>';

    writeFileSync('public/sitemap.xml', xml);

    const totalUrls = staticPages.length + (articles?.length || 0);
    console.log('Sitemap generated successfully!');
    console.log('Total URLs: ' + totalUrls);
    console.log('Output: public/sitemap.xml');

  } catch (error) {
    console.warn('⚠️  Error generating sitemap:', error.message);
    console.log('Generating fallback sitemap with static pages only...');

    // Generate minimal sitemap with just static pages
    let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
    xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';

    staticPages.forEach(page => {
      xml += '  <url>\n';
      xml += '    <loc>' + escapeXml(baseUrl + page) + '</loc>\n';
      xml += '  </url>\n';
    });

    xml += '</urlset>';

    writeFileSync('public/sitemap.xml', xml);
    console.log('Fallback sitemap generated with ' + staticPages.length + ' static pages');
  }
}

generateSitemap();
