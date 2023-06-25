export default function isLocationField(obj: any) {
  const expectedKeys = ['latitude', 'longitude'];

  for (const key in obj) {
    if (!expectedKeys.includes(key) || isNaN(obj[key])) {
      return false;
    }
  }

  return expectedKeys.every((key) => key in obj);
}
