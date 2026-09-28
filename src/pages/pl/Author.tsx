import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { ArrowRight, Mail } from "lucide-react";
import Breadcrumbs from "@/components/Breadcrumbs";
import { Button } from "@/components/ui/button";

const AUTHOR_URL = "https://kastrup.pl/o-autorce";
const TITLE = "Pavla Zimmermannová – autorka Kastrup.pl";
const DESCRIPTION =
  "Poznaj Pavlę Zimmermannovą, autorkę Kastrup.pl. Dzieli się praktycznymi wskazówkami, własnym doświadczeniem i inspiracjami na podróże po Danii.";

const Author = () => (
  <>
    <Helmet>
      <title>{TITLE}</title>
      <meta name="description" content={DESCRIPTION} />
      <link rel="canonical" href={AUTHOR_URL} />
      <meta property="og:type" content="profile" />
      <meta property="og:url" content={AUTHOR_URL} />
      <meta property="og:title" content={TITLE} />
      <meta property="og:description" content="Autorka praktycznych przewodników i inspiracji na podróże po Danii." />
      <meta property="og:image" content="https://kastrup.pl/images/og-kastrup.jpg" />
      <meta property="og:locale" content="pl_PL" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={TITLE} />
      <meta name="twitter:image" content="https://kastrup.pl/images/og-kastrup.jpg" />

      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "ProfilePage",
          name: TITLE,
          url: AUTHOR_URL,
          inLanguage: "pl-PL",
          mainEntity: {
            "@type": "Person",
            name: "Pavla Zimmermannová",
            url: AUTHOR_URL,
            description:
              "Autorka Kastrup.pl i Kastrup.cz, która dzieli się praktycznymi wskazówkami, własnym doświadczeniem i inspiracjami na podróże po Danii.",
            knowsAbout: ["Dania", "Kopenhaga", "Podróże", "Kultura duńska", "Hygge"],
            sameAs: ["https://kastrup.cz/autorka", "https://linklady.cz"],
          },
          isPartOf: {
            "@type": "WebSite",
            name: "Kastrup.pl",
            url: "https://kastrup.pl",
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
              aria-label="Inicjały Pavli Zimmermannovej"
              className="mx-auto mb-8 flex h-48 w-48 items-center justify-center rounded-full border-4 border-primary/20 bg-primary text-5xl font-bold text-primary-foreground shadow-xl sm:h-56 sm:w-56 sm:text-6xl"
            >
              PZ
            </div>
            <h1 className="mb-4 text-4xl font-bold md:text-5xl">Pavla Zimmermannová</h1>
            <p className="text-xl text-muted-foreground">Autorka przewodników Kastrup.pl</p>
          </header>

          <div className="prose prose-lg max-w-none">
            <p>
              Kocham Danię i wracam tu dla połączenia spokoju, przyrody, designu i życzliwej atmosfery.
              Na Kastrup.pl dzielę się praktycznymi wskazówkami i inspiracjami, które pomagają zaplanować
              podróż po Danii bez niepotrzebnego szukania.
            </p>
            <h2>Jak powstają teksty</h2>
            <p>
              Przewodniki opieram na własnych doświadczeniach z podróży i na sprawdzonych informacjach
              praktycznych. Przy danych, które szybko się zmieniają, takich jak ceny, rozkłady jazdy czy
              zasady wstępu, przed wyjazdem sprawdź też aktualne informacje u przewoźnika lub operatora.
            </p>
            <p>
              Kastrup.pl to polska wersja mojego czeskiego serwisu{" "}
              <a href="https://kastrup.cz">Kastrup.cz</a>. Artykuły tłumaczę na polski i dopasowuję
              do polskich czytelników.
            </p>
            <h2>O czym piszę</h2>
            <p>
              Skupiam się na Kopenhadze i okolicach, transporcie, kulturze duńskiej, architekturze,
              hygge i miejscach, które warto odwiedzić. Chodzi o przydatne treści dla podróżnych,
              a nie o teksty pisane tylko pod wyszukiwarki.
            </p>
          </div>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <Link to="/artykuly">
              <Button>
                Czytaj przewodniki
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <a href="mailto:zimmermannovap@gmail.com">
              <Button variant="outline">
                <Mail className="mr-2 h-4 w-4" />
                Napisz do autorki
              </Button>
            </a>
          </div>
        </article>
      </div>
    </div>
  </>
);

export default Author;
