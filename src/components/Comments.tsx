import { MessageSquare } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface CommentsProps {
  articleId: string;
  articleTitle: string;
}

/**
 * Comments component for articles
 *
 * This is a placeholder component ready for integration with:
 * - Disqus (https://disqus.com/)
 * - Facebook Comments
 * - Custom comment system with Supabase
 * - Commento, Hyvor Talk, or other comment platforms
 *
 * To integrate:
 * 1. Choose your comment platform
 * 2. Add the platform's script to index.html or load dynamically
 * 3. Replace the placeholder content with the platform's embed code
 */
const Comments = ({ articleId, articleTitle }: CommentsProps) => {
  // Example: Disqus integration
  // useEffect(() => {
  //   const script = document.createElement('script');
  //   script.src = 'https://YOURSITE.disqus.com/embed.js';
  //   script.setAttribute('data-timestamp', (+new Date()).toString());
  //   document.body.appendChild(script);
  // }, []);

  return (
    <section className="mt-16 border-t pt-16">
      <div className="mb-8">
        <h2 className="flex items-center gap-2 text-3xl font-bold">
          <MessageSquare className="h-8 w-8" />
          Komentáře
        </h2>
        <p className="mt-2 text-muted-foreground">
          Diskutujte o článku a sdílejte své názory
        </p>
      </div>

      <Card className="bg-muted/30">
        <CardContent className="p-8 text-center">
          <MessageSquare className="mx-auto mb-4 h-12 w-12 text-muted-foreground/50" />
          <h3 className="mb-2 text-lg font-semibold">Komentáře budou brzy k dispozici</h3>
          <p className="text-sm text-muted-foreground">
            Připravujeme diskusní sekci. Zatím nás můžete kontaktovat přímo.
          </p>

          {/* TODO: Integrate comment system here */}
          {/* Example Disqus integration: */}
          {/*
          <div id="disqus_thread"></div>
          <script>
            var disqus_config = function () {
              this.page.url = window.location.href;
              this.page.identifier = '{articleId}';
              this.page.title = '{articleTitle}';
            };
          </script>
          */}

          {/* Example Commento integration: */}
          {/*
          <div id="commento"></div>
          <script src="https://cdn.commento.io/js/commento.js"></script>
          */}
        </CardContent>
      </Card>
    </section>
  );
};

export default Comments;
