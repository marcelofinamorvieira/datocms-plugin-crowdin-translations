/**
 * Interface representing a color field in DatoCMS
 * 
 * A color field in DatoCMS contains both hexadecimal and RGB color values
 */
interface ColorField {
  hex: string;
  rgb: {
    r: number;
    g: number;
    b: number;
    a?: number;
  };
}

/**
 * Checks if a value is a DatoCMS color field
 * 
 * Color fields in DatoCMS have a specific structure with hex and RGB values.
 * This type guard ensures that a value conforms to the expected structure
 * before it's processed for translation or other operations.
 *
 * @param value - The value to check
 * @returns true if the value is a color field, false otherwise
 */
export default function isColorField(value: unknown): value is ColorField {
  // Must be an object and not null
  if (value === null || typeof value !== 'object') {
    return false;
  }
  
  // Type assertion to access properties (after basic validation)
  const colorField = value as Partial<ColorField>;
  
  // Verify the hex property exists and is a string
  if (typeof colorField.hex !== 'string') {
    return false;
  }
  
  // Verify RGB object exists and has the required properties
  if (typeof colorField.rgb !== 'object' || colorField.rgb === null) {
    return false;
  }
  
  // Verify the RGB values are numbers
  const rgb = colorField.rgb as Partial<ColorField['rgb']>;
  return (
    typeof rgb.r === 'number' &&
    typeof rgb.g === 'number' &&
    typeof rgb.b === 'number'
  );
}
