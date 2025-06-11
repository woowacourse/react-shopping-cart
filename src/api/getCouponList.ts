import { CouponResponse } from "../types/Coupon";
import { BASE_URL } from "./config";

export async function getCouponList(): Promise<CouponResponse[]> {
  const res = await fetch(`${BASE_URL}/coupons`, {
    method: "GET",
    headers: {},
  });

  if (!res.ok) {
    throw new Error(`쿠폰 조회 실패: ${res.status}`);
  }

  return res.json();
}
