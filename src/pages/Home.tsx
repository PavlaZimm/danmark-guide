import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import ArticleCard from "@/components/ArticleCard";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface Article {
  id: string;
  title: string;
  slug: string;
  perex: string;
  image_url: string | null;
  created_at: string;
  categories: {
    name: string;
  };
}

const Home = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchArticles();
  }, []);

  const fetchArticles = async () => {
    try {
      const { data, error } = await supabase
        .from("articles")
        .select(`
          id,
          title,
          slug,
          perex,
          image_url,
          created_at,
          categories (
            name
          )
        `)
        .eq("published", true)
        .order("created_at", { ascending: false })
        .limit(6);

      if (error) throw error;
      setArticles(data || []);
    } catch (error) {
      console.error("Error fetching articles:", error);
      toast.error("Nepodařilo se načíst články");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-hero py-20 md:py-32">
        <div className="container relative z-10 mx-auto px-4 md:px-6">
          <div className="mx-auto max-w-3xl text-center text-white">
            <h1 className="mb-6 text-4xl font-bold md:text-5xl lg:text-6xl">
              Objevte krásy Dánska
            </h1>
            <p className="mb-8 text-lg text-white/90 md:text-xl">
              Váš průvodce po dánské kultuře, historii, cestování a nejlepších
              destinacích v zemi викингů a hygge.
            </p>
            <div className="mx-auto flex max-w-md gap-2">
              <Input
                type="search"
                placeholder="Hledat články..."
                className="bg-white text-foreground"
              />
              <Button size="icon" className="bg-white text-primary hover:bg-white/90">
                <Search className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDM0djJoLTJ2LTJoMnptMC00aDJ2Mmgtdi0yem0wLTR2MmgtMnYtMmgyem0wLTRoMnYyaC0ydi0yem0wLTR2MmgtMnYtMmgyem0tMiAyaC0ydi0yaDJ2MnptLTQgMGgtMnYtMmgydjJ6bS00IDBoLTJ2LTJoMnYyem0tNCAwSDIwdi0yaDJ2MnptLTQgMGgtMnYtMmgydjJ6bS00IDBoLTJ2LTJoMnYyem0tNCAwSDh2LTJoMnYyem0tNCAwSDR2LTJoMnYyem0tNCAwSDB2LTJoMnYyem0yOCAyNGgtMnYtMmgydjJ6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-10"></div>
      </section>

      {/* Latest Articles */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="mb-12 flex items-center justify-between">
            <div>
              <h2 className="mb-2 text-3xl font-bold md:text-4xl">Nejnovější články</h2>
              <p className="text-muted-foreground">
                Prozkoumejte naše nejnovější příspěvky o Dánsku
              </p>
            </div>
            <Link to="/clanky">
              <Button variant="outline" className="hidden md:flex">
                Zobrazit vše
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>

          {loading ? (
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="h-96 animate-pulse rounded-lg bg-muted"></div>
              ))}
            </div>
          ) : articles.length > 0 ? (
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
                />
              ))}
            </div>
          ) : (
            <div className="rounded-lg bg-muted p-12 text-center">
              <p className="text-lg text-muted-foreground">
                Zatím zde nejsou žádné publikované články.
              </p>
            </div>
          )}

          <div className="mt-8 text-center md:hidden">
            <Link to="/clanky">
              <Button>
                Zobrazit vše
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Categories */}
      <section className="bg-secondary/30 py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="mb-12 text-center text-3xl font-bold md:text-4xl">
            Prozkoumejte kategorie
          </h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[
              { name: "Cestování", emoji: "✈️", path: "/cestovani" },
              { name: "Kultura", emoji: "🎭", path: "/kultura" },
              { name: "Historie", emoji: "🏛️", path: "/clanky" },
              { name: "Gastronomie", emoji: "🍽️", path: "/clanky" },
              { name: "Lifestyle", emoji: "🌟", path: "/clanky" },
              { name: "Ubytování", emoji: "🏨", path: "/ubytovani" },
            ].map((category) => (
              <Link
                key={category.name}
                to={category.path}
                className="group rounded-lg bg-card p-8 text-center shadow-soft transition-all hover:shadow-medium"
              >
                <div className="mb-4 text-5xl">{category.emoji}</div>
                <h3 className="text-xl font-semibold transition-colors group-hover:text-primary">
                  {category.name}
                </h3>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
