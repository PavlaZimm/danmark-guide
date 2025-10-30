import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Calendar, ChevronRight } from "lucide-react";
import { Helmet } from "react-helmet-async";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface ArticlesByMonth {
  month: string;
  year: number;
  count: number;
  articles: {
    id: string;
    title: string;
    slug: string;
    created_at: string;
    categories: {
      name: string;
    };
  }[];
}

const Archive = () => {
  const [articlesByMonth, setArticlesByMonth] = useState<ArticlesByMonth[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchArchive();
  }, []);

  const fetchArchive = async () => {
    try {
      const { data, error } = await supabase
        .from("articles")
        .select(`
          id,
          title,
          slug,
          created_at,
          categories (
            name
          )
        `)
        .eq("published", true)
        .order("created_at", { ascending: false });

      if (error) throw error;

      // Group articles by month
      const grouped: { [key: string]: ArticlesByMonth } = {};

      data?.forEach((article) => {
        const date = new Date(article.created_at);
        const monthNames = [
          "Leden", "Únor", "Březen", "Duben", "Květen", "Červen",
          "Červenec", "Srpen", "Září", "Říjen", "Listopad", "Prosinec"
        ];
        const month = monthNames[date.getMonth()];
        const year = date.getFullYear();
        const key = `${year}-${date.getMonth()}`;

        if (!grouped[key]) {
          grouped[key] = {
            month,
            year,
            count: 0,
            articles: [],
          };
        }

        grouped[key].count++;
        grouped[key].articles.push(article);
      });

      // Convert to array and sort by date
      const archiveArray = Object.values(grouped).sort((a, b) => {
        if (a.year !== b.year) return b.year - a.year;
        const monthNames = [
          "Leden", "Únor", "Březen", "Duben", "Květen", "Červen",
          "Červenec", "Srpen", "Září", "Říjen", "Listopad", "Prosinec"
        ];
        return monthNames.indexOf(b.month) - monthNames.indexOf(a.month);
      });

      setArticlesByMonth(archiveArray);
    } catch (error) {
      console.error("Error fetching archive:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Archiv článků | Kastrup.cz</title>
        <meta
          name="description"
          content="Procházejte archiv všech článků o Dánsku seřazených podle data publikace. Objevte historii našeho magazínu."
        />
        <link rel="canonical" href="https://kastrup.cz/archiv" />
      </Helmet>

      <div className="min-h-screen py-12">
        <div className="container mx-auto px-4 md:px-6">
          {/* Header */}
          <div className="mb-12">
            <h1 className="mb-4 flex items-center gap-3 text-4xl font-bold md:text-5xl">
              <Calendar className="h-10 w-10" />
              Archiv článků
            </h1>
            <p className="text-lg text-muted-foreground">
              Procházejte naše články seřazené podle data publikace
            </p>
          </div>

          {/* Archive List */}
          {loading ? (
            <div className="space-y-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="h-32 animate-pulse rounded-lg bg-muted"></div>
              ))}
            </div>
          ) : articlesByMonth.length > 0 ? (
            <div className="space-y-6">
              {articlesByMonth.map((monthGroup) => (
                <Card key={`${monthGroup.year}-${monthGroup.month}`}>
                  <CardHeader className="bg-primary/5">
                    <CardTitle className="flex items-center justify-between">
                      <span className="text-2xl">
                        {monthGroup.month} {monthGroup.year}
                      </span>
                      <Badge variant="secondary">{monthGroup.count} článků</Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <ul className="space-y-4">
                      {monthGroup.articles.map((article) => {
                        const formattedDate = new Date(article.created_at).toLocaleDateString(
                          "cs-CZ",
                          {
                            day: "numeric",
                            month: "long",
                          }
                        );

                        return (
                          <li key={article.id}>
                            <Link
                              to={`/clanek/${article.slug}`}
                              className="group flex items-start justify-between gap-4 rounded-lg p-4 transition-colors hover:bg-muted/50"
                            >
                              <div className="flex-1">
                                <h3 className="mb-1 font-semibold transition-colors group-hover:text-primary">
                                  {article.title}
                                </h3>
                                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                  <span>{formattedDate}</span>
                                  <span>•</span>
                                  <span>{article.categories?.name}</span>
                                </div>
                              </div>
                              <ChevronRight className="h-5 w-5 text-muted-foreground transition-transform group-hover:translate-x-1" />
                            </Link>
                          </li>
                        );
                      })}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="p-12 text-center">
                <Calendar className="mx-auto mb-4 h-12 w-12 text-muted-foreground/50" />
                <p className="text-lg text-muted-foreground">
                  Zatím nejsou k dispozici žádné články.
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </>
  );
};

export default Archive;
