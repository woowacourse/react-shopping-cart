import { BASE_URL } from "./config";

export async function fetchCouponList(): Promise<CouponResponse[]> {
  const res = await fetch(`${BASE_URL}/coupons`, {
    method: "GET", // 고정
    headers: {}, // config 에서 정의한 공통 헤더
  });

  if (!res.ok) {
    throw new Error(`쿠폰 조회 실패: ${res.status}`);
  }

  return res.json();
}

export interface CouponResponse {
  map(
    arg0: (coupon: any) => import("react/jsx-runtime").JSX.Element
  ): import("react").ReactNode;
  id: number;
  code: string;
  description: string;
  expirationDate: string;
  discount?: number;
  minimumAmount?: string;
  buyQuantity?: number;
  getQuantity?: number;
  availableTime?: {
    start: string;
    end: string;
  };
  discountType: "fixed" | "buyXgetY" | "freeShipping" | "percentage";
}
