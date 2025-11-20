import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Helmet } from "react-helmet-async";
import Breadcrumbs from "@/components/Breadcrumbs";

const About = () => {
  return (
    <>
      <Helmet>
        <title>O Dánsku | Kastrup.cz</title>
        <meta
          name="description"
          content="Poznejte Dánsko - zemi vikingů, moderního designu a hygge. Kompletní průvodce po dánské kultuře, historii a způsobu života."
        />
        <link rel="canonical" href="https://kastrup.cz/o-dansku" />

        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://kastrup.cz/o-dansku" />
        <meta property="og:title" content="O Dánsku - Kastrup.cz" />
        <meta
          property="og:description"
          content="Poznejte Dánsko - zemi vikingů, moderního designu a hygge. Kompletní průvodce po dánské kultuře a historii."
        />
        <meta property="og:image" content="https://kastrup.cz/icon-512.svg" />
        <meta property="og:locale" content="cs_CZ" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="O Dánsku - Kastrup.cz" />
        <meta
          name="twitter:description"
          content="Poznejte Dánsko - zemi vikingů, moderního designu a hygge."
        />
        <meta name="twitter:image" content="https://kastrup.cz/icon-512.svg" />

        {/* JSON-LD Schema */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "AboutPage",
            "name": "O Dánsku",
            "description": "Poznejte Dánsko - zemi vikingů, moderního designu a hygge",
            "url": "https://kastrup.cz/o-dansku",
            "mainEntity": {
              "@type": "Place",
              "@id": "https://www.wikidata.org/wiki/Q35",
              "name": "Dánsko",
              "description": "Skandinávská země v severní Evropě s bohatou historií a kulturou"
            },
            "isPartOf": {
              "@type": "WebSite",
              "name": "Kastrup.cz",
              "url": "https://kastrup.cz"
            }
          })}
        </script>
      </Helmet>

      <div className="min-h-screen py-12">
        <div className="container mx-auto px-4 md:px-6">
          <div className="mx-auto max-w-4xl">
            <Breadcrumbs items={[{ label: "O Dánsku" }]} />

            {/* Header */}
            <div className="mb-12 text-center">
              <h1 className="mb-6 text-4xl font-bold md:text-5xl">O Dánsku</h1>
              <p className="text-xl text-muted-foreground">
                Objevte zemi vikingů, moderního designu a hygge
              </p>
            </div>

            {/* Content */}
            <div className="prose prose-lg mx-auto max-w-none">
              <section className="mb-12">
                <h2 className="mb-4">Základní informace</h2>
                <p>
                  Dánsko je skandinávská země nacházející se v severní Evropě.
                  Skládá se z poloostrova Jutsko a více než 400 pojmenovaných
                  ostrovů. Hlavním městem je Kodaň, která je centrem kultury,
                  obchodu a designu.
                </p>
              </section>

              <section className="mb-12">
                <h2 className="mb-4">Historie a kultura</h2>
                <p>
                  Dánsko má bohatou historii sahající až do dob Vikingů. Země je
                  známá svým moderním designem, architekturou a filosofií hygge -
                  umění žít pohodlný a šťastný život.
                </p>
              </section>

              <section className="mb-12">
                <h2 className="mb-4">Život v Dánsku</h2>
                <p>
                  Dánsko je pravidelně hodnoceno jako jedna z nejšťastnějších zemí
                  světa. Důraz na work-life balance, kvalitní veřejné služby a
                  silný sociální systém přispívají k vysoké kvalitě života.
                </p>
              </section>

              <section className="mb-12">
                <h2 className="mb-4">Turistické destinace</h2>
                <ul>
                  <li>
                    <strong>Kodaň</strong> - hlavní město plné kultury, designu a
                    historie
                  </li>
                  <li>
                    <strong>Aarhus</strong> - druhé největší město s bohatou
                    kulturní scénou
                  </li>
                  <li>
                    <strong>Odense</strong> - rodné město Hanse Christiana Andersena
                  </li>
                  <li>
                    <strong>Skagen</strong> - malebné rybářské městečko na severu
                  </li>
                </ul>
              </section>

              <section className="mb-12">
                <h2 className="mb-4">Zajímavosti</h2>
                <ul>
                  <li>Dánština je úředním jazykem</li>
                  <li>Měna: Dánská koruna (DKK)</li>
                  <li>Časové pásmo: CET (UTC+1)</li>
                  <li>Obyvatelstvo: přibližně 5,9 milionu</li>
                  <li>Členský stát EU, ale nepoužívá euro</li>
                </ul>
              </section>
            </div>

            {/* CTA Section */}
            <div className="mt-16 grid gap-6 md:grid-cols-2">
              <div className="rounded-lg bg-gradient-card p-8">
                <h3 className="mb-4 text-2xl font-bold">Přečtěte si naše články</h3>
                <p className="mb-6 text-muted-foreground">
                  Objevte zajímavé články o dánské kultuře, cestování a životním stylu hygge.
                </p>
                <Link to="/clanky">
                  <Button>
                    Prohlédnout články
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>

              <div className="rounded-lg bg-gradient-card p-8">
                <h3 className="mb-4 text-2xl font-bold">Najděte ubytování</h3>
                <p className="mb-6 text-muted-foreground">
                  Hledáte místo k pobytu? Prozkoumejte naši nabídku hotelů, apartmánů a hostelů.
                </p>
                <Link to="/ubytovani">
                  <Button variant="outline">
                    Zobrazit ubytování
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default About;
