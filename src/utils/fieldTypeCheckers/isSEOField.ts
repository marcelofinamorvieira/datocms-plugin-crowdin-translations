/**
 * Interface representing an SEO field in DatoCMS
 */
interface SEOField {
  title?: string;
  description?: string;
  image?: unknown;
  twitter_card?: string;
  [key: string]: unknown;
}

/**
 * Type guard that checks if a value is a DatoCMS SEO field
 * 
 * SEO fields in DatoCMS contain metadata used for search engine optimization,
 * such as title, description, and social media image settings. This function
 * verifies that a value matches the expected structure of an SEO field.
 * 
 * @param value - The value to check
 * @returns A type predicate indicating if the value is an SEO field
 */
export default function isSEOField(value: unknown): value is SEOField {
  // Must be an object and not null
  if (value === null || typeof value !== 'object') {
    return false;
  }
  
  // Type assertion to access properties (after basic validation)
  const seoObj = value as Record<string, unknown>;
  
  // Check for either a title or description or twitter_card property
  // This helps identify SEO fields - they should have at least one of these
  return (
    (typeof seoObj.title === 'string' && seoObj.title !== '') ||
    (typeof seoObj.description === 'string' && seoObj.description !== '') ||
    typeof seoObj.twitter_card === 'string'
  );
}
