import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";

interface Article {
  id: string;
  title: string;
  slug: string;
  perex: string;
  image_url: string | null;
  created_at: string;
  categories: {
    name: string;
    slug: string;
  };
}

interface RelatedArticlesProps {
  currentArticleId: string;
  categorySlug?: string;
}

const RelatedArticles = ({ currentArticleId, categorySlug }: RelatedArticlesProps) => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRelatedArticles();
  }, [currentArticleId, categorySlug]);

  const fetchRelatedArticles = async () => {
    try {
      let query = supabase
        .from("articles")
        .select(`
          id,
          title,
          slug,
          perex,
          image_url,
          created_at,
          categories (
            name,
            slug
          )
        `)
        .eq("published", true)
        .neq("id", currentArticleId)
        .order("created_at", { ascending: false })
        .limit(3);

      // Filter by category if available
      if (categorySlug) {
        query = query.eq("categories.slug", categorySlug);
      }

      const { data, error } = await query;

      if (error) throw error;
      setArticles(data || []);
    } catch (error) {
      console.error("Error fetching related articles:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <section className="mt-16 border-t pt-16">
        <div className="mb-8">
          <h2 className="text-3xl font-bold">Mohlo by vás zajímat</h2>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="h-64 animate-pulse rounded-lg bg-muted"></div>
          ))}
        </div>
      </section>
    );
  }

  if (articles.length === 0) {
    return null;
  }

  return (
    <section className="mt-16 border-t pt-16">
      <div className="mb-8">
        <h2 className="text-3xl font-bold">Mohlo by vás zajímat</h2>
        <p className="mt-2 text-muted-foreground">
          Další články z kategorie {categorySlug ? articles[0]?.categories?.name : "Dánsko"}
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {articles.map((article) => {
          const formattedDate = new Date(article.created_at).toLocaleDateString("cs-CZ", {
            year: "numeric",
            month: "long",
            day: "numeric",
          });

          return (
            <Link key={article.id} to={`/clanek/${article.slug}`} className="group">
              <Card className="h-full overflow-hidden transition-all hover:shadow-lg">
                <CardHeader className="p-0">
                  <div className="relative aspect-[16/9] overflow-hidden bg-muted">
                    {article.image_url ? (
                      <img
                        src={article.image_url}
                        alt={article.title}
                        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                        loading="lazy"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center bg-gradient-nordic">
                        <span className="text-4xl">📰</span>
                      </div>
                    )}
                    <Badge className="absolute left-4 top-4 bg-primary">
                      {article.categories?.name}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="p-4">
                  <h3 className="mb-2 line-clamp-2 font-semibold transition-colors group-hover:text-primary">
                    {article.title}
                  </h3>
                  <p className="mb-3 line-clamp-2 text-sm text-muted-foreground">
                    {article.perex}
                  </p>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <span>{formattedDate}</span>
                    <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1" />
                  </div>
                </CardContent>
              </Card>
            </Link>
          );
        })}
      </div>
    </section>
  );
};

export default RelatedArticles;
