import { CartItem } from '@/features/Cart/types/Cart.types';

import { CouponResponse } from '../type/coupon.type';

export const getCouponDisableStatus = (
  coupon: CouponResponse,
  totalPrice: number,
  cartItems: CartItem[],
  specialDeliveryZone: boolean = false
) => {
  if (coupon.code === 'MIRACLESALE') {
    const today = new Date();
    return ![4, 5, 6, 7].includes(today.getHours());
  }

  if (coupon.code === 'FIXED5000') {
    return totalPrice < 100000;
  }

  if (coupon.code === 'BOGO') {
    return !cartItems.some((item) => item.quantity >= 3);
  }

  if (coupon.code === 'FREESHIPPING') {
    return totalPrice < 50000 || (totalPrice > 100000 && !specialDeliveryZone);
  }
};
