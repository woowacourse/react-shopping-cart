/**
 * 쿠폰 적용 가능한지 확인하는 커스텀 훅
 * - 사용 가능 시간인지
 * - 최소 주문 금액을 만족하는지
 */

import { useRecoilValue } from "recoil";
import { cartAmountState } from "@/stores/cartAmount";
import { AvailableTime, Coupon } from "@/types/coupon";

const useCouponApplicabilityChecker = () => {
  const { orderAmount } = useRecoilValue(cartAmountState);

  const isAvailableTime = (availableTime?: AvailableTime) => {
    if (!availableTime) {
      return true;
    }

    const { start, end } = availableTime;
    const currentTime = new Date().toLocaleTimeString("en-US", {
      hour12: false,
    });

    return currentTime >= start && currentTime <= end;
  };

  const isFulfillMinimumAmount = (minimumAmount?: number) => {
    if (!minimumAmount) {
      return true;
    }

    return orderAmount >= minimumAmount;
  };

  const isCouponApplicable = (coupon: Coupon) => {
    const { availableTime, minimumAmount } = coupon;

    return (
      isAvailableTime(availableTime) && isFulfillMinimumAmount(minimumAmount)
    );
  };

  return { isAvailableTime, isFulfillMinimumAmount, isCouponApplicable };
};

export default useCouponApplicabilityChecker;
