import productThumbnail from 'assets/product-thumbnail.png';

export const renderDefaultThumbnail: React.ReactEventHandler<HTMLImageElement> = (e) => {
  e.currentTarget.src = productThumbnail;
};
