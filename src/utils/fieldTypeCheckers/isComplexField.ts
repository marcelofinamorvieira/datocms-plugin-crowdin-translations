import checkIfIsBlockArray from './checkIfIsBlockArray';
import isAssetObject from './isAssetObject';
import isGaleryAssetField from './isGaleryAssetField';
import isStructuredText from './isStructuredText';

/**
 * Checks if a value is a complex field that needs special handling
 * Complex fields can be block arrays, structured text, asset objects, or gallery asset fields
 * @param value The value to check
 * @returns True if the value is a complex field
 */
export default function isComplexField(value: unknown): boolean {
  // Check structured text and gallery first as they already accept unknown
  if (isStructuredText(value) || isGaleryAssetField(value)) {
    return true;
  }
  
  // checkIfIsBlockArray accepts unknown
  if (checkIfIsBlockArray(value)) {
    return true;
  }
  
  // Only check isAssetObject if value is an object (it requires object type)
  if (typeof value === 'object' && value !== null) {
    if (isAssetObject(value)) {
      return true;
    }
  }
  
  return false;
}
