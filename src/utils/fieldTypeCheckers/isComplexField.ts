import checkIfIsBlockArray from './checkIfIsBlockArray';
import isAssetObject from './isAssetObject';
import isGaleryAssetField from './isGaleryAssetField';
import isStructuredText from './isStructuredText';

export default function isComplexField(value: any) {
  return (
    checkIfIsBlockArray(value) ||
    isStructuredText(value) ||
    isAssetObject(value) ||
    isGaleryAssetField(value)
  );
}
