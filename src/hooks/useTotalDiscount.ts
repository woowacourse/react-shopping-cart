import { useRecoilValue } from "recoil";
import { useDiscountCalculator } from "./useDiscountCalculator";
import { selectedCouponState } from "../recoil/atoms/atoms";
import { cartSummarySelectorState } from "../recoil/selector/selector";

export const useTotalDiscount = () => {
  const selectedCoupons = useRecoilValue(selectedCouponState);
  const { orderTotalPrice, totalItemCount } = useRecoilValue(cartSummarySelectorState);
  const { calculateDiscountAmount } = useDiscountCalculator();

  if (selectedCoupons.length === 0) return 0;

  const calculateTotalDiscount = (coupons: typeof selectedCoupons) => {
    return coupons.reduce((total, coupon) => {
      const discount = calculateDiscountAmount(coupon, orderTotalPrice - total, totalItemCount);
      return total + discount;
    }, 0);
  };

  // 첫 번째 쿠폰 먼저 적용
  const discount1 = calculateTotalDiscount(selectedCoupons);
  // 두 번째 쿠폰 먼저 적용
  const discount2 = calculateTotalDiscount([...selectedCoupons].reverse());

  return Math.max(discount1, discount2);
};
