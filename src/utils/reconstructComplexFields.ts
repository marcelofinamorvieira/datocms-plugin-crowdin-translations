import reconstructFlattenedAsset from './reconstructFlattenedAsset';
import reconstructFlattenedBlock from './reconstructFlattenedBlock';
import reconstructFlattenedNode from './reconstructFlattenedNode';
import reconstructFlattenedSEO from './reconstructFlattenedSEO';

// Define a type for objects with string keys
interface GenericObject {
  [key: string]: unknown;
}

// Define a type for complex field values that could be various types
type ComplexFieldValue = unknown;

export default function reconstructComplexFields(value: ComplexFieldValue): ComplexFieldValue {
  if (!value || typeof value === 'string') {
    return value || '';
  }
  
  // Handle arrays
  if (Array.isArray(value) && value.length > 0) {
    const result = [...value];
    
    for (let index = 0; index < result.length; index++) {
      const item = result[index];
      
      if (item && typeof item === 'object' && !Array.isArray(item) && Object.keys(item).length > 0) {
        const firstKey = Object.keys(item)[0];
        
        if (firstKey.includes('££asset')) {
          result[index] = reconstructFlattenedAsset(item as Record<string, unknown>);
        } else if (firstKey.includes('££node')) {
          const nodeResult = reconstructFlattenedNode(item as Record<string, unknown>);
          if (nodeResult) {
            result[index] = nodeResult;
          }
        }
      }
    }
    
    return result;
  } 
  
  // Handle objects
  if (typeof value === 'object' && value !== null && !Array.isArray(value) && Object.keys(value).length > 0) {
    const firstKey = Object.keys(value)[0];
    
    if (firstKey.includes('££asset')) {
      return reconstructFlattenedAsset(value as Record<string, unknown>);
    }
    
    if (firstKey.includes('££SEO')) {
      return reconstructFlattenedSEO(value as Record<string, unknown>);
    }
    
    if (firstKey.includes('££block')) {
      const array: unknown[] = [];
      
      for (const blockKey in value) {
        if (Object.prototype.hasOwnProperty.call(value, blockKey)) {
          const blockValue = (value as Record<string, unknown>)[blockKey];
          array.push(reconstructFlattenedBlock(
            blockValue as Record<string, unknown>, 
            blockKey
          ));
        }
      }
      
      return array;
    }
  }

  return value;
}
