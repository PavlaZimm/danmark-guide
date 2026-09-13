import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { ArrowRight, Mail } from "lucide-react";
import Breadcrumbs from "@/components/Breadcrumbs";
import { Button } from "@/components/ui/button";

const AUTHOR_URL = "https://kastrup.cz/autorka";

const Author = () => (
  <>
    <Helmet>
      <title>Pavla Zimmermannová – autorka Kastrup.cz</title>
      <meta
        name="description"
        content="Poznejte Pavlu Zimmermannovou, autorku Kastrup.cz. Sdílí praktické tipy, vlastní zkušenosti a inspiraci pro cesty po Dánsku."
      />
      <link rel="canonical" href={AUTHOR_URL} />
      <meta property="og:type" content="profile" />
      <meta property="og:url" content={AUTHOR_URL} />
      <meta property="og:title" content="Pavla Zimmermannová – autorka Kastrup.cz" />
      <meta
        property="og:description"
        content="Autorka praktických průvodců a inspirace pro cesty po Dánsku."
      />
      <meta property="og:image" content="https://kastrup.cz/images/atterseebook.jpg" />
      <meta property="og:locale" content="cs_CZ" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="Pavla Zimmermannová – autorka Kastrup.cz" />
      <meta name="twitter:image" content="https://kastrup.cz/images/atterseebook.jpg" />

      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "ProfilePage",
          name: "Pavla Zimmermannová – autorka Kastrup.cz",
          url: AUTHOR_URL,
          inLanguage: "cs-CZ",
          mainEntity: {
            "@type": "Person",
            name: "Pavla Zimmermannová",
            url: AUTHOR_URL,
            description:
              "Autorka Kastrup.cz, která sdílí praktické tipy, vlastní zkušenosti a inspiraci pro cesty po Dánsku.",
            knowsAbout: ["Dánsko", "Kodaň", "Cestování", "Dánská kultura", "Hygge"],
            sameAs: ["https://linklady.cz"],
          },
          isPartOf: {
            "@type": "WebSite",
            name: "Kastrup.cz",
            url: "https://kastrup.cz",
          },
        })}
      </script>
    </Helmet>

    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4 md:px-6">
        <article className="mx-auto max-w-3xl">
          <Breadcrumbs items={[{ label: "O autorce" }]} />

          <header className="mb-10 text-center">
            <div
              role="img"
              aria-label="Iniciály Pavly Zimmermannové"
              className="mx-auto mb-8 flex h-48 w-48 items-center justify-center rounded-full border-4 border-primary/20 bg-primary text-5xl font-bold text-primary-foreground shadow-xl sm:h-56 sm:w-56 sm:text-6xl"
            >
              PZ
            </div>
            <h1 className="mb-4 text-4xl font-bold md:text-5xl">Pavla Zimmermannová</h1>
            <p className="text-xl text-muted-foreground">Autorka a průvodkyně webem Kastrup.cz</p>
          </header>

          <div className="prose prose-lg max-w-none">
            <p>
              Dánsko mám ráda a vracím se sem pro kombinaci klidu, přírody, designu a laskavé
              atmosféry. Na Kastrup.cz sdílím praktické tipy a inspiraci, které pomáhají naplánovat
              cestu po Dánsku srozumitelně a bez zbytečného hledání.
            </p>
            <h2>Jak obsah vzniká</h2>
            <p>
              Průvodce stavím na vlastních zkušenostech z cest a na ověřených praktických
              informacích. U časově citlivých údajů, jako jsou ceny, jízdní řády nebo podmínky
              vstupu, doporučuji před cestou zkontrolovat také aktuální informace u provozovatele.
            </p>
            <h2>O čem píšu</h2>
            <p>
              Zaměřuji se na Kodaň a okolí, dopravu, dánskou kulturu, architekturu, hygge a místa,
              která stojí za návštěvu. Cílem je užitečný obsah pro české cestovatele, ne text
              psaný jen pro vyhledávače.
            </p>
          </div>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <Link to="/clanky">
              <Button>
                Přečíst průvodce
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <a href="mailto:zimmermannovap@gmail.com">
              <Button variant="outline">
                <Mail className="mr-2 h-4 w-4" />
                Napsat autorce
              </Button>
            </a>
          </div>
        </article>
      </div>
    </div>
  </>
);

export default Author;
