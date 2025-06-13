const DEFAULT_IMAGE_URL = "./planet-default-image.svg";

const isValidUrl = (url: string): boolean =>
  Boolean(url && (url.startsWith("http://") || url.startsWith("https://")));

export const getImageUrl = (url: string): string =>
  isValidUrl(url) ? url : DEFAULT_IMAGE_URL;
