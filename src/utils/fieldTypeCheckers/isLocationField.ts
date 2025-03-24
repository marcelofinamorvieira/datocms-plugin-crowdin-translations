/**
 * Interface for location field structure
 */
interface LocationField {
  latitude: number;
  longitude: number;
  [key: string]: unknown;
}

/**
 * Checks if the value is a valid location field
 * @param obj The object to check
 * @returns True if the object is a valid location field
 */
export default function isLocationField(obj: unknown): obj is LocationField {
  // Check if obj is an object and not null
  if (!obj || typeof obj !== 'object' || obj === null) {
    return false;
  }

  const expectedKeys = ['latitude', 'longitude'];
  
  // Check that all expected keys exist and are numbers
  return expectedKeys.every(key => {
    return (
      key in obj && 
      typeof (obj as Record<string, unknown>)[key] === 'number' && 
      !Number.isNaN((obj as Record<string, unknown>)[key])
    );
  });
}
