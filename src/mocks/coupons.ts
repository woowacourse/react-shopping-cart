import {
  BOGOCoupon,
  Coupon,
  FixedDiscountCoupon,
  FreeShippingCoupon,
  PercentageDiscountCoupon,
  RawCoupon,
} from "../types/coupons";

const fixedDiscountCoupon: FixedDiscountCoupon = {
  id: 1,
  code: "FIXED5000",
  description: "5,000원 할인 쿠폰",
  discount: 5000,
  discountType: "fixed",
  minimumAmount: 100000,
  expirationDate: "2024-11-30",
  isSelected: false,
  isValidCoupon: true,
  isApplicableCoupon: true,
};

const bogoCoupon: BOGOCoupon = {
  id: 2,
  code: "BOGO",
  description: "2개 구매 시 1개 무료 쿠폰",
  discountType: "buyXgetY",
  buyQuantity: 2,
  getQuantity: 1,
  expirationDate: "2024-04-30",
  isSelected: false,
  isValidCoupon: true,
  isApplicableCoupon: true,
};

const freeShippingCoupon: FreeShippingCoupon = {
  id: 3,
  code: "FREESHIPPING",
  description: "5만원 이상 구매 시 무료 배송 쿠폰",
  discountType: "freeShipping",
  minimumAmount: 50000,
  expirationDate: "2024-08-31",
  isSelected: false,
  isValidCoupon: true,
  isApplicableCoupon: true,
};

const percentageDiscountCoupon: PercentageDiscountCoupon = {
  id: 4,
  code: "MIRACLESALE",
  description: "미라클모닝 30% 할인 쿠폰",
  discount: 30,
  discountType: "percentage",
  availableTime: {
    start: "04:00:00",
    end: "07:00:00",
  },
  expirationDate: "2024-07-31",
  isSelected: false,
  isValidCoupon: true,
  isApplicableCoupon: true,
};

export const mockCoupons: Coupon[] = [
  fixedDiscountCoupon,
  bogoCoupon,
  freeShippingCoupon,
  percentageDiscountCoupon,
];

export const mockRawCoupons: RawCoupon[] = [
  {
    id: 1,
    code: "FIXED5000",
    description: "5,000원 할인 쿠폰",
    discount: 5000,
    discountType: "fixed",
    minimumAmount: 100000,
    expirationDate: "2024-11-30",
  },
  {
    id: 2,
    code: "BOGO",
    description: "2개 구매 시 1개 무료 쿠폰",
    discountType: "buyXgetY",
    buyQuantity: 2,
    getQuantity: 1,
    expirationDate: "2024-04-30",
  },
  {
    id: 3,
    code: "FREESHIPPING",
    description: "5만원 이상 구매 시 무료 배송 쿠폰",
    discountType: "freeShipping",
    minimumAmount: 50000,
    expirationDate: "2024-08-31",
  },
  {
    id: 4,
    code: "MIRACLESALE",
    description: "미라클모닝 30% 할인 쿠폰",
    discount: 30,
    discountType: "percentage",
    availableTime: {
      start: "04:00:00",
      end: "07:00:00",
    },
    expirationDate: "2024-07-31",
  },
];
