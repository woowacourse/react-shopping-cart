import { Coupon } from "@/types/cart";

type TestCoupon =
  | "usableFixedDiscountCoupon"
  | "unusableFixedDiscountCoupon"
  | "usablePercentageDiscountCoupon"
  | "usableBuyXGetYCoupon"
  | "invalidExpirationCoupon"
  | "validExpirationCoupon"
  | "usableFreeShippingCoupon"
  | "unusableFreeShippingCoupon";

const TEST_COUPONS: Record<TestCoupon, Coupon> = {
  usableFixedDiscountCoupon: {
    id: 1,
    code: "FIXED5000",
    description: "5,000원 할인 쿠폰",
    expirationDate: "2024-11-30",
    discount: 5_000,
    minimumAmount: 80_000,
    discountType: "fixed",
  },
  unusableFixedDiscountCoupon: {
    id: 1,
    code: "FIXED5000",
    description: "5,000원 할인 쿠폰",
    expirationDate: "2024-11-30",
    discount: 5000,
    minimumAmount: 80_001,
    discountType: "fixed",
  },
  usablePercentageDiscountCoupon: {
    id: 1,
    code: "MIRACLESALE",
    description: "미라클모닝 30% 할인 쿠폰",
    expirationDate: "2024-07-31",
    discount: 30,
    availableTime: {
      start: "04:00:00",
      end: "07:00:00",
    },
    discountType: "percentage",
  },
  usableBuyXGetYCoupon: {
    id: 1,
    code: "BOGO",
    description: "2개 구매 시 1개 무료 쿠폰",
    expirationDate: "2024-05-30",
    buyQuantity: 2,
    getQuantity: 1,
    discountType: "buyXgetY",
  },
  invalidExpirationCoupon: {
    id: 1,
    code: "FIXED5000",
    description: "5,000원 할인 쿠폰",
    expirationDate: "2024-05-19",
    discount: 5_000,
    minimumAmount: 50_000,
    discountType: "fixed",
  },
  validExpirationCoupon: {
    id: 1,
    code: "FIXED5000",
    description: "5,000원 할인 쿠폰",
    expirationDate: "2024-05-21",
    discount: 5_000,
    minimumAmount: 50_000,
    discountType: "fixed",
  },
  usableFreeShippingCoupon: {
    id: 1,
    code: "FREESHIPPING",
    description: "8만원 이상 구매 시 무료 배송 쿠폰",
    expirationDate: "2024-08-31",
    minimumAmount: 80_000,
    discountType: "freeShipping",
  },
  unusableFreeShippingCoupon: {
    id: 1,
    code: "FREESHIPPING",
    description: "8만원 이상 구매 시 무료 배송 쿠폰",
    expirationDate: "2024-08-31",
    minimumAmount: 80_001,
    discountType: "freeShipping",
  },
};

export default TEST_COUPONS;
