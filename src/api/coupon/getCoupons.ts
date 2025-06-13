import { CouponResponse } from "../../type/coupon";
import { apiClient } from "../apiClient";

export const getCoupons = (): Promise<CouponResponse[]> =>
  apiClient.get({ endPoint: `/coupons` });
