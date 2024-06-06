import {
  BuyXgetYDiscountCoupon,
  Coupon,
  DiscountType,
  FixedDiscountCoupon,
  FreeShippingCoupon,
  PercentageDiscountCoupon,
} from "../types";

export const mockCouponData: Coupon[] = [
  {
    id: 1,
    code: "FIXED5000",
    description: "5,000원 할인 쿠폰",
    expirationDate: "2024-11-30",
    discountType: DiscountType.Fixed,
    discount: 5000,
    minimumAmount: 100000,
  } as FixedDiscountCoupon,
  {
    id: 2,
    code: "BOGO",
    description: "2개 구매 시 1개 무료 쿠폰",
    expirationDate: "2024-04-30",
    discountType: DiscountType.BuyXgetY,
    buyQuantity: 2,
    getQuantity: 1,
  } as BuyXgetYDiscountCoupon,
  {
    id: 3,
    code: "FREESHIPPING",
    description: "5만원 이상 구매 시 무료 배송 쿠폰",
    expirationDate: "2024-08-31",
    discountType: DiscountType.FreeShipping,
    minimumAmount: 50000,
  } as FreeShippingCoupon,
  {
    id: 4,
    code: "MIRACLESALE",
    description: "미라클모닝 30% 할인 쿠폰",
    expirationDate: "2024-07-31",
    discountType: DiscountType.Percentage,
    discount: 30,
    availableTime: {
      start: "04:00:00",
      end: "07:00:00",
    },
  } as PercentageDiscountCoupon,
];
