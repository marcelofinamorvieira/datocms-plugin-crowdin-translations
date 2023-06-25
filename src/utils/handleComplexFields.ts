import checkIfIsBlockArray from './fieldTypeCheckers/checkIfIsBlockArray';
import isAssetObject from './fieldTypeCheckers/isAssetObject';
import isGaleryAssetField from './fieldTypeCheckers/isGaleryAssetField';
import isSEOField from './fieldTypeCheckers/isSEOField';
import isStructuredText from './fieldTypeCheckers/isStructuredText';
import flattenAssetObjects from './flattenAssetObjects';
import flattenBlockObject from './flattenBlockObject';
import flattenSEOField from './flattenSEOField';
import flattenStructuredText from './flattenStructuredText';

export default function handleComplexFields(value: any) {
  if (checkIfIsBlockArray(value)) {
    value = flattenBlockObject(value);
  } else if (isAssetObject(value)) {
    value = flattenAssetObjects(value);
  } else if (isGaleryAssetField(value)) {
    value = value.map((item: object) => flattenAssetObjects(item));
  } else if (isStructuredText(value)) {
    value = flattenStructuredText(value);
  } else if (isSEOField(value)) {
    value = flattenSEOField(value);
  }
  return value;
}
