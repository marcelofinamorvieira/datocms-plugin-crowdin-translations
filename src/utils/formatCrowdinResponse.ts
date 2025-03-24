import reconstructComplexFields from './reconstructComplexFields';
import replaceKeys from './replaceKeys';

/**
 * Formats the Crowdin API response
 */
export default function formatCrowdinResponse(
  translatedRecord: Record<string, unknown>,
  originalLocale: string,
  currentLocale: string
): Record<string, unknown> {
  const formatedResponse = replaceKeys(
    translatedRecord,
    originalLocale,
    currentLocale
  ) as Record<string, Record<string, unknown>>;

  // Process each field with complex data structures
  for (const field in formatedResponse) {
    if (Object.prototype.hasOwnProperty.call(formatedResponse, field) && 
        formatedResponse[field] && 
        typeof formatedResponse[field] === 'object' && 
        currentLocale in formatedResponse[field]) {
      formatedResponse[field][currentLocale] = reconstructComplexFields(
        formatedResponse[field][currentLocale]
      );
    }
  }

  return formatedResponse;
}
