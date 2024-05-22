import { atom, selector } from "recoil";
import { getCoupons } from "@/apis/coupon";
import { Coupon } from "@/types/coupon";

export const couponsResponse = selector<Coupon[]>({
  key: "couponsResponse",
  get: () => {
    const coupons = getCoupons();
    return coupons;
  },
});

export const couponsState = atom<Coupon[]>({
  key: "couponsState",
  default: couponsResponse,
});
