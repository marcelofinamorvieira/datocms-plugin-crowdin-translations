import flattenBlockObject from './flattenBlockObject';

export default function flattenStructuredTextNode(node: any) {
  const nodeType = node.type || 'NULL';
  const nodeLevel = node.level || 'NULL';
  const nodeStyle = node.style || 'NULL';
  let tags = '';

  delete node.type;
  delete node.level;
  delete node.style;

  if (nodeType === 'block') {
    node.itemTypeId = node.blockModelId;
    node.itemId = node.id;
    delete node.id;
    delete node.blockModelId;
    delete node.children;
    node = flattenBlockObject([node]);
  }

  for (const attribute in node) {
    if (typeof node[attribute] === 'boolean') {
      tags += attribute + '£';
      delete node[attribute];
    }
  }

  if (node.children)
    node.children = node.children.map((node: any) =>
      flattenStructuredTextNode(node)
    );

  const newNode = {
    [`££node£type${nodeType}£level${nodeLevel}£style${nodeStyle}£tags${tags}`]:
      {
        ...node,
      },
  };

  return newNode;
}
