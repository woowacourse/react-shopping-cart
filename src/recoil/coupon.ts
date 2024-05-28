import { atom, selector, selectorFamily } from "recoil";

import { getCoupons } from "@/apis";

import { Coupon } from "@/types/cart";

export const couponSelector = selector({
  key: "couponSelector",
  get: async () => {
    const coupons = await getCoupons();
    return coupons;
  },
});

export const couponsState = atom<Coupon[]>({
  key: "couponsState",
  default: couponSelector,
});

export const selectedCouponState = atom<Coupon[]>({
  key: "selectedCouponState",
  default: [],
});

export const couponByIdSelector = selectorFamily<Coupon | undefined, number>({
  key: "couponByIdSelector",
  get:
    (id) =>
    ({ get }) => {
      const coupons = get(couponsState);
      return coupons.find((coupon) => coupon.id === id);
    },
});

const isCouponExpired = (expirationDate: string) => {
  const today = new Date();
  const expiration = new Date(expirationDate);
  return expiration < today;
};

export const couponExpirationSelector = selectorFamily<boolean, number>({
  key: "couponExpirationSelector",
  get:
    (id) =>
    ({ get }) => {
      const coupon = get(couponByIdSelector(id));

      if (!coupon) return false;

      return !isCouponExpired(coupon.expirationDate);
    },
});
