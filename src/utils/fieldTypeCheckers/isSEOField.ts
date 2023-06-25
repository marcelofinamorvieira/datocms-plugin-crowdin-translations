export default function isSEOField(value: object) {
  if (!value) return false;
  const expectedKeys = ['twitter_card', 'description', 'image', 'title'];

  for (const key of expectedKeys) {
    if (!value.hasOwnProperty(key)) {
      return false;
    }
  }

  return true;
}
