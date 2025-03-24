import reconstructComplexFields from './reconstructComplexFields';

// Interface for block attributes
interface BlockAttributes {
  [key: string]: unknown;
}

// Interface for reconstructed block
interface ReconstructedBlock extends BlockAttributes {
  itemId: null;
  itemTypeId: string;
  [key: string]: unknown; 
}

export default function reconstructFlattenedBlock(
  object: Record<string, unknown>,
  objectKey: string
): ReconstructedBlock {
  const result: BlockAttributes = {};
  
  for (const attribute in object) {
    if (Object.prototype.hasOwnProperty.call(object, attribute)) {
      result[attribute] = reconstructComplexFields(object[attribute]);
    }
  }

  return {
    itemId: null,
    itemTypeId: objectKey
      .split('£blockTypeID')
      [objectKey.split('£blockTypeID').length - 1].split('£blockID')[0],
    ...result,
  };
}
