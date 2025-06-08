import { CouponType } from "../../type/Coupons";
import { validateFixedDiscountCoupon } from "./FixedDiscountCoupon/validate";
import { validateBuyXGetYCoupon } from "./BuyXGetYCoupon/validate";
import { validateFreeShippingCoupon } from "./FreeShippingCoupon/validate";
import { validatePercentageDiscountCoupon } from "./PercentageDiscountCoupon/validate";

export const validateExpirationDate = (expirationDate: string): boolean => {
  const today = new Date();
  const expiration = new Date(`${expirationDate}T23:59:59`);
  return expiration >= today;
};

export const VALIDATE_COUPONS = {
  [CouponType.FIXED]: validateFixedDiscountCoupon,
  [CouponType.BUY_X_GET_Y]: validateBuyXGetYCoupon,
  [CouponType.FREE_SHIPPING]: validateFreeShippingCoupon,
  [CouponType.PERCENTAGE]: validatePercentageDiscountCoupon,
};
