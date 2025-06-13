import { CouponType } from "../types/types";
import { fetcher } from "./fetcher";

async function getCoupon(): Promise<CouponType[]> {
  return fetcher("/coupons", {
    method: "GET",
  });
}

export default getCoupon;
