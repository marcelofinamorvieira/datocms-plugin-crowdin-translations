/**
 * Interface representing an asset object in DatoCMS
 */
interface AssetObject {
  upload_id: string;
  alt?: unknown;
  custom_data?: unknown;
  focal_point?: unknown;
  title?: unknown;
  [key: string]: unknown;
}

/**
 * Type guard that checks if a value is a DatoCMS asset object
 * 
 * Asset objects in DatoCMS represent uploaded files (images, documents, etc.)
 * and have specific properties like upload_id. This function ensures a value
 * conforms to the expected structure before processing it for translation
 * or other operations.
 *
 * @param value - The value to check
 * @returns true if the value is an asset object, false otherwise
 */
export default function isAssetObject(value: unknown): value is AssetObject {
  // Must be an object and not null
  if (value === null || typeof value !== 'object') {
    return false;
  }
  
  // Type assertion to access properties (after basic validation)
  const assetObj = value as Partial<AssetObject>;
  
  // An asset object must have an upload_id property that's a string
  return typeof assetObj.upload_id === 'string';
}
