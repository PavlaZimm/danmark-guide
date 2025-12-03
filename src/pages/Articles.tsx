import { useEffect, useState } from "react";
import { Link, useSearchParams, useLocation } from "react-router-dom";
import { Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import ArticleCard from "@/components/ArticleCard";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Helmet } from "react-helmet-async";
import Breadcrumbs from "@/components/Breadcrumbs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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

interface Category {
  id: string;
  name: string;
  slug: string;
}

const Articles = () => {
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const [articles, setArticles] = useState<Article[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState(searchParams.get("search") || "");
  const [selectedCategory, setSelectedCategory] = useState<string>(
    searchParams.get("category") || "all"
  );

  // Dynamic meta tags based on current path
  const getPageMeta = () => {
    const path = location.pathname;

    if (path === "/kultura") {
      return {
        title: "Dánská kultura a tradice | Kastrup.cz",
        description: "Objevte dánskou kulturu, tradice, hygge a životní styl. Články o dánském designu, architektuře, umění a způsobu života v Dánsku.",
        canonical: "https://kastrup.cz/kultura",
        ogTitle: "Dánská kultura - Kastrup.cz",
        heading: "Dánská kultura a tradice"
      };
    } else if (path === "/cestovani") {
      return {
        title: "Cestování po Dánsku | Tipy a průvodce | Kastrup.cz",
        description: "Praktické tipy pro cestování po Dánsku. Kam jet, co vidět, kde spát a jíst. Itineráře, doprava a rady pro vaši cestu do Dánska.",
        canonical: "https://kastrup.cz/cestovani",
        ogTitle: "Cestování po Dánsku - Kastrup.cz",
        heading: "Cestování po Dánsku"
      };
    } else {
      return {
        title: "Články o Dánsku | Cestování, Kultura, Tipy | Kastrup.cz",
        description: "Čtěte zajímavé články o Dánsku, dánské kultuře, cestování, hygge a životě v severní Evropě. Praktické tipy a inspirace pro vaši cestu do Dánska.",
        canonical: "https://kastrup.cz/clanky",
        ogTitle: "Články o Dánsku - Kastrup.cz",
        heading: "Články o Dánsku"
      };
    }
  };

  const pageMeta = getPageMeta();

  useEffect(() => {
    fetchCategories();
    fetchArticles();
  }, []);

  // Update URL parameters when filters change
  useEffect(() => {
    const params = new URLSearchParams();
    if (searchTerm) params.set("search", searchTerm);
    if (selectedCategory && selectedCategory !== "all") {
      params.set("category", selectedCategory);
    }
    setSearchParams(params, { replace: true });
  }, [searchTerm, selectedCategory, setSearchParams]);

  const fetchCategories = async () => {
    try {
      const { data, error } = await supabase
        .from("categories")
        .select("*")
        .order("name");

      if (error) throw error;
      setCategories(data || []);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const fetchArticles = async () => {
    try {
      setError(null);
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
        .order("created_at", { ascending: false });

      const { data, error } = await query;

      if (error) throw error;
      setArticles(data || []);

      // If no articles, set a friendly message but don't treat as error
      if (!data || data.length === 0) {
        console.info("No articles found in database");
      }
    } catch (error) {
      console.error("Error fetching articles:", error);
      setError("Nepodařilo se načíst články. Zkontrolujte prosím připojení k internetu.");
      toast.error("Nepodařilo se načíst články");
    } finally {
      setLoading(false);
    }
  };

  const filteredArticles = articles.filter((article) => {
    const matchesSearch =
      article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.perex.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" ||
      article.categories?.slug === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <>
      <Helmet>
        <title>{pageMeta.title}</title>
        <meta name="description" content={pageMeta.description} />
        <link rel="canonical" href={pageMeta.canonical} />

        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content={pageMeta.canonical} />
        <meta property="og:title" content={pageMeta.ogTitle} />
        <meta property="og:description" content={pageMeta.description} />
        <meta property="og:image" content="https://kastrup.cz/icon-512.svg" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={pageMeta.ogTitle} />
        <meta name="twitter:description" content={pageMeta.description} />

        {/* JSON-LD - CollectionPage */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            "name": pageMeta.heading,
            "description": pageMeta.description,
            "url": pageMeta.canonical,
            "isPartOf": {
              "@type": "WebSite",
              "name": "Kastrup.cz",
              "url": "https://kastrup.cz"
            }
          })}
        </script>

        {/* JSON-LD - ItemList for article listings */}
        {filteredArticles.length > 0 && (
          <script type="application/ld+json">
            {JSON.stringify({
              "@context": "https://schema.org",
              "@type": "ItemList",
              "itemListElement": filteredArticles.slice(0, 20).map((article, index) => ({
                "@type": "ListItem",
                "position": index + 1,
                "item": {
                  "@type": "Article",
                  "@id": `https://kastrup.cz/clanek/${article.slug}`,
                  "headline": article.title,
                  "description": article.perex,
                  "image": article.image_url || "https://kastrup.cz/icon-512.svg",
                  "url": `https://kastrup.cz/clanek/${article.slug}`
                }
              }))
            })}
          </script>
        )}
      </Helmet>

      <div className="min-h-screen py-12">
        <div className="container mx-auto px-4 md:px-6">
        <Breadcrumbs items={[{ label: pageMeta.heading }]} />

        {/* Header */}
        <div className="mb-12">
          <h1 className="mb-4 text-4xl font-bold md:text-5xl">{pageMeta.heading}</h1>
          <p className="text-lg text-muted-foreground">
            {location.pathname === "/kultura"
              ? "Objevte dánskou kulturu, tradice a životní styl"
              : location.pathname === "/cestovani"
              ? "Praktické tipy a inspirace pro vaši cestu do Dánska"
              : "Prozkoumejte naše články o Dánsku"}
          </p>
        </div>

        {/* Filters */}
        <div className="mb-8 flex flex-col gap-4 md:flex-row">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Hledat články..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-full md:w-[200px]">
              <SelectValue placeholder="Vyberte kategorii" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Všechny kategorie</SelectItem>
              {categories.map((category) => (
                <SelectItem key={category.id} value={category.slug}>
                  {category.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Active Filters */}
        {(searchTerm || selectedCategory !== "all") && (
          <div className="mb-6 flex flex-wrap items-center gap-2">
            <span className="text-sm text-muted-foreground">Aktivní filtry:</span>
            {searchTerm && (
              <Badge variant="secondary" className="gap-1">
                Hledání: "{searchTerm}"
                <button
                  onClick={() => setSearchTerm("")}
                  className="ml-1 rounded-full hover:bg-muted"
                  aria-label="Zrušit vyhledávání"
                >
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            )}
            {selectedCategory !== "all" && (
              <Badge variant="secondary" className="gap-1">
                Kategorie: {categories.find((c) => c.slug === selectedCategory)?.name}
                <button
                  onClick={() => setSelectedCategory("all")}
                  className="ml-1 rounded-full hover:bg-muted"
                  aria-label="Zrušit filtr kategorie"
                >
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            )}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                setSearchTerm("");
                setSelectedCategory("all");
              }}
              className="h-7 text-xs"
            >
              Vymazat vše
            </Button>
          </div>
        )}

        {/* Articles Grid */}
        {loading ? (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {[...Array(9)].map((_, i) => (
              <div key={i} className="h-96 animate-pulse rounded-lg bg-muted"></div>
            ))}
          </div>
        ) : error ? (
          <div className="rounded-lg border-2 border-destructive/20 bg-destructive/5 p-12 text-center">
            <p className="mb-4 text-lg font-semibold text-destructive">
              {error}
            </p>
            <Button onClick={fetchArticles} variant="outline">
              Zkusit znovu
            </Button>
          </div>
        ) : filteredArticles.length > 0 ? (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {filteredArticles.map((article) => (
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
        ) : articles.length === 0 ? (
          <div className="rounded-lg bg-gradient-card p-12 text-center">
            <h3 className="mb-4 text-2xl font-bold">Zatím zde nejsou žádné články</h3>
            <p className="mb-6 text-lg text-muted-foreground">
              Pracujeme na skvělém obsahu o Dánsku. Brzy zde najdete zajímavé články
              o kultuře, cestování a životě v Dánsku.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/o-dansku">
                <Button variant="default">
                  Více o Dánsku
                </Button>
              </Link>
              <Link to="/ubytovani">
                <Button variant="outline">
                  Prohlédnout ubytování
                </Button>
              </Link>
            </div>
          </div>
        ) : (
          <div className="rounded-lg bg-muted p-12 text-center">
            <p className="mb-4 text-lg text-muted-foreground">
              Nenalezeny žádné články odpovídající vašemu hledání.
            </p>
            <Button
              onClick={() => {
                setSearchTerm("");
                setSelectedCategory("all");
              }}
              variant="outline"
            >
              Vymazat filtry
            </Button>
          </div>
        )}
        </div>
      </div>
    </>
  );
};

export default Articles;
