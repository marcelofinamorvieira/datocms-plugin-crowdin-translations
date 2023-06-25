export default function isStructuredText(value: any) {
  return !!(
    Array.isArray(value) &&
    value.length &&
    typeof value[0] === 'object' &&
    value[0].children &&
    value[0].type
  );
}
