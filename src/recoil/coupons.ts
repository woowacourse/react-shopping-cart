import { Coupon } from "@/types/coupon";
import { atom } from "recoil";

export const couponState = atom<Coupon[]>({
  key: "couponState",
  default: [],
});
