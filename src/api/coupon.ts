import { CouponType } from "../types/coupon";
import apiClient from "./apiClient";

export const getCoupons = async () => {
  const data = await apiClient<CouponType[]>({
    method: "GET",
    URI: `/coupons`,
  });
  return data;
};
