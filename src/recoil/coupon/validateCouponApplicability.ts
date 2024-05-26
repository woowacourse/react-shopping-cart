import { Snapshot } from "recoil";
import { Coupon } from "../../types/Coupon";
import { checkedIdSetSelector } from "../cart/checkedState";
import { orderPriceSelector } from "../cart/orderSummaryState";
import { quantitySelectorFamily } from "../cart/cartItemState";
import { GetRecoilValue } from "recoil";
import { selectedCouponSetSelector } from "./couponState";

// type ValidateCoupon = (coupon: Coupon, snapshot: GetRecoilValue) => boolean;
// export const validateCouponConditionSet: Record<string, ValidateCoupon> = {
//   minimumAmount: (coupon, get) => {
//     if (!("minimumAmount" in coupon)) return true;
//     return coupon.minimumAmount < get(orderPriceSelector);
//   },
//   buyX: (coupon, get) => {
//     if (!("buyQuantity" in coupon)) return true;
//     const ids = get(checkedIdSetSelector);
//     const quantities = Array.from(ids).map((id) => get(quantitySelectorFamily(id)));
//     const maxQuantityInCart = Math.max(...quantities);
//     return maxQuantityInCart >= coupon.buyQuantity;
//   },
//   availableTime: (coupon, snapshot) => {
//     if (!("availableTime" in coupon)) return true;
//     const now = new Date();
//     return new Date(coupon.availableTime.start) <= now && now <= new Date(coupon.availableTime.end);
//   },
// };

// export const validateCouponApplicability = (coupon: Coupon, get: GetRecoilValue) => {
//   // console.log(get(selectedCouponSetSelector));
//   return Object.values(validateCouponConditionSet).every((validate) => validate(coupon, get));
// };

type ValidateCoupon = (coupon: Coupon, snapshot: Snapshot) => boolean;
export const validateCouponConditionSet: Record<string, ValidateCoupon> = {
  minimumAmount: (coupon, snapshot) => {
    if (!("minimumAmount" in coupon)) return true;
    return coupon.minimumAmount < snapshot.getLoadable(orderPriceSelector).getValue();
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

export const validateCouponApplicability = (coupon: Coupon, snapshot: Snapshot) => {
  // console.log(get(selectedCouponSetSelector));
  return Object.values(validateCouponConditionSet).every((validate) => validate(coupon, snapshot));
};
