import { Coupon } from "@/types/coupon";
import { fetchWithoutAuth } from "./utils/fetchClient";

/**
 * 쿠폰 목록 조회
 */
export const getCoupons = async (): Promise<Coupon[]> => {
  const response = await fetchWithoutAuth("/coupons", {
    method: "GET",
  });

  const data = await response.json();

  return data;
};
