import { atom } from 'recoil';
import { CartItemProps, CouponProps } from '../../types';
import { updateSelectedItemLocalStorage } from '../../utils/updateSelectedItemLocalStorage';

export const cartItemsState = atom<CartItemProps[]>({
  key: 'cartItemsState',
  default: [],
});

export const selectedItemsState = atom<CartItemProps[]>({
  key: 'selectedItemsState',
  default: [],
  effects: [updateSelectedItemLocalStorage('selectedItemsState')],
});

export const cartItemsCountState = atom<number>({
  key: 'cartItemsCount',
  default: 0,
});

export const cartErrorMessageState = atom<string>({
  key: 'cartErrorMessage',
  default: '',
});

export const isLandAndMoutainAreaCheckedState = atom<boolean>({
  key: 'isLandAndMoutainAreaChecked',
  default: false,
});

export const couponItemsState = atom<CouponProps[]>({
  key: 'couponItemsState',
  default: [],
});

export const previewSelectedCouponsState = atom<CouponProps[]>({
  key: 'previewSelectedCouponsState',
  default: [],
});

export const finalSelectedCouponsState = atom<CouponProps[]>({
  key: 'finalSelectedCouponsState',
  default: [],
});
