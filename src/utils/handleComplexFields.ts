import checkIfIsBlockArray from './fieldTypeCheckers/checkIfIsBlockArray';
import isAssetObject from './fieldTypeCheckers/isAssetObject';
import isGaleryAssetField from './fieldTypeCheckers/isGaleryAssetField';
import isSEOField from './fieldTypeCheckers/isSEOField';
import isStructuredText from './fieldTypeCheckers/isStructuredText';
import flattenAssetObjects from './flattenAssetObjects';
import flattenBlockObject from './flattenBlockObject';
import flattenSEOField from './flattenSEOField';
import flattenStructuredText from './flattenStructuredText';

/**
 * Type definitions for the various complex field types
 */

/**
 * Represents an asset object in DatoCMS
 * 
 * Assets represent uploaded files like images or documents that have
 * additional metadata beyond the file itself.
 */
interface AssetObject {
  upload_id: string;
  alt?: unknown;
  custom_data?: unknown;
  focal_point?: unknown;
  title?: unknown;
  [key: string]: unknown;
}

/**
 * Represents a single block item within a modular content field
 */
interface BlockItem {
  itemTypeId: string;
  itemId: string;
  [key: string]: unknown;
}

/**
 * Represents an SEO field structure in DatoCMS
 */
interface SEOField {
  image?: string;
  twitter_card?: string;
  [key: string]: unknown;
}

/**
 * An array of block items that make up modular content
 */
type BlockArray = BlockItem[];

/**
 * A gallery of asset objects
 */
type GalleryAssetField = AssetObject[];

/**
 * Handles various complex field types and converts them to flattened format
 * 
 * This is a key utility that determines the type of complex field (blocks, assets,
 * structured text, etc.) and applies the appropriate flattening function. It's used
 * during the translation process to ensure complex fields are properly formatted for
 * translation while preserving their structure.
 * 
 * @param value - The field value to process
 * @returns The processed value in flattened format
 */
export default function handleComplexFields(value: unknown): unknown {
  // Block array handling
  if (checkIfIsBlockArray(value)) {
    return flattenBlockObject(value as BlockArray);
  } 
  
  // Asset object handling
  if (typeof value === 'object' && value !== null && isAssetObject(value)) {
    return flattenAssetObjects(value as AssetObject);
  } 
  
  // Gallery asset field handling (array of assets)
  if (isGaleryAssetField(value)) {
    const galleryItems = value as GalleryAssetField;
    return galleryItems.map(item => flattenAssetObjects(item));
  } 
  
  // Structured text handling
  if (isStructuredText(value)) {
    return flattenStructuredText(value as Record<string, unknown>[]);
  } 
  
  // SEO field handling
  if (typeof value === 'object' && value !== null && isSEOField(value)) {
    return flattenSEOField(value as SEOField);
  }
  
  // Return unchanged if no special handling needed
  return value;
}
