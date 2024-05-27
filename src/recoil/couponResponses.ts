import { selector } from "recoil";
import { fetchCoupons } from "../api/coupons";
import { CouponResponse } from "../types/couponResponses";

export const couponResponsesSelector = selector<CouponResponse[]>({
  key: "couponResponsesSelector",
  get: async () => {
    const coupons = await fetchCoupons();
    return coupons;
  },
});
