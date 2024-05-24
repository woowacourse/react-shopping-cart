import { Snapshot } from "recoil";
import { Coupon } from "../../types/types";
import { checkedIdSetSelector } from "../checkedState";
import { orderPriceSelector } from "../orderSummaryState";
import { quantitySelectorFamily } from "../cartItemState";

type ValidateCoupon = (coupon: Coupon, snapshot: Snapshot) => boolean;
const validateCouponConditionSet: Record<string, ValidateCoupon> = {
  minimumAmount: (coupon, snapshot) => {
    if (!("minimumAmount" in coupon)) return true;
    return coupon.minimumAmount < snapshot.getLoadable(orderPriceSelector).contents;
  },
  buyX: (coupon, snapshot) => {
    if (!("buyQuantity" in coupon)) return true;
    const ids = snapshot.getLoadable(checkedIdSetSelector).contents;
    const max_quantity = Math.max(ids.map((id) => snapshot.getLoadable(quantitySelectorFamily(id)).contents));
    return max_quantity >= coupon.buyQuantity;
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
