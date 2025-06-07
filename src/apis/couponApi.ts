import { CouponResponse } from "../types/coupon";
import apiClient from "./apiClient";

const couponApi = {
  get: async (): Promise<CouponResponse[]> => {
    return apiClient({ url: `/coupons`, options: { method: "GET" } });
  },
};

export default couponApi;
