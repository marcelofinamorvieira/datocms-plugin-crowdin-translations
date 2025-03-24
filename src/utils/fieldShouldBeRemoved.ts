import type { LocalizedField, FieldPreferences } from './types';
import checkIfIsBlockArray from './fieldTypeCheckers/checkIfIsBlockArray';
import isAssetObject from './fieldTypeCheckers/isAssetObject';
import isColorField from './fieldTypeCheckers/isColorField';
import isExternalVideo from './fieldTypeCheckers/isExternalVideo';
import isJSONField from './fieldTypeCheckers/isJSONField';
import isLocationField from './fieldTypeCheckers/isLocationField';
import isSEOField from './fieldTypeCheckers/isSEOField';
import isStructuredText from './fieldTypeCheckers/isStructuredText';
import isValidDate from './fieldTypeCheckers/isValidDate';

/**
 * Determines if a field should be removed from the translation process
 * 
 * This utility function evaluates whether a specific field should be excluded
 * from translation based on several criteria:
 * 
 * 1. If the field is explicitly marked as 'ignored' in the field preferences
 * 2. If the field has an empty value (null, undefined, empty string, or empty array)
 * 3. If the field is a system field (identified by starting with an underscore)
 * 4. If the field contains content that should not be translated based on field preferences
 * 
 * The function is critical for filtering out fields that should not be sent to
 * translation services, ensuring only relevant content is included in the workflow.
 * 
 * @param fieldKey - The key/name of the field being evaluated
 * @param fieldValue - The value of the field (which may be complex or simple)
 * @param currentLocale - The current locale being processed
 * @param fieldPreferences - Configuration defining which fields to include/exclude
 * @returns True if the field should be removed, false if it should be kept
 */
export default function fieldShouldBeRemoved(
  fieldKey: string,
  fieldValue: LocalizedField,
  currentLocale: string,
  fieldPreferences: FieldPreferences
): boolean {
  // Check if field is explicitly marked as ignored in preferences
  if (fieldPreferences[fieldKey] === 'ignored') {
    return true;
  }
  
  // Check for empty values that shouldn't be sent to translation
  if (
    fieldValue === null ||
    fieldValue === undefined ||
    fieldValue === '' ||
    (Array.isArray(fieldValue) && fieldValue.length === 0)
  ) {
    return true;
  }
  
  // Check if it's a system field (starts with underscore)
  if (fieldKey.startsWith('_')) {
    return true;
  }
  
  // Check for locale existence and then check specific field types
  if (
    typeof fieldValue === 'object' && 
    !Array.isArray(fieldValue) && 
    fieldValue !== null &&
    currentLocale in fieldValue && (
      (!fieldPreferences.locationField && 
        isLocationField(fieldValue[currentLocale as keyof typeof fieldValue])) || 
      (!fieldPreferences.JSONField && 
        isJSONField(fieldValue[currentLocale as keyof typeof fieldValue])) || 
      (!fieldPreferences.dateField && 
        isValidDate(fieldValue[currentLocale as keyof typeof fieldValue] as string)) || 
      (!fieldPreferences.colorField && 
        isColorField(fieldValue[currentLocale as keyof typeof fieldValue])) || 
      (!fieldPreferences.numberLinkField && 
        (typeof fieldValue[currentLocale as keyof typeof fieldValue] === 'number' && 
         !Number.isNaN(fieldValue[currentLocale as keyof typeof fieldValue]))) || 
      (!fieldPreferences.SEOField && 
        isSEOField(fieldValue[currentLocale as keyof typeof fieldValue])) || 
      (!fieldPreferences.structuredTextAndBlockField && 
        checkIfIsBlockArray(fieldValue[currentLocale as keyof typeof fieldValue])) || 
      (!fieldPreferences.structuredTextAndBlockField && 
        isAssetObject(fieldValue[currentLocale as keyof typeof fieldValue])) || 
      (!fieldPreferences.structuredTextAndBlockField && 
        isStructuredText(fieldValue[currentLocale as keyof typeof fieldValue])) || 
      isExternalVideo(fieldValue[currentLocale as keyof typeof fieldValue])
    )
  ) {
    return true;
  }
  
  // Field passes all checks, should not be removed
  return false;
}
