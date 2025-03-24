import flattenStructuredTextNode from './flattenStructuredTextNode';
import type { FlattenedNode } from './flattenStructuredTextNode';

/**
 * Flattens a structured text array into a simpler format suitable for translation
 * 
 * Structured text in DatoCMS is a complex data structure with nested nodes. This function
 * transforms that structure into a flattened format where text content can be more easily
 * extracted and later reintegrated after translation.
 * 
 * The function processes each node in the structured text array by calling flattenStructuredTextNode
 * on each item, which handles the detailed flattening of individual nodes.
 * 
 * @param structuredText - The structured text array to flatten
 * @returns An array of flattened nodes with their text content extracted
 */
export default function flattenStructuredText(structuredText: Record<string, unknown>[]): FlattenedNode[] {
  return structuredText.map((node: Record<string, unknown>) => flattenStructuredTextNode(node));
}
