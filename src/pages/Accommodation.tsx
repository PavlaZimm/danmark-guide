import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Search, Filter, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import AccommodationCard from "@/components/AccommodationCard";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Helmet } from "react-helmet-async";
import Breadcrumbs from "@/components/Breadcrumbs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Accommodation {
  id: string;
  name: string;
  slug: string;
  description: string;
  city: string;
  type: string;
  price_per_night: number;
  images: string[];
}

const Accommodation = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [accommodations, setAccommodations] = useState<Accommodation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState(searchParams.get("search") || "");
  const [selectedCity, setSelectedCity] = useState<string>(
    searchParams.get("city") || "all"
  );
  const [selectedType, setSelectedType] = useState<string>(
    searchParams.get("type") || "all"
  );
  const [cities, setCities] = useState<string[]>([]);

  useEffect(() => {
    fetchAccommodations();
  }, []);

  // Update URL parameters when filters change
  useEffect(() => {
    const params = new URLSearchParams();
    if (searchTerm) params.set("search", searchTerm);
    if (selectedCity && selectedCity !== "all") params.set("city", selectedCity);
    if (selectedType && selectedType !== "all") params.set("type", selectedType);
    setSearchParams(params, { replace: true });
  }, [searchTerm, selectedCity, selectedType, setSearchParams]);

  const fetchAccommodations = async () => {
    try {
      setError(null);
      const { data, error } = await supabase
        .from("accommodations")
        .select("*")
        .order("name");

      if (error) throw error;

      setAccommodations(data || []);

      // Extract unique cities
      const uniqueCities = Array.from(
        new Set(data?.map((acc) => acc.city) || [])
      ).sort();
      setCities(uniqueCities);

      // If no accommodations, set a friendly message but don't treat as error
      if (!data || data.length === 0) {
        console.info("No accommodations found in database");
      }
    } catch (error) {
      console.error("Error fetching accommodations:", error);
      setError("Nepodařilo se načíst ubytování. Zkontrolujte prosím připojení k internetu.");
      toast.error("Nepodařilo se načíst ubytování");
    } finally {
      setLoading(false);
    }
  };

  const filteredAccommodations = accommodations.filter((acc) => {
    const matchesSearch =
      acc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      acc.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      acc.city.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCity = selectedCity === "all" || acc.city === selectedCity;
    const matchesType = selectedType === "all" || acc.type === selectedType;
    return matchesSearch && matchesCity && matchesType;
  });

  return (
    <>
      <Helmet>
        <title>Ubytování v Dánsku | Hotely, Apartmány, Hostely | Kastrup.cz</title>
        <meta
          name="description"
          content="Najděte perfektní ubytování v Dánsku. Široký výběr hotelů, apartmánů a hostelů v Kodani a dalších městech. Porovnejte ceny a rezervujte online."
        />
        <meta
          name="keywords"
          content="ubytování Dánsko, hotely Kodaň, apartmány Dánsko, hostel Kodaň, levné ubytování Dánsko"
        />
        <link rel="canonical" href="https://kastrup.cz/ubytovani" />

        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://kastrup.cz/ubytovani" />
        <meta property="og:title" content="Ubytování v Dánsku - Kastrup.cz" />
        <meta
          property="og:description"
          content="Najděte perfektní ubytování v Dánsku. Hotely, apartmány a hostely v Kodani a dalších městech."
        />
        <meta property="og:image" content="https://kastrup.cz/og-accommodation.jpg" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Ubytování v Dánsku - Kastrup.cz" />
        <meta
          name="twitter:description"
          content="Najděte perfektní ubytování v Dánsku. Hotely, apartmány a hostely."
        />

        {/* JSON-LD */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            "name": "Ubytování v Dánsku",
            "description": "Kolekce ubytovacích zařízení v Dánsku - hotely, apartmány, hostely",
            "url": "https://kastrup.cz/ubytovani",
            "isPartOf": {
              "@type": "WebSite",
              "name": "Kastrup.cz",
              "url": "https://kastrup.cz"
            }
          })}
        </script>

        {/* ItemList Schema for Accommodations */}
        {filteredAccommodations.length > 0 && (
          <script type="application/ld+json">
            {JSON.stringify({
              "@context": "https://schema.org",
              "@type": "ItemList",
              "itemListElement": filteredAccommodations.map((acc, index) => ({
                "@type": "ListItem",
                "position": index + 1,
                "item": {
                  "@type": acc.type === "hotel" ? "Hotel" : "LodgingBusiness",
                  "@id": `https://kastrup.cz/ubytovani/${acc.slug}`,
                  "name": acc.name,
                  "description": acc.description,
                  "address": {
                    "@type": "PostalAddress",
                    "addressLocality": acc.city,
                    "addressCountry": "DK"
                  },
                  "priceRange": `${acc.price_per_night} DKK`,
                  "image": acc.images && acc.images.length > 0 ? acc.images[0] : undefined,
                  "url": `https://kastrup.cz/ubytovani/${acc.slug}`
                }
              }))
            })}
          </script>
        )}
      </Helmet>

      <div className="min-h-screen py-12">
        <div className="container mx-auto px-4 md:px-6">
        <Breadcrumbs items={[{ label: "Ubytování" }]} />

        {/* Header */}
        <div className="mb-12">
          <h1 className="mb-4 text-4xl font-bold md:text-5xl">Ubytování</h1>
          <p className="text-lg text-muted-foreground">
            Najděte perfektní ubytování v Dánsku
          </p>
        </div>

        {/* Filters */}
        <div className="mb-8 space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Hledat ubytování..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          <div className="flex flex-col gap-4 md:flex-row">
            <Select value={selectedCity} onValueChange={setSelectedCity}>
              <SelectTrigger className="w-full md:w-[200px]">
                <SelectValue placeholder="Město" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Všechna města</SelectItem>
                {cities.map((city) => (
                  <SelectItem key={city} value={city}>
                    {city}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={selectedType} onValueChange={setSelectedType}>
              <SelectTrigger className="w-full md:w-[200px]">
                <SelectValue placeholder="Typ ubytování" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Všechny typy</SelectItem>
                <SelectItem value="hotel">Hotel</SelectItem>
                <SelectItem value="apartment">Apartmán</SelectItem>
                <SelectItem value="hostel">Hostel</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Active Filters */}
        {(searchTerm || selectedCity !== "all" || selectedType !== "all") && (
          <div className="mb-6 flex flex-wrap items-center gap-2">
            <span className="text-sm text-muted-foreground">Aktivní filtry:</span>
            {searchTerm && (
              <Badge variant="secondary" className="gap-1">
                Hledání: "{searchTerm}"
                <button
                  onClick={() => setSearchTerm("")}
                  className="ml-1 rounded-full hover:bg-muted"
                  aria-label="Zrušit vyhledávání"
                >
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            )}
            {selectedCity !== "all" && (
              <Badge variant="secondary" className="gap-1">
                Město: {selectedCity}
                <button
                  onClick={() => setSelectedCity("all")}
                  className="ml-1 rounded-full hover:bg-muted"
                  aria-label="Zrušit filtr města"
                >
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            )}
            {selectedType !== "all" && (
              <Badge variant="secondary" className="gap-1">
                Typ: {selectedType === "hotel" ? "Hotel" : selectedType === "apartment" ? "Apartmán" : "Hostel"}
                <button
                  onClick={() => setSelectedType("all")}
                  className="ml-1 rounded-full hover:bg-muted"
                  aria-label="Zrušit filtr typu"
                >
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            )}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                setSearchTerm("");
                setSelectedCity("all");
                setSelectedType("all");
              }}
              className="h-7 text-xs"
            >
              Vymazat vše
            </Button>
          </div>
        )}

        {/* Results */}
        {loading ? (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {[...Array(9)].map((_, i) => (
              <div key={i} className="h-96 animate-pulse rounded-lg bg-muted"></div>
            ))}
          </div>
        ) : error ? (
          <div className="rounded-lg border-2 border-destructive/20 bg-destructive/5 p-12 text-center">
            <p className="mb-4 text-lg font-semibold text-destructive">
              {error}
            </p>
            <Button onClick={fetchAccommodations} variant="outline">
              Zkusit znovu
            </Button>
          </div>
        ) : filteredAccommodations.length > 0 ? (
          <>
            <p className="mb-6 text-sm text-muted-foreground">
              Nalezeno {filteredAccommodations.length} ubytování
            </p>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {filteredAccommodations.map((accommodation) => (
                <AccommodationCard
                  key={accommodation.id}
                  id={accommodation.id}
                  name={accommodation.name}
                  slug={accommodation.slug}
                  description={accommodation.description}
                  city={accommodation.city}
                  type={accommodation.type}
                  pricePerNight={accommodation.price_per_night}
                  images={accommodation.images}
                />
              ))}
            </div>
          </>
        ) : accommodations.length === 0 ? (
          <div className="rounded-lg bg-gradient-card p-12 text-center">
            <h3 className="mb-4 text-2xl font-bold">Zatím zde není žádné ubytování</h3>
            <p className="mb-6 text-lg text-muted-foreground">
              Pracujeme na přidání nejlepších ubytovacích zařízení v Dánsku.
              Brzy zde najdete hotely, apartmány a hostely v Kodani a dalších městech.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/o-dansku">
                <Button variant="default">
                  Více o Dánsku
                </Button>
              </Link>
              <Link to="/clanky">
                <Button variant="outline">
                  Přečíst články
                </Button>
              </Link>
            </div>
          </div>
        ) : (
          <div className="rounded-lg bg-muted p-12 text-center">
            <p className="mb-4 text-lg text-muted-foreground">
              Nenalezeno žádné ubytování odpovídající vašemu hledání.
            </p>
            <Button
              onClick={() => {
                setSearchTerm("");
                setSelectedCity("all");
                setSelectedType("all");
              }}
              variant="outline"
            >
              Vymazat filtry
            </Button>
          </div>
        )}
        </div>
      </div>
    </>
  );
};

export default Accommodation;
