import { useRecoilValue } from "recoil";
import { fetchCouponsState } from "../store/selector/fetchCouponsState";
import { useDiscountCalculator } from "./useDiscountCalculator";

export const useCoupons = () => {
  const coupons = useRecoilValue<Coupon[]>(fetchCouponsState);
  const { calculateTotalDiscountAmount } = useDiscountCalculator();

  return {
    coupons,
    calculateTotalDiscountAmount,
  };
};
