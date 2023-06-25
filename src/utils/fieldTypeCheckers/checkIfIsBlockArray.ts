export default function checkIfIsBlockArray(value: unknown) {
  return !!(
    Array.isArray(value) &&
    value.length &&
    typeof value[0] === 'object' &&
    value[0].itemTypeId
  );
}
