/**
 * Checks if a string can be parsed into a valid Date
 * @param str The string to check
 * @returns True if the string can be parsed into a valid Date
 */
export default function isValidDate(str: string): boolean {
  try {
    const date: Date = new Date(str);
    return !Number.isNaN(date.getTime()); // More reliable than using isNaN(date)
  } catch (error) {
    return false;
  }
}
