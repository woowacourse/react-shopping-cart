import { Coupon } from "../types/coupon";
import apiClient from "./apiClient";

export function fetchCoupons(): Promise<Coupon[]> {
  return apiClient.get({ endpoint: "/coupons" }).then((data) => data);
}
