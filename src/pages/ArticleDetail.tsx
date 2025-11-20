import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Calendar, ArrowLeft, Share2, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Helmet } from "react-helmet-async";
import Breadcrumbs from "@/components/Breadcrumbs";
import DOMPurify from "dompurify";

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

const ArticleDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (slug) {
      fetchArticle();
    }
  }, [slug]);

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

  return (
    <>
      <Helmet>
        <title>{article.meta_title || article.title} | Kastrup.cz</title>
        <meta
          name="description"
          content={article.meta_description || article.perex}
        />
        <link rel="canonical" href={`https://kastrup.cz/clanek/${article.slug}`} />

        {/* Open Graph */}
        <meta property="og:type" content="article" />
        <meta property="og:url" content={`https://kastrup.cz/clanek/${article.slug}`} />
        <meta property="og:title" content={article.meta_title || article.title} />
        <meta
          property="og:description"
          content={article.meta_description || article.perex}
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
        <meta name="twitter:title" content={article.meta_title || article.title} />
        <meta
          name="twitter:description"
          content={article.meta_description || article.perex}
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
            <div
              className="prose prose-lg max-w-none"
              dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(article.content) }}
            />

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
