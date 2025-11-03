import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FileText, Home, LogOut, PlusCircle, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Helmet } from "react-helmet-async";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    articles: 0,
    published: 0,
    drafts: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      // Počet článků
      const { count: totalArticles } = await supabase
        .from("articles")
        .select("*", { count: "exact", head: true });

      const { count: publishedArticles } = await supabase
        .from("articles")
        .select("*", { count: "exact", head: true })
        .eq("published", true);

      setStats({
        articles: totalArticles || 0,
        published: publishedArticles || 0,
        drafts: (totalArticles || 0) - (publishedArticles || 0),
      });
    } catch (error) {
      console.error("Error fetching stats:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      toast.success("Odhlášen");
      navigate("/tajnedvere");
    } catch (error) {
      console.error("Logout error:", error);
      toast.error("Nepodařilo se odhlásit");
    }
  };

  return (
    <>
      <Helmet>
        <title>Dashboard - Administrace | Kastrup.cz</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <div className="min-h-screen bg-muted/30">
        {/* Header */}
        <header className="border-b bg-background">
          <div className="container mx-auto flex items-center justify-between px-4 py-4">
            <div className="flex items-center gap-4">
              <h1 className="text-2xl font-bold">Administrace</h1>
              <span className="text-sm text-muted-foreground">Kastrup.cz</span>
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
          <div className="mb-8">
            <h2 className="mb-2 text-3xl font-bold">Dashboard</h2>
            <p className="text-muted-foreground">Přehled administrace</p>
          </div>

          {/* Stats Cards */}
          <div className="mb-8 grid gap-6 md:grid-cols-3">
            <div className="rounded-lg border bg-card p-6 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Celkem článků</p>
                  <p className="mt-2 text-3xl font-bold">
                    {loading ? "..." : stats.articles}
                  </p>
                </div>
                <FileText className="h-12 w-12 text-muted-foreground opacity-50" />
              </div>
            </div>

            <div className="rounded-lg border bg-card p-6 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Publikované</p>
                  <p className="mt-2 text-3xl font-bold text-green-600">
                    {loading ? "..." : stats.published}
                  </p>
                </div>
                <FileText className="h-12 w-12 text-green-600 opacity-50" />
              </div>
            </div>

            <div className="rounded-lg border bg-card p-6 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Koncepty</p>
                  <p className="mt-2 text-3xl font-bold text-orange-600">
                    {loading ? "..." : stats.drafts}
                  </p>
                </div>
                <FileText className="h-12 w-12 text-orange-600 opacity-50" />
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="rounded-lg border bg-card p-6 shadow-sm">
            <h3 className="mb-4 text-xl font-semibold">Rychlé akce</h3>
            <div className="flex flex-wrap gap-4">
              <Link to="/tajnedvere/articles/new">
                <Button size="lg">
                  <PlusCircle className="mr-2 h-5 w-5" />
                  Nový článek
                </Button>
              </Link>
              <Link to="/tajnedvere/articles">
                <Button variant="outline" size="lg">
                  <FileText className="mr-2 h-5 w-5" />
                  Správa článků
                </Button>
              </Link>
            </div>
          </div>

          {/* Info Box */}
          <div className="mt-8 rounded-lg border-l-4 border-primary bg-primary/5 p-6">
            <h4 className="mb-2 font-semibold">🎉 Vítejte v administraci!</h4>
            <p className="text-sm text-muted-foreground">
              Zde můžete spravovat články, přidávat nový obsah a kontrolovat stav webu.
              Pro přidání nového článku klikněte na "Nový článek" výše.
            </p>
          </div>
        </main>
      </div>
    </>
  );
};

export default AdminDashboard;
