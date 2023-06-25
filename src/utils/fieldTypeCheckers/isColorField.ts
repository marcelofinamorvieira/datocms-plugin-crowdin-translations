export default function isColorField(obj: any) {
  const expectedKeys = ['alpha', 'blue', 'green', 'red'];

  for (const key in obj) {
    if (!expectedKeys.includes(key) || isNaN(obj[key])) {
      return false;
    }
  }

  return expectedKeys.every((key) => key in obj);
}
