import isEmptyObject from './fieldTypeCheckers/isEmptyObject';

export default function flattenSEOField(obj: any) {
  for (const field in obj) {
    if (!obj[field] || isEmptyObject(obj[field])) delete obj[field];
  }

  const newObject = {
    [`££SEO£assetID${obj.image}£twitterCard${obj.twitter_card}`]: {
      ...obj,
    },
  };

  delete newObject[`££SEO£assetID${obj.image}£twitterCard${obj.twitter_card}`]
    .twitter_card;

  delete newObject[`££SEO£assetID${obj.image}£twitterCard${obj.twitter_card}`]
    .image;

  return newObject;
}
