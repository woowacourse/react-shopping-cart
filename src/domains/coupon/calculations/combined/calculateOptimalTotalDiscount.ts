import { CartItemWithSelection } from "../../../cart/types/response";
import { Coupon } from "../../types/response";
import { calculateDiscountSequence } from "./calculateDiscountSequence";

interface Props {
  coupons: Coupon[];
  orderItems: CartItemWithSelection[];
  orderPrice: number;
  shippingFee: number;
}

const getPermutations = <T>(arr: T[]): T[][] => {
  if (arr.length <= 1) return [arr];

  const permutations: T[][] = [];
  for (let i = 0; i < arr.length; i++) {
    const rest = [...arr.slice(0, i), ...arr.slice(i + 1)];
    const permutationsOfRest = getPermutations(rest);
    for (const permutation of permutationsOfRest) {
      permutations.push([arr[i], ...permutation]);
    }
  }
  return permutations;
};

export const calculateOptimalTotalDiscount = ({
  coupons,
  orderItems,
  orderPrice,
  shippingFee,
}: Props) => {
  if (coupons.length === 0) return 0;

  const allPermutations = getPermutations(coupons);

  return allPermutations.reduce((maxDiscount, permutation) => {
    const currentDiscount = calculateDiscountSequence({
      coupons: permutation,
      orderItems,
      initialOrderPrice: orderPrice,
      initialShippingFee: shippingFee,
    });
    return Math.max(maxDiscount, currentDiscount);
  }, 0);
};
