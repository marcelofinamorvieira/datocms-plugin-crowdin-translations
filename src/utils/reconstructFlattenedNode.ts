import reconstructComplexFields from './reconstructComplexFields';

// Interface for node content
interface NodeContent {
  [key: string]: unknown;
}

// Interface for flattened node structure
interface FlattenedNode {
  [key: string]: NodeContent;
}

// Type for child node
interface ChildNode {
  [key: string]: unknown;
}

// Interface for node content properties
interface NodeContentProps {
  level?: number;
  type?: string;
  children?: Array<ChildNode | undefined>;
  content?: Array<unknown>;
  [key: string]: unknown;
}

// Interface for reconstructed node
interface ReconstructedNode extends NodeContentProps {
  // Extend with any specific node properties
  [key: string]: unknown;
}

export default function reconstructFlattenedNode(node: Record<string, unknown> | null | undefined): ReconstructedNode | undefined {
  if (!node) {
    return undefined;
  }

  const key = Object.keys(node)[0];
  const content = node[key] as NodeContent;
  const newNode: ReconstructedNode = {};

  const splitKey = key.split('£');
  const level = splitKey[splitKey.length - 1];
  const type = splitKey[splitKey.length - 2];

  // Iterate through content attributes
  for (const attribute in content) {
    if (Object.prototype.hasOwnProperty.call(content, attribute)) {
      const attrValue = content[attribute];
      
      if (attribute === 'content') {
        if (Array.isArray(attrValue) && attrValue.length > 0) {
          newNode.content = [];
          
          for (let i = 0; i < attrValue.length; i++) {
            const item = attrValue[i];
            if (item) {
              newNode.content.push(reconstructComplexFields(item));
            }
          }
        }
      } else if (attribute === 'children') {
        if (Array.isArray(attrValue) && attrValue.length > 0) {
          newNode.children = [];
          
          for (let i = 0; i < attrValue.length; i++) {
            const childNode = attrValue[i];
            if (childNode) {
              newNode.children.push(reconstructFlattenedNode(childNode as Record<string, unknown>));
            }
          }
        }
      } else {
        newNode[attribute] = attrValue;
      }
    }
  }

  if (level !== 'NULL') newNode.level = Number.parseInt(level, 10);
  
  if (type !== 'NULL') newNode.type = type;

  return newNode;
}
