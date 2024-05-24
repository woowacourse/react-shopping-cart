import { Snapshot } from "recoil";
import { Coupon } from "../../types/Coupon";
import { checkedIdSetSelector } from "../cart/checkedState";
import { orderPriceSelector } from "../cart/orderSummaryState";
import { quantitySelectorFamily } from "../cart/cartItemState";

type ValidateCoupon = (coupon: Coupon, snapshot: Snapshot) => boolean;
export const validateCouponConditionSet: Record<string, ValidateCoupon> = {
  minimumAmount: (coupon, snapshot) => {
    if (!("minimumAmount" in coupon)) return true;
    return coupon.minimumAmount < snapshot.getLoadable(orderPriceSelector).contents;
  },
  buyX: (coupon, snapshot) => {
    if (!("buyQuantity" in coupon)) return true;
    const ids = snapshot.getLoadable(checkedIdSetSelector).getValue();
    const quantities = Array.from(ids).map((id) => snapshot.getLoadable(quantitySelectorFamily(id)).getValue());
    const maxQuantityInCart = Math.max(...quantities);
    return maxQuantityInCart >= coupon.buyQuantity;
  },
  availableTime: (coupon, snapshot) => {
    if (!("availableTime" in coupon)) return true;
    const now = new Date();
    return new Date(coupon.availableTime.start) <= now && now <= new Date(coupon.availableTime.end);
  },
};

export const validateCouponAplicability = (coupon: Coupon, snapshot: Snapshot) => {
  return Object.values(validateCouponConditionSet).every((validate) => validate(coupon, snapshot));
};
