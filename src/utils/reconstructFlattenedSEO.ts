// Interface for SEO content
interface SEOContent {
  title?: string;
  description?: string;
  [key: string]: unknown;
}

// Interface for flattened SEO structure
interface FlattenedSEO {
  [key: string]: SEOContent;
}

// Interface for reconstructed SEO object
interface ReconstructedSEO {
  title: string | null;
  description: string | null;
  twitter_card: string | null;
  image: string | null;
  [key: string]: unknown; // Add index signature for compatibility
}

export default function reconstructFlattenedSEO(object: Record<string, unknown>): ReconstructedSEO {
  const objectKey = Object.keys(object)[0];
  const seoContent = object[objectKey] as SEOContent;

  const twitterCard =
    objectKey.split('£twitterCard')[objectKey.split('£twitterCard').length - 1];

  const image = objectKey
    .split('£assetID')
    [objectKey.split('£assetID').length - 1].split('£twitterCard')[0];

  const newObject: ReconstructedSEO = {
    title: seoContent?.title || null,
    description: seoContent?.description || null,
    twitter_card: twitterCard === 'NULL' ? null : twitterCard,
    image: image === 'NULL' ? null : image,
  };

  return newObject;
}
