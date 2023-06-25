export default function isGaleryAssetField(value: unknown) {
  return !!(
    Array.isArray(value) &&
    value.length &&
    typeof value[0] === 'object' &&
    value[0].upload_id
  );
}
