import { Link } from "react-router-dom";
import { ArrowRight, MapPin, Building2, Coffee, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Helmet } from "react-helmet-async";
import heroImage from "@/assets/hero-denmark.jpg";
import countrysideImage from "@/assets/countryside.jpg";
import hyggeImage from "@/assets/hygge.jpg";
import designImage from "@/assets/design.jpg";

const Home = () => {
  return (
    <>
      <Helmet>
        <title>Kastrup.cz - Váš průvodce po Dánsku | Cestování, Ubytování, Kultura</title>
        <meta
          name="description"
          content="Objevte krásy Dánska s Kastrup.cz. Najděte nejlepší ubytování, poznejte dánskou kulturu, hygge a moderní design. Praktický průvodce pro cestovatele."
        />
        <link rel="canonical" href="https://kastrup.cz/" />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://kastrup.cz/" />
        <meta property="og:title" content="Kastrup.cz - Váš průvodce po Dánsku" />
        <meta
          property="og:description"
          content="Objevte krásy Dánska. Najděte nejlepší ubytování, poznejte dánskou kulturu, hygge a moderní design."
        />
        <meta property="og:image" content="https://kastrup.cz/icon-512.svg" />
        <meta property="og:locale" content="cs_CZ" />
        <meta property="og:site_name" content="Kastrup.cz" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content="https://kastrup.cz/" />
        <meta name="twitter:title" content="Kastrup.cz - Váš průvodce po Dánsku" />
        <meta
          name="twitter:description"
          content="Objevte krásy Dánska. Najděte nejlepší ubytování, poznejte dánskou kulturu, hygge a moderní design."
        />
        <meta name="twitter:image" content="https://kastrup.cz/icon-512.svg" />

        {/* JSON-LD Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            "name": "Kastrup.cz",
            "description": "Váš průvodce po Dánsku - cestování, ubytování a kultura",
            "url": "https://kastrup.cz",
            "potentialAction": {
              "@type": "SearchAction",
              "target": "https://kastrup.cz/clanky?q={search_term_string}",
              "query-input": "required name=search_term_string"
            }
          })}
        </script>
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "Kastrup.cz",
            "url": "https://kastrup.cz",
            "logo": "https://kastrup.cz/icon-512.svg",
            "description": "Průvodce po Dánsku - cestování, kultura a ubytování",
            "address": {
              "@type": "PostalAddress",
              "addressCountry": "CZ",
              "addressLocality": "Bílina"
            },
            "contactPoint": {
              "@type": "ContactPoint",
              "email": "zimmermannovap@gmail.com",
              "contactType": "Customer Service"
            }
          })}
        </script>
      </Helmet>

      <div className="min-h-screen">
      {/* Hero Section with Full-Width Image */}
      <section className="relative h-[75vh] min-h-[500px] w-full overflow-hidden sm:h-[85vh] sm:min-h-[600px] lg:h-[90vh]">
        <div className="absolute inset-0">
          <img
            src={heroImage}
            alt="Barevné historické domy v přístavu Nyhavn v Kodani, Dánsko - malebná turistická destinace s lodičkami a restauracemi"
            className="h-full w-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-black/20" />
        </div>

        <div className="relative z-10 flex h-full items-center">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-3xl text-white">
              <h1 className="mb-4 animate-fade-in text-balance text-3xl font-bold leading-tight sm:mb-6 sm:text-4xl md:text-5xl lg:text-6xl">
                Objevte krásy Dánska
              </h1>
              <p className="mb-6 text-base leading-relaxed text-white/95 sm:mb-8 sm:text-lg md:text-xl lg:text-2xl">
                Zažijte zemi vikingů, hygge a moderního designu. Od barevných
                domů Kodaně po klidnou dánskou přírodu.
              </p>
              <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-4">
                <Link to="/ubytovani">
                  <Button
                    size="lg"
                    className="h-12 w-full px-6 text-base shadow-xl transition-all hover:scale-105 sm:h-14 sm:w-auto sm:px-8 sm:text-lg"
                  >
                    Najít ubytování
                    <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
                  </Button>
                </Link>
                <Link to="/o-dansku">
                  <Button
                    size="lg"
                    variant="outline"
                    className="h-12 w-full border-2 border-white bg-white/10 px-6 text-base text-white backdrop-blur-sm transition-all hover:bg-white hover:text-foreground sm:h-14 sm:w-auto sm:px-8 sm:text-lg"
                  >
                    Více o Dánsku
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator - Hidden on mobile */}
        <div className="absolute bottom-8 left-1/2 z-10 hidden -translate-x-1/2 animate-bounce sm:block">
          <div className="h-12 w-8 rounded-full border-2 border-white/50">
            <div className="mx-auto mt-2 h-3 w-1 animate-pulse rounded-full bg-white/80" />
          </div>
        </div>
      </section>

      {/* Experience Cards */}
      <section className="py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-balance">Co vás čeká v Dánsku</h2>
            <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
              Objevte jedinečnou kombinaci historie, moderního designu a
              skandinávského životního stylu
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {/* Countryside Card */}
            <Link to="/cestovani" className="group">
              <div className="overflow-hidden rounded-2xl bg-card shadow-medium hover-lift">
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={countrysideImage}
                    alt="Malebná dánská krajina s zelenými poli a tradičními domy - ideální pro objevování venkova"
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <MapPin className="mb-2 h-8 w-8" />
                    <h3 className="text-2xl font-bold">Cestování</h3>
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-muted-foreground">
                    Prozkoumejte malebné vesničky, široké pláže a kouzelnou
                    dánskou krajinu.
                  </p>
                </div>
              </div>
            </Link>

            {/* Hygge Card */}
            <Link to="/kultura" className="group">
              <div className="overflow-hidden rounded-2xl bg-card shadow-medium hover-lift">
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={hyggeImage}
                    alt="Útulný interiér s horkým nápojem a svíčkami - ukázka dánského konceptu hygge, pohody a pohodlného života"
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <Coffee className="mb-2 h-8 w-8" />
                    <h3 className="text-2xl font-bold">Hygge & Kultura</h3>
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-muted-foreground">
                    Poznejte dánskou filosofii pohodlného života a bohatou
                    kulturní tradici.
                  </p>
                </div>
              </div>
            </Link>

            {/* Design Card */}
            <Link to="/o-dansku" className="group">
              <div className="overflow-hidden rounded-2xl bg-card shadow-medium hover-lift">
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={designImage}
                    alt="Minimalistický skandinávský interiér s elegantním nábytkem - příklad světově proslulého dánského designu"
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <Sparkles className="mb-2 h-8 w-8" />
                    <h3 className="text-2xl font-bold">Moderní Design</h3>
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-muted-foreground">
                    Objevte světově proslulý skandinávský minimalismus a
                    funkční design.
                  </p>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Accommodation CTA */}
      <section className="bg-primary py-24 text-primary-foreground">
        <div className="container mx-auto px-4 text-center md:px-6">
          <Building2 className="mx-auto mb-6 h-16 w-16 opacity-90" />
          <h2 className="mb-6 text-white">Hledáte ubytování?</h2>
          <p className="mx-auto mb-8 max-w-2xl text-lg text-white/95">
            Najděte perfektní místo pro váš pobyt v Dánsku. Od hotelů v centru
            Kodaně po útulné apartmány na venkově.
          </p>
          <Link to="/ubytovani">
            <Button
              size="lg"
              variant="secondary"
              className="h-14 px-8 text-lg shadow-xl transition-all hover:scale-105"
            >
              Prohlédnout ubytování
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid gap-8 md:grid-cols-3">
            <div className="text-center">
              <div className="mb-2 text-5xl font-bold text-primary md:text-6xl">
                5.9M
              </div>
              <p className="text-lg text-muted-foreground">Obyvatel</p>
            </div>
            <div className="text-center">
              <div className="mb-2 text-5xl font-bold text-primary md:text-6xl">
                400+
              </div>
              <p className="text-lg text-muted-foreground">Pojmenovaných ostrovů</p>
            </div>
            <div className="text-center">
              <div className="mb-2 text-5xl font-bold text-primary md:text-6xl">
                #1
              </div>
              <p className="text-lg text-muted-foreground">
                Nejšťastnější země světa
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-gradient-card py-24">
        <div className="container mx-auto px-4 text-center md:px-6">
          <h2 className="mb-6">Připraveni objevovat?</h2>
          <p className="mx-auto mb-8 max-w-2xl text-lg text-muted-foreground">
            Začněte plánovat svou cestu do Dánska ještě dnes
          </p>
          <Link to="/kontakt">
            <Button
              size="lg"
              className="h-14 px-8 text-lg shadow-medium transition-all hover:scale-105"
            >
              Kontaktujte nás
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>
      </div>
    </>
  );
};

export default Home;
