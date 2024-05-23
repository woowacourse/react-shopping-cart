import { COUPON_DISCOUNT_TYPE } from "../../../constants/couponDiscountType";
import {
  BuyXGetYRawCoupon,
  FixedDiscountRawCoupon,
  FreeShippingRawCoupon,
  PercentageDiscountRawCoupon,
} from "../../../types/rawCoupon";

const fixed5000: FixedDiscountRawCoupon = {
  id: 1,
  code: "FIXED5000",
  description: "5,000원 할인 테스트 쿠폰",
  expirationDate: "2024-12-31",
  discountType: COUPON_DISCOUNT_TYPE.fixed,
  discount: 5000,
};

const percentage10: PercentageDiscountRawCoupon = {
  id: 2,
  code: "PERCENT10",
  description: "10% 할인 테스트 쿠폰",
  expirationDate: "2024-12-31",
  discountType: COUPON_DISCOUNT_TYPE.percentage,
  discount: 10,
};

const buy2Get1: BuyXGetYRawCoupon = {
  id: 3,
  code: "2개 구매 시 1개 무료 테스트 쿠폰",
  description: "Buy 2 get 1 free",
  expirationDate: "2024-12-31",
  discountType: COUPON_DISCOUNT_TYPE.buyXgetY,
  buyQuantity: 2,
  getQuantity: 1,
};

const freeShipping: FreeShippingRawCoupon = {
  id: 4,
  code: "무료 배송 테스트 쿠폰",
  description: "Free shipping on your order",
  expirationDate: "2024-12-31",
  discountType: COUPON_DISCOUNT_TYPE.freeShipping,
};

export const TEST_COUPON = {
  fixed5000,
  percentage10,
  buy2Get1,
  freeShipping,
};
