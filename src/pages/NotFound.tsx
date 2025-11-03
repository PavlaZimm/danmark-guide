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

  return (
    <>
      <Helmet>
        <title>404 - Stránka nenalezena | Kastrup.cz</title>
        <meta
          name="description"
          content="Litujeme, ale stránka kterou hledáte nebyla nalezena. Prozkoumejte naše články o Dánsku, ubytování nebo se vraťte na hlavní stránku."
        />
        <meta name="robots" content="noindex, follow" />
        <link rel="canonical" href="https://kastrup.cz/404" />
      </Helmet>

      <div className="flex min-h-screen items-center justify-center bg-gradient-card py-12">
        <div className="container mx-auto px-4 text-center md:px-6">
          <div className="mx-auto max-w-2xl">
            {/* 404 Graphic */}
            <div className="mb-8">
              <h1 className="mb-4 text-9xl font-bold text-primary">404</h1>
              <div className="mx-auto h-1 w-24 bg-primary"></div>
            </div>

            {/* Message */}
            <h2 className="mb-4 text-3xl font-bold md:text-4xl">
              Stránka nenalezena
            </h2>
            <p className="mb-8 text-lg text-muted-foreground">
              Litujeme, ale stránka <code className="rounded bg-muted px-2 py-1 text-sm">{location.pathname}</code> neexistuje.
              Možná byla přesunuta nebo odstraněna.
            </p>

            {/* Quick Links */}
            <div className="mb-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <Link to="/" className="group">
                <div className="rounded-lg border-2 bg-card p-6 transition-all hover:border-primary hover:shadow-medium">
                  <Home className="mx-auto mb-3 h-8 w-8 text-primary" />
                  <h3 className="font-semibold">Domů</h3>
                </div>
              </Link>

              <Link to="/clanky" className="group">
                <div className="rounded-lg border-2 bg-card p-6 transition-all hover:border-primary hover:shadow-medium">
                  <FileText className="mx-auto mb-3 h-8 w-8 text-primary" />
                  <h3 className="font-semibold">Články</h3>
                </div>
              </Link>

              <Link to="/ubytovani" className="group">
                <div className="rounded-lg border-2 bg-card p-6 transition-all hover:border-primary hover:shadow-medium">
                  <Building2 className="mx-auto mb-3 h-8 w-8 text-primary" />
                  <h3 className="font-semibold">Ubytování</h3>
                </div>
              </Link>

              <Link to="/kontakt" className="group">
                <div className="rounded-lg border-2 bg-card p-6 transition-all hover:border-primary hover:shadow-medium">
                  <Mail className="mx-auto mb-3 h-8 w-8 text-primary" />
                  <h3 className="font-semibold">Kontakt</h3>
                </div>
              </Link>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/">
                <Button size="lg" variant="default">
                  <Home className="mr-2 h-5 w-5" />
                  Zpět na hlavní stránku
                </Button>
              </Link>
              <Link to="/clanky">
                <Button size="lg" variant="outline">
                  <Search className="mr-2 h-5 w-5" />
                  Prozkoumat články
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
