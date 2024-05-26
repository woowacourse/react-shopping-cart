import { useRecoilValue } from "recoil";
import { useDiscountCalculator } from "./useDiscountCalculator";
import { couponsState } from "../store/atom/atoms";

export const useCoupons = () => {
  const coupons = useRecoilValue<Coupon[]>(couponsState);
  const { calculateTotalDiscountAmount } = useDiscountCalculator();

  return {
    coupons,
    calculateTotalDiscountAmount,
  };
};
