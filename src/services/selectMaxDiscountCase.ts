import { FormattedCoupon, CartItemData } from '@/types';
import calculateTotalDiscountPrice from './calculateDiscount';

const applyDiscounts = (
  orderAmount: number,
  coupons: FormattedCoupon[],
  allCartItems: CartItemData[],
): number => {
  return coupons.reduce((acc, coupon) => {
    const discount = calculateTotalDiscountPrice(coupon, orderAmount, allCartItems);
    orderAmount -= discount;
    return acc + discount;
  }, 0);
};

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
    return applyDiscounts(orderAmount, coupons, allCartItems);
  };

  const permute = (arr: FormattedCoupon[]) => {
    if (arr.length === 0) return [[]];
    const firstElem = arr[0];
    const rest = arr.slice(1);
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
