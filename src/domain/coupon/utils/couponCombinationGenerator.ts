import { Coupon } from "../../../api/coupon";

export interface CouponCombinationState {
  selectedCoupons: Coupon[];
  totalDiscount: number;
  finalShippingFee: number;
  hasFreeShipping: boolean;
  finalDiscount: number;
  remainingCoupons: Coupon[];
}

export function generateCouponCombinations(
  coupons: Coupon[],
  maxCombinations: number = 2
): Coupon[][] {
  const combinations: Coupon[][] = [];
  const memo = new Map<string, boolean>();

  function generateCombination(
    current: Coupon[],
    start: number,
    depth: number
  ) {
    if (depth > maxCombinations) return;
    if (current.length > 0) {
      const key = current
        .map((c) => c.id)
        .sort()
        .join(",");
      if (!memo.has(key)) {
        memo.set(key, true);
        combinations.push([...current]);
      }
    }

    for (let i = start; i < coupons.length; i++) {
      current.push(coupons[i]);
      generateCombination(current, i + 1, depth + 1);
      current.pop();
    }
  }

  generateCombination([], 0, 0);
  return combinations;
}
