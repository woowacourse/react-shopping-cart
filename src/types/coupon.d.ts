import { COUPON_DISCOUNT_TYPE } from "@/constants";

type CouponBase = {
  id: number;
  code: string;
  description: string;
  expirationDate: string;
  minimumAmount?: number;
  availableTime?: {
    start: string;
    end: string;
  };
};

type DiscountCoupon = CouponBase & {
  discount: number;
  discountType: COUPON_DISCOUNT_TYPE.Fixed | "percentage";
};

type BOGOCoupon = CouponBase & {
  buyQuantity: number;
  getQuantity: number;
  discountType: "buyXgetY";
};

type FreeShippingCoupon = CouponBase & {
  discountType: "freeShipping";
};

declare global {
  type Coupon = DiscountCoupon | BOGOCoupon | FreeShippingCoupon;
}

export {};
