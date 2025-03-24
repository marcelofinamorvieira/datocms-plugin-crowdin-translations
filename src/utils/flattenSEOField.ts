import isEmptyObject from './fieldTypeCheckers/isEmptyObject';

/**
 * Interface representing the structure of an SEO field
 */
interface SEOField {
  image?: string;
  twitter_card?: string;
  [key: string]: unknown;
}

/**
 * Interface for flattened SEO field result
 */
interface FlattenedSEOField {
  [key: string]: Omit<SEOField, 'image' | 'twitter_card'>;
}

/**
 * Flattens an SEO field into a special format
 * @param seoField The SEO field object to flatten
 * @returns A flattened representation of the SEO field
 */
export default function flattenSEOField(seoField: SEOField): FlattenedSEOField {
  // Create a new object without empty fields
  const filteredObj: SEOField = {};
  for (const field in seoField) {
    if (seoField[field] && !isEmptyObject(seoField[field])) {
      filteredObj[field] = seoField[field];
    }
  }

  // Extract values we need for the key
  const imageValue = filteredObj.image ?? '';
  const twitterCardValue = filteredObj.twitter_card ?? '';
  
  // Create object for the result, omitting the properties used in the key
  const resultContent: Omit<SEOField, 'image' | 'twitter_card'> = {};
  for (const field in filteredObj) {
    if (field !== 'image' && field !== 'twitter_card') {
      resultContent[field] = filteredObj[field];
    }
  }

  // Create and return the final object with the special key format
  return {
    [`\u00a3\u00a3SEO\u00a3assetID${imageValue}\u00a3twitterCard${twitterCardValue}`]: resultContent,
  };
}
