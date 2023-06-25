export default function isExternalVideo(obj: object) {
  if (!obj) return false;
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
    if (!obj.hasOwnProperty(key)) {
      return false;
    }
  }

  return true;
}
