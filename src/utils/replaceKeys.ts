export default function replaceKeys(
  obj: any,
  targetKey: string,
  replacementKey: string
): object {
  if (typeof obj !== 'object' || obj === null) {
    return obj;
  }

  if (Array.isArray(obj)) {
    return obj.map((item: any) => replaceKeys(item, targetKey, replacementKey));
  }

  const updatedObj: any = {};

  for (let key in obj) {
    if (key === targetKey) {
      updatedObj[replacementKey] = replaceKeys(
        obj[key],
        targetKey,
        replacementKey
      );
    } else {
      updatedObj[key] = replaceKeys(obj[key], targetKey, replacementKey);
    }
  }

  return updatedObj;
}
