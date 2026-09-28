import { Link } from "react-router-dom";
import { Mail, Coffee, Heart } from "lucide-react";
import { ui } from "@/lib/i18n";
import { COOKIE_SETTINGS_EVENT } from "@/lib/analytics";
import { LANG, SITE, pathTo } from "@/lib/site";

const Footer = () => {
  return (
    <footer className="border-t bg-secondary/30">
      <div className="container mx-auto px-4 py-12 md:px-6">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* About */}
          <div>
            <h2 className="mb-4 text-lg font-semibold">{ui.footer.aboutTitle}</h2>
            <p className="text-sm text-muted-foreground">
              {ui.footer.aboutText}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h2 className="mb-4 text-lg font-semibold">{ui.footer.quickLinks}</h2>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  to={pathTo("about")}
                  className="text-muted-foreground transition-colors hover:text-primary"
                >
                  {ui.nav.about}
                </Link>
              </li>
              <li>
                <Link
                  to={pathTo("articles")}
                  className="text-muted-foreground transition-colors hover:text-primary"
                >
                  {ui.nav.guides}
                </Link>
              </li>
              <li>
                <Link
                  to={pathTo("accommodation")}
                  className="text-muted-foreground transition-colors hover:text-primary"
                >
                  {ui.nav.accommodation}
                </Link>
              </li>
              <li>
                <Link
                  to={pathTo("author")}
                  className="text-muted-foreground transition-colors hover:text-primary"
                >
                  {ui.footer.author}
                </Link>
              </li>
              <li>
                <Link
                  to={pathTo("contact")}
                  className="text-muted-foreground transition-colors hover:text-primary"
                >
                  {ui.nav.contact}
                </Link>
              </li>
              <li>
                <Link
                  to={pathTo("privacy")}
                  className="text-muted-foreground transition-colors hover:text-primary"
                >
                  {ui.footer.privacy}
                </Link>
              </li>
              {LANG === "pl" && (
                <li>
                  <button
                    type="button"
                    onClick={() => window.dispatchEvent(new Event(COOKIE_SETTINGS_EVENT))}
                    className="text-muted-foreground transition-colors hover:text-primary"
                  >
                    Ustawienia cookies
                  </button>
                </li>
              )}
            </ul>
          </div>

          {/* Topics */}
          <div>
            <h2 className="mb-4 text-lg font-semibold">{ui.footer.topics}</h2>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  to={pathTo("culture")}
                  className="text-muted-foreground transition-colors hover:text-primary"
                >
                  {ui.footer.culture}
                </Link>
              </li>
              <li>
                <Link
                  to={pathTo("hygge")}
                  className="text-muted-foreground transition-colors hover:text-primary"
                >
                  {ui.footer.hygge}
                </Link>
              </li>
              <li>
                <Link
                  to={pathTo("copenhagen")}
                  className="text-muted-foreground transition-colors hover:text-primary"
                >
                  {ui.footer.copenhagen}
                </Link>
              </li>
              {LANG === "cs" && (
                <li>
                  <Link
                    to="/cestovani"
                    className="text-muted-foreground transition-colors hover:text-primary"
                  >
                    {ui.footer.travel}
                  </Link>
                </li>
              )}
              <li>
                <Link
                  to={pathTo("articles")}
                  className="text-muted-foreground transition-colors hover:text-primary"
                >
                  {ui.footer.allArticles}
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h2 className="mb-4 text-lg font-semibold">{ui.footer.contactTitle}</h2>
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
          <p className="mb-3">&copy; {new Date().getFullYear()} {SITE.name}. {ui.footer.rights}</p>
          <p className="flex items-center justify-center gap-2 text-xs">
            {ui.footer.madeWith}
            <Heart className="h-3 w-3 fill-red-500 text-red-500 animate-pulse" />
            {ui.footer.andLots}
            <Coffee className="h-3 w-3" />
            {ui.footer.coffee} •
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
