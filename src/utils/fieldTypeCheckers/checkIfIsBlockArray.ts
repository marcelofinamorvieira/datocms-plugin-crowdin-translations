/**
 * Interface representing a block item in a DatoCMS block field
 */
interface BlockItem {
  itemTypeId: string;
  itemId: string;
  [key: string]: unknown;
}

/**
 * Type guard that checks if a value is a DatoCMS block array
 * 
 * Block arrays in DatoCMS represent modular content made up of content blocks.
 * Each block has a specific type and ID that identifies it in the system.
 * 
 * This function verifies that a value is:
 * 1. An array
 * 2. Contains objects that have required block properties (itemTypeId and itemId)
 * 
 * @param value - The value to check
 * @returns A type predicate indicating if the value is a block array
 */
export default function checkIfIsBlockArray(value: unknown): value is BlockItem[] {
  // Check if it's an array
  if (!Array.isArray(value)) {
    return false;
  }

  // Empty arrays are valid block arrays
  if (value.length === 0) {
    return true;
  }

  // Check the first item for the required block properties
  const firstItem = value[0];
  
  // Must be an object
  if (typeof firstItem !== 'object' || firstItem === null) {
    return false;
  }
  
  // Check for required properties
  return (
    'itemTypeId' in firstItem && 
    typeof (firstItem as BlockItem).itemTypeId === 'string' &&
    'itemId' in firstItem && 
    typeof (firstItem as BlockItem).itemId === 'string'
  );
}
