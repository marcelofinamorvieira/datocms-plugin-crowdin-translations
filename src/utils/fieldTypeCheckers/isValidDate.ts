export default function isValidDate(str: string) {
  try {
    const date: any = new Date(str);
    return !isNaN(date);
  } catch (error) {
    return false;
  }
}
