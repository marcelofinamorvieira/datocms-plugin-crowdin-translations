/**
 * Checks if a string is valid JSON
 * @param str The string to validate as JSON
 * @returns True if the string is valid JSON, false otherwise
 */
export default function isJSONField(str: unknown): str is string {
  // First check if it's a string
  if (typeof str !== 'string') {
    return false;
  }
  
  try {
    JSON.parse(str);
    return true;
  } catch (error) {
    return false;
  }
}
