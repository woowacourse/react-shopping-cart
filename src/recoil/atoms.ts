import { atom, atomFamily } from 'recoil';
import { CartItems, ItemDetailsStateType } from '../types/Item';

export const itemsState = atom<CartItems[]>({
  key: 'itemsState',
  default: [],
});

export const itemDetailsState = atomFamily<ItemDetailsStateType, number>({
  key: 'itemDetailsState',
export const couponsState = atom<Coupon[]>({
  key: 'couponsState',
  default: [],
});

export const couponDetailState = atomFamily<CouponDetailState, number>({
  key: 'couponDetailState',
  default: {
    isChecked: false,
    disabled: false,
  },
});
