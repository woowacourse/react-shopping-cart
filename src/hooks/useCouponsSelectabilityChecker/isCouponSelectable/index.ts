import { CartAmount } from "../../../recoil/cartAmount";
import { CartItem } from "../../../types/cartItems";
import { BuyXGetYCoupon } from "../../../types/coupon";
import { RawCoupon } from "../../../types/rawCoupon";
import { isBuyXGetYCoupon, isFreeShippingCoupon } from "../../../utils/domain/couponTypeGuards";
import { isNowInTimeRange } from "../../../utils/time/isNowInTimeRange";
import { isPastDate } from "../../../utils/time/isPastDate";

export const isCouponSelectable = (
  coupon: RawCoupon,
  cartItems: CartItem[],
  { orderAmount, shippingCost }: Omit<CartAmount, "totalOrderAmount">,
  now: Date = new Date()
): boolean => {
  if (coupon.minimumAmount && orderAmount < coupon.minimumAmount) {
    return false;
  }

  if (coupon.expirationDate && isPastDate(coupon.expirationDate, now)) {
    return false;
  }

  if (
    coupon.availableTime &&
    !isNowInTimeRange(coupon.availableTime.start, coupon.availableTime.end, now)
  ) {
    return false;
  }

  if (isFreeShippingCoupon(coupon) && shippingCost === 0) {
    return false;
  }

  if (isBuyXGetYCoupon(coupon) && !meetsBuyXGetYCouponRequirements(coupon, cartItems)) {
    return false;
  }

  return true;
};

const meetsBuyXGetYCouponRequirements = (coupon: BuyXGetYCoupon, cartItems: CartItem[]) => {
  const minimumQuantity = coupon.buyQuantity + coupon.getQuantity;

  return cartItems.some(({ isSelected, quantity }) => isSelected && quantity >= minimumQuantity);
};
