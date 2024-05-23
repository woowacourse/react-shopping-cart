import { fetchCoupons } from '@apis/shoppingCart';
import { Coupon } from '@appTypes/orderConfirm';
import { atom, selector } from 'recoil';

export const couponListSelector = selector<Coupon[]>({
  key: 'couponListSelector',
  get: async () => {
    const coupons = await fetchCoupons();
    return coupons;
  },
});

export const couponListAtom = atom<Coupon[]>({
  key: 'couponListAtom',
  default: couponListSelector,
});

export const selectedCouponListAtom = atom<Required<Pick<Coupon, 'id' | 'discount'>>[]>({
  key: 'selectedCouponListAtom',
  default: [],
});
