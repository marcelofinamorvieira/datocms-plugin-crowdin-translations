import reconstructFlattenedAsset from './reconstructFlattenedAsset';
import reconstructFlattenedBlock from './reconstructFlattenedBlock';
import reconstructFlattenedNode from './reconstructFlattenedNode';
import reconstructFlattenedSEO from './reconstructFlattenedSEO';

export default function reconstructComplexFields(value: any) {
  if (!value) {
    return '';
  }
  if (Array.isArray(value) && value.length) {
    for (const [index, item] of (value as any).entries()) {
      if (Object.keys(item)[0].includes('££asset')) {
        value[index] = reconstructFlattenedAsset(item);
      } else if (Object.keys(item)[0].includes('££node')) {
        value[index] = reconstructFlattenedNode(item);
      }
    }
  } else if (Object.keys(value)[0].includes('££asset')) {
    value = reconstructFlattenedAsset(value);
  } else if (Object.keys(value)[0].includes('££SEO')) {
    value = reconstructFlattenedSEO(value);
  } else if (Object.keys(value)[0].includes('££block')) {
    const array = [];
    for (const blockKey in value) {
      array.push(reconstructFlattenedBlock(value[blockKey], blockKey));
    }
    value = array;
  }

  return value;
}
