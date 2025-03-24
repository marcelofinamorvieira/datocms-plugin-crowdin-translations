/**
 * Recursively merges properties from source into target
 */
export default function mergeDeep<T extends Record<string, unknown>>(target: Partial<T>, source: Partial<T>): T {
  // Create a new object to avoid mutating the original objects
  const result: Record<string, unknown> = { ...target };
  
  if (typeof target !== 'object' || target === null) {
    return source as T;
  }
  
  for (const key in source) {
    if (Object.prototype.hasOwnProperty.call(source, key)) {
      const sourceValue = source[key];
      
      if (
        sourceValue !== null &&
        typeof sourceValue === 'object' &&
        !Array.isArray(sourceValue)
      ) {
        // If the current property is an object, but not an array, we need to
        // recurse into it.
        result[key] = mergeDeep(
          result[key] as Record<string, unknown> || {},
          sourceValue as Record<string, unknown>
        );
      } else {
        // In all other cases, we simply want to copy the source property
        // to the target.
        result[key] = sourceValue;
      }
    }
  }
  
  return result as T;
}
