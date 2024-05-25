import { useRecoilValue } from "recoil";

import { couponByIdSelector, couponExpirationSelector } from "@/recoil/coupon";
import { totalOrderPriceSelector } from "@/recoil/orderInformation";
import { selectedCartItemSelector } from "@/recoil/selectedCardItems";

import { AvailableTime } from "@/types/cart";
import { CART_FEE } from "@/constants/cart";

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

    const nowInSeconds = nowHours * 3600 + nowMinutes * 60 + nowSeconds;
    const startInSeconds = startHour * 3600 + startMinute * 60 + startSecond;
    const endInSeconds = endHour * 3600 + endMinute * 60 + endSecond;

    return nowInSeconds >= startInSeconds && nowInSeconds <= endInSeconds;
  };

  const validateBuyQuantity = (buyQuantity: number) => {
    return selectedCartItemsQuantity.some(
      ({ quantity }) => buyQuantity < quantity
    );
  };

  const checkCouponUsable = () => {
    if (!coupon || !isCouponExpired || !selectedCartItemsQuantity.length)
      return false;

    if (coupon.minimumAmount && totalOrderPrice < coupon.minimumAmount) {
      return false;
    }

    if (
      coupon.discountType === "freeShipping" &&
      totalOrderPrice >= CART_FEE.shippingFeeThreshold
    ) {
      return false;
    }

    if (coupon.availableTime) {
      return validateCouponAvailableTime(coupon.availableTime);
    }

    if (coupon.buyQuantity) {
      return validateBuyQuantity(coupon.buyQuantity);
    }

    return true;
  };

  return {
    checkCouponUsable,
  };
};

export default useCouponAvailability;
