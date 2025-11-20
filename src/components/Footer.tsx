import { Link } from "react-router-dom";
import { Mail, Coffee, Heart } from "lucide-react";

const Footer = () => {
  return (
    <footer className="border-t bg-secondary/30">
      <div className="container mx-auto px-4 py-12 md:px-6">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* About */}
          <div>
            <h3 className="mb-4 text-lg font-semibold">O webu</h3>
            <p className="text-sm text-muted-foreground">
              Váš průvodce po Dánsku. Objevujte kulturu, historii a nejlepší
              destinace v Dánsku.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-4 text-lg font-semibold">Rychlé odkazy</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  to="/clanky"
                  className="text-muted-foreground transition-colors hover:text-primary"
                >
                  Články
                </Link>
              </li>
              <li>
                <Link
                  to="/ubytovani"
                  className="text-muted-foreground transition-colors hover:text-primary"
                >
                  Ubytování
                </Link>
              </li>
              <li>
                <Link
                  to="/o-dansku"
                  className="text-muted-foreground transition-colors hover:text-primary"
                >
                  O Dánsku
                </Link>
              </li>
            </ul>
          </div>

          {/* Article Categories */}
          <div>
            <h3 className="mb-4 text-lg font-semibold">Kategorie článků</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  to="/clanky?category=mesta"
                  className="text-muted-foreground transition-colors hover:text-primary"
                >
                  Města
                </Link>
              </li>
              <li>
                <Link
                  to="/clanky?category=kultura"
                  className="text-muted-foreground transition-colors hover:text-primary"
                >
                  Kultura
                </Link>
              </li>
              <li>
                <Link
                  to="/clanky?category=tipy"
                  className="text-muted-foreground transition-colors hover:text-primary"
                >
                  Tipy
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="mb-4 text-lg font-semibold">Kontakt</h3>
            <div className="flex gap-4">
              <a
                href="mailto:zimmermannovap@gmail.com"
                className="text-muted-foreground transition-colors hover:text-primary"
                aria-label="Email"
              >
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t pt-8 text-center text-sm text-muted-foreground">
          <p className="mb-3">&copy; {new Date().getFullYear()} Kastrup.cz. Všechna práva vyhrazena.</p>
          <p className="flex items-center justify-center gap-2 text-xs">
            Vytvořeno s
            <Heart className="h-3 w-3 fill-red-500 text-red-500 animate-pulse" />
            a spoustou
            <Coffee className="h-3 w-3" />
            kávou •
            <a
              href="https://linklady.cz"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-primary hover:underline"
            >
              LinkLady.cz
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
