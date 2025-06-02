export function isValidImageUrl(url: string): boolean {
  if (typeof url !== 'string') return false;

  const imageExtensionPattern = /\.(png|jpg|jpeg|gif|webp|bmp|svg)(\?.*)?$/i;
  const urlPattern = /^https?:\/\/.+/;

  return imageExtensionPattern.test(url) && urlPattern.test(url);
}
