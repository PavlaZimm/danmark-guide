import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Helmet } from "react-helmet-async";
import Breadcrumbs from "@/components/Breadcrumbs";

const About = () => {
  return (
    <>
      <Helmet>
        <title>Dánsko: Kompletní průvodce 2025 | Kastrup.cz</title>
        <meta
          name="description"
          content="Kompletní průvodce po Dánsku 2025: příroda, hrady, design, hygge. Praktické informace, itineráře, doprava a tipy kdy jet."
        />
        <link rel="canonical" href="https://kastrup.cz/o-dansku" />

        {/* Open Graph */}
        <meta property="og:type" content="article" />
        <meta property="og:url" content="https://kastrup.cz/o-dansku" />
        <meta property="og:title" content="Dánsko: Kompletní průvodce 2025" />
        <meta
          property="og:description"
          content="Kompletní průvodce po Dánsku: příroda, hrady, design, hygge. Praktické informace, itineráře a tipy."
        />
        <meta property="og:image" content="https://kastrup.cz/icon-512.svg" />
        <meta property="og:locale" content="cs_CZ" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Dánsko: Kompletní průvodce 2025" />
        <meta
          name="twitter:description"
          content="Kompletní průvodce po Dánsku: příroda, hrady, design, hygge."
        />
        <meta name="twitter:image" content="https://kastrup.cz/icon-512.svg" />

        {/* JSON-LD Schema */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            "headline": "Dánsko: Kompletní průvodce 2025",
            "description": "Kompletní průvodce po Dánsku: příroda, hrady, design, hygge. Praktické informace, itineráře a tipy.",
            "author": {
              "@type": "Person",
              "name": "Pavla Zimmermannová"
            },
            "publisher": {
              "@type": "Organization",
              "name": "Kastrup.cz",
              "url": "https://kastrup.cz"
            },
            "mainEntityOfPage": {
              "@type": "WebPage",
              "@id": "https://kastrup.cz/o-dansku"
            }
          })}
        </script>
      </Helmet>

      <div className="min-h-screen py-12">
        <div className="container mx-auto px-4 md:px-6">
          <article className="mx-auto max-w-4xl">
            <Breadcrumbs items={[{ label: "O Dánsku" }]} />

            {/* Header */}
            <header className="mb-12">
              <h1 className="mb-6 text-4xl font-bold md:text-5xl">
                Dánsko: Kompletní průvodce 2025
              </h1>
              <p className="mb-6 text-xl leading-relaxed text-muted-foreground">
                Dánsko je kompaktní severská země, kde se setkává krása pobřeží, historické hrady,
                moderní design a příjemná filozofie hygge. Plánování je snadné, doprava spolehlivá
                a atmosféra přívětivá jak pro solo cestovatelky, tak pro rodiny.
              </p>
              <div className="rounded-lg border bg-muted/50 p-6">
                <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
                  Klíčové body
                </h2>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="text-primary">•</span>
                    <span><strong>Proč jet:</strong> příroda, hrady, design, hygge, rodinné atrakce</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary">•</span>
                    <span><strong>Kdy jet:</strong> jaro–léto pro venek; advent pro zimní pohodu</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary">•</span>
                    <span><strong>Prakticky:</strong> skvělé vlaky DSB, bezkontaktní platby, výborná angličtina</span>
                  </li>
                </ul>
              </div>
            </header>

            {/* Content */}
            <div className="prose prose-lg max-w-none">
              <section id="fakta" className="mb-12">
                <h2 className="mb-4 text-2xl font-bold">Základní fakta o Dánsku</h2>
                <p className="mb-4">
                  Dánsko leží v severní Evropě, je součástí Skandinávie a tvoří ho Jutský poloostrov
                  a více než 400 ostrovů (např. Fyn a Sjælland). Hlavní město je Kodaň, oficiální
                  jazyk dánština, měna dánská koruna (DKK).
                </p>
                <p className="mb-4">
                  Oficiální turistický portál nabízí přehled regionů, inspiraci na itineráře
                  a praktické informace pro plánování.
                </p>
                <p>
                  Hygge, dánský styl pohody a blízkosti, prostupuje kavárnami, interiéry i komunitním
                  životem a je skvělou esencí zdejšího cestování.
                </p>
              </section>

              <section id="proc-jet" className="mb-12">
                <h2 className="mb-4 text-2xl font-bold">Proč navštívit Dánsko</h2>
                <p className="mb-4">
                  Kombinace bezpečí, udržitelné dopravy, gastronomické scény a rodinných atrakcí
                  dělá z Dánska ideální destinaci na krátké city‑breaky i týdenní roadtrip.
                </p>
                <p>
                  Čekají vás křídové útesy, široké pláže, ikonické hrady, moderní muzea i živá
                  města – to vše dostupné vlakem a veřejnou dopravou.
                </p>
              </section>

              <section id="kdy-jet" className="mb-12">
                <h2 className="mb-4 text-2xl font-bold">Kdy jet do Dánska</h2>
                <p className="mb-4">
                  <strong>Jaro (březen–květen)</strong> je mírné a klidnější,
                  <strong> léto (červen–srpen)</strong> nejživější a ideální pro pobřeží a festivaly,
                  <strong> podzim (září–listopad)</strong> nabízí barevné krajiny a méně davů,
                  <strong> zima (prosinec–únor)</strong> má silnou sváteční atmosféru a hygge interiéry.
                </p>
                <p className="mb-6">
                  Pro outdoor a rodinné parky volte pozdní jaro až léto; pro adventní atmosféru
                  zvažte prosinec s trhy a muzei.
                </p>

                {/* Tabulka počasí */}
                <div className="my-8 overflow-x-auto rounded-lg border bg-card">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b bg-muted/50">
                        <th className="p-3 text-left font-semibold">Měsíc</th>
                        <th className="p-3 text-center font-semibold">Teplota (°C)</th>
                        <th className="p-3 text-center font-semibold">Srážky (mm)</th>
                        <th className="p-3 text-center font-semibold">Denní světlo</th>
                        <th className="p-3 text-center font-semibold">Doporučení</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b hover:bg-muted/20 transition-colors">
                        <td className="p-3 font-medium">Leden</td>
                        <td className="p-3 text-center">-1 až 3</td>
                        <td className="p-3 text-center">46</td>
                        <td className="p-3 text-center">7h</td>
                        <td className="p-3 text-center text-sm">Hygge ❄️</td>
                      </tr>
                      <tr className="border-b hover:bg-muted/20 transition-colors">
                        <td className="p-3 font-medium">Únor</td>
                        <td className="p-3 text-center">-1 až 3</td>
                        <td className="p-3 text-center">32</td>
                        <td className="p-3 text-center">9h</td>
                        <td className="p-3 text-center text-sm">Zima 🌨️</td>
                      </tr>
                      <tr className="border-b hover:bg-muted/20 transition-colors">
                        <td className="p-3 font-medium">Březen</td>
                        <td className="p-3 text-center">1 až 6</td>
                        <td className="p-3 text-center">39</td>
                        <td className="p-3 text-center">12h</td>
                        <td className="p-3 text-center text-sm">Jaro 🌱</td>
                      </tr>
                      <tr className="border-b hover:bg-muted/20 transition-colors">
                        <td className="p-3 font-medium">Duben</td>
                        <td className="p-3 text-center">4 až 11</td>
                        <td className="p-3 text-center">39</td>
                        <td className="p-3 text-center">15h</td>
                        <td className="p-3 text-center text-sm">Příjemné 🌸</td>
                      </tr>
                      <tr className="border-b bg-green-50/50 dark:bg-green-950/20 hover:bg-green-100/50 dark:hover:bg-green-900/30 transition-colors">
                        <td className="p-3 font-medium">Květen</td>
                        <td className="p-3 text-center">8 až 16</td>
                        <td className="p-3 text-center">44</td>
                        <td className="p-3 text-center">17h</td>
                        <td className="p-3 text-center text-sm font-semibold text-green-700 dark:text-green-400">Ideální ✨</td>
                      </tr>
                      <tr className="border-b bg-green-50/50 dark:bg-green-950/20 hover:bg-green-100/50 dark:hover:bg-green-900/30 transition-colors">
                        <td className="p-3 font-medium">Červen</td>
                        <td className="p-3 text-center">12 až 20</td>
                        <td className="p-3 text-center">51</td>
                        <td className="p-3 text-center">18h</td>
                        <td className="p-3 text-center text-sm font-semibold text-green-700 dark:text-green-400">Ideální ☀️</td>
                      </tr>
                      <tr className="border-b bg-green-50/50 dark:bg-green-950/20 hover:bg-green-100/50 dark:hover:bg-green-900/30 transition-colors">
                        <td className="p-3 font-medium">Červenec</td>
                        <td className="p-3 text-center">14 až 22</td>
                        <td className="p-3 text-center">66</td>
                        <td className="p-3 text-center">17h</td>
                        <td className="p-3 text-center text-sm font-semibold text-green-700 dark:text-green-400">Ideální 🏖️</td>
                      </tr>
                      <tr className="border-b bg-green-50/50 dark:bg-green-950/20 hover:bg-green-100/50 dark:hover:bg-green-900/30 transition-colors">
                        <td className="p-3 font-medium">Srpen</td>
                        <td className="p-3 text-center">14 až 22</td>
                        <td className="p-3 text-center">62</td>
                        <td className="p-3 text-center">15h</td>
                        <td className="p-3 text-center text-sm font-semibold text-green-700 dark:text-green-400">Ideální 🌊</td>
                      </tr>
                      <tr className="border-b hover:bg-muted/20 transition-colors">
                        <td className="p-3 font-medium">Září</td>
                        <td className="p-3 text-center">11 až 18</td>
                        <td className="p-3 text-center">61</td>
                        <td className="p-3 text-center">13h</td>
                        <td className="p-3 text-center text-sm">Podzim 🍂</td>
                      </tr>
                      <tr className="border-b hover:bg-muted/20 transition-colors">
                        <td className="p-3 font-medium">Říjen</td>
                        <td className="p-3 text-center">8 až 13</td>
                        <td className="p-3 text-center">66</td>
                        <td className="p-3 text-center">10h</td>
                        <td className="p-3 text-center text-sm">Chladnější 🍁</td>
                      </tr>
                      <tr className="border-b hover:bg-muted/20 transition-colors">
                        <td className="p-3 font-medium">Listopad</td>
                        <td className="p-3 text-center">4 až 8</td>
                        <td className="p-3 text-center">56</td>
                        <td className="p-3 text-center">8h</td>
                        <td className="p-3 text-center text-sm">Zima začíná 🌧️</td>
                      </tr>
                      <tr className="hover:bg-muted/20 transition-colors">
                        <td className="p-3 font-medium">Prosinec</td>
                        <td className="p-3 text-center">1 až 4</td>
                        <td className="p-3 text-center">55</td>
                        <td className="p-3 text-center">7h</td>
                        <td className="p-3 text-center text-sm">Advent 🎄</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <p className="mt-4 text-sm text-muted-foreground italic">
                  💡 Nejlepší měsíce pro návštěvu Dánska jsou květen až srpen s průměrnými teplotami 16–22°C a dlouhými dny. Pro adventní atmosféru navštivte prosinec.
                </p>
              </section>

              <section id="prakticke" className="mb-12">
                <h2 className="mb-6 text-2xl font-bold">Praktické informace</h2>

                <h3 className="mb-3 text-xl font-semibold">Vstup, bezpečnost, zdraví</h3>
                <p className="mb-6">
                  Dánsko je v EU/Schengenu; cestování z ČR je bezvízové s platným dokladem.
                  Země patří k bezpečným, zdravotní péče je na vysoké úrovni.
                </p>

                <h3 className="mb-3 text-xl font-semibold">Peníze a platby</h3>
                <p className="mb-6">
                  Měna je DKK; bezkontaktní karty jsou široce přijímány. Počítejte s vyšší
                  cenovou hladinou než ve střední Evropě.
                </p>

                <h3 className="mb-3 text-xl font-semibold">Jazyk a komunikace</h3>
                <p className="mb-6">
                  Dominuje dánština, ale angličtina je běžně výborná – domluva je snadná
                  v dopravě, ubytování i gastronomii.
                </p>

                <h3 className="mb-3 text-xl font-semibold">Doprava po zemi</h3>
                <p className="mb-4">
                  Vnitrostátní železnice DSB spolehlivě propojuje města a regiony; jízdní
                  řády a nákup jízdenek online.
                </p>
                <p className="mb-6">
                  Ve městech funguje kombinace metra, vlaků a autobusů; cyklistika je
                  populární a infrastruktura kvalitní.
                </p>

                <h3 className="mb-3 text-xl font-semibold">Příjezd letecky</h3>
                <p>
                  Hlavní bránou je Copenhagen Airport (CPH); do centra jezdí metro i vlaky
                  v krátkých intervalech, s jasným značením.
                </p>
              </section>

              <section id="kodan" className="mb-12">
                <h2 className="mb-4 text-2xl font-bold">Kodaň jako hlavní výchozí bod</h2>
                <p className="mb-4">
                  Kodaň je moderní, udržitelná metropole s přátelskou atmosférou, excelentní
                  gastronomií a královskými památkami; z hlediska logistiky je nejlepším
                  startem/koncem cesty po Dánsku.
                </p>
                <p>
                  Mezi největší „must‑see" patří Nyhavn, Tivoli, Amalienborg, Christiansborg,
                  Rosenborg, Rundetårn a kulturní čtvrti s kavárnami a designem – detailní
                  průvodce Kodaní vyjde jako samostatný článek a z tohoto na něj odkážeme.
                </p>
              </section>

              <section id="co-videt" className="mb-12">
                <h2 className="mb-6 text-2xl font-bold">Co vidět v Dánsku (mimo Kodaň)</h2>

                <h3 className="mb-4 text-xl font-semibold">Přírodní krásy</h3>
                <ul className="mb-6 space-y-2">
                  <li><strong>Møns Klint</strong> – křídové útesy s vyhlídkami a stezkami po pobřeží</li>
                  <li><strong>Stevns Klint</strong> – dramatické útesy a geologická lokalita s příběhem doby ledové</li>
                  <li><strong>Rubjerg Knude</strong> – putující duna a maják vysoko nad mořem</li>
                  <li><strong>Severozápadní Jutsko</strong> – duny, pláže, setkání moří u Skagenu</li>
                </ul>

                <h3 className="mb-4 text-xl font-semibold">Historie a památky</h3>
                <ul className="mb-6 space-y-2">
                  <li><strong>Frederiksborg</strong> – renesanční zámek se zahradami v Hillerødu</li>
                  <li><strong>Kronborg</strong> – „Hamletův hrad" v Helsingoøru, pevnost UNESCO</li>
                  <li><strong>Egeskov</strong> – vodní hrad na Fynu, ideální i pro rodiny</li>
                  <li><strong>Ribe</strong> – nejstarší město v Dánsku s vikingským dědictvím</li>
                </ul>

                <h3 className="mb-4 text-xl font-semibold">Rodina a zábava</h3>
                <ul className="space-y-2">
                  <li><strong>LEGOLAND Billund</strong> – tematický park pro všechny věkové kategorie</li>
                  <li><strong>LEGO House</strong> – interaktivní centrum kreativity v Billundu</li>
                  <li><strong>Lalandia Billund</strong> – aquapark a rekreační areál</li>
                </ul>
              </section>

              <section id="kultura" className="mb-12">
                <h2 className="mb-4 text-2xl font-bold">Dánská kultura, hygge a jídlo</h2>
                <p className="mb-4">
                  Hygge vystihuje pohodlí, klid a blízkost – často u stolu s přáteli, kávou
                  a svíčkami; je to silná součást zážitku z cestování po Dánsku.
                </p>
                <p>
                  Ochutnejte smørrebrød (otevřené sendviče), frikadeller (karbanátky)
                  a wienerbrød; kavárny a pekárny jsou tu radostný rituál.
                </p>
              </section>

              <section id="itinerare" className="mb-12">
                <h2 className="mb-6 text-2xl font-bold">Itineráře: jak si poskládat cestu</h2>

                <h3 className="mb-3 text-xl font-semibold">3–4 dny s Kodaní jako základem</h3>
                <p className="mb-6">
                  Den 1–2 Kodaň, poté Billund (LEGOLAND/LEGO House) a jeden přírodní highlight
                  (Møns či Stevns Klint) – vyvážený mix města, rodinné zábavy a přírody.
                </p>

                <h3 className="mb-3 text-xl font-semibold">Týden v Dánsku</h3>
                <p>
                  Okruh: Kodaň → severní Sjælland (Kronborg/Frederiksborg) → Fyn (Egeskov, Odense)
                  → západní Jutsko (duny, pláže, Skagen) → návrat; kombinace hradů, přírody a měst.
                </p>
              </section>

              <section id="faq" className="mb-12">
                <h2 className="mb-6 text-2xl font-bold">Často kladené otázky (FAQ)</h2>

                <details className="group mb-4 rounded-lg border bg-card p-4 transition-all hover:shadow-md">
                  <summary className="cursor-pointer font-semibold text-lg list-none flex items-center justify-between">
                    <span>Kdy je nejlepší doba na návštěvu?</span>
                    <span className="text-primary transition-transform group-open:rotate-180">▼</span>
                  </summary>
                  <p className="mt-4 text-muted-foreground">
                    Léto má nejvíce akcí a nejstabilnější počasí, jaro a podzim jsou klidnější,
                    zima láká na advent a hygge.
                  </p>
                </details>

                <details className="group mb-4 rounded-lg border bg-card p-4 transition-all hover:shadow-md">
                  <summary className="cursor-pointer font-semibold text-lg list-none flex items-center justify-between">
                    <span>Jak se pohybovat po Dánsku?</span>
                    <span className="text-primary transition-transform group-open:rotate-180">▼</span>
                  </summary>
                  <p className="mt-4 text-muted-foreground">
                    Využijte vlaky DSB pro delší přesuny, ve městech metro/busy/vlaky; jízdenky
                    pořídíte online a v automatech.
                  </p>
                </details>

                <details className="group mb-4 rounded-lg border bg-card p-4 transition-all hover:shadow-md">
                  <summary className="cursor-pointer font-semibold text-lg list-none flex items-center justify-between">
                    <span>Je Dánsko drahé?</span>
                    <span className="text-primary transition-transform group-open:rotate-180">▼</span>
                  </summary>
                  <p className="mt-4 text-muted-foreground">
                    Celkově vyšší cenová hladina; šetřit lze volbou mimo špičku, vařením,
                    kartami na MHD a kombinací vlak+kolo.
                  </p>
                </details>

                <details className="group mb-4 rounded-lg border bg-card p-4 transition-all hover:shadow-md">
                  <summary className="cursor-pointer font-semibold text-lg list-none flex items-center justify-between">
                    <span>Potřebuji vízum?</span>
                    <span className="text-primary transition-transform group-open:rotate-180">▼</span>
                  </summary>
                  <p className="mt-4 text-muted-foreground">
                    Občané EU/Schengenu necestují do Dánska s vízy, stačí platný doklad totožnosti.
                  </p>
                </details>

                <details className="group mb-4 rounded-lg border bg-card p-4 transition-all hover:shadow-md">
                  <summary className="cursor-pointer font-semibold text-lg list-none flex items-center justify-between">
                    <span>Jak z letiště CPH do centra?</span>
                    <span className="text-primary transition-transform group-open:rotate-180">▼</span>
                  </summary>
                  <p className="mt-4 text-muted-foreground">
                    Metro M2 a vlaky jezdí často, cesta je rychlá a dobře značená; jízdenky
                    v automatech i online.
                  </p>
                </details>
              </section>

              <footer className="mt-12 border-t pt-8">
                <p className="italic text-sm text-muted-foreground">
                  <strong>Autorka:</strong> Pavla – Dánsko mám ráda a vracím se sem pro kombinaci
                  klidu, přírody, designu a laskavé atmosféry.
                </p>
              </footer>
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
          </article>
        </div>
      </div>
    </>
  );
};

export default About;
