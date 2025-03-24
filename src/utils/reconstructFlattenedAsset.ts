// Interface for the asset content structure
interface AssetContent {
  alt?: string | null;
  title?: string | null;
  focal_point?: unknown | null;
  custom_data?: Record<string, unknown>;
  [key: string]: unknown;
}

// Interface for the flattened asset structure with dynamic keys
interface FlattenedAsset {
  [key: string]: AssetContent;
}

// Interface for the reconstructed asset
interface ReconstructedAsset {
  alt: string | null;
  title: string | null;
  focal_point: unknown | null;
  custom_data: Record<string, unknown>;
  upload_id: string;
  [key: string]: unknown;
}

export default function reconstructFlattenedAsset(object: Record<string, unknown>): ReconstructedAsset {
  const objectKey = Object.keys(object)[0];
  const assetContent = object[objectKey] as AssetContent;

  const newObject: ReconstructedAsset = {
    alt: assetContent?.alt || null,
    title: assetContent?.title || null,
    focal_point: assetContent?.focal_point || null,
    custom_data: assetContent?.custom_data || {},
    upload_id:
      objectKey.split('£assetID')[objectKey.split('£assetID').length - 1],
  };

  return newObject;
}
