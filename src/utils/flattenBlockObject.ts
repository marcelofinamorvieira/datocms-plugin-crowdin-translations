//handling blocks and nested blocks:
//"flattens" block object into a field with a key that encodes their IDs and structure
//this way the editors in crodin can edit the field values of a block
//but not their IDs and type IDs
//the structure of the flattened key is as specified in the flattenBlockObject function
//and can be used to re-construct the block object once returned from crowdin
//the flattenBlockObject function flattens also nested blocks through recursion

import isComplexField from './fieldTypeCheckers/isComplexField';
import handleComplexFields from './handleComplexFields';

export default function flattenBlockObject(localeObject: Array<any>) {
  const blockObject: any = {};
  for (const block of localeObject) {
    blockObject[
      `££block£blockTypeID${block.itemTypeId}£blockID${block.itemId}`
    ] = {};
    for (const nestedField in block) {
      if (isComplexField(block[nestedField])) {
        blockObject[
          `££block£blockTypeID${block.itemTypeId}£blockID${block.itemId}`
        ][nestedField] = handleComplexFields(block[nestedField]); //For nested blocks, structured texts, assets
      } else if (block[nestedField] && block[nestedField].length) {
        blockObject[
          `££block£blockTypeID${block.itemTypeId}£blockID${block.itemId}`
        ][nestedField] = block[nestedField];
      }
    }
    delete blockObject[
      `££block£blockTypeID${block.itemTypeId}£blockID${block.itemId}`
    ].itemId;
    delete blockObject[
      `££block£blockTypeID${block.itemTypeId}£blockID${block.itemId}`
    ].itemTypeId;
  }

  return { ...blockObject };
}

//TODO: this doesnt handle structured text inside blocks, or assets inside blocks
