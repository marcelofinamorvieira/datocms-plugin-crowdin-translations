export default function isJSONField(str: any) {
  try {
    JSON.parse(str);
    return true;
  } catch (error) {
    return false;
  }
}
