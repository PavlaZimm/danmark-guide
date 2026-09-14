import { createClient } from '@supabase/supabase-js';

const escapeXml = (value) => String(value)
  .replaceAll('&', '&amp;')
  .replaceAll('<', '&lt;')
  .replaceAll('>', '&gt;')
  .replaceAll('"', '&quot;')
  .replaceAll("'", '&apos;');

export default async function handler(req, res) {
  if (req.method !== 'GET' && req.method !== 'HEAD') {
    res.setHeader('Allow', 'GET, HEAD');
    return res.status(405).send('Method not allowed');
  }

  const supabaseUrl = process.env.VITE_SUPABASE_URL;
  const supabaseKey = process.env.VITE_SUPABASE_PUBLISHABLE_KEY;

  if (!supabaseUrl || !supabaseKey) {
    return res.status(500).send('Missing Supabase credentials');
  }

  const supabase = createClient(supabaseUrl, supabaseKey);
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

  try {
    // Fetch published articles
    const { data: articles, error: articlesError } = await supabase
      .from('articles')
      .select('slug, created_at, updated_at')
      .eq('published', true)
      .order('created_at', { ascending: false });

    if (articlesError) {
      console.error('Error fetching articles:', articlesError);
    }

    // Build XML
    let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
    xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';

    // Add static pages
    staticPages.forEach(page => {
      xml += '  <url>\n';
      xml += `    <loc>${escapeXml(`${baseUrl}${page}`)}</loc>\n`;
      xml += '  </url>\n';
    });

    // Add articles
    if (articles && articles.length > 0) {
      articles.forEach(article => {
        const lastmod = (article.updated_at || article.created_at).split('T')[0];
        xml += '  <url>\n';
        xml += `    <loc>${escapeXml(`${baseUrl}/clanek/${article.slug}`)}</loc>\n`;
        xml += `    <lastmod>${escapeXml(lastmod)}</lastmod>\n`;
        xml += '  </url>\n';
      });
    }

    xml += '</urlset>';

    // Set headers
    res.setHeader('Content-Type', 'application/xml');
    res.setHeader('Cache-Control', 'public, s-maxage=3600, stale-while-revalidate=86400');
    res.status(200).send(req.method === 'HEAD' ? '' : xml);

  } catch (error) {
    console.error('Error generating sitemap:', error);
    res.status(500).send('Error generating sitemap');
  }
}
