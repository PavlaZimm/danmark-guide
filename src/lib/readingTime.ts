/**
 * Calculate reading time for an article
 * @param text - The text content (can include HTML)
 * @param wordsPerMinute - Average reading speed (default: 200 words per minute for Czech)
 * @returns Reading time in minutes
 */
export function calculateReadingTime(text: string, wordsPerMinute: number = 200): number {
  // Remove HTML tags
  const cleanText = text.replace(/<[^>]*>/g, '');

  // Count words (split by whitespace)
  const wordCount = cleanText.split(/\s+/).filter(word => word.length > 0).length;

  // Calculate reading time
  const minutes = Math.ceil(wordCount / wordsPerMinute);

  return minutes;
}

/**
 * Format reading time for display
 * @param minutes - Reading time in minutes
 * @returns Formatted string (e.g., "5 min čtení")
 */
export function formatReadingTime(minutes: number): string {
  if (minutes === 1) {
    return "1 min čtení";
  }

  return `${minutes} min čtení`;
}
