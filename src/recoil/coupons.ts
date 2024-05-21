import { atom, selector } from "recoil";
import { fetchCoupons } from "../api/coupons";
import { Coupon } from "../types/coupon";

const couponSelector = selector({
  key: "couponSelector",
  get: async () => {
    const coupons = await fetchCoupons();
    return coupons.map((coupon) => ({
      ...coupon,
      isSelected: false,
    }));
  },
});

export const couponsState = atom<Coupon[]>({
  key: "couponsState",
  default: couponSelector,
});
