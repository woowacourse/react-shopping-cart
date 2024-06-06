import { useRecoilValue } from "recoil";
import { selectedCouponState } from "../recoil/atoms/atoms";
import { cartSummarySelectorState } from "../recoil/selector/selector";
import { calculateTotalDiscount } from "../utils/calculateTotalDiscount";
import { useDiscountCalculator } from "./useDiscountCalculator";

export const useTotalDiscount = () => {
  const selectedCoupons = useRecoilValue(selectedCouponState);
  const { orderTotalPrice, totalItemCount } = useRecoilValue(cartSummarySelectorState);
  const { calculateDiscountAmount } = useDiscountCalculator();

  return calculateTotalDiscount(
    selectedCoupons,
    orderTotalPrice,
    totalItemCount,
    calculateDiscountAmount
  );
};
