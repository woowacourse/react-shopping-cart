import { getCoupons } from "@/auth/apis/coupon";
import { Coupon } from "@/types/coupon";
import { atom, selector } from "recoil";

export const couponListSelector = selector<Coupon[]>({
  key: "couponListSelector",
  get: async () => {
    const couponList = await getCoupons();

    return couponList;
  },
});

export const couponsState = atom<Coupon[]>({
  key: "couponsState",
  default: [],
});
