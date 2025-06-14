import { Coupon } from "../../type/Coupons";

export const getCouponCombos = (coupons: Coupon[]) => {
  const result: Coupon[][] = [];

  function getPermutations(arr: Coupon[], currentPermutation: Coupon[]) {
    if (arr.length === 0) {
      result.push(currentPermutation);
      return;
    }

    for (let i = 0; i < arr.length; i += 1) {
      {
        const nextElement = arr[i];
        const remainingElements = [...arr.slice(0, i), ...arr.slice(i + 1)];
        getPermutations(remainingElements, [
          ...currentPermutation,
          nextElement,
        ]);
      }
    }
  }

  getPermutations(coupons, []);

  return result;
};
