import { PATH, fetchWithAuth } from "./fetchWithAuth";

import { RawCoupon } from "../types/coupons";

export const fetchCoupons = async (): Promise<RawCoupon[]> => {
  const response = await fetchWithAuth(PATH.coupons, {
    method: "GET",
  });

  const data = await response.json();
  return data;
};
