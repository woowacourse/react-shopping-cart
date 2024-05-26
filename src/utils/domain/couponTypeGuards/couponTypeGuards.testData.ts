import { COUPON_DISCOUNT_TYPE } from "../../../constants/couponDiscountType";
import type { CouponDiscountType } from "../../../types/couponDiscountType";
import type {
  BuyXGetYRawCoupon,
  FixedDiscountRawCoupon,
  FreeShippingRawCoupon,
  PercentageDiscountRawCoupon,
  RawCoupon,
} from "../../../types/rawCoupon";

const fixed: FixedDiscountRawCoupon = {
  id: 1,
  code: "FIXED100",
  description: "Get $100 off",
  expirationDate: "2024-12-31",
  discountType: COUPON_DISCOUNT_TYPE.fixed,
  discount: 100,
};

const percentage: PercentageDiscountRawCoupon = {
  id: 2,
  code: "PERCENT10",
  description: "Get 10% off",
  expirationDate: "2024-12-31",
  discountType: COUPON_DISCOUNT_TYPE.percentage,
  discount: 10,
};

const buyXgetY: BuyXGetYRawCoupon = {
  id: 3,
  code: "BUY2GET1",
  description: "Buy 2 get 1 free",
  expirationDate: "2024-12-31",
  discountType: COUPON_DISCOUNT_TYPE.buyXgetY,
  buyQuantity: 2,
  getQuantity: 1,
};

const freeShipping: FreeShippingRawCoupon = {
  id: 4,
  code: "FREESHIPPING",
  description: "Free shipping",
  expirationDate: "2024-12-31",
  discountType: COUPON_DISCOUNT_TYPE.freeShipping,
};

export const TEST_COUPON: {
  [type in CouponDiscountType]: RawCoupon;
} = {
  fixed,
  percentage,
  buyXgetY,
  freeShipping,
} as const;
