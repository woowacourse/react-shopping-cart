import { Coupon } from "../types/Coupon";
import apiClient from "./apiClient";

export const fetchCouponList = (): Promise<Coupon[]> => {
  return apiClient.get("/coupons");
};
