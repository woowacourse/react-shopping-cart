import { isExpiredDate } from '@utils/date';
import { COUPON_VALIDATION_MAP } from '@validation/coupon/coupon';
import { CouponValidation } from '@validation/coupon/coupon.type';

export const isApplicabilityCoupon = ({ coupon, totalPrice, shippingPrice, selectedCartItems }: CouponValidation) => {
  if (isExpiredDate(coupon.expirationDate)) return false;

  const isValidCoupon = COUPON_VALIDATION_MAP[coupon.discountType];

  return isValidCoupon({ coupon, totalPrice, shippingPrice, selectedCartItems });
};
