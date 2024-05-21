import { Coupon } from '@appTypes/orderConfirm';
import { couponListSelector } from '@recoil/orderConfirm/selectors';
import { atom } from 'recoil';

export const couponListAtom = atom<Coupon[]>({
  key: 'couponsAtom',
  default: couponListSelector,
});
