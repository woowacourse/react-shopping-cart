import { selector } from "recoil";
import { fetchCouponListSelector } from "./couponState";
import { validateCouponApplicability } from "./validateCouponApplicability";

export const validCouponSelectedSetSelector = selector({
  key: "validCouponSelectedSetSelector",
  get: ({ get }) => {
    const selectedCouponSet = get(fetchCouponListSelector);
    return new Set([...selectedCouponSet].filter((coupon) => validateCouponApplicability(coupon, get, new Date())));
  },
});
