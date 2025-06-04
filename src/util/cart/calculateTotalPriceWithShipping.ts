export function calculateTotalPriceWithShipping({
  totalPrice,
  shippingFee,
}: {
  totalPrice: number;
  shippingFee: number;
}) {
  return totalPrice + shippingFee;
}
