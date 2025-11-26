import { useEffect, useState, useRef } from "react";
import { createRoot } from 'react-dom/client';
import { useParams, Link } from "react-router-dom";
import { Calendar, ArrowLeft, Share2, ArrowRight, List } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Helmet } from "react-helmet-async";
import Breadcrumbs from "@/components/Breadcrumbs";
import DOMPurify from "dompurify";
import ArticleMap, { MapMarker } from "@/components/ArticleMap";
import { optimizeTitle, optimizeDescription, calculateReadingTime } from "@/lib/seo-helpers";

interface Article {
  id: string;
  title: string;
  slug: string;
  perex: string;
  content: string;
  image_url: string | null;
  created_at: string;
  meta_title: string | null;
  meta_description: string | null;
  og_image: string | null;
  categories: {
    name: string;
  };
}

interface TocItem {
  id: string;
  text: string;
  level: number;
}

interface ArticleMapData {
  id: string;
  lat: number;
  lng: number;
  zoom?: number;
  markers?: MapMarker[];
  caption?: string;
  height?: string;
}

interface FAQItem {
  question: string;
  answer: string;
}

const ArticleDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);
  const [tableOfContents, setTableOfContents] = useState<TocItem[]>([]);
  const [maps, setMaps] = useState<ArticleMapData[]>([]);
  const [faqItems, setFaqItems] = useState<FAQItem[]>([]);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (slug) {
      fetchArticle();
    }
  }, [slug]);

  // Generate table of contents from article headings
  useEffect(() => {
    if (article && article.content) {
      const parser = new DOMParser();
      const doc = parser.parseFromString(article.content, 'text/html');
      const headings = doc.querySelectorAll('h2, h3');

      const toc: TocItem[] = [];
      headings.forEach((heading, index) => {
        const text = heading.textContent || '';
        let id = heading.id || text.toLowerCase()
          .replace(/[^\w\s-]/g, '')
          .replace(/\s+/g, '-')
          .replace(/^-+|-+$/g, '');

        // Ensure unique IDs
        if (!id) {
          id = `heading-${index}`;
        }

        toc.push({
          id,
          text,
          level: parseInt(heading.tagName.charAt(1))
        });

        // Add ID to heading in actual content if it doesn't have one
        if (!heading.id) {
          heading.id = id;
        }
      });

      setTableOfContents(toc);
    }
  }, [article]);

  // Add lazy loading to images in article content
  useEffect(() => {
    if (article) {
      const images = document.querySelectorAll('.article-content img');
      images.forEach((img) => {
        img.setAttribute('loading', 'lazy');
        if (!img.getAttribute('alt')) {
          img.setAttribute('alt', article.title);
        }
      });

      // Add IDs to headings for anchor links
      const headings = document.querySelectorAll('.article-content h2, .article-content h3');
      headings.forEach((heading, index) => {
        if (!heading.id) {
          const text = heading.textContent || '';
          const id = text.toLowerCase()
            .replace(/[^\w\s-]/g, '')
            .replace(/\s+/g, '-')
            .replace(/^-+|-+$/g, '') || `heading-${index}`;
          heading.id = id;
        }
      });
    }
  }, [article]);

  // Parse maps from article content
  useEffect(() => {
    if (article && article.content) {
      const parser = new DOMParser();
      const doc = parser.parseFromString(article.content, 'text/html');
      const mapElements = doc.querySelectorAll('[data-map]');

      const parsedMaps: ArticleMapData[] = [];

      mapElements.forEach((el, index) => {
        const lat = parseFloat(el.getAttribute('lat') || el.getAttribute('data-lat') || '0');
        const lng = parseFloat(el.getAttribute('lng') || el.getAttribute('data-lng') || '0');
        const zoom = parseInt(el.getAttribute('zoom') || el.getAttribute('data-zoom') || '13');
        const caption = el.getAttribute('caption') || el.getAttribute('data-caption') || undefined;
        const height = el.getAttribute('height') || el.getAttribute('data-height') || '400px';

        let markers: MapMarker[] | undefined;
        const markersAttr = el.getAttribute('markers') || el.getAttribute('data-markers');
        if (markersAttr) {
          try {
            markers = JSON.parse(markersAttr);
          } catch (e) {
            console.error('Failed to parse markers:', e);
          }
        }

        if (lat && lng) {
          parsedMaps.push({
            id: `map-${index}`,
            lat,
            lng,
            zoom,
            markers,
            caption,
            height
          });

          // Replace the element with a placeholder
          const placeholder = doc.createElement('div');
          placeholder.id = `map-placeholder-${index}`;
          placeholder.className = 'article-map-placeholder';
          placeholder.setAttribute('data-map-id', `map-${index}`);
          el.replaceWith(placeholder);
        }
      });

      setMaps(parsedMaps);

      // Update the article content with placeholders
      if (parsedMaps.length > 0 && contentRef.current) {
        contentRef.current.innerHTML = DOMPurify.sanitize(doc.body.innerHTML, {
          ADD_TAGS: ['details', 'summary'],
          ADD_ATTR: ['open', 'id', 'class', 'data-map-id']
        });
      }
    }
  }, [article]);

  // Render maps into placeholders
  useEffect(() => {
    if (maps.length > 0 && contentRef.current) {
      const roots: any[] = [];

      maps.forEach((mapData) => {
        const placeholder = contentRef.current?.querySelector(`#map-placeholder-${mapData.id.replace('map-', '')}`);
        if (placeholder) {
          const root = createRoot(placeholder);
          root.render(
            <ArticleMap
              lat={mapData.lat}
              lng={mapData.lng}
              zoom={mapData.zoom}
              markers={mapData.markers}
              height={mapData.height}
              caption={mapData.caption}
            />
          );
          roots.push(root);
        }
      });

      // Cleanup function
      return () => {
        roots.forEach(root => {
          try {
            root.unmount();
          } catch (e) {
            // Ignore unmount errors
          }
        });
      };
    }
  }, [maps]);

  // Parse FAQ from article content for Schema markup
  useEffect(() => {
    if (article && article.content) {
      const parser = new DOMParser();
      const doc = parser.parseFromString(article.content, 'text/html');
      const detailsElements = doc.querySelectorAll('details');

      const faqs: FAQItem[] = [];
      detailsElements.forEach((details) => {
        const summary = details.querySelector('summary');
        if (summary) {
          const question = summary.textContent?.trim() || '';
          // Remove the arrow from question text
          const cleanQuestion = question.replace(/▼/g, '').trim();

          // Get the answer from the details content (excluding summary)
          const answer = Array.from(details.children)
            .filter(el => el.tagName !== 'SUMMARY')
            .map(el => el.textContent?.trim())
            .filter(Boolean)
            .join(' ');

          if (cleanQuestion && answer) {
            faqs.push({
              question: cleanQuestion,
              answer: answer
            });
          }
        }
      });

      setFaqItems(faqs);
    }
  }, [article]);

  const fetchArticle = async () => {
    try {
      const { data, error } = await supabase
        .from("articles")
        .select(`
          id,
          title,
          slug,
          perex,
          content,
          image_url,
          created_at,
          meta_title,
          meta_description,
          og_image,
          categories (
            name
          )
        `)
        .eq("slug", slug)
        .eq("published", true)
        .single();

      if (error) throw error;
      setArticle(data);
    } catch (error) {
      console.error("Error fetching article:", error);
      toast.error("Článek se nepodařilo načíst");
    } finally {
      setLoading(false);
    }
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: article?.title,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast.success("Odkaz zkopírován do schránky");
    }
  };

  const formattedDate = article
    ? new Date(article.created_at).toLocaleDateString("cs-CZ", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "";

  if (loading) {
    return (
      <div className="min-h-screen py-12">
        <div className="container mx-auto px-4 md:px-6">
          <div className="mx-auto max-w-4xl">
            <div className="mb-8 h-8 w-32 animate-pulse rounded bg-muted"></div>
            <div className="mb-6 h-12 w-3/4 animate-pulse rounded bg-muted"></div>
            <div className="mb-8 aspect-video w-full animate-pulse rounded-lg bg-muted"></div>
            <div className="space-y-4">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="h-4 animate-pulse rounded bg-muted"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="min-h-screen py-12">
        <div className="container mx-auto px-4 md:px-6">
          <div className="mx-auto max-w-4xl text-center">
            <h1 className="mb-4 text-4xl font-bold">Článek nenalezen</h1>
            <p className="mb-8 text-muted-foreground">
              Omlouváme se, ale článek, který hledáte, neexistuje.
            </p>
            <Link to="/clanky">
              <Button>
                <ArrowLeft className="mr-2 h-4 w-4" />
                Zpět na články
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // SEO-optimized meta tags with validation
  const pageTitle = optimizeTitle(article.meta_title || article.title);
  const pageDescription = optimizeDescription(article.meta_description || article.perex);
  const readingTime = calculateReadingTime(article.content);

  return (
    <>
      <Helmet>
        <title>{pageTitle}</title>
        <meta
          name="description"
          content={pageDescription}
        />
        <link rel="canonical" href={`https://kastrup.cz/clanek/${article.slug}`} />

        {/* Open Graph */}
        <meta property="og:type" content="article" />
        <meta property="og:url" content={`https://kastrup.cz/clanek/${article.slug}`} />
        <meta property="og:title" content={pageTitle} />
        <meta
          property="og:description"
          content={pageDescription}
        />
        <meta
          property="og:image"
          content={article.og_image || article.image_url || "https://kastrup.cz/icon-512.svg"}
        />
        <meta property="article:published_time" content={article.created_at} />
        <meta property="article:section" content={article.categories?.name} />
        <meta property="og:site_name" content="Kastrup.cz" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={pageTitle} />
        <meta
          name="twitter:description"
          content={pageDescription}
        />
        <meta
          name="twitter:image"
          content={article.og_image || article.image_url || "https://kastrup.cz/icon-512.svg"}
        />

        {/* JSON-LD Article Schema */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            "headline": article.title,
            "description": article.perex,
            "image": article.image_url || "https://kastrup.cz/og-default.jpg",
            "datePublished": article.created_at,
            "dateModified": article.created_at,
            "author": {
              "@type": "Person",
              "name": "Pavla Zimmermannová",
              "url": "https://kastrup.cz",
              "email": "zimmermannovap@gmail.com"
            },
            "publisher": {
              "@type": "Organization",
              "name": "Kastrup.cz",
              "logo": {
                "@type": "ImageObject",
                "url": "https://kastrup.cz/logo.png"
              }
            },
            "mainEntityOfPage": {
              "@type": "WebPage",
              "@id": `https://kastrup.cz/clanek/${article.slug}`
            },
            "articleSection": article.categories?.name,
            "inLanguage": "cs-CZ",
            "keywords": `${article.categories?.name}, Dánsko, cestování, kultura`
          })}
        </script>

        {/* Breadcrumb Schema */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              {
                "@type": "ListItem",
                "position": 1,
                "name": "Domů",
                "item": "https://kastrup.cz"
              },
              {
                "@type": "ListItem",
                "position": 2,
                "name": "Průvodce",
                "item": "https://kastrup.cz/clanky"
              },
              {
                "@type": "ListItem",
                "position": 3,
                "name": article.title,
                "item": `https://kastrup.cz/clanek/${article.slug}`
              }
            ]
          })}
        </script>

        {/* FAQ Schema - shows FAQ in Google search results */}
        {faqItems.length > 0 && (
          <script type="application/ld+json">
            {JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              "mainEntity": faqItems.map((faq) => ({
                "@type": "Question",
                "name": faq.question,
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": faq.answer
                }
              }))
            })}
          </script>
        )}
      </Helmet>

      <div className="min-h-screen py-12">
        <div className="container mx-auto px-4 md:px-6">
          <article className="mx-auto max-w-4xl">
            <Breadcrumbs
              items={[
                { label: "Průvodce", href: "/clanky" },
                { label: article.title }
              ]}
            />

            {/* Header */}
            <header className="mb-12">
              <h1 className="mb-6 text-4xl font-bold md:text-5xl">
                {article.title}
              </h1>
              {article.perex && (
                <p className="mb-6 text-xl leading-relaxed text-muted-foreground">
                  {article.perex}
                </p>
              )}
            </header>

            {/* Table of Contents */}
            {tableOfContents.length > 0 && (
              <nav className="mb-12 rounded-lg border bg-card p-6 shadow-sm" aria-label="Obsah článku">
                <div className="mb-4 flex items-center gap-2">
                  <List className="h-5 w-5 text-primary" />
                  <h2 className="text-lg font-semibold">Obsah článku</h2>
                </div>
                <ul className="grid gap-2 md:grid-cols-2">
                  {tableOfContents.map((item) => (
                    <li key={item.id} className={item.level === 3 ? 'ml-4' : ''}>
                      <a
                        href={`#${item.id}`}
                        className="text-sm text-muted-foreground hover:text-primary transition-colors"
                      >
                        → {item.text}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            )}

            {/* Featured Image */}
            {article.image_url && (
              <div className="mb-12 overflow-hidden rounded-xl shadow-lg">
                <img
                  src={article.image_url}
                  alt={article.title}
                  className="h-auto w-full object-cover"
                  loading="eager"
                />
              </div>
            )}

            {/* Content */}
            {maps.length > 0 ? (
              <div
                ref={contentRef}
                className="prose prose-lg max-w-none article-content"
              />
            ) : (
              <div
                className="prose prose-lg max-w-none article-content"
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(article.content, {
                    ADD_TAGS: ['details', 'summary'],
                    ADD_ATTR: ['open']
                  })
                }}
              />
            )}

            {/* CTA Section */}
            <div className="mt-16 grid gap-6 md:grid-cols-2">
              <div className="rounded-lg bg-gradient-card p-8">
                <h3 className="mb-4 text-2xl font-bold">Přečtěte si další průvodce</h3>
                <p className="mb-6 text-muted-foreground">
                  Objevte další zajímavé průvodce o Dánsku, dánské kultuře a cestování.
                </p>
                <Link to="/clanky">
                  <Button>
                    Prohlédnout průvodce
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>

              <div className="rounded-lg bg-gradient-card p-8">
                <h3 className="mb-4 text-2xl font-bold">Najděte ubytování</h3>
                <p className="mb-6 text-muted-foreground">
                  Hledáte místo k pobytu? Prozkoumejte naši nabídku hotelů, apartmánů a hostelů.
                </p>
                <Link to="/ubytovani">
                  <Button variant="outline">
                    Zobrazit ubytování
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>

            {/* Author Bio */}
            <div className="mt-12 rounded-xl border-2 border-primary/20 bg-gradient-to-br from-primary/5 via-background to-background p-8 shadow-lg">
              <div className="flex flex-col items-center gap-6 md:flex-row md:items-start">
                {/* Author Photo */}
                <div className="flex-shrink-0">
                  <div className="relative h-32 w-32 overflow-hidden rounded-full border-4 border-primary/20 shadow-xl">
                    <picture>
                      <source srcSet="/images/pavla-author.webp" type="image/webp" />
                      <img
                        src="/images/pavla-author.jpg"
                        alt="Pavla Zimmermannová - autorka průvodce po Dánsku"
                        className="h-full w-full object-cover"
                        loading="lazy"
                      />
                    </picture>
                  </div>
                </div>

                {/* Author Info */}
                <div className="flex-1 text-center md:text-left">
                  <h3 className="mb-2 text-2xl font-bold">Pavla Zimmermannová</h3>
                  <div className="mb-4 h-1 w-16 bg-primary/30 mx-auto md:mx-0"></div>
                  <p className="mb-4 leading-relaxed text-muted-foreground">
                    Dánsko mám ráda a vracím se sem pro kombinaci klidu, přírody, designu a laskavé atmosféry.
                    S láskou k severské kultuře a hygge filosofii vám přináším praktické tipy a inspiraci
                    pro vaše cesty po Dánsku.
                  </p>
                  <div className="flex flex-wrap justify-center gap-3 md:justify-start">
                    <a
                      href="mailto:zimmermannovap@gmail.com"
                      className="inline-flex items-center gap-2 rounded-lg bg-primary/10 px-4 py-2 text-sm font-medium text-primary transition-colors hover:bg-primary/20"
                    >
                      📧 Kontakt
                    </a>
                    <Link
                      to="/clanky"
                      className="inline-flex items-center gap-2 rounded-lg bg-muted px-4 py-2 text-sm font-medium transition-colors hover:bg-muted/80"
                    >
                      📝 Další průvodce
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </article>
        </div>
      </div>
    </>
  );
};

export default ArticleDetail;
