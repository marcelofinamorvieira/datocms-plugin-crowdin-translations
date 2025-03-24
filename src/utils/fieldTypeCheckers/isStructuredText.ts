/**
 * Interface for a node in a structured text document
 */
interface StructuredTextNode {
  type: string;
  value?: string;
  children?: StructuredTextNode[];
  [key: string]: unknown;
}

/**
 * Checks if a value is a valid structured text field
 * 
 * DatoCMS structured text is a complex field type that contains rich text content
 * with a specific node structure. This type guard ensures that a value conforms
 * to the expected structure of structured text before it's processed.
 *
 * The function checks for the presence of a 'document' property with child nodes
 * that have the expected structure, including proper type information and
 * optionally value or children properties.
 * 
 * @param value - The value to check
 * @returns true if the value is a structured text field, false otherwise
 */
export default function isStructuredText(value: unknown): boolean {
  // Must be an object and not null
  if (value === null || typeof value !== 'object') {
    return false;
  }
  
  // Check if it has a document property that's an object
  const doc = value as Record<string, unknown>;
  if (typeof doc.document !== 'object' || doc.document === null) {
    return false;
  }
  
  // Check if document has type and children properties
  const document = doc.document as Record<string, unknown>;
  
  // Document must have a type property that's a string
  if (typeof document.type !== 'string') {
    return false;
  }
  
  // Document must have a children property that's an array
  if (!Array.isArray(document.children)) {
    return false;
  }
  
  // Check at least the first child for proper structure
  const children = document.children as unknown[];
  if (children.length > 0) {
    const firstChild = children[0] as Record<string, unknown>;
    return typeof firstChild.type === 'string';
  }
  
  return true; // Empty children array is still valid
}
