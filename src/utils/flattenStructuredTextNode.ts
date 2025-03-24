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
 * Interface for block content within structured text
 */
interface BlockNode {
  type: 'block';
  item: BlockItem;
  [key: string]: unknown;
}

/**
 * Interface for a block item
 */
interface BlockItem {
  itemTypeId: string;
  itemId: string;
  [key: string]: unknown;
}

/**
 * Interface for the flattened version of a structured text node
 */
export interface FlattenedNode {
  type: string;
  children?: FlattenedNode[];
  value?: string;
  item?: unknown;
  marks?: unknown[];
  [key: string]: unknown;
}

/**
 * Flattens a structured text node into a simpler format suitable for translation
 * 
 * This function is a key part of the translation process for structured text fields.
 * It recursively processes each node in the structured text, transforming the complex
 * nested structure into a flattened format where:
 * 
 * 1. Text content is extracted and made available for translation
 * 2. Block content is handled appropriately based on its type
 * 3. Nested children are recursively processed
 * 
 * The function handles different node types including paragraphs, headings, lists,
 * and specialized block content (like embedded assets or other structured blocks).
 * 
 * @param node - The structured text node to flatten
 * @returns A flattened version of the node with text extracted for translation
 */
export default function flattenStructuredTextNode(node: Record<string, unknown>): FlattenedNode {
  // Create a base flattened node with the node's type
  const flattenedNode: FlattenedNode = {
    type: node.type as string,
  };

  // Handle specific node types
  if (node.type === 'block') {
    // Special handling for block nodes (embedded content)
    const blockNode = node as unknown as BlockNode;
    if (blockNode.item) {
      flattenedNode.item = {
        itemTypeId: blockNode.item.itemTypeId,
        itemId: blockNode.item.itemId,
      };
    }
  } else {
    // Copy relevant properties for non-block nodes
    if (node.value !== undefined) {
      flattenedNode.value = node.value as string;
    }

    if (node.marks !== undefined) {
      flattenedNode.marks = node.marks as unknown[];
    }

    // Process children recursively if they exist
    if (Array.isArray(node.children) && node.children.length > 0) {
      flattenedNode.children = (node.children as Record<string, unknown>[]).map(child =>
        flattenStructuredTextNode(child)
      );
    }
  }

  return flattenedNode;
}
