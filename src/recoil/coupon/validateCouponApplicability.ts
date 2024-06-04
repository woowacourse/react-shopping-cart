import { GetRecoilValue } from "recoil";
import { Coupon } from "../../types/Coupon";
import { quantitySelectorFamily } from "../cart/cartItemState";
import { checkedIdSetSelector } from "../cart/checkedState";
import { orderPriceSelector } from "../cart/orderSummaryState";

type ValidateCoupon = (coupon: Coupon, get: GetRecoilValue, currentDate: Date) => boolean;
export const validateCouponConditionSet: Record<string, ValidateCoupon> = {
  expirationDate: (coupon, get, currentDate) => new Date(coupon.expirationDate) >= currentDate,
  minimumAmount: (coupon, get) => {
    if (!("minimumAmount" in coupon)) return true;
    return coupon.minimumAmount < get(orderPriceSelector);
  },
  buyX: (coupon, get) => {
    if (!("buyQuantity" in coupon)) return true;
    const ids = get(checkedIdSetSelector);
    const quantities = Array.from(ids).map((id) => get(quantitySelectorFamily(id)));
    const maxQuantityInCart = Math.max(...quantities);
    return maxQuantityInCart >= coupon.buyQuantity;
  },
  availableTime: (coupon, get, currentDate) => {
    if (!("availableTime" in coupon)) return true;
    return new Date(coupon.availableTime.start) <= currentDate && currentDate <= new Date(coupon.availableTime.end);
  },
};

export const validateCouponApplicability = (coupon: Coupon, get: GetRecoilValue, date: Date) => {
  return Object.values(validateCouponConditionSet).every((validate) => validate(coupon, get, date));
};
