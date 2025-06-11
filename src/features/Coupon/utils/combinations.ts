import { CartItem } from '@/features/Cart/types/Cart.types';
import { Coupon } from '../types/Coupon.types';
import { calculateTotalDiscount } from './calculateTotalDiscount';

type PriceContext = {
  isRemoteArea: boolean;
  deliveryFee: number;
  totalPrice: number;
};

export const getBestCouponCombination = (
  coupons: Coupon[],
  selectedCartItems: CartItem[],
  priceContext: PriceContext
): Coupon[] => {
  const combos = getAllCombinations(coupons, 2);
  let bestCombo: Coupon[] = [];
  let maxDiscount = 0;

  for (const combo of combos) {
    const discount = calculateTotalDiscount(selectedCartItems, combo, priceContext);
    if (discount > maxDiscount) {
      bestCombo = combo;
      maxDiscount = discount;
    }
  }

  return bestCombo;
};

const getAllCombinations = (arr: Coupon[], max: number) => {
  const result: Coupon[][] = [];

  const dfs = (start: number, path: Coupon[]) => {
    if (path.length > 0 && path.length <= max) result.push([...path]);
    if (path.length === max) return;

    for (let i = start; i < arr.length; i++) {
      path.push(arr[i]);
      dfs(i + 1, path);
      path.pop();
    }
  };

  dfs(0, []);
  return result;
};
