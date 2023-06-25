import flattenStructuredTextNode from './flattenStructuredTextNode';

export default function flattenStructuredText(structuredText: any) {
  return structuredText.map((node: any) => flattenStructuredTextNode(node));
}
