import { createClient } from '@supabase/supabase-js';
import { writeFileSync } from 'fs';

// Load environment variables
const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Error: Missing Supabase credentials');
  console.error('Make sure VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY are set');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function generateSitemap() {
  console.log('🔄 Generating sitemap...');

  const baseUrl = 'https://kastrup.cz';
  const today = new Date().toISOString().split('T')[0];

  try {
    // Fetch all published articles
    const { data: articles, error: articlesError } = await supabase
      .from('articles')
      .select('slug, created_at, updated_at')
      .eq('published', true)
      .order('created_at', { ascending: false });

    if (articlesError) {
      console.error('❌ Error fetching articles:', articlesError);
      process.exit(1);
    }

    // Fetch all published accommodations
    const { data: accommodations, error: accomError } = await supabase
      .from('accommodations')
      .select('slug, updated_at')
      .eq('published', true);

    if (accomError) {
      console.warn('⚠️  Warning fetching accommodations:', accomError);
    }

    console.log(`📄 Found ${articles?.length || 0} articles`);
    console.log(`🏨 Found ${accommodations?.length || 0} accommodations`);

    // Static pages
    const staticPages = [
      { loc: '/', priority: '1.0', changefreq: 'daily' },
      { loc: '/clanky', priority: '0.9', changefreq: 'daily' },
      { loc: '/ubytovani', priority: '0.9', changefreq: 'daily' },
      { loc: '/o-dansku', priority: '0.8', changefreq: 'monthly' },
      { loc: '/kultura', priority: '0.7', changefreq: 'weekly' },
      { loc: '/cestovani', priority: '0.7', changefreq: 'weekly' },
      { loc: '/kontakt', priority: '0.6', changefreq: 'monthly' },
    ];

    // Build XML
    let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
`;

    // Add static pages
    staticPages.forEach(page => {
      xml += `  <url>
    <loc>${baseUrl}${page.loc}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>
`;
    });

    // Add article pages
    if (articles && articles.length > 0) {
      articles.forEach(article => {
        const lastmod = (article.updated_at || article.created_at).split('T')[0];
        xml += `  <url>
    <loc>${baseUrl}/clanek/${article.slug}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
`;
      });
    }

    // Add accommodation pages
    if (accommodations && accommodations.length > 0) {
      accommodations.forEach(accom => {
        const lastmod = accom.updated_at.split('T')[0];
        xml += `  <url>
    <loc>${baseUrl}/ubytovani/${accom.slug}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>
`;
      });
    }

    xml += `</urlset>`;

    // Write to file
    writeFileSync('public/sitemap.xml', xml);

    const totalUrls = staticPages.length + (articles?.length || 0) + (accommodations?.length || 0);
    console.log(`✅ Sitemap generated successfully!`);
    console.log(`📊 Total URLs: ${totalUrls}`);
    console.log(`   - Static pages: ${staticPages.length}`);
    console.log(`   - Articles: ${articles?.length || 0}`);
    console.log(`   - Accommodations: ${accommodations?.length || 0}`);
    console.log(`📁 Output: public/sitemap.xml`);

  } catch (error) {
    console.error('❌ Error generating sitemap:', error);
    process.exit(1);
  }
}

generateSitemap();
