interface ResponsiveImageProps {
  src: string;
  alt: string;
  className?: string;
  loading?: "lazy" | "eager";
  sizes?: string;
}

/**
 * Responsive image component with WebP support and srcset
 *
 * Usage:
 * <ResponsiveImage
 *   src="/images/photo.jpg"
 *   alt="Description"
 *   className="w-full h-auto"
 *   loading="lazy"
 * />
 *
 * Note: For full WebP support, you need to:
 * 1. Generate WebP versions of your images
 * 2. Set up your image CDN to serve WebP when supported
 * 3. Or use <picture> element with multiple sources
 *
 * This component assumes your image server handles WebP conversion
 * or you have both .jpg and .webp versions available.
 */
const ResponsiveImage = ({
  src,
  alt,
  className = "",
  loading = "lazy",
  sizes = "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw",
}: ResponsiveImageProps) => {
  // Generate WebP version URL (assumes server converts or .webp exists)
  const webpSrc = src.replace(/\.(jpg|jpeg|png)$/i, ".webp");

  // Generate srcset for different sizes (basic example)
  // In production, you'd generate these from your image processing pipeline
  const srcSet = `
    ${src}?w=400 400w,
    ${src}?w=800 800w,
    ${src}?w=1200 1200w,
    ${src}?w=1600 1600w
  `.trim();

  const webpSrcSet = `
    ${webpSrc}?w=400 400w,
    ${webpSrc}?w=800 800w,
    ${webpSrc}?w=1200 1200w,
    ${webpSrc}?w=1600 1600w
  `.trim();

  return (
    <picture>
      {/* WebP source for modern browsers */}
      <source
        type="image/webp"
        srcSet={webpSrcSet}
        sizes={sizes}
      />

      {/* Fallback for browsers that don't support WebP */}
      <source
        type="image/jpeg"
        srcSet={srcSet}
        sizes={sizes}
      />

      {/* Final fallback img tag */}
      <img
        src={src}
        alt={alt}
        className={className}
        loading={loading}
        decoding="async"
      />
    </picture>
  );
};

export default ResponsiveImage;
