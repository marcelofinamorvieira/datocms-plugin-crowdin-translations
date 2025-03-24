/**
 * Interface for external video field structure
 */
interface ExternalVideo {
  height: unknown;
  provider: unknown;
  provider_uid: unknown;
  thumbnail_url: unknown;
  title: unknown;
  url: unknown;
  width: unknown;
  [key: string]: unknown;
}

/**
 * Checks if the object is an external video field
 * @param obj The object to check
 * @returns True if the object is an external video field
 */
export default function isExternalVideo(obj: unknown): obj is ExternalVideo {
  if (!obj || typeof obj !== 'object' || obj === null) return false;
  
  const requiredKeys = [
    'height',
    'provider',
    'provider_uid',
    'thumbnail_url',
    'title',
    'url',
    'width',
  ];

  for (const key of requiredKeys) {
    if (!Object.prototype.hasOwnProperty.call(obj, key)) {
      return false;
    }
  }

  return true;
}
