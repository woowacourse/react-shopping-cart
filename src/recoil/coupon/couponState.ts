import { selector, selectorFamily } from "recoil";
import { fetchCouponList } from "../../api/coupon";
import { Coupon } from "../../types/Coupon";

export const fetchCouponListSelector = selector({
  key: "fetchCouponListSelector",
  get: fetchCouponList,
});

export const couponSelectorFamily = selectorFamily<Coupon, number>({
  key: "",
  get:
    (id) =>
    ({ get }) =>
      get(fetchCouponListSelector).find((coupon) => coupon.id === id),
});
