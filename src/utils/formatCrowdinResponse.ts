import reconstructComplexFields from './reconstructComplexFields';
import replaceKeys from './replaceKeys';

export default function formatCrowdinResponse(
  translatedRecord: any,
  originalLocale: string,
  currentLocale: string
) {
  const formatedResponse: any = replaceKeys(
    translatedRecord,
    originalLocale,
    currentLocale
  );

  for (const field in formatedResponse) {
    formatedResponse[field][currentLocale] = reconstructComplexFields(
      formatedResponse[field][currentLocale]
    );
  }

  return formatedResponse;
}
