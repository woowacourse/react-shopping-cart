import { PATH, fetchWithAuth } from "./fetchWithAuth";

import { Coupon } from "../types/coupons";

export const fetchCoupons = async (): Promise<Coupon[]> => {
  const response = await fetchWithAuth(PATH.coupons, {
    method: "GET",
  });

  const data = await response.json();
  return data;
};
