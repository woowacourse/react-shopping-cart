export const FREE_SHIPPING_THRESHOLD = 100_000;
export const SHIPPING_FEE = 3_000;

export function calculateShippingFee(totalPrice: number): number {
  if (totalPrice === 0 || totalPrice >= FREE_SHIPPING_THRESHOLD) {
    return 0;
  }
  return SHIPPING_FEE;
}
