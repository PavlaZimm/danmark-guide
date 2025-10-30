import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Calendar, ArrowLeft, Share2, Clock, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Helmet } from "react-helmet-async";
import { calculateReadingTime, formatReadingTime } from "@/lib/readingTime";
import AuthorBio from "@/components/AuthorBio";

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

  const readingMinutes = article ? calculateReadingTime(article.content) : 0;
  const readingTime = formatReadingTime(readingMinutes);

  // Create JSON-LD structured data for SEO
  const structuredData = article ? {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": article.title,
    "description": article.perex,
    "image": article.og_image || article.image_url || "",
    "datePublished": article.created_at,
    "dateModified": article.created_at,
    "author": {
      "@type": "Organization",
      "name": "Kastrup.cz",
      "url": "https://kastrup.cz"
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
    "wordCount": article.content.replace(/<[^>]*>/g, '').split(/\s+/).length
  } : null;

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
        <meta property="og:title" content={article.meta_title || article.title} />
        <meta
          property="og:description"
          content={article.meta_description || article.perex}
        />
        <meta
          property="og:image"
          content={article.og_image || article.image_url || ""}
        />
        <meta property="og:type" content="article" />
        <meta property="article:published_time" content={article.created_at} />
        <meta property="article:author" content="Kastrup.cz" />
        <link rel="canonical" href={`https://kastrup.cz/clanek/${article.slug}`} />
        {structuredData && (
          <script type="application/ld+json">
            {JSON.stringify(structuredData)}
          </script>
        )}
      </Helmet>

      <article className="min-h-screen py-12">
        <div className="container mx-auto px-4 md:px-6">
          <div className="mx-auto max-w-4xl">
            {/* Breadcrumb */}
            <nav className="mb-8">
              <Link
                to="/clanky"
                className="inline-flex items-center text-sm text-muted-foreground transition-colors hover:text-primary"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Zpět na články
              </Link>
            </nav>

            {/* Header */}
            <header className="mb-8">
              <div className="mb-4 flex flex-wrap items-center gap-4">
                <Badge className="bg-primary">{article.categories?.name}</Badge>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <User className="h-4 w-4" />
                  <span>Kastrup.cz</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  <span>{formattedDate}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Clock className="h-4 w-4" />
                  <span>{readingTime}</span>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleShare}
                  className="ml-auto"
                >
                  <Share2 className="mr-2 h-4 w-4" />
                  Sdílet
                </Button>
              </div>
              <h1 className="mb-6 text-4xl font-bold md:text-5xl">
                {article.title}
              </h1>
              <p className="text-xl text-muted-foreground">{article.perex}</p>
            </header>

            {/* Featured Image */}
            {article.image_url && (
              <div className="mb-12 aspect-video overflow-hidden rounded-lg">
                <img
                  src={article.image_url}
                  alt={article.title}
                  className="h-full w-full object-cover"
                />
              </div>
            )}

            {/* Content */}
            <div
              className="prose prose-lg max-w-none mb-12"
              dangerouslySetInnerHTML={{ __html: article.content }}
            />

            {/* Author Bio */}
            <AuthorBio />
          </div>
        </div>
      </article>
    </>
  );
};

export default ArticleDetail;
