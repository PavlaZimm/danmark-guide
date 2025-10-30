import { Heart, MapPin } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const AuthorBio = () => {
  return (
    <Card className="border-2 border-primary/20 bg-gradient-to-br from-primary/5 to-transparent">
      <CardContent className="p-8">
        <div className="flex flex-col gap-6 md:flex-row md:items-center">
          {/* Avatar */}
          <div className="flex-shrink-0">
            <div className="flex h-24 w-24 items-center justify-center rounded-full bg-primary/10 ring-4 ring-primary/20">
              <span className="text-4xl">👩‍💻</span>
            </div>
          </div>

          {/* Bio Content */}
          <div className="flex-1">
            <div className="mb-2 flex items-center gap-2">
              <h3 className="text-2xl font-bold">Pavla</h3>
              <Heart className="h-5 w-5 fill-primary text-primary" />
            </div>

            <div className="mb-3 flex items-center gap-2 text-sm text-muted-foreground">
              <MapPin className="h-4 w-4" />
              <span>Autorka kastrup.cz</span>
            </div>

            <p className="leading-relaxed text-muted-foreground">
              Vítejte na mém blogu o Dánsku! Mám tuto nádhernou skandinávskou zemi velmi ráda.
              Poprvé jsem Dánsko navštívila v roce <strong>1997</strong> a od té doby se tam
              ráda vracím. Ať už je to kouzlo Kodaně, hygge atmosféra, nebo krásná příroda –
              Dánsko má podle mě prostě něco výjimečného. Na těchto stránkách s vámi sdílím
              své zkušenosti, tipy a poznatky o životě a cestování v Dánsku.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AuthorBio;
