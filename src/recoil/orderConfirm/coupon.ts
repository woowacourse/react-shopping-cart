import OrderConfirmFetcher from '@apis/orderConfirm';
import { Coupon } from '@appTypes/orderConfirm';
import { atom, selector } from 'recoil';

export const couponListSelector = selector<Coupon[]>({
  key: 'couponListSelector',
  get: async () => {
    const coupons = await OrderConfirmFetcher.getCoupons();
    return coupons;
  },
});

export const couponListAtom = atom<Coupon[]>({
  key: 'couponListAtom',
  default: couponListSelector,
});

export const selectedCouponListAtom = atom<Coupon[]>({
  key: 'selectedCouponListAtom',
  default: [],
});
