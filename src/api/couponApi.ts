import { fetcher } from "./fetcher";

export interface Coupon {
  id: number;
  code: string;
  description: string;
  expirationDate: string;
  discount?: number;
  minimumAmount?: number;
  discountType: "fixed" | "buyXgetY" | "freeShipping" | "percentage";
  buyQuantity?: number;
  getQuantity?: number;
  availableTime?: {
    start: string;
    end: string;
  };
}

async function getCouponList(): Promise<Coupon[]> {
  return fetcher("/coupons", {
    method: "GET",
  });
}

export default getCouponList;
