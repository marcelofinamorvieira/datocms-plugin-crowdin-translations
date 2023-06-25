import isEmptyObject from './fieldTypeCheckers/isEmptyObject';

export default function flattenAssetObjects(obj: any) {
  for (const field in obj) {
    if (!obj[field] || isEmptyObject(obj[field])) delete obj[field];
  }
  const newObject = {
    [`££asset£assetID${obj.upload_id}`]: { ...obj },
  };
  delete newObject[`££asset£assetID${obj.upload_id}`].upload_id;
  delete newObject[`££asset£assetID${obj.upload_id}`].focal_point;
  return newObject;
}
