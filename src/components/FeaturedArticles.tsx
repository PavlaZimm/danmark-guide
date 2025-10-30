import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import ArticleCard from "@/components/ArticleCard";
import { supabase } from "@/integrations/supabase/client";

interface Article {
  id: string;
  title: string;
  slug: string;
  perex: string;
  content: string;
  image_url: string | null;
  created_at: string;
  categories: {
    name: string;
    slug: string;
  };
}

const FeaturedArticles = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFeaturedArticles();
  }, []);

  const fetchFeaturedArticles = async () => {
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
          categories (
            name,
            slug
          )
        `)
        .eq("published", true)
        .order("created_at", { ascending: false })
        .limit(3);

      if (error) throw error;
      setArticles(data || []);
    } catch (error) {
      console.error("Error fetching featured articles:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <section className="py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="mb-12 text-center">
            <h2 className="mb-4">Nejnovější články</h2>
          </div>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-96 animate-pulse rounded-lg bg-muted"></div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (articles.length === 0) {
    return null;
  }

  return (
    <section className="py-24 bg-secondary/30">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mb-12 flex items-center justify-between">
          <div>
            <h2 className="mb-4">Nejnovější články</h2>
            <p className="text-lg text-muted-foreground">
              Objevte naše nejnovější příběhy o Dánsku
            </p>
          </div>
          <Link to="/clanky" className="hidden md:block">
            <Button variant="outline">
              Všechny články
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {articles.map((article) => (
            <ArticleCard
              key={article.id}
              id={article.id}
              title={article.title}
              slug={article.slug}
              perex={article.perex}
              imageUrl={article.image_url || undefined}
              category={article.categories?.name || "Bez kategorie"}
              createdAt={article.created_at}
              content={article.content}
            />
          ))}
        </div>

        <div className="mt-12 text-center md:hidden">
          <Link to="/clanky">
            <Button>
              Všechny články
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedArticles;
