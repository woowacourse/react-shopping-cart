import { Coupon } from '@appTypes/orderConfirm';
import { couponListSelector } from '@recoil/orderConfirm/selectors';
import { atom } from 'recoil';

export const couponListAtom = atom<Coupon[]>({
  key: 'couponListAtom',
  default: couponListSelector,
});

export const totalDiscountPriceAtom = atom<number>({
  key: 'totalDiscountPriceAtom',
  default: 0,
});
