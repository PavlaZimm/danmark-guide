import { lazy, Suspense, useEffect, useRef, useState } from "react";
import type { ArticleMapProps } from "./ArticleMap";

const ArticleMap = lazy(() => import("./ArticleMap"));

// Leaflet is heavy (~150 kB), so load it only when the map is about to scroll into view
const LazyArticleMap = (props: ArticleMapProps) => {
  const placeholderRef = useRef<HTMLDivElement>(null);
  const [isNearViewport, setIsNearViewport] = useState(false);

  useEffect(() => {
    const element = placeholderRef.current;
    if (!element || isNearViewport) return;

    if (!("IntersectionObserver" in window)) {
      setIsNearViewport(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setIsNearViewport(true);
          observer.disconnect();
        }
      },
      { rootMargin: "400px 0px" }
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, [isNearViewport]);

  const placeholder = (
    <div
      ref={placeholderRef}
      style={{ height: props.height ?? "400px", margin: "30px 0", borderRadius: "12px" }}
      className="bg-muted"
      aria-hidden="true"
    />
  );

  if (!isNearViewport) return placeholder;

  return (
    <Suspense fallback={placeholder}>
      <ArticleMap {...props} />
    </Suspense>
  );
};

export default LazyArticleMap;
