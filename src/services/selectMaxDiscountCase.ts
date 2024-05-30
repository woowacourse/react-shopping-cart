import { FormattedCoupon, CartItemData } from '@/types';
import calculateTotalDiscountPrice from './calculateDiscount';

const selectMaxDiscountCase = (
  checkedCoupons: FormattedCoupon[],
  orderAmount: number,
  allCartItems: CartItemData[],
): number => {
  if (!checkedCoupons.length) {
    return 0;
  }

  const calculateDiscount = (
    orderAmount: number,
    coupons: FormattedCoupon[],
    allCartItems: CartItemData[],
  ) => {
    return coupons.reduce((acc, coupon) => {
      const discount = calculateTotalDiscountPrice(coupon, orderAmount, allCartItems);
      orderAmount -= discount;
      return acc + discount;
    }, 0);
  };

  const permute = (allCoupons: FormattedCoupon[]) => {
    if (allCoupons.length === 0) return [[]];
    const [firstElem, ...rest] = allCoupons;
    const permsWithoutFirst = permute(rest);
    const allPermutations: FormattedCoupon[][] = [];

    permsWithoutFirst.forEach((perm) => {
      for (let i = 0; i <= perm.length; i++) {
        const permWithFirst = [...perm.slice(0, i), firstElem, ...perm.slice(i)];
        allPermutations.push(permWithFirst);
      }
    });

    return allPermutations;
  };

  const allPermutations = permute(checkedCoupons);
  const allDiscounts = allPermutations.map((permutation) =>
    calculateDiscount(orderAmount, permutation, allCartItems),
  );

  return Math.max(...allDiscounts);
};

export default selectMaxDiscountCase;
