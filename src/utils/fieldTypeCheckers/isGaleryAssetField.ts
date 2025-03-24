/**
 * Interface for asset object structure
 */
interface AssetObject {
  alt: unknown;
  custom_data: unknown;
  focal_point: unknown;
  title: unknown;
  upload_id: unknown;
  [key: string]: unknown;
}

/**
 * Type for a gallery asset field (array of asset objects)
 */
type GalleryAssetField = AssetObject[];

/**
 * Checks if a value is a gallery asset field (array of asset objects)
 * @param value The value to check
 * @returns True if the value is a gallery asset field
 */
export default function isGaleryAssetField(value: unknown): value is GalleryAssetField {
  return !!(   
    Array.isArray(value) &&
    value.length &&
    typeof value[0] === 'object' &&
    value[0] !== null &&
    'upload_id' in value[0]
  );
}
