import { atomFamily, selector, selectorFamily } from "recoil";
import { fetchCouponList } from "../../api/coupon";
import { Coupon } from "../../types/Coupon";
import { getDiscountForCoupon } from "./applyCoupon";
import { validateCouponApplicability } from "./validateCouponApplicability";

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

export const couponDiscountPriceSelectorFamily = selectorFamily({
  key: "couponDiscountPriceSelectorFamily",
  get:
    (id: number) =>
    ({ get }) =>
      getDiscountForCoupon(get(couponSelectorFamily(id)), get),
});

export const selectedCouponDiscountPriceSelector = selector({
  key: "couponDiscountPriceSelector",
  get: ({ get }) => {
    const selectedCouponSet = get(selectedCouponSetSelector);
    const discounts = [...selectedCouponSet]
      .filter((coupon) => validateCouponApplicability(coupon, get, new Date()))
      .map((coupon) => get(couponDiscountPriceSelectorFamily(coupon.id)));
    return discounts.reduce((acc, val) => acc + val, 0);
  },
});

export const maxDiscountCouponIdListSelector = selector({
  key: "maxDiscountCouponSetSelector",
  get: ({ get }) =>
    [...get(couponIdSetSelector)]
      .filter((id) => validateCouponApplicability(get(couponSelectorFamily(id)), get, new Date()))
      .toSorted(
        (id1, id2) => get(couponDiscountPriceSelectorFamily(id1)) - get(couponDiscountPriceSelectorFamily(id2))
      ),
});
