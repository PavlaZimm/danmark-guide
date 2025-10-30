import { Link } from "react-router-dom";
import { Calendar, Clock } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { calculateReadingTime, formatReadingTime } from "@/lib/readingTime";

interface ArticleCardProps {
  id: string;
  title: string;
  slug: string;
  perex: string;
  imageUrl?: string;
  category: string;
  createdAt: string;
  content?: string;
}

const ArticleCard = ({
  id,
  title,
  slug,
  perex,
  imageUrl,
  category,
  createdAt,
  content,
}: ArticleCardProps) => {
  const formattedDate = new Date(createdAt).toLocaleDateString("cs-CZ", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  // Calculate reading time from perex (approximate)
  const readingMinutes = calculateReadingTime(content || perex);
  const readingTime = formatReadingTime(readingMinutes);

  return (
    <Link to={`/clanek/${slug}`}>
      <Card className="group h-full overflow-hidden transition-all hover:shadow-medium">
        <CardHeader className="p-0">
          <div className="relative aspect-[16/9] overflow-hidden bg-muted">
            {imageUrl ? (
              <img
                src={imageUrl}
                alt={title}
                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                loading="lazy"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-gradient-nordic">
                <span className="text-4xl text-muted-foreground">📰</span>
              </div>
            )}
            <Badge className="absolute left-4 top-4 bg-primary text-primary-foreground">
              {category}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          <h3 className="mb-3 line-clamp-2 text-xl font-semibold transition-colors group-hover:text-primary">
            {title}
          </h3>
          <p className="line-clamp-3 text-sm text-muted-foreground">{perex}</p>
        </CardContent>
        <CardFooter className="px-6 pb-6 pt-0">
          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              <span>{formattedDate}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              <span>{readingTime}</span>
            </div>
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
};

export default ArticleCard;
