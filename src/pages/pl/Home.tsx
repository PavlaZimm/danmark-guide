import { Link } from "react-router-dom";
import { ArrowRight, ArrowDown, MapPin, Building2, Coffee, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Helmet } from "react-helmet-async";
import heroImage from "@/assets/hero-denmark.jpg";
import heroImageWebP from "@/assets/hero-denmark.webp";
import heroImage768WebP from "@/assets/hero-denmark-768.webp";
import heroImage1280WebP from "@/assets/hero-denmark-1280.webp";
import countrysideImage from "@/assets/countryside.jpg";
import countrysideImageWebP from "@/assets/countryside.webp";
import countrysideImage640WebP from "@/assets/countryside-640.webp";
import countrysideImage768WebP from "@/assets/countryside-768.webp";
import hyggeImage from "@/assets/hygge.jpg";
import hyggeImageWebP from "@/assets/hygge.webp";
import hyggeImage640WebP from "@/assets/hygge-640.webp";
import hyggeImage768WebP from "@/assets/hygge-768.webp";
import designImage from "@/assets/design.jpg";
import designImageWebP from "@/assets/design.webp";
import designImage640WebP from "@/assets/design-640.webp";
import designImage768WebP from "@/assets/design-768.webp";

const OG_IMAGE = "https://kastrup.pl/images/og-kastrup.jpg";
const TITLE = "Dania – przewodnik: Kopenhaga, atrakcje i noclegi | Kastrup.pl";
const DESCRIPTION =
  "Przewodnik po Danii: co zobaczyć w Kopenhadze, duńskie wyspy, hygge, mosty i dojazd z lotniska. Sprawdzone ceny i praktyczne porady przed podróżą.";

