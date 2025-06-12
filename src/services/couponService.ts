import { apiClient } from "./apiClient";

export const getCouponList = async () => {
  const data = await apiClient({
    method: "GET",
    URI: "/coupons",
  });

  return data;
};
