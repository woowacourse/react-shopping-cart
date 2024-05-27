export const isDeliveryFree = (deliveryPriceState: number) => {
  if (deliveryPriceState === 0) return false;
  return true;
};
