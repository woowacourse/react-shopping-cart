import { DefaultValue, atomFamily, selector, selectorFamily } from "recoil";
import { fetchCouponList } from "../../api/coupon";
import { Coupon } from "../../types/Coupon";

export const fetchCouponListSelector = selector({
  key: "fetchCouponListSelector",
  get: fetchCouponList,
});

export const couponIdSetSelector = selector({
  key: "couponIdSetSelector",
  get: ({ get }) => new Set(get(fetchCouponListSelector).map((coupon) => coupon.id)),
});

export const couponSelectorFamily = selectorFamily<Coupon, number>({
  key: "couponSelectorFamily",
  get:
    (id) =>
    ({ get }) =>
      get(fetchCouponListSelector).find((coupon) => coupon.id === id),
});

export const isSelectedCouponAtomFamily = atomFamily<boolean, number>({
  key: "isSelectedCouponAtomFamily",
  default: false,
});
export const selectedCouponSetSelector = selector<Set<Coupon>>({
  key: "selectedCouponSetSelector",
  get: ({ get }) =>
    new Set(get(fetchCouponListSelector).filter((coupon) => get(isSelectedCouponAtomFamily(coupon.id)))),
});
