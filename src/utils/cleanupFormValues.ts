import { FieldPreferences } from './types';
import fieldShouldBeRemoved from './fieldShouldBeRemoved';
import handleComplexFields from './handleComplexFields';

export default function cleanupFormValues(
  formValues: any,
  currentLocale: string,
  fieldPreferences: FieldPreferences
) {
  delete formValues.internalLocales;

  for (const field in formValues) {
    if (
      fieldShouldBeRemoved(formValues[field], currentLocale, fieldPreferences)
    ) {
      delete formValues[field];
      continue;
    }

    //remove all other locale values:
    formValues[field] = { [currentLocale]: formValues[field][currentLocale] };

    if (fieldPreferences.structuredTextAndBlockField) {
      //for assets, blocks, structured texts to send them in a format where crowdin doesn't change the fields schema
      formValues[field][currentLocale] = handleComplexFields(
        formValues[field][currentLocale]
      );
    }
  }

  return formValues;
}
