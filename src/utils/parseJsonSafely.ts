export default function parseJsonSafely(text: string) {
  try {
    return JSON.parse(text);
  } catch (err) {
    return undefined;
  }
}
