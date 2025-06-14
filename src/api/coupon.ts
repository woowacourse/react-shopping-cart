import { CouponDataType } from "../types/response";
import apiClient from "./apiClient";

export const getCoupons = async () => {
  return await apiClient<CouponDataType[]>({
    method: "GET",
    URI: "/coupons",
  });
};
