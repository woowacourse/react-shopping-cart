import { getCartList } from '@/api/cartItem';
import { getCouponList } from '@/api/coupons';
import { selector } from 'recoil';

export const cartState = selector({
  key: 'cartState',
  get: async () => {
    const cart = await getCartList();
    return cart;
  },
});

export const couponState = selector({
  key: 'couponState',
  get: async () => {
    const coupon = await getCouponList();
    return coupon;
  },
});
