import { Coupon } from "../../types/Coupon";
import { checkedIdSetSelector } from "../cart/checkedState";
import { orderPriceSelector } from "../cart/orderSummaryState";
import { quantitySelectorFamily } from "../cart/cartItemState";
import { GetRecoilValue } from "recoil";

type ValidateCoupon = (coupon: Coupon, snapshot: GetRecoilValue) => boolean;
export const validateCouponConditionSet: Record<string, ValidateCoupon> = {
  expirationDate: (coupon, get) => new Date(coupon.expirationDate) >= new Date(),
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
  availableTime: (coupon, get) => {
    if (!("availableTime" in coupon)) return true;
    const now = new Date();
    return new Date(coupon.availableTime.start) <= now && now <= new Date(coupon.availableTime.end);
  },
};

export const validateCouponApplicability = (coupon: Coupon, get: GetRecoilValue) => {
  return Object.values(validateCouponConditionSet).every((validate) => validate(coupon, get));
};
