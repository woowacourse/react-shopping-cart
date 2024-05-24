import { useCouponDiscountCalculator } from "./useCouponDiscountCalculator";
import { Coupon } from "../../types/coupon";
import { getPermutations } from "../../utils/math/getPermutations";
import { getMaxNumberFromList } from "../../utils/math/getMaxFromNumberList";

type CouponsDiscountCalculator = (coupons: Coupon[]) => number;

export const useCouponsDiscountCalculator = (): CouponsDiscountCalculator => {
  const calculateCouponDiscount = useCouponDiscountCalculator();

  return (coupons: Coupon[]): number => {
    const selectedCoupons = coupons.filter(({ isSelected }) => isSelected);

    const couponsPermutations = getPermutations(selectedCoupons);
    const possibleDiscounts = couponsPermutations.map((coupons) => {
      return coupons.reduce((total, coupon) => total + calculateCouponDiscount(coupon, total), 0);
    });

    return getMaxNumberFromList(possibleDiscounts);
  };
};
