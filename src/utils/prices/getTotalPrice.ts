export const getTotalPrice = (
  orderPrice: number,
  shippingFee: number,
  discountAmount: number = 0
) => {
  return orderPrice + shippingFee - discountAmount;
};
