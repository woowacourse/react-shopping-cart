/**
 * 쿠폰 적용 가능한지 확인하는 커스텀 훅
 * - 사용 가능 시간인지
 * - 최소 주문 금액을 만족하는지
 */

import { useRecoilValue } from "recoil";
import { cartPriceState } from "@/stores/cartPrice";
import { AvailableTime, Coupon } from "@/types/coupon";
import useCouponValidator from "./useCouponValidator";

const useCouponApplicabilityChecker = () => {
  const { orderPrice } = useRecoilValue(cartPriceState);
  const { filteredValidCoupons } = useCouponValidator();

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

    return orderPrice >= minimumAmount;
  };

  const isCouponApplicable = (coupon: Coupon) => {
    const { availableTime, minimumAmount } = coupon;

    return (
      isAvailableTime(availableTime) && isFulfillMinimumAmount(minimumAmount)
    );
  };

  const filteredApplicableCoupons =
    filteredValidCoupons.filter(isCouponApplicable);

  return {
    isAvailableTime,
    isFulfillMinimumAmount,
    isCouponApplicable,
    filteredApplicableCoupons,
  };
};

export default useCouponApplicabilityChecker;
