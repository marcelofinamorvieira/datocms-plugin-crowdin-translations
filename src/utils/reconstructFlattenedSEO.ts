export default function reconstructFlattenedSEO(object: any) {
  const objectKey = Object.keys(object)[0];

  const twitterCard =
    objectKey.split('£twitterCard')[objectKey.split('£twitterCard').length - 1];

  const image = objectKey
    .split('£assetID')
    [objectKey.split('£assetID').length - 1].split('£twitterCard')[0];

  const newObject = {
    title: object[objectKey].title || null,
    description: object[objectKey].description || null,
    twitter_card: twitterCard === 'NULL' ? null : twitterCard,
    image: image === 'NULL' ? null : image,
  };

  return newObject;
}
