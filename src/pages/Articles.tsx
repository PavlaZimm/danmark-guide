import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import ArticleCard from "@/components/ArticleCard";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Helmet } from "react-helmet-async";
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
  const [searchParams] = useSearchParams();
  const categoryFromUrl = searchParams.get("kategorie");

  const [articles, setArticles] = useState<Article[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>(categoryFromUrl || "all");

  useEffect(() => {
    fetchCategories();
    fetchArticles();
  }, []);

  useEffect(() => {
    if (categoryFromUrl) {
      setSelectedCategory(categoryFromUrl);
    }
  }, [categoryFromUrl]);

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
    } catch (error) {
      console.error("Error fetching articles:", error);
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
        <title>Články o Dánsku | Kastrup.cz</title>
        <meta
          name="description"
          content="Prozkoumejte naše články o Dánsku - kultura, cestování, hygge a dánský životní styl. Objevte tipy a inspiraci pro vaši cestu."
        />
        <meta property="og:title" content="Články o Dánsku | Kastrup.cz" />
        <meta property="og:description" content="Prozkoumejte naše články o Dánsku - kultura, cestování, hygge a dánský životní styl." />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="https://kastrup.cz/clanky" />
      </Helmet>
      <div className="min-h-screen py-12">
        <div className="container mx-auto px-4 md:px-6">
        {/* Header */}
        <div className="mb-12">
          <h1 className="mb-4 text-4xl font-bold md:text-5xl">Články</h1>
          <p className="text-lg text-muted-foreground">
            Prozkoumejte naše články o Dánsku
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

        {/* Articles Grid */}
        {loading ? (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {[...Array(9)].map((_, i) => (
              <div key={i} className="h-96 animate-pulse rounded-lg bg-muted"></div>
            ))}
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
        ) : (
          <div className="rounded-lg bg-muted p-12 text-center">
            <p className="text-lg text-muted-foreground">
              Nenalezeny žádné články odpovídající vašemu hledání.
            </p>
          </div>
        )}
        </div>
      </div>
    </>
  );
};

export default Articles;
