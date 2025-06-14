import { CouponType } from "../components/Coupon/types";

export const filterNonExpiredCoupons = (coupons: CouponType[]) => {
  const today = new Date().setHours(0, 0, 0, 0);

  return coupons.filter((coupon) => {
    const { year, month, day } = coupon.expirationDate;
    const expiredDate = new Date(
      Number(year),
      Number(month) - 1,
      Number(day)
    ).setHours(0, 0, 0, 0);

    return expiredDate >= today;
  });
};

export const makeCouponPermutation = (
  coupons: CouponType[],
  couponsCount: number
) => {
  const results: CouponType[][] = [];
  if (couponsCount === 1) {
    return [coupons];
  }

  coupons.forEach((coupon, index, prevCoupons) => {
    const restCoupons = [
      ...prevCoupons.slice(0, index),
      ...prevCoupons.slice(index + 1),
    ];
    const restPermutations = makeCouponPermutation(
      restCoupons,
      couponsCount - 1
    );
    restPermutations.forEach((permutation) => {
      results.push([coupon, ...permutation]);
    });
  });

  return results;
};
