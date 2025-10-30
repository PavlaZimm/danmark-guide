import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Heart, MapPin, Calendar, Mail, ExternalLink } from "lucide-react";
import { Helmet } from "react-helmet-async";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
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

const AuthorProfile = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [totalArticles, setTotalArticles] = useState(0);

  useEffect(() => {
    fetchArticles();
  }, []);

  const fetchArticles = async () => {
    try {
      const { data, error, count } = await supabase
        .from("articles")
        .select(
          `
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
        `,
          { count: "exact" }
        )
        .eq("published", true)
        .order("created_at", { ascending: false });

      if (error) throw error;
      setArticles(data || []);
      setTotalArticles(count || 0);
    } catch (error) {
      console.error("Error fetching articles:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>O autorce - Pavla | Kastrup.cz</title>
        <meta
          name="description"
          content="Poznejte Pavlu, autorku kastrup.cz. Milovnici Dánska, která první návštěvu této krásné země absolvovala v roce 1997 a ráda se tam vrací."
        />
        <link rel="canonical" href="https://kastrup.cz/autorka" />
      </Helmet>

      <div className="min-h-screen py-12">
        <div className="container mx-auto px-4 md:px-6">
          {/* Author Hero */}
          <Card className="mb-12 overflow-hidden border-2 border-primary/20 bg-gradient-to-br from-primary/5 to-transparent">
            <CardContent className="p-8 md:p-12">
              <div className="flex flex-col gap-8 md:flex-row md:items-center">
                {/* Avatar */}
                <div className="flex-shrink-0">
                  <div className="flex h-32 w-32 items-center justify-center rounded-full bg-primary/10 ring-8 ring-primary/20">
                    <span className="text-6xl">👩‍💻</span>
                  </div>
                </div>

                {/* Bio */}
                <div className="flex-1">
                  <div className="mb-3 flex items-center gap-2">
                    <h1 className="text-4xl font-bold">Pavla</h1>
                    <Heart className="h-6 w-6 fill-primary text-primary" />
                  </div>

                  <div className="mb-4 flex flex-wrap items-center gap-4 text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4" />
                      <span>Autorka kastrup.cz</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      <span>Od roku 1997 návštěvník Dánska</span>
                    </div>
                  </div>

                  <p className="mb-6 text-lg leading-relaxed">
                    Vítejte na mém blogu o Dánsku! Mám tuto nádhernou skandinávskou zemi velmi
                    ráda. Poprvé jsem Dánsko navštívila v roce <strong className="text-primary">1997</strong> a
                    od té doby se tam ráda vracím. Ať už je to kouzlo Kodaně, hygge atmosféra,
                    nebo krásná příroda – Dánsko má podle mě prostě něco výjimečného.
                  </p>

                  <p className="mb-6 leading-relaxed text-muted-foreground">
                    Na těchto stránkách s vámi sdílím své zkušenosti, tipy a poznatky o životě a
                    cestování v Dánsku. Píšu o místech, která mě fascinují, o kultuře, která mě
                    inspiruje, a o lidech, kteří mě učí vidět svět jinak.
                  </p>

                  <div className="flex flex-wrap gap-3">
                    <Link to="/kontakt">
                      <Button>
                        <Mail className="mr-2 h-4 w-4" />
                        Napište mi
                      </Button>
                    </Link>
                    <Link to="/clanky">
                      <Button variant="outline">
                        <ExternalLink className="mr-2 h-4 w-4" />
                        Všechny články
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Stats */}
          <div className="mb-12 grid gap-6 md:grid-cols-3">
            <Card>
              <CardContent className="p-6 text-center">
                <div className="mb-2 text-4xl font-bold text-primary">{totalArticles}</div>
                <p className="text-muted-foreground">Publikovaných článků</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <div className="mb-2 text-4xl font-bold text-primary">
                  {new Date().getFullYear() - 1997}+
                </div>
                <p className="text-muted-foreground">Let zkušeností s Dánskem</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <div className="mb-2 text-4xl font-bold text-primary">∞</div>
                <p className="text-muted-foreground">Láska k Dánsku</p>
              </CardContent>
            </Card>
          </div>

          {/* Latest Articles */}
          <div>
            <div className="mb-8 flex items-center justify-between">
              <div>
                <h2 className="mb-2 text-3xl font-bold">Nejnovější články</h2>
                <p className="text-muted-foreground">
                  Poslední příspěvky na kastrup.cz
                </p>
              </div>
              <Link to="/clanky">
                <Button variant="outline">
                  Zobrazit vše
                  <ExternalLink className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>

            {loading ? (
              <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="h-96 animate-pulse rounded-lg bg-muted"></div>
                ))}
              </div>
            ) : (
              <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {articles.slice(0, 6).map((article) => (
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
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default AuthorProfile;
