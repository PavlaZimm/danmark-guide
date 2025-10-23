import { Link } from "react-router-dom";
import { MapPin, DollarSign } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface AccommodationCardProps {
  id: string;
  name: string;
  slug: string;
  description: string;
  city: string;
  type: string;
  pricePerNight: number;
  images: string[];
}

const AccommodationCard = ({
  id,
  name,
  slug,
  description,
  city,
  type,
  pricePerNight,
  images,
}: AccommodationCardProps) => {
  const typeLabels: Record<string, string> = {
    hotel: "Hotel",
    apartment: "Apartmán",
    hostel: "Hostel",
  };

  return (
    <Link to={`/ubytovani/${slug}`}>
      <Card className="group h-full overflow-hidden transition-all hover:shadow-medium">
        <CardHeader className="p-0">
          <div className="relative aspect-[16/9] overflow-hidden bg-muted">
            {images && images.length > 0 ? (
              <img
                src={images[0]}
                alt={name}
                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                loading="lazy"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-gradient-nordic">
                <span className="text-4xl text-muted-foreground">🏨</span>
              </div>
            )}
            <Badge className="absolute left-4 top-4 bg-primary text-primary-foreground">
              {typeLabels[type]}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          <h3 className="mb-2 line-clamp-1 text-xl font-semibold transition-colors group-hover:text-primary">
            {name}
          </h3>
          <div className="mb-3 flex items-center gap-2 text-sm text-muted-foreground">
            <MapPin className="h-4 w-4" />
            <span>{city}</span>
          </div>
          <p className="line-clamp-2 text-sm text-muted-foreground">{description}</p>
        </CardContent>
        <CardFooter className="flex items-center justify-between px-6 pb-6 pt-0">
          <div className="flex items-center gap-1 font-semibold text-primary">
            <DollarSign className="h-4 w-4" />
            <span>{pricePerNight.toLocaleString("cs-CZ")} Kč</span>
          </div>
          <span className="text-xs text-muted-foreground">/ noc</span>
        </CardFooter>
      </Card>
    </Link>
  );
};

export default AccommodationCard;
