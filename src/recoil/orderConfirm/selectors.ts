import { fetchCoupons } from '@apis/shoppingCart';
import { Coupon } from '@appTypes/orderConfirm';
import { selector } from 'recoil';

export const couponListSelector = selector<Coupon[]>({
  key: 'couponListSelector',
  get: async () => {
    const coupons = await fetchCoupons();
    return coupons;
  },
});
