import { Coupon } from '../../types/response';
import { calculateTotalDiscount } from './calculateTotalDiscount';
import { isCouponDisabled } from './isCouponDisabled';

export const getBestCouponCombination = (coupons: Coupon[], orderAmount: number, max: number): Coupon[] => {
  const availableCoupons = coupons.filter((coupon) => !isCouponDisabled(coupon, orderAmount));

  return getAllCombinations(availableCoupons, max).reduce<Coupon[]>((bestCombo, currentCombo) => {
    const bestDiscount = calculateTotalDiscount(bestCombo, orderAmount);
    const currentDiscount = calculateTotalDiscount(currentCombo, orderAmount);
    return currentDiscount > bestDiscount ? currentCombo : bestCombo;
  }, []);
};

const getAllCombinations = (arr: Coupon[], max: number): Coupon[][] => {
  const result: Coupon[][] = [];
  const dfs = (start: number, path: Coupon[]) => {
    if (path.length <= max) result.push(path);
    if (path.length === max) return;
    for (let i = start; i < arr.length; i++) {
      dfs(i + 1, [...path, arr[i]]);
    }
  };
  dfs(0, []);
  return result;
};
