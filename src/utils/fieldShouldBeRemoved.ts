import { FieldPreferences } from './types';
import checkIfIsBlockArray from './fieldTypeCheckers/checkIfIsBlockArray';
import isAssetObject from './fieldTypeCheckers/isAssetObject';
import isColorField from './fieldTypeCheckers/isColorField';
import isExternalVideo from './fieldTypeCheckers/isExternalVideo';
import isJSONField from './fieldTypeCheckers/isJSONField';
import isLocationField from './fieldTypeCheckers/isLocationField';
import isSEOField from './fieldTypeCheckers/isSEOField';
import isStructuredText from './fieldTypeCheckers/isStructuredText';
import isValidDate from './fieldTypeCheckers/isValidDate';

export default function fieldShouldBeRemoved(
  fieldValue: any,
  currentLocale: string,
  fieldPreferences: FieldPreferences
) {
  return (
    typeof fieldValue !== 'object' || //Remove all non localized and empty fields
    fieldValue === null || //Remove all non localized and empty fields
    Array.isArray(fieldValue) || //Remove all non localized and empty fields
    isExternalVideo(fieldValue[currentLocale]) || //remove external video fields
    (!fieldPreferences.numberLinkField && !isNaN(fieldValue[currentLocale])) || //to remove single link fields
    (!fieldPreferences.dateField && isValidDate(fieldValue[currentLocale])) || //to remove date and datetime fields
    (!fieldPreferences.colorField && isColorField(fieldValue[currentLocale])) || //to remove color fields
    (!fieldPreferences.locationField &&
      isLocationField(fieldValue[currentLocale])) || //to remove location fields
    (!fieldPreferences.JSONField && isJSONField(fieldValue[currentLocale])) || //to remove JSON fields
    (Array.isArray(fieldValue[currentLocale]) && //to remove multiple link fields
      fieldValue[currentLocale].length &&
      !isNaN(fieldValue[currentLocale][0])) ||
    (!fieldPreferences.SEOField && isSEOField(fieldValue[currentLocale])) || // to remove SEO fields
    (!fieldPreferences.structuredTextAndBlockField && //to remove modular content fields
      checkIfIsBlockArray(fieldValue[currentLocale])) ||
    (!fieldPreferences.structuredTextAndBlockField && //to remove asset fields
      isAssetObject(fieldValue[currentLocale])) || //these three could be consdensed into one
    (!fieldPreferences.structuredTextAndBlockField && //but i will keep them apart for clarity for now
      isStructuredText(fieldValue[currentLocale])) //to remove structured text fields
  );
}
