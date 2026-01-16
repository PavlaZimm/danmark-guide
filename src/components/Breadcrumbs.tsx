import { Link } from "react-router-dom";
import { ChevronRight, Home } from "lucide-react";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

const Breadcrumbs = ({ items }: BreadcrumbsProps) => {
  return (
    <nav aria-label="Breadcrumb" className="mb-6 rounded-lg bg-muted/30 px-4 py-3">
      <ol className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
        {/* Home link */}
        <li className="flex items-center gap-2">
          <Link
            to="/"
            className="flex items-center gap-1 transition-colors hover:text-primary"
            aria-label="Domů"
          >
            <Home className="h-4 w-4" />
            <span>Domů</span>
          </Link>
          {items.length > 0 && <ChevronRight className="h-4 w-4" />}
        </li>

        {/* Dynamic breadcrumb items */}
        {items.map((item, index) => {
          const isLast = index === items.length - 1;

          return (
            <li key={index} className="flex items-center gap-2">
              {item.href && !isLast ? (
                <>
                  <Link
                    to={item.href}
                    className="transition-colors hover:text-primary"
                  >
                    {item.label}
                  </Link>
                  {!isLast && <ChevronRight className="h-4 w-4" />}
                </>
              ) : (
                <span
                  className={isLast ? "font-medium text-foreground" : ""}
                  aria-current={isLast ? "page" : undefined}
                >
                  {item.label}
                </span>
              )}
              {!isLast && index < items.length - 1 && item.href && (
                <ChevronRight className="h-4 w-4" />
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;
