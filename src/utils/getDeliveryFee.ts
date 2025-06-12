const MOUNTAINOUS_AREA_DELIVERY_FEE = 6000;
const DEFAULT_DELIVERY_FEE = 3000;
const FREE_SHIPPING_THRESHOLD = 100_000;

export const getDeliveryFee = (isChecked: boolean, totalPrice: number) => {
  if (FREE_SHIPPING_THRESHOLD > totalPrice) {
    return isChecked ? MOUNTAINOUS_AREA_DELIVERY_FEE : DEFAULT_DELIVERY_FEE;
  } else {
    return isChecked ? DEFAULT_DELIVERY_FEE : 0;
  }
};
