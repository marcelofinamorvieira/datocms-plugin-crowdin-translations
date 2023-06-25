export default function mergeDeep(target: any, source: any) {
  if (typeof target !== 'object' || target === null) {
    target = {};
  }
  for (let key in source) {
    if (
      source[key] !== null &&
      typeof source[key] === 'object' &&
      !Array.isArray(source[key])
    ) {
      // If the current property is an object, but not an array, we need to
      // recurse into it.
      target[key] = mergeDeep(target[key], source[key]);
    } else {
      // In all other cases, we simply want to copy the source property
      // to the target.
      target[key] = source[key];
    }
  }
  return target;
}
