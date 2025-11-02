import { Helmet } from "react-helmet-async";

const About = () => {
  return (
    <>
      <Helmet>
        <title>O Dánsku | Kastrup.cz</title>
        <meta
          name="description"
          content="Poznejte Dánsko - zemi викингů, moderního designu a hygge. Kompletní průvodce po dánské kultuře, historii a způsobu života."
        />
      </Helmet>

      <div className="min-h-screen py-12">
        <div className="container mx-auto px-4 md:px-6">
          <div className="mx-auto max-w-4xl">
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
          </div>
        </div>
      </div>
    </>
  );
};

export default About;
