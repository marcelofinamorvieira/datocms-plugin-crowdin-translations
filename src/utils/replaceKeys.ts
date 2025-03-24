export default function replaceKeys(
  obj: unknown,
  targetKey: string,
  replacementKey: string
): unknown {
  if (typeof obj !== 'object' || obj === null) {
    return obj;
  }

  if (Array.isArray(obj)) {
    return obj.map((item) => replaceKeys(item, targetKey, replacementKey));
  }

  const updatedObj: Record<string, unknown> = {};

  for (const key in obj as object) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      if (key === targetKey) {
        updatedObj[replacementKey] = replaceKeys(
          (obj as Record<string, unknown>)[key],
          targetKey,
          replacementKey
        );
      } else {
        updatedObj[key] = replaceKeys(
          (obj as Record<string, unknown>)[key],
          targetKey,
          replacementKey
        );
      }
    }
  }

  return updatedObj;
}
