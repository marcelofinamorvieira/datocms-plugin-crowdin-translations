import type { FieldPreferences, LocalizedField } from './types';
import fieldShouldBeRemoved from './fieldShouldBeRemoved';
import handleComplexFields from './handleComplexFields';

/**
 * Type representing form values with localized fields
 */
interface FormValues {
  internalLocales?: unknown;
  [fieldName: string]: unknown;
}

/**
 * Cleans up form values by removing fields that should not be processed 
 * and handling complex fields with special processing
 * 
 * This function processes each field in the form values object and:
 * 1. Removes fields that should not be included in translation (via fieldShouldBeRemoved)
 * 2. Keeps only the current locale's value for each field
 * 3. Handles complex fields like structured text, blocks, and assets
 * 
 * @param formValues - The form values to clean up
 * @param currentLocale - The current locale being processed
 * @param fieldPreferences - User preferences for handling different field types
 * @returns The cleaned up form values containing only fields that should be translated
 */
export default function cleanupFormValues(
  formValues: FormValues,
  currentLocale: string,
  fieldPreferences: FieldPreferences
): FormValues {
  // Create a new object without internalLocales
  const cleanedValues: FormValues = {};
  
  // Process each field in the form values
  for (const field in formValues) {
    // Skip internalLocales as it shouldn't be processed
    if (field === 'internalLocales') continue;
    
    // Skip fields that should be removed (passing field name as first argument)
    if (fieldShouldBeRemoved(field, formValues[field] as LocalizedField, currentLocale, fieldPreferences)) {
      continue;
    }
    
    // Only keep the current locale's value
    const fieldValue = formValues[field] as Record<string, unknown>;
    
    // Initialize field with only the current locale
    cleanedValues[field] = { [currentLocale]: fieldValue[currentLocale] };
    
    // Process complex fields if enabled in preferences
    if (fieldPreferences.structuredTextAndBlockField) {
      // Handle special fields (assets, blocks, structured texts) for proper Crowdin processing
      const processedField = handleComplexFields(fieldValue[currentLocale]);
      (cleanedValues[field] as Record<string, unknown>)[currentLocale] = processedField;
    }
  }
  
  return cleanedValues;
}
