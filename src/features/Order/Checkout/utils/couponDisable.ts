import { CartItem } from '@/features/Cart/types/Cart.types';

import { MIRACLE_MORNING_HOURS, PRICE_THRESHOLDS, QUANTITY_LIMITS } from '../constants/coupons';
import { CouponResponse } from '../type/coupon.type';

export const getCouponDisableStatus = (
  coupon: CouponResponse,
  totalPrice: number,
  cartItems: CartItem[],
  specialDeliveryZone: boolean = false
) => {
  if (coupon.code === 'MIRACLESALE') {
    const today = new Date();
    return !MIRACLE_MORNING_HOURS.includes(today.getHours());
  }

  if (coupon.code === 'FIXED5000') {
    return totalPrice < PRICE_THRESHOLDS.FIXED_DISCOUNT_MIN;
  }

  if (coupon.code === 'BOGO') {
    return !cartItems.some((item) => item.quantity >= QUANTITY_LIMITS.BOGO_MIN_QUANTITY);
  }

  if (coupon.code === 'FREESHIPPING') {
    return (
      totalPrice < PRICE_THRESHOLDS.FREE_SHIPPING_MIN ||
      (totalPrice > PRICE_THRESHOLDS.FREE_SHIPPING_MAX && !specialDeliveryZone)
    );
  }
};
