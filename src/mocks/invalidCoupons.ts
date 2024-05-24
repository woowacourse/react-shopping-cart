import { Coupon } from "../types/coupons";

const expiredYearCoupon: Coupon = {
  id: 2,
  code: "EXPIRED",
  description: "만료된 쿠폰",
  discountType: "fixed",
  expirationDate: "2000-12-31",
  isSelected: false,
  isValidCoupon: true,
  isApplicableCoupon: true,
};
const expiredMonthCoupon: Coupon = {
  id: 2,
  code: "EXPIRED",
  description: "만료된 쿠폰",
  discountType: "fixed",
  expirationDate: "2024-04-31",
  isSelected: false,
  isValidCoupon: true,
  isApplicableCoupon: true,
};
const expiredDayCoupon: Coupon = {
  id: 2,
  code: "EXPIRED",
  description: "만료된 쿠폰",
  discountType: "fixed",
  expirationDate: "2024-05-01",
  isSelected: false,
  isValidCoupon: true,
  isApplicableCoupon: true,
};

export const expiredCoupons: Coupon[] = [
  expiredYearCoupon,
  expiredMonthCoupon,
  expiredDayCoupon,
];
