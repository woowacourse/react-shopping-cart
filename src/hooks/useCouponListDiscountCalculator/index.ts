import { useCouponDiscountCalculator } from "./useCouponDiscountCalculator";
import { Coupon } from "../../types/coupon";
import { getPermutations } from "../../utils/math/getPermutations";
import { getMaxNumberFromList } from "../../utils/math/getMaxFromNumberList";

interface UseCouponListDiscountCalculatorReturn {
  calculateCouponListDiscount: (coupons: Coupon[]) => number;
}

export const useCouponListDiscountCalculator = (): UseCouponListDiscountCalculatorReturn => {
  const { calculateCouponDiscount } = useCouponDiscountCalculator();

  const calculateCouponListDiscount = (coupons: Coupon[]): number => {
    const selectedCoupons = coupons.filter(({ isSelected }) => isSelected);

    const couponsPermutations = getPermutations(selectedCoupons);
    const possibleDiscounts = couponsPermutations.map((coupons) => {
      return coupons.reduce((total, coupon) => total + calculateCouponDiscount(coupon, total), 0);
    });

    return getMaxNumberFromList(possibleDiscounts);
  };

  return {
    calculateCouponListDiscount,
  };
};
