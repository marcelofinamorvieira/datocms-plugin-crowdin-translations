import isEmptyObject from './fieldTypeCheckers/isEmptyObject';

/**
 * Interface for asset objects
 */
interface AssetObject {
  upload_id: string;
  focal_point?: unknown;
  alt?: unknown;
  custom_data?: unknown;
  title?: unknown;
  [key: string]: unknown;
}

/**
 * Interface for flattened asset content
 */
interface FlattenedAssetContent {
  [key: string]: unknown;
}

/**
 * Type for the flattened asset object result
 */
interface FlattenedAssetObject {
  [key: string]: FlattenedAssetContent;
}

/**
 * Flattens an asset object into a simplified format with an encoded key
 * @param assetObj The asset object to flatten
 * @returns A flattened asset object
 */
export default function flattenAssetObjects(assetObj: AssetObject): FlattenedAssetObject {
  // Create a new object with only non-empty fields
  const filteredObj: Record<string, unknown> = {};
  for (const field in assetObj) {
    if (assetObj[field] && !isEmptyObject(assetObj[field])) {
      filteredObj[field] = assetObj[field];
    }
  }
  
  // Extract the upload_id for the key
  const uploadId = filteredObj.upload_id ?? '';
  
  // Create a new object without the special fields
  const contentObj: Record<string, unknown> = {};
  for (const field in filteredObj) {
    if (field !== 'upload_id' && field !== 'focal_point') {
      contentObj[field] = filteredObj[field];
    }
  }
  
  // Create and return the final object with the special key format
  return {
    [`\u00a3\u00a3asset\u00a3assetID${uploadId}`]: contentObj
  };
}
