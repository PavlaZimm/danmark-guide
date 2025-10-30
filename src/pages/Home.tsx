import { Link } from "react-router-dom";
import { ArrowRight, MapPin, Building2, Coffee, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Helmet } from "react-helmet-async";
import Newsletter from "@/components/Newsletter";
import FeaturedArticles from "@/components/FeaturedArticles";
import heroImage from "@/assets/hero-denmark.jpg";
import countrysideImage from "@/assets/countryside.jpg";
import hyggeImage from "@/assets/hygge.jpg";
import designImage from "@/assets/design.jpg";

const Home = () => {
  return (
    <>
      <Helmet>
        <title>Kastrup.cz - Váš průvodce po Dánsku | Objevte krásy Skandinávie</title>
        <meta
          name="description"
          content="Komplexní průvodce po Dánsku - kultura, cestování, ubytování a tipy pro návštěvu země vikingů a hygge. Objevte Kodaň, dánský design a nejlepší destinace."
        />
        <meta property="og:title" content="Kastrup.cz - Váš průvodce po Dánsku" />
        <meta property="og:description" content="Komplexní průvodce po Dánsku - kultura, cestování, ubytování a tipy pro návštěvu země vikingů a hygge." />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="https://kastrup.cz/" />
      </Helmet>
      <div className="min-h-screen">
      {/* Hero Section with Full-Width Image */}
      <section className="relative h-[90vh] min-h-[600px] w-full overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={heroImage}
            alt="Barevné Nyhavn v Kodani"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-black/20" />
        </div>
        
        <div className="relative z-10 flex h-full items-center">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-3xl text-white">
              <h1 className="mb-6 animate-fade-in text-balance">
                Objevte krásy Dánska
              </h1>
              <p className="mb-8 text-xl leading-relaxed text-white/95 md:text-2xl">
                Zažijte zemi vikingů, hygge a moderního designu. Od barevných
                domů Kodaně po klidnou dánskou přírodu.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link to="/ubytovani">
                  <Button size="lg" className="h-14 px-8 text-lg shadow-xl hover:scale-105 transition-all">
                    Najít ubytování
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link to="/o-dansku">
                  <Button
                    size="lg"
                    variant="outline"
                    className="h-14 border-2 border-white bg-white/10 px-8 text-lg text-white backdrop-blur-sm hover:bg-white hover:text-foreground transition-all"
                  >
                    Více o Dánsku
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 animate-bounce">
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
            <Link to="/clanky?kategorie=cestovani" className="group">
              <div className="overflow-hidden rounded-2xl bg-card shadow-medium hover-lift">
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={countrysideImage}
                    alt="Dánská krajina"
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                    loading="lazy"
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
            <Link to="/clanky?kategorie=kultura" className="group">
              <div className="overflow-hidden rounded-2xl bg-card shadow-medium hover-lift">
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={hyggeImage}
                    alt="Hygge - dánský životní styl"
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                    loading="lazy"
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
                    alt="Dánský design"
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                    loading="lazy"
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

      {/* Featured Articles */}
      <FeaturedArticles />

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

      {/* Newsletter Section */}
      <Newsletter />

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
