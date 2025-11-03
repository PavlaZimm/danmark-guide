import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Edit, Home, LogOut, PlusCircle, Trash2, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Helmet } from "react-helmet-async";

interface Article {
  id: string;
  title: string;
  slug: string;
  published: boolean;
  created_at: string;
  categories: {
    name: string;
  };
}

const AdminArticles = () => {
  const navigate = useNavigate();
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
          published,
          created_at,
          categories (
            name
          )
        `)
        .order("created_at", { ascending: false });

      if (error) throw error;
      setArticles(data || []);
    } catch (error) {
      console.error("Error fetching articles:", error);
      toast.error("Nepodařilo se načíst články");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Opravdu chcete smazat článek "${title}"?`)) return;

    try {
      const { error } = await supabase
        .from("articles")
        .delete()
        .eq("id", id);

      if (error) throw error;

      toast.success("Článek smazán");
      fetchArticles();
    } catch (error) {
      console.error("Error deleting article:", error);
      toast.error("Nepodařilo se smazat článek");
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    toast.success("Odhlášen");
    navigate("/tajnedvere");
  };

  return (
    <>
      <Helmet>
        <title>Správa článků - Administrace | Kastrup.cz</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <div className="min-h-screen bg-muted/30">
        {/* Header */}
        <header className="border-b bg-background">
          <div className="container mx-auto flex items-center justify-between px-4 py-4">
            <div className="flex items-center gap-4">
              <Link to="/tajnedvere/dashboard">
                <h1 className="text-2xl font-bold hover:text-primary">Administrace</h1>
              </Link>
            </div>
            <div className="flex items-center gap-2">
              <Link to="/">
                <Button variant="ghost" size="sm">
                  <Home className="mr-2 h-4 w-4" />
                  Zpět na web
                </Button>
              </Link>
              <Button variant="ghost" size="sm" onClick={handleLogout}>
                <LogOut className="mr-2 h-4 w-4" />
                Odhlásit se
              </Button>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="container mx-auto px-4 py-8">
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h2 className="mb-2 text-3xl font-bold">Články</h2>
              <p className="text-muted-foreground">
                Správa všech článků
              </p>
            </div>
            <Link to="/tajnedvere/articles/new">
              <Button size="lg">
                <PlusCircle className="mr-2 h-5 w-5" />
                Nový článek
              </Button>
            </Link>
          </div>

          {/* Articles Table */}
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <div className="h-12 w-12 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
            </div>
          ) : articles.length === 0 ? (
            <div className="rounded-lg border bg-card p-12 text-center">
              <p className="mb-4 text-lg text-muted-foreground">
                Zatím nemáte žádné články
              </p>
              <Link to="/tajnedvere/articles/new">
                <Button>
                  <PlusCircle className="mr-2 h-5 w-5" />
                  Vytvořit první článek
                </Button>
              </Link>
            </div>
          ) : (
            <div className="rounded-lg border bg-card shadow-sm">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="border-b bg-muted/50">
                    <tr>
                      <th className="px-4 py-3 text-left text-sm font-medium">Název</th>
                      <th className="px-4 py-3 text-left text-sm font-medium">Kategorie</th>
                      <th className="px-4 py-3 text-left text-sm font-medium">Stav</th>
                      <th className="px-4 py-3 text-left text-sm font-medium">Vytvořeno</th>
                      <th className="px-4 py-3 text-right text-sm font-medium">Akce</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {articles.map((article) => (
                      <tr key={article.id} className="hover:bg-muted/50">
                        <td className="px-4 py-4">
                          <div className="font-medium">{article.title}</div>
                          <div className="text-sm text-muted-foreground">
                            /{article.slug}
                          </div>
                        </td>
                        <td className="px-4 py-4">
                          <Badge variant="outline">
                            {article.categories?.name || "Bez kategorie"}
                          </Badge>
                        </td>
                        <td className="px-4 py-4">
                          {article.published ? (
                            <Badge className="bg-green-600">Publikováno</Badge>
                          ) : (
                            <Badge variant="secondary">Koncept</Badge>
                          )}
                        </td>
                        <td className="px-4 py-4 text-sm text-muted-foreground">
                          {new Date(article.created_at).toLocaleDateString("cs-CZ")}
                        </td>
                        <td className="px-4 py-4">
                          <div className="flex items-center justify-end gap-2">
                            <Link to={`/clanek/${article.slug}`} target="_blank">
                              <Button variant="ghost" size="sm">
                                <Eye className="h-4 w-4" />
                              </Button>
                            </Link>
                            <Link to={`/tajnedvere/articles/edit/${article.id}`}>
                              <Button variant="ghost" size="sm">
                                <Edit className="h-4 w-4" />
                              </Button>
                            </Link>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleDelete(article.id, article.title)}
                            >
                              <Trash2 className="h-4 w-4 text-destructive" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </main>
      </div>
    </>
  );
};

export default AdminArticles;
