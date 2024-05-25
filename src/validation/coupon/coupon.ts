import {
  isValidFreeShippingCondition,
  isValidMinimumPriceCondition,
  isValidTimeCondition,
  isValidTwoPlusOneCondition,
} from '@domain/discountType';
import { CouponValidation } from '@validation/coupon/coupon.type';

export const COUPON_VALIDATION_MAP = {
  fixed({ coupon, totalPrice }: CouponValidation) {
    if (!isValidMinimumPriceCondition(coupon, totalPrice)) return false;

    return true;
  },

  freeShipping({ coupon, shippingPrice }: CouponValidation) {
    if (!isValidFreeShippingCondition(coupon, shippingPrice)) return false;

    return true;
  },

  buyXgetY({ coupon, selectedCartItems }: CouponValidation) {
    if (coupon.code === 'BOGO' && isValidTwoPlusOneCondition(selectedCartItems)) return true;

    return false;
  },

  percentage({ coupon }: CouponValidation) {
    if (!isValidTimeCondition(coupon)) return false;

    return true;
  },
} as const;
