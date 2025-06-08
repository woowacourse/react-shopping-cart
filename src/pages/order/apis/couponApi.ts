import apiClient from "../../../shared/apis/apiClient";
import { CouponResponse } from "../../../shared/types/coupon";

const couponApi = {
  get: async (): Promise<CouponResponse[]> => {
    return apiClient({ url: `/coupons`, options: { method: "GET" } });
  },
};

export default couponApi;
