import { Link } from "react-router-dom";
import { Mail, MapPin, User, Briefcase, Globe, ArrowRight } from "lucide-react";
import { Helmet } from "react-helmet-async";
import Breadcrumbs from "@/components/Breadcrumbs";
import { DEFAULT_SOCIAL_IMAGE } from "@/lib/seo-helpers";

// Provider identification (name, business ID, seat, e-mail) — see Vyzkum/polska-verze/PRAVNI-POZADAVKY.md
const Contact = () => {
  const details = [
    { icon: User, label: "Wydawca", value: "Pavla Zimmermannová" },
    { icon: Briefcase, label: "Numer identyfikacyjny (IČO)", value: "04352041", note: "Przedsiębiorca wpisany do czeskiego rejestru działalności, urząd w Bílinie" },
    { icon: MapPin, label: "Siedziba", value: "Bílina, Republika Czeska" },
  ];

  const related = [
    { to: "/co-zobaczyc-w-danii", title: "Co zobaczyć w Danii", text: "Kraj wikingów, hygge i nowoczesnego designu", cta: "Dowiedz się więcej" },
    { to: "/noclegi", title: "Noclegi", text: "Znajdź nocleg na pobyt w Danii", cta: "Zobacz" },
    { to: "/artykuly", title: "Artykuły", text: "Przewodniki o podróżach i kulturze duńskiej", cta: "Czytaj artykuły" },
  ];

  return (
    <>
      <Helmet>
        <title>Kontakt | Kastrup.pl</title>
        <meta
          name="description"
          content="Kontakt w sprawie podróży do Danii. Pavla Zimmermannová, autorka Kastrup.pl – przewodnika po Kopenhadze, kulturze duńskiej i noclegach."
        />
        <link rel="canonical" href="https://kastrup.pl/kontakt" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://kastrup.pl/kontakt" />
        <meta property="og:title" content="Kontakt - Kastrup.pl" />
        <meta property="og:description" content="Dane kontaktowe Kastrup.pl – Pavla Zimmermannová, Bílina." />
        <meta property="og:image" content={DEFAULT_SOCIAL_IMAGE} />
        <meta property="og:locale" content="pl_PL" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Kontakt - Kastrup.pl" />
        <meta name="twitter:description" content="Dane kontaktowe Kastrup.pl – Pavla Zimmermannová, Bílina." />
        <meta name="twitter:image" content={DEFAULT_SOCIAL_IMAGE} />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ContactPage",
            "name": "Kontakt",
            "description": "Strona kontaktowa Kastrup.pl – przewodnika po Danii",
            "url": "https://kastrup.pl/kontakt",
            "inLanguage": "pl-PL",
            "mainEntity": {
              "@type": "Person",
              "name": "Pavla Zimmermannová",
              "email": "zimmermannovap@gmail.com",
              "url": "https://kastrup.pl/o-autorce",
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "Bílina",
                "addressCountry": "CZ"
              }
            },
            "isPartOf": {
              "@type": "WebSite",
              "name": "Kastrup.pl",
              "url": "https://kastrup.pl"
            }
          })}
        </script>
      </Helmet>

      <div className="min-h-screen py-12">
        <div className="container mx-auto px-4 md:px-6">
          <div className="mx-auto max-w-5xl">
            <Breadcrumbs items={[{ label: "Kontakt" }]} />

            <div className="mb-12 text-center">
              <h1 className="mb-6 text-4xl font-bold md:text-5xl">Kontakt</h1>
              <p className="text-xl text-muted-foreground">
                Masz pytanie? Napisz do mnie e-mail!
              </p>
            </div>

            <div className="mx-auto max-w-2xl">
              <h2 className="mb-8 text-center text-2xl font-semibold">Dane kontaktowe</h2>

              <div className="space-y-6">
                {details.map(({ icon: Icon, label, value, note }) => (
                  <div key={label} className="flex items-start gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="mb-1 text-sm font-semibold">{label}</h3>
                      <p className="text-muted-foreground">{value}</p>
                      {note && <p className="text-sm text-muted-foreground/80">{note}</p>}
                    </div>
                  </div>
                ))}

                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                    <Mail className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="mb-1 text-sm font-semibold">E-mail</h3>
                    <a
                      href="mailto:zimmermannovap@gmail.com"
                      className="text-muted-foreground transition-colors hover:text-primary"
                    >
                      zimmermannovap@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                    <Globe className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="mb-1 text-sm font-semibold">Strona</h3>
                    <a
                      href="https://www.linklady.cz"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted-foreground transition-colors hover:text-primary"
                    >
                      www.linklady.cz
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-16">
              <h2 className="mb-6 text-center text-2xl font-bold">Może Cię też zainteresować</h2>
              <div className="grid gap-6 md:grid-cols-3">
                {related.map((item) => (
                  <Link key={item.to} to={item.to} className="group">
                    <div className="rounded-lg bg-gradient-card p-6 transition-all hover:shadow-medium">
                      <h3 className="mb-2 text-lg font-semibold group-hover:text-primary">{item.title}</h3>
                      <p className="mb-4 text-sm text-muted-foreground">{item.text}</p>
                      <span className="inline-flex items-center text-sm font-medium text-primary">
                        {item.cta}
                        <ArrowRight className="ml-1 h-3 w-3" />
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Contact;
