import { Coupon } from "../../../api/coupon";

export function generateCouponCombinations(
  coupons: Coupon[],
  maxCombinations: number = 2
): string[][] {
  const combinations: string[][] = [];

  coupons.forEach((coupon) => {
    combinations.push([coupon.id]);
  });

  if (maxCombinations > 1) {
    for (let i = 0; i < coupons.length; i++) {
      for (let j = i + 1; j < coupons.length; j++) {
        combinations.push([coupons[i].id, coupons[j].id]);
      }
    }
  }

  return combinations;
}
