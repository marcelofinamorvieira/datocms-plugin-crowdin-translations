/**
 * Represents the translation progress for different languages in a Crowdin project
 * 
 * @property {Object} key - The language ID as the key
 * @property {Object} value - Object containing progress metrics
 * @property {number} value.approved - Count of approved translations
 * @property {number} value.total - Total count of translatable strings
 * @property {number} value.translated - Count of translated (but not necessarily approved) strings
 */
export type ProgressObject = {
  [key: string]: {
    approved: number;
    total: number;
    translated: number;
  };
};

/**
 * Configuration for field preferences that determine which field types
 * should be included in the translation process
 * 
 * @property {boolean} locationField - Whether to include location fields
 * @property {boolean} JSONField - Whether to include JSON fields
 * @property {boolean} dateField - Whether to include date fields
 * @property {boolean} colorField - Whether to include color fields
 * @property {boolean} numberLinkField - Whether to include number/link fields
 * @property {boolean} SEOField - Whether to include SEO fields
 * @property {boolean} structuredTextAndBlockField - Whether to include structured text and block fields
 * @property {string} [fieldKey] - Optional specific field preferences where keys are field names
 */
export type FieldPreferences = {
  locationField: boolean;
  JSONField: boolean;
  dateField: boolean;
  colorField: boolean;
  numberLinkField: boolean;
  SEOField: boolean;
  structuredTextAndBlockField: boolean;
  [fieldKey: string]: boolean | string | undefined;
};

/**
 * Represents a field that could be localized in DatoCMS
 * 
 * This type covers all possible values a localized field might have,
 * including simple types like strings and complex structures like
 * objects with locale keys.
 */
export type LocalizedField =
  | string
  | number
  | boolean
  | { [locale: string]: unknown }
  | null
  | unknown[];
