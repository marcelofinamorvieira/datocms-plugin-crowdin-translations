export default function reconstructFlattenedAsset(object: any) {
  const objectKey = Object.keys(object)[0];

  const newObject = {
    alt: object[objectKey].alt || null,
    title: object[objectKey].title || null,
    focal_point: object[objectKey].focal_point || null,
    custom_data: object[objectKey].custom_data || {},
    upload_id:
      objectKey.split('£assetID')[objectKey.split('£assetID').length - 1],
  };

  return newObject;
}
