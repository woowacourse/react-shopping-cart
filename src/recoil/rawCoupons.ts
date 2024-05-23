import { selector } from "recoil";
import { fetchCoupons } from "../api/coupons";
import { RawCoupon } from "../types/rawCoupon";

export const rawCouponsSelector = selector<RawCoupon[]>({
  key: "rawCouponsSelector",
  get: async () => {
    const coupons = await fetchCoupons();
    return coupons;
  },
});
