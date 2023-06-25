import reconstructComplexFields from './reconstructComplexFields';

export default function reconstructFlattenedBlock(
  object: any,
  objectKey: string
) {
  for (const attribute in object) {
    object[attribute] = reconstructComplexFields(object[attribute]);
  }

  return {
    itemId: null,
    itemTypeId: objectKey
      .split('£blockTypeID')
      [objectKey.split('£blockTypeID').length - 1].split('£blockID')[0],
    ...object,
  };
}
