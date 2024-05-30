import { API_PATH } from "../constants/apiPath";
import { CouponResponse } from "../types/couponResponses";
import { cartApiClient } from "./cartApiClient";

export const fetchCoupons = async (): Promise<CouponResponse[]> => {
  const res = await cartApiClient.get<CouponResponse[]>(API_PATH.coupons);
  return res.data;
};
