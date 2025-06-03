export const handleImageError = (
  event: React.SyntheticEvent<HTMLImageElement, Event>
) => {
  const DEFAULT_PRODUCT_IMAGE = "./default-product.png";
  event.currentTarget.src = DEFAULT_PRODUCT_IMAGE;
};
