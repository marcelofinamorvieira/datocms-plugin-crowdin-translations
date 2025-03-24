/**
 * Interface representing a block item in a DatoCMS block field
 * 
 * A block item is an object that contains information about a specific block,
 * including its type ID, item ID, and other properties.
 */
interface BlockItem {
  /**
   * The type ID of the block item
   */
  itemTypeId: string;
  /**
   * The item ID of the block item
   */
  itemId: string;
  /**
   * Additional properties of the block item
   */
  [key: string]: unknown;
}

/**
 * Type definition for an array of block items
 * 
 * A block array is a collection of block items, each representing a single block.
 */
type BlockArray = BlockItem[];

/**
 * Interface for the properties of a flattened block
 * 
 * The properties of a flattened block are the key-value pairs that are extracted
 * from a block item and stored under a special encoded key.
 */
interface FlattenedBlockProperties {
  /**
   * The properties of the flattened block, where each key is a property name and
   * each value is the corresponding property value.
   */
  [key: string]: unknown;
}

/**
 * Interface for the result of flattening a block object
 * 
 * The result of flattening a block object is an object where each key is a special
 * encoded key that represents a block, and each value is an object containing the
 * properties of that block.
 */
interface FlattenedBlockObject {
  /**
   * The flattened block object, where each key is an encoded block key and each
   * value is an object containing the properties of the corresponding block.
   */
  [key: string]: FlattenedBlockProperties;
}

/**
 * Flattens a block array into a simplified format with encoded keys
 * 
 * Block fields in DatoCMS represent modular content made up of content blocks,
 * each with their own structure. This function transforms that complex structure
 * into a flattened format where each block is identified by a special key format.
 * 
 * The flattened format has keys in the form: "\u00a3\u00a3block\u00a3blockTypeId\u00a3itemId"
 * This allows the blocks to be uniquely identified and later reconstructed
 * after translation.
 * 
 * @param blockArray - The array of block items to flatten
 * @returns A flattened object with encoded keys representing each block
 */
export default function flattenBlockObject(blockArray: BlockArray): FlattenedBlockObject {
  // Initialize the result object
  const result: FlattenedBlockObject = {};
  
  // Process each block in the array
  for (const block of blockArray) {
    // Create a special key that encodes the block type and ID
    const blockKey = `\u00a3\u00a3block\u00a3${block.itemTypeId}\u00a3${block.itemId}`;
    
    // Create a new object with the block properties (except the ones used in the key)
    const blockProperties: FlattenedBlockProperties = {};
    
    // Copy all properties except itemTypeId and itemId
    for (const [key, value] of Object.entries(block)) {
      if (key !== 'itemTypeId' && key !== 'itemId') {
        blockProperties[key] = value;
      }
    }
    
    // Add the properties under the encoded key
    result[blockKey] = blockProperties;
  }
  
  return result;
}
