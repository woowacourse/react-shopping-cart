import { Coupon } from "@/types/coupon";
import { API_URL } from "@/apis/url";
import { basicToken } from "@/auth";
import { ErrorMessage } from "@/constants/error";

export async function getCoupons(): Promise<Coupon[]> {
  const response = await fetch(`${API_URL.coupons}`, {
    method: "GET",
    headers: { Authorization: basicToken },
  });

  if (!response.ok) {
    throw new Error(ErrorMessage.failGetCoupons);
  }

  const data = await response.json();
  return data;
}
