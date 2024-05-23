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

declare global {
  type DiscountCoupon = CouponBase & {
    discount: number;
    discountType: typeof COUPON_DISCOUNT_TYPE.Fixed | typeof COUPON_DISCOUNT_TYPE.Percentage;
  };

  type BOGOCoupon = CouponBase & {
    buyQuantity: number;
    getQuantity: number;
    discountType: typeof COUPON_DISCOUNT_TYPE.BuyXgetY;
  };

  type FreeShippingCoupon = CouponBase & {
    discountType: typeof COUPON_DISCOUNT_TYPE.FreeShipping;
  };
  type Coupon = DiscountCoupon | BOGOCoupon | FreeShippingCoupon;
}

export {};
