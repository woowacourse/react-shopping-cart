import { atom } from "recoil";
import { Coupon } from "../../types/coupons";

export const couponsState = atom<Coupon[]>({
  key: "couponsState",
  default: [],
});
