import reconstructComplexFields from './reconstructComplexFields';

export default function reconstructFlattenedNode(node: any) {
  if (!node) return;

  const objectKey = Object.keys(node)[0];

  const level = objectKey
    .split('£level')
    [objectKey.split('£level').length - 1].split('£style')[0];

  const type = objectKey.split('££node£type')[1].split('£level')[0];

  const style = objectKey
    .split('£style')
    [objectKey.split('£style').length - 1].split('£tags')[0];

  const tags = objectKey
    .split('£tags')
    [objectKey.split('£tags').length - 1].split('£')
    .filter((tag) => !!tag);

  let blockObject;

  if (node[objectKey].children && node[objectKey].children.length) {
    for (const [index, child] of node[objectKey].children.entries()) {
      node[objectKey].children[index] = reconstructFlattenedNode(child);
    }
  }

  if (objectKey.includes('£typeblock£level')) {
    for (const attribute in node[objectKey][Object.keys(node[objectKey])[0]]) {
      node[objectKey][Object.keys(node[objectKey])[0]][attribute] =
        reconstructComplexFields(
          node[objectKey][Object.keys(node[objectKey])[0]][attribute]
        );
    }

    blockObject = {
      children: [{ text: '' }],
      blockModelId: Object.keys(node[objectKey])[0]
        .split('££block£blockTypeID')[1]
        .split('£blockID')[0],
      ...node[objectKey][Object.keys(node[objectKey])[0]],
    };
  }
  let newNode;

  if (blockObject) {
    newNode = {
      ...blockObject,
    };
  } else {
    newNode = {
      ...node[objectKey],
    };
  }

  if (tags.length && tags[0] !== '') {
    for (const tag of tags) {
      newNode[tag] = true;
    }
  }

  if (level !== 'NULL') newNode.level = parseInt(level);

  if (type !== 'NULL') newNode.type = type;

  if (style !== 'NULL') newNode.style = style;

  return newNode;
}
