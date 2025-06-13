import { fetcher } from "./fetcher";
import { Coupon } from "../types/coupon";

async function getCouponList(): Promise<Coupon[]> {
  return fetcher("/coupons", {
    method: "GET",
  });
}

export default getCouponList;
