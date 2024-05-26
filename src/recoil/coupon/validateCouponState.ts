import { selector } from "recoil";
import { selectedCouponSetSelector } from "./couponState";
import { validateCouponApplicability, validateCouponConditionSet } from "./validateCouponApplicability";

export const validCouponSelectedSetSelector = selector({
  key: "validCouponSelectedSetSelector",
  get: ({ get }) => {
    const selectedCouponSet = get(selectedCouponSetSelector);
    return new Set([...selectedCouponSet].filter((coupon) => validateCouponApplicability(coupon, get)));
  },
});
