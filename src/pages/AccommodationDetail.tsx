import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { MapPin, Euro, Building2, Share2, Star, Wifi, Coffee, Car } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Helmet } from "react-helmet-async";
import Breadcrumbs from "@/components/Breadcrumbs";

interface Accommodation {
  id: string;
  name: string;
  slug: string;
  description: string;
  city: string;
  address: string | null;
  type: string;
  price_per_night: number;
  images: string[];
  amenities: string[] | null;
  rating: number | null;
  contact_email: string | null;
  contact_phone: string | null;
  website: string | null;
}

const AccommodationDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const [accommodation, setAccommodation] = useState<Accommodation | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (slug) {
      fetchAccommodation();
    }
  }, [slug]);

  const fetchAccommodation = async () => {
    try {
      const { data, error } = await supabase
        .from("accommodations")
        .select("*")
        .eq("slug", slug)
        .single();

      if (error) throw error;
      setAccommodation(data);
    } catch (error) {
      console.error("Error fetching accommodation:", error);
      toast.error("Ubytování se nepodařilo načíst");
    } finally {
      setLoading(false);
    }
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: accommodation?.name,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast.success("Odkaz zkopírován do schránky");
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case "hotel":
        return "Hotel";
      case "apartment":
        return "Apartmán";
      case "hostel":
        return "Hostel";
      default:
        return type;
    }
  };

  const amenityIcons: Record<string, any> = {
    wifi: Wifi,
    breakfast: Coffee,
    parking: Car,
  };

  if (loading) {
    return (
      <div className="min-h-screen py-12">
        <div className="container mx-auto px-4 md:px-6">
          <div className="mx-auto max-w-4xl">
            <div className="mb-8 h-8 w-32 animate-pulse rounded bg-muted"></div>
            <div className="mb-6 h-12 w-3/4 animate-pulse rounded bg-muted"></div>
            <div className="mb-8 aspect-video w-full animate-pulse rounded-lg bg-muted"></div>
            <div className="space-y-4">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="h-4 animate-pulse rounded bg-muted"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!accommodation) {
    return (
      <div className="min-h-screen py-12">
        <div className="container mx-auto px-4 md:px-6">
          <div className="mx-auto max-w-4xl text-center">
            <h1 className="mb-4 text-4xl font-bold">Ubytování nenalezeno</h1>
            <p className="mb-8 text-lg text-muted-foreground">
              Omlouváme se, ale toto ubytování nebylo nalezeno.
            </p>
            <Link to="/ubytovani">
              <Button>Zpět na ubytování</Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>{accommodation.name} - Ubytování v {accommodation.city} | Kastrup.cz</title>
        <meta
          name="description"
          content={`${accommodation.name} v ${accommodation.city}. ${accommodation.description.substring(0, 150)}...`}
        />
        <link rel="canonical" href={`https://kastrup.cz/ubytovani/${accommodation.slug}`} />

        {/* Open Graph */}
        <meta property="og:type" content="hotel" />
        <meta property="og:url" content={`https://kastrup.cz/ubytovani/${accommodation.slug}`} />
        <meta property="og:title" content={`${accommodation.name} - ${accommodation.city}`} />
        <meta property="og:description" content={accommodation.description} />
        {accommodation.images && accommodation.images.length > 0 && (
          <meta property="og:image" content={accommodation.images[0]} />
        )}

        {/* Schema.org */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": accommodation.type === "hotel" ? "Hotel" : "LodgingBusiness",
            "name": accommodation.name,
            "description": accommodation.description,
            "address": {
              "@type": "PostalAddress",
              "addressLocality": accommodation.city,
              "addressCountry": "DK",
              "streetAddress": accommodation.address
            },
            "priceRange": `${accommodation.price_per_night} DKK`,
            "image": accommodation.images || [],
            "aggregateRating": accommodation.rating ? {
              "@type": "AggregateRating",
              "ratingValue": accommodation.rating,
              "bestRating": "5"
            } : undefined,
            "url": `https://kastrup.cz/ubytovani/${accommodation.slug}`
          })}
        </script>

        {/* Breadcrumb Schema */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              {
                "@type": "ListItem",
                "position": 1,
                "name": "Domů",
                "item": "https://kastrup.cz"
              },
              {
                "@type": "ListItem",
                "position": 2,
                "name": "Ubytování",
                "item": "https://kastrup.cz/ubytovani"
              },
              {
                "@type": "ListItem",
                "position": 3,
                "name": accommodation.name
              }
            ]
          })}
        </script>
      </Helmet>

      <div className="min-h-screen py-12">
        <div className="container mx-auto px-4 md:px-6">
          <div className="mx-auto max-w-4xl">
            <Breadcrumbs
              items={[
                { label: "Ubytování", href: "/ubytovani" },
                { label: accommodation.name }
              ]}
            />

            {/* Header */}
            <div className="mb-8">
              <div className="mb-4 flex flex-wrap items-start justify-between gap-4">
                <div>
                  <div className="mb-2 flex flex-wrap items-center gap-2">
                    <Badge variant="secondary">{getTypeLabel(accommodation.type)}</Badge>
                    {accommodation.rating && (
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 fill-primary text-primary" />
                        <span className="font-semibold">{accommodation.rating}</span>
                      </div>
                    )}
                  </div>
                  <h1 className="mb-2 text-4xl font-bold md:text-5xl">
                    {accommodation.name}
                  </h1>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <MapPin className="h-4 w-4" />
                    <span>{accommodation.city}</span>
                    {accommodation.address && <span>• {accommodation.address}</span>}
                  </div>
                </div>
                <Button variant="outline" size="sm" onClick={handleShare}>
                  <Share2 className="mr-2 h-4 w-4" />
                  Sdílet
                </Button>
              </div>

              <div className="flex items-center gap-2 text-2xl font-bold text-primary">
                <Euro className="h-6 w-6" />
                {accommodation.price_per_night} DKK / noc
              </div>
            </div>

            {/* Images */}
            {accommodation.images && accommodation.images.length > 0 && (
              <div className="mb-8">
                <div className="grid gap-4 md:grid-cols-2">
                  <img
                    src={accommodation.images[0]}
                    alt={accommodation.name}
                    className="h-[400px] w-full rounded-lg object-cover"
                  />
                  {accommodation.images.length > 1 && (
                    <div className="grid gap-4">
                      {accommodation.images.slice(1, 3).map((image, index) => (
                        <img
                          key={index}
                          src={image}
                          alt={`${accommodation.name} - obrázek ${index + 2}`}
                          className="h-[192px] w-full rounded-lg object-cover"
                        />
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Description */}
            <div className="prose prose-lg mb-8 max-w-none dark:prose-invert">
              <h2>O ubytování</h2>
              <p>{accommodation.description}</p>
            </div>

            {/* Amenities */}
            {accommodation.amenities && accommodation.amenities.length > 0 && (
              <div className="mb-8">
                <h2 className="mb-4 text-2xl font-bold">Vybavení</h2>
                <div className="flex flex-wrap gap-2">
                  {accommodation.amenities.map((amenity, index) => {
                    const Icon = amenityIcons[amenity.toLowerCase()] || Building2;
                    return (
                      <Badge key={index} variant="outline" className="gap-2 px-4 py-2">
                        <Icon className="h-4 w-4" />
                        {amenity}
                      </Badge>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Contact */}
            <div className="rounded-lg bg-gradient-card p-8">
              <h2 className="mb-4 text-2xl font-bold">Kontakt a rezervace</h2>
              <div className="space-y-2">
                {accommodation.contact_email && (
                  <p>
                    <strong>Email:</strong>{" "}
                    <a href={`mailto:${accommodation.contact_email}`} className="text-primary hover:underline">
                      {accommodation.contact_email}
                    </a>
                  </p>
                )}
                {accommodation.contact_phone && (
                  <p>
                    <strong>Telefon:</strong>{" "}
                    <a href={`tel:${accommodation.contact_phone}`} className="text-primary hover:underline">
                      {accommodation.contact_phone}
                    </a>
                  </p>
                )}
                {accommodation.website && (
                  <p>
                    <strong>Web:</strong>{" "}
                    <a
                      href={accommodation.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline"
                    >
                      {accommodation.website}
                    </a>
                  </p>
                )}
              </div>
              <div className="mt-6">
                <Link to="/kontakt">
                  <Button size="lg" className="w-full md:w-auto">
                    Kontaktujte nás pro rezervaci
                  </Button>
                </Link>
              </div>
            </div>

            {/* Back to List */}
            <div className="mt-12 text-center">
              <Link to="/ubytovani">
                <Button variant="outline">Zpět na přehled ubytování</Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AccommodationDetail;
