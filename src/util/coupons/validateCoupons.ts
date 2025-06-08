import { CouponType } from "../../type/Coupons";

import { validateFixedDiscountCoupon } from "./FixedDiscountCoupon/validate";

export const validateExpirationDate = (expirationDate: string): boolean => {
  const today = new Date();
  const expiration = new Date(`${expirationDate}T23:59:59`);
  return expiration >= today;
};

export const VALIDATE_COUPONS = {
  [CouponType.FIXED]: validateFixedDiscountCoupon,
  [CouponType.BUY_X_GET_Y]: () => false, //validateBuyXGetYCoupon,
  [CouponType.FREE_SHIPPING]: () => false, //validateFreeShippingCoupon,
  [CouponType.PERCENTAGE]: () => false, //validatePercentageDiscountCoupon,
};
