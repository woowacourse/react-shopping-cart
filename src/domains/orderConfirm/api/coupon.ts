import { apiClient } from "../../../api/apiClient";
import { CouponType } from "../types/coupon";

async function getCoupons() {
  return await apiClient.get("coupons");
}

async function getCouponItems(): Promise<CouponType[]> {
  try {
    const response = await getCoupons();
    const coupons = await response.json();
    return coupons;
  } catch (error) {
    console.error("쿠폰을 가져오는 데 실패했습니다:", error);
    return [];
  }
}

export { getCouponItems };
