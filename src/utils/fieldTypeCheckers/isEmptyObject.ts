export default function isEmptyObject(value: any) {
  if (typeof value !== 'object' || Array.isArray(value)) {
    return false;
  }

  for (const key in value) {
    if (value.hasOwnProperty(key)) {
      return false;
    }
  }

  return true;
}
