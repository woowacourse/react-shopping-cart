import { Coupon } from '../../types/response';
import { isCouponDisabled } from './isCouponDisabled';
import { calculateTotalDiscount } from './calculateTotalDiscount';
import { getAllCombinations } from './getAllCombinations';

export const getBestCouponCombination = (
  coupons: Coupon[],
  orderAmount: number,
  maxCount: number
): {
  bestCoupons: Coupon[];
  totalDiscount: number;
} => {
  const availableCoupons = coupons.filter((coupon) => !isCouponDisabled(coupon, orderAmount));
  const combinations = getAllCombinations(availableCoupons, maxCount);

  let bestCoupons: Coupon[] = [];
  let maxDiscount = 0;

  for (const combo of combinations) {
    const discount = calculateTotalDiscount(combo, orderAmount);
    if (discount > maxDiscount) {
      bestCoupons = combo;
      maxDiscount = discount;
    }
  }

  return {
    bestCoupons,
    totalDiscount: maxDiscount
  };
};
