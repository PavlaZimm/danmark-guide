import { createClient } from '@supabase/supabase-js';

export default async function handler(req, res) {
  const supabaseUrl = process.env.VITE_SUPABASE_URL;
  const supabaseKey = process.env.VITE_SUPABASE_PUBLISHABLE_KEY;

  if (!supabaseUrl || !supabaseKey) {
    return res.status(500).send('Missing Supabase credentials');
  }

  const supabase = createClient(supabaseUrl, supabaseKey);
  const baseUrl = 'https://kastrup.cz';
  const today = new Date().toISOString().split('T')[0];

  const staticPages = [
    { loc: '/', priority: '1.0', changefreq: 'daily' },
    { loc: '/clanky', priority: '0.9', changefreq: 'daily' },
    { loc: '/ubytovani', priority: '0.9', changefreq: 'daily' },
    { loc: '/o-dansku', priority: '0.8', changefreq: 'monthly' },
    { loc: '/kultura', priority: '0.7', changefreq: 'weekly' },
    { loc: '/cestovani', priority: '0.7', changefreq: 'weekly' },
    { loc: '/kontakt', priority: '0.6', changefreq: 'monthly' },
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

    // Fetch published accommodations
    const { data: accommodations, error: accommodationsError } = await supabase
      .from('accommodations')
      .select('slug, updated_at')
      .eq('published', true);

    if (accommodationsError) {
      console.error('Error fetching accommodations:', accommodationsError);
    }

    // Build XML
    let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
    xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';

    // Add static pages
    staticPages.forEach(page => {
      xml += '  <url>\n';
      xml += `    <loc>${baseUrl}${page.loc}</loc>\n`;
      xml += `    <lastmod>${today}</lastmod>\n`;
      xml += `    <changefreq>${page.changefreq}</changefreq>\n`;
      xml += `    <priority>${page.priority}</priority>\n`;
      xml += '  </url>\n';
    });

    // Add articles
    if (articles && articles.length > 0) {
      articles.forEach(article => {
        const lastmod = (article.updated_at || article.created_at).split('T')[0];
        xml += '  <url>\n';
        xml += `    <loc>${baseUrl}/clanek/${article.slug}</loc>\n`;
        xml += `    <lastmod>${lastmod}</lastmod>\n`;
        xml += '    <changefreq>weekly</changefreq>\n';
        xml += '    <priority>0.8</priority>\n';
        xml += '  </url>\n';
      });
    }

    // Add accommodations
    if (accommodations && accommodations.length > 0) {
      accommodations.forEach(accom => {
        const lastmod = accom.updated_at.split('T')[0];
        xml += '  <url>\n';
        xml += `    <loc>${baseUrl}/ubytovani/${accom.slug}</loc>\n`;
        xml += `    <lastmod>${lastmod}</lastmod>\n`;
        xml += '    <changefreq>weekly</changefreq>\n';
        xml += '    <priority>0.7</priority>\n';
        xml += '  </url>\n';
      });
    }

    xml += '</urlset>';

    // Set headers
    res.setHeader('Content-Type', 'application/xml');
    res.setHeader('Cache-Control', 's-maxage=3600, stale-while-revalidate');
    res.status(200).send(xml);

  } catch (error) {
    console.error('Error generating sitemap:', error);
    res.status(500).send('Error generating sitemap');
  }
}
