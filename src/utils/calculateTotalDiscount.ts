import { Coupon } from "../types";

export const calculateTotalDiscount = (
  selectedCoupons: Coupon[],
  orderTotalPrice: number,
  totalItemCount: number,
  calculateDiscountAmount: (coupon: Coupon, price: number, count: number) => number
) => {
  if (selectedCoupons.length === 0) return 0;

  const applyDiscounts = (coupons: Coupon[]) => {
    return coupons.reduce((total, coupon) => {
      const discount = calculateDiscountAmount(coupon, orderTotalPrice - total, totalItemCount);
      return total + discount;
    }, 0);
  };

  const discount1 = applyDiscounts(selectedCoupons);
  const discount2 = applyDiscounts([...selectedCoupons].reverse());

  return Math.max(discount1, discount2);
};
