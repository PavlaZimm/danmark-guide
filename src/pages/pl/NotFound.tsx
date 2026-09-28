import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { Home, Search, FileText, Building2, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  const links = [
    { to: "/", icon: Home, label: "Start" },
    { to: "/artykuly", icon: FileText, label: "Artykuły" },
    { to: "/noclegi", icon: Building2, label: "Noclegi" },
    { to: "/kontakt", icon: Mail, label: "Kontakt" },
  ];

  return (
    <>
      <Helmet>
        <title>404 - Nie znaleziono strony | Kastrup.pl</title>
        <meta
          name="description"
          content="Nie znaleziono strony, której szukasz. Zobacz nasze artykuły o Danii, noclegi albo wróć na stronę główną."
        />
        <meta name="robots" content="noindex, follow" />
      </Helmet>

      <div className="flex min-h-screen items-center justify-center bg-gradient-card py-12">
        <div className="container mx-auto px-4 text-center md:px-6">
          <div className="mx-auto max-w-2xl">
            <div className="mb-8">
              <h1 className="mb-4 text-9xl font-bold text-primary">404</h1>
              <div className="mx-auto h-1 w-24 bg-primary"></div>
            </div>

            <h2 className="mb-4 text-3xl font-bold md:text-4xl">Nie znaleziono strony</h2>
            <p className="mb-8 text-lg text-muted-foreground">
              Przepraszamy, strona <code className="rounded bg-muted px-2 py-1 text-sm">{location.pathname}</code> nie istnieje.
              Mogła zostać przeniesiona albo usunięta.
            </p>

            <div className="mb-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {links.map(({ to, icon: Icon, label }) => (
                <Link key={to} to={to} className="group">
                  <div className="rounded-lg border-2 bg-card p-6 transition-all hover:border-primary hover:shadow-medium">
                    <Icon className="mx-auto mb-3 h-8 w-8 text-primary" />
                    <h3 className="font-semibold">{label}</h3>
                  </div>
                </Link>
              ))}
            </div>

            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/">
                <Button size="lg" variant="default">
                  <Home className="mr-2 h-5 w-5" />
                  Wróć na stronę główną
                </Button>
              </Link>
              <Link to="/artykuly">
                <Button size="lg" variant="outline">
                  <Search className="mr-2 h-5 w-5" />
                  Przeglądaj artykuły
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NotFound;
