import { Link } from "react-router-dom";
import { Tag } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface ArticleTagsProps {
  tags?: string[];
}

/**
 * Article Tags Component
 *
 * Displays tags for an article with links to tag archive pages.
 *
 * To fully implement tags:
 * 1. Add tags table to Supabase:
 *    - id, name, slug
 * 2. Add article_tags junction table:
 *    - article_id, tag_id
 * 3. Update article queries to include tags
 * 4. Create /tag/[slug] route for tag archives
 *
 * Example tags: "Kodaň", "Hygge", "Design", "Cestování", "Kultura"
 */
const ArticleTags = ({ tags = [] }: ArticleTagsProps) => {
  if (tags.length === 0) {
    return null;
  }

  return (
    <div className="flex flex-wrap items-center gap-2">
      <Tag className="h-4 w-4 text-muted-foreground" />
      <span className="text-sm font-medium text-muted-foreground">Tagy:</span>
      {tags.map((tag) => (
        <Link
          key={tag}
          to={`/clanky?tag=${encodeURIComponent(tag.toLowerCase())}`}
          className="transition-transform hover:scale-105"
        >
          <Badge variant="secondary" className="cursor-pointer hover:bg-primary hover:text-primary-foreground">
            {tag}
          </Badge>
        </Link>
      ))}
    </div>
  );
};

export default ArticleTags;
