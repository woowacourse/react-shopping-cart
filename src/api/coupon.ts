import apiClient from "./apiClient";

export const fetchCouponList = () => {
  return apiClient.get("/coupons");
};
