import { Link } from "react-router-dom";
import { Facebook, Instagram, Mail } from "lucide-react";

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

          {/* Categories */}
          <div>
            <h3 className="mb-4 text-lg font-semibold">Kategorie</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  to="/cestovani"
                  className="text-muted-foreground transition-colors hover:text-primary"
                >
                  Cestování
                </Link>
              </li>
              <li>
                <Link
                  to="/kultura"
                  className="text-muted-foreground transition-colors hover:text-primary"
                >
                  Kultura
                </Link>
              </li>
              <li>
                <Link
                  to="/kontakt"
                  className="text-muted-foreground transition-colors hover:text-primary"
                >
                  Kontakt
                </Link>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h3 className="mb-4 text-lg font-semibold">Sledujte nás</h3>
            <div className="flex gap-4">
              <a
                href="#"
                className="text-muted-foreground transition-colors hover:text-primary"
                aria-label="Facebook"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="text-muted-foreground transition-colors hover:text-primary"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="mailto:info@kastrup.cz"
                className="text-muted-foreground transition-colors hover:text-primary"
                aria-label="Email"
              >
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Kastrup.cz. Všechna práva vyhrazena.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