const Home = () => {
  return (
    <>
      <Helmet>
        <title>{TITLE}</title>
        <meta name="description" content={DESCRIPTION} />
        <link rel="canonical" href="https://kastrup.pl/" />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://kastrup.pl/" />
        <meta property="og:title" content="Kastrup.pl – Twój przewodnik po Danii" />
        <meta property="og:description" content={DESCRIPTION} />
        <meta property="og:image" content={OG_IMAGE} />
        <meta property="og:locale" content="pl_PL" />
        <meta property="og:site_name" content="Kastrup.pl" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content="https://kastrup.pl/" />
        <meta name="twitter:title" content="Kastrup.pl – Twój przewodnik po Danii" />
        <meta name="twitter:description" content={DESCRIPTION} />
        <meta name="twitter:image" content={OG_IMAGE} />

        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "Kastrup.pl",
            "url": "https://kastrup.pl",
            "logo": "https://kastrup.pl/icon-512.png",
            "description": "Przewodnik po Danii – podróże, kultura i noclegi",
            "sameAs": ["https://kastrup.cz"],
            "contactPoint": {
              "@type": "ContactPoint",
              "email": "zimmermannovap@gmail.com",
              "contactType": "Customer Service"
            }
          })}
        </script>
      </Helmet>

      <div className="min-h-screen">
      <section className="relative h-[75vh] min-h-[500px] w-full overflow-hidden sm:h-[85vh] sm:min-h-[600px] lg:h-[90vh]">
        <div className="absolute inset-0">
          <picture>
            <source
              srcSet={`${heroImage768WebP} 768w, ${heroImage1280WebP} 1280w, ${heroImageWebP} 1920w`}
              sizes="100vw"
              type="image/webp"
            />
            <img
              src={heroImage}
              alt="Kolorowe kamienice w porcie Nyhavn w Kopenhadze, łodzie i restauracje nad kanałem"
              className="h-full w-full object-cover object-center"
              loading="eager"
              width="1920"
              height="1080"
              fetchPriority="high"
              decoding="async"
            />
          </picture>
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/60 to-black/40" />
        </div>

        <div className="relative z-10 flex h-full items-center justify-center">
          <div className="container mx-auto px-4 md:px-6">
            <div className="mx-auto max-w-3xl text-center text-white">
              <h1 className="mb-4 text-balance text-3xl font-bold leading-tight sm:mb-6 sm:text-4xl md:text-5xl lg:text-6xl">
                Przewodnik po Danii: Kopenhaga, hygge i podróże
              </h1>
              <p className="mb-6 text-base leading-relaxed text-white/95 sm:mb-8 sm:text-lg md:text-xl lg:text-2xl">
                Kraj wikingów, hygge i nowoczesnego designu. Od kolorowych kamienic
                Kopenhagi po spokojną duńską przyrodę.
              </p>
              <div className="flex flex-col items-center justify-center gap-3 sm:flex-row sm:flex-wrap sm:gap-4">
                <Link to="/noclegi">
                  <Button
                    size="lg"
                    className="h-12 w-full px-6 text-base shadow-xl transition-all hover:scale-105 hover:shadow-2xl active:scale-95 sm:h-14 sm:w-auto sm:px-8 sm:text-lg"
                  >
                    Znajdź nocleg
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1 sm:h-5 sm:w-5" />
                  </Button>
                </Link>
                <Link to="/co-zobaczyc-w-danii">
                  <Button
                    size="lg"
                    variant="outline"
                    className="h-12 w-full border-2 border-white bg-white/10 px-6 text-base text-white backdrop-blur-sm transition-all hover:scale-105 hover:bg-white hover:text-foreground active:scale-95 sm:h-14 sm:w-auto sm:px-8 sm:text-lg"
                  >
                    Co zobaczyć w Danii
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 z-10 hidden -translate-x-1/2 animate-bounce sm:block">
          <ArrowDown className="h-8 w-8 text-white/70" />
        </div>
      </section>

      <section className="py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-balance">Co czeka na Ciebie w Danii</h2>
            <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
              Historia, nowoczesny design i skandynawski styl życia w jednym, niedużym kraju
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            <Link to="/kopenhaga" className="group">
              <div className="overflow-hidden rounded-2xl bg-card shadow-medium hover-lift">
                <div className="relative h-64 overflow-hidden">
                  <picture>
                    <source
                      srcSet={`${countrysideImage640WebP} 640w, ${countrysideImage768WebP} 768w, ${countrysideImageWebP} 1024w`}
                      sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                      type="image/webp"
                    />
                    <img
                      src={countrysideImage}
                      alt="Duński krajobraz z zielonymi polami i tradycyjnymi domami"
                      loading="lazy"
                      width="1024"
                      height="576"
                      decoding="async"
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  </picture>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <MapPin className="mb-2 h-8 w-8" />
                    <h3 className="text-2xl font-bold">Kopenhaga</h3>
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-muted-foreground">
                    Co zobaczyć w Kopenhadze? Własne zdjęcia, mapa zabytków i trasy,
                    które mają sens przy pierwszej wizycie.
                  </p>
                </div>
              </div>
            </Link>

            <Link to="/kultura-dunska" className="group">
              <div className="overflow-hidden rounded-2xl bg-card shadow-medium hover-lift">
                <div className="relative h-64 overflow-hidden">
                  <picture>
                    <source
                      srcSet={`${hyggeImage640WebP} 640w, ${hyggeImage768WebP} 768w, ${hyggeImageWebP} 1024w`}
                      sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                      type="image/webp"
                    />
                    <img
                      src={hyggeImage}
                      alt="Przytulne wnętrze z gorącym napojem i świecami – duńskie hygge"
                      loading="lazy"
                      width="1024"
                      height="576"
                      decoding="async"
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  </picture>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <Coffee className="mb-2 h-8 w-8" />
                    <h3 className="text-2xl font-bold">Hygge i kultura</h3>
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-muted-foreground">
                    Co naprawdę znaczy hygge? Duńska codzienność, tradycje
                    i kultura bez stereotypów.
                  </p>
                </div>
              </div>
            </Link>

            <Link to="/artykul/dunski-design-kopenhaga" className="group">
              <div className="overflow-hidden rounded-2xl bg-card shadow-medium hover-lift">
                <div className="relative h-64 overflow-hidden">
                  <picture>
                    <source
                      srcSet={`${designImage640WebP} 640w, ${designImage768WebP} 768w, ${designImageWebP} 1024w`}
                      sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                      type="image/webp"
                    />
                    <img
                      src={designImage}
                      alt="Minimalistyczne skandynawskie wnętrze z eleganckimi meblami – duński design"
                      loading="lazy"
                      width="1024"
                      height="576"
                      decoding="async"
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  </picture>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <Sparkles className="mb-2 h-8 w-8" />
                    <h3 className="text-2xl font-bold">Duński design</h3>
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-muted-foreground">
                    Od słynnych krzeseł po współczesne sklepy. Gdzie szukać duńskiego
                    designu w Kopenhadze i ile kosztuje wstęp do muzeum.
                  </p>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-primary py-24 text-primary-foreground">
        <div className="container mx-auto px-4 text-center md:px-6">
          <Building2 className="mx-auto mb-6 h-16 w-16 opacity-90" />
          <h2 className="mb-6 text-white">Szukasz noclegu?</h2>
          <p className="mx-auto mb-8 max-w-2xl text-lg text-white/95">
            Porównaj hotele i apartamenty na mapie – od centrum Kopenhagi
            po okolice lotniska Kastrup.
          </p>
          <Link to="/noclegi">
            <Button
              size="lg"
              variant="secondary"
              className="h-14 px-8 text-lg shadow-xl transition-all hover:scale-105"
            >
              Zobacz noclegi
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>

      <section className="py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid gap-8 md:grid-cols-3">
            <div className="text-center">
              <div className="mb-2 text-5xl font-bold text-primary md:text-6xl">
                5,9 mln
              </div>
              <p className="text-lg text-muted-foreground">mieszkańców</p>
            </div>
            <div className="text-center">
              <div className="mb-2 text-5xl font-bold text-primary md:text-6xl">
                400+
              </div>
              <p className="text-lg text-muted-foreground">wysp z własną nazwą</p>
            </div>
            <div className="text-center">
              <div className="mb-2 text-5xl font-bold text-primary md:text-6xl">
                7,8 km
              </div>
              <p className="text-lg text-muted-foreground">
                mostu nad Sundem do Szwecji
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-gradient-card py-24">
        <div className="container mx-auto px-4 text-center md:px-6">
          <h2 className="mb-6">Gotowy na Danię?</h2>
          <p className="mx-auto mb-8 max-w-2xl text-lg text-muted-foreground">
            Zacznij od Kopenhagi – to najlepsza baza na pierwszą podróż
          </p>
          <Link to="/kopenhaga">
            <Button
              size="lg"
              className="h-14 px-8 text-lg shadow-medium transition-all hover:scale-105"
            >
              Co zobaczyć w Kopenhadze
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
