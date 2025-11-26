/**
 * SEO Helper Functions
 * Validates and optimizes meta tags for search engines
 */

/**
 * Truncate text to max length with ellipsis
 */
export function truncateText(text: string, maxLength: number): string {
  if (!text) return '';
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength - 3) + '...';
}

/**
 * Validate and optimize title for SEO
 * Google displays ~60 chars on desktop, ~50 on mobile
 *
 * @param title - The page title
 * @param siteName - Site name to append (default: 'Kastrup.cz')
 * @returns Optimized title with site name
 */
export function optimizeTitle(title: string, siteName: string = 'Kastrup.cz'): string {
  if (!title) return siteName;

  const maxLength = 60;
  const suffix = ` | ${siteName}`;
  const availableLength = maxLength - suffix.length;

  // Truncate title if too long
  if (title.length > availableLength) {
    const truncated = truncateText(title, availableLength);
    console.warn(`⚠️ Title truncated: "${title}" → "${truncated}"`);
    return `${truncated}${suffix}`;
  }

  return `${title}${suffix}`;
}

/**
 * Validate and optimize meta description
 * Google displays ~155-160 chars
 *
 * @param description - The meta description
 * @returns Optimized description
 */
export function optimizeDescription(description: string): string {
  if (!description) {
    console.warn('⚠️ Empty meta description provided');
    return '';
  }

  const minLength = 120;
  const maxLength = 160;

  // Truncate if too long
  if (description.length > maxLength) {
    const truncated = truncateText(description, maxLength);
    console.warn(`⚠️ Description truncated from ${description.length} to ${maxLength} chars`);
    return truncated;
  }

  // Warn if too short (but don't modify)
  if (description.length < minLength) {
    console.warn(`⚠️ Description too short (${description.length} chars, recommended min ${minLength})`);
  }

  return description;
}

/**
 * Generate SEO-friendly slug from title
 * Removes diacritics and special characters
 *
 * @param title - The title to convert to slug
 * @returns SEO-friendly slug
 */
export function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .normalize('NFD')                    // Decompose diacritics
    .replace(/[\u0300-\u036f]/g, '')    // Remove diacritics
    .replace(/[^a-z0-9\s-]/g, '')       // Remove special chars
    .replace(/\s+/g, '-')               // Spaces to hyphens
    .replace(/-+/g, '-')                // Multiple hyphens to one
    .replace(/^-|-$/g, '');             // Trim hyphens
}

/**
 * Validate meta tags and return warnings
 * Useful for content quality checks
 *
 * @param title - Page title
 * @param description - Meta description
 * @returns Array of validation warnings
 */
export function validateMetaTags(title: string, description: string): string[] {
  const warnings: string[] = [];

  // Title validation
  if (!title) {
    warnings.push('❌ Missing title');
  } else if (title.length > 60) {
    warnings.push(`⚠️ Title too long: ${title.length} chars (max 60)`);
  } else if (title.length < 30) {
    warnings.push(`⚠️ Title too short: ${title.length} chars (min 30 recommended)`);
  }

  // Description validation
  if (!description) {
    warnings.push('❌ Missing meta description');
  } else if (description.length > 160) {
    warnings.push(`⚠️ Description too long: ${description.length} chars (max 160)`);
  } else if (description.length < 120) {
    warnings.push(`⚠️ Description too short: ${description.length} chars (min 120 recommended)`);
  }

  return warnings;
}

/**
 * Calculate reading time from HTML content
 * Assumes 200 words per minute average reading speed
 *
 * @param htmlContent - HTML content string
 * @returns Reading time in minutes
 */
export function calculateReadingTime(htmlContent: string): number {
  // Strip HTML tags
  const text = htmlContent.replace(/<[^>]*>/g, '');

  // Count words
  const wordCount = text.split(/\s+/).filter(Boolean).length;

  // Calculate time (200 words per minute)
  const minutes = Math.ceil(wordCount / 200);

  return minutes;
}

/**
 * Extract first image URL from HTML content
 * Useful for OG image fallback
 *
 * @param htmlContent - HTML content string
 * @returns First image URL or null
 */
export function extractFirstImage(htmlContent: string): string | null {
  const imgRegex = /<img[^>]+src="([^">]+)"/;
  const match = htmlContent.match(imgRegex);
  return match ? match[1] : null;
}
