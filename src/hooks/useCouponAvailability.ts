import { useRecoilValue } from "recoil";

import { couponByIdSelector, couponExpirationSelector } from "@/recoil/coupon";
import { totalOrderPriceSelector } from "@/recoil/orderInformation";
import { selectedCartItemSelector } from "@/recoil/selectedCardItems";

import { CART_FEE, COUPON_VALIDATION_MESSAGES } from "@/constants/cart";
import { SECONDS } from "@/constants/times";
import { AvailableTime } from "@/types/cart";

const useCouponAvailability = (id: number) => {
  const coupon = useRecoilValue(couponByIdSelector(id));
  const isCouponExpired = useRecoilValue(couponExpirationSelector(id));
  const selectedCartItemsQuantity = useRecoilValue(selectedCartItemSelector);
  const totalOrderPrice = useRecoilValue(totalOrderPriceSelector);

  const validateCouponAvailableTime = ({
    start,
    end,
  }: AvailableTime): boolean => {
    const now = new Date();

    const nowHours = now.getHours();
    const nowMinutes = now.getMinutes();
    const nowSeconds = now.getSeconds();

    const [startHour, startMinute, startSecond] = start.split(":").map(Number);
    const [endHour, endMinute, endSecond] = end.split(":").map(Number);

    const nowInSeconds =
      nowHours * SECONDS.secondInHour +
      nowMinutes * SECONDS.secondInMinute +
      nowSeconds;
    const startInSeconds =
      startHour * SECONDS.secondInHour +
      startMinute * SECONDS.secondInMinute +
      startSecond;
    const endInSeconds =
      endHour * SECONDS.secondInHour +
      endMinute * SECONDS.secondInMinute +
      endSecond;

    return nowInSeconds >= startInSeconds && nowInSeconds <= endInSeconds;
  };

  const validateBuyQuantity = (buyQuantity: number) => {
    return selectedCartItemsQuantity.some(
      ({ quantity }) => buyQuantity < quantity
    );
  };

  const checkCouponUsable = () => {
    if (!coupon || !isCouponExpired || !selectedCartItemsQuantity.length)
      return COUPON_VALIDATION_MESSAGES.unusableCoupon;

    if (coupon.minimumAmount && totalOrderPrice < coupon.minimumAmount) {
      return COUPON_VALIDATION_MESSAGES.invalidMinimumAmountCoupon(
        coupon.minimumAmount
      );
    }

    if (
      coupon.discountType === "freeShipping" &&
      totalOrderPrice >= CART_FEE.shippingFeeThreshold
    ) {
      return COUPON_VALIDATION_MESSAGES.invalidMinimumAmountCoupon(
        coupon.minimumAmount ?? 0
      );
    }

    if (
      coupon.availableTime &&
      !validateCouponAvailableTime(coupon.availableTime)
    ) {
      return COUPON_VALIDATION_MESSAGES.invalidTimeCoupon(coupon.availableTime);
    }

    if (coupon.buyQuantity && !validateBuyQuantity(coupon.buyQuantity)) {
      return COUPON_VALIDATION_MESSAGES.invalidQuantityCoupon(
        coupon.buyQuantity
      );
    }

    return "";
  };

  return {
    checkCouponUsable,
  };
};

export default useCouponAvailability;
