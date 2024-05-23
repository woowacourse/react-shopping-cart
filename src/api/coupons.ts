import { API_PATH } from "../constants/apiPath";
import { RawCoupon } from "../types/rawCoupon";
import { cartApiClient } from "./cartApiClient";

export const fetchCoupons = async (): Promise<RawCoupon[]> => {
  const res = await cartApiClient.get<RawCoupon[]>(API_PATH.coupons);
  return res.data;
};
