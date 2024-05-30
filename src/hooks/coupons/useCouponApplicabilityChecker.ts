/**
 * 쿠폰 적용 가능한지 확인하는 커스텀 훅
 * - 사용 가능 시간인지
 * - 최소 주문 금액을 만족하는지
 * - 구매 개수를 만족하는지
 */

import { useRecoilValue } from "recoil";
import { cartPriceState } from "@/stores/cartPrice";
import { cartItemsState } from "@/stores/cartItems";
import useCouponValidator from "./useCouponValidator";
import { AvailableTime, Coupon } from "@/types/coupon";

const useCouponApplicabilityChecker = () => {
  const cartItems = useRecoilValue(cartItemsState);
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

  const isFulfillMinimumPrice = (minimumPrice?: number) => {
    if (!minimumPrice) {
      return true;
    }

    return orderPrice >= minimumPrice;
  };

  const isFulfillMinimumQuantity = (buyQuantity?: number) => {
    if (!buyQuantity) {
      return true;
    }

    return cartItems.some((cartItem) => cartItem.quantity >= buyQuantity + 1);
  };

  const isCouponApplicable = (coupon: Coupon) => {
    const { availableTime, minimumAmount, buyQuantity } = coupon;

    return (
      isAvailableTime(availableTime) &&
      isFulfillMinimumPrice(minimumAmount) &&
      isFulfillMinimumQuantity(buyQuantity)
    );
  };

  const filteredApplicableCoupons =
    filteredValidCoupons.filter(isCouponApplicable);

  return {
    isCouponApplicable,
    filteredApplicableCoupons,
  };
};

export default useCouponApplicabilityChecker;
