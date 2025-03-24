/**
 * Checks if an object is empty (has no own enumerable properties)
 * 
 * This utility helps identify objects that are technically objects but have
 * no meaningful content. It's used throughout the application to filter out
 * empty objects that don't need to be processed for translation.
 * 
 * @param obj - The object to check
 * @returns true if the object is empty, false otherwise
 */
export default function isEmptyObject(obj: unknown): boolean {
  // If value is null or not an object, it's not an empty object
  if (obj === null || typeof obj !== 'object' || Array.isArray(obj)) {
    return false;
  }
  
  // Check if the object has any own enumerable properties
  for (const prop in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, prop)) {
      return false; // Found a property, so not empty
    }
  }
  
  return true; // No properties found, so it's empty
}
