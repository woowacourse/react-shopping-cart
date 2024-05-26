import { atom, atomFamily, selectorFamily } from 'recoil';
import { CartItem, Coupon } from '../type';
import { fetchCartItems } from '../apis';

import { AtomEffect } from 'recoil';
import { STORAGE } from '../constants';
import { fetchCoupons } from '../apis/coupon/coupon';

export const cartItemsState = atom<CartItem[]>({
  key: 'cartItemsState',
  default: fetchCartItems(),
});

export const itemQuantityState = atomFamily<number, number>({
  key: 'itemQuantityState',
  default: selectorFamily({
    key: 'itemQuantityState/Default',
    get:
      (params) =>
      ({ get }) => {
        const cartItems = get(cartItemsState);
        const item = cartItems.find((cartItem: CartItem) => cartItem.id === params);
        return item?.quantity ?? 1;
      },
  }),
});

export const checkedCartItemIdsState = atom<number[]>({
  key: 'checkedCartItemIdsState',
  default: JSON.parse(localStorage.getItem(STORAGE.checkedCartItems) ?? '[]') ?? [],
  effects: [localStorageEffect(STORAGE.checkedCartItems)],
});

function localStorageEffect<T>(key: string): AtomEffect<T> {
  return function ({ setSelf, onSet }) {
    const loadedData = localStorage.getItem(key);
    if (loadedData !== null) {
      setSelf(JSON.parse(loadedData));
    }

    onSet((newData: T) => {
      localStorage.setItem(key, JSON.stringify(newData));
    });
  };
}

export const fetchErrorState = atom<Error | null>({
  key: 'fetchErrorState',
  default: null,
});

export const couponsState = atom<Coupon[]>({
  key: 'couponsState',
  default: fetchCoupons(),
});

export const appliedCouponIdsState = atom<number[]>({
  key: 'appliedCouponIdsState',
  default: [],
});

export const remoteShippingOptionState = atom<boolean>({
  key: 'remoteShippingOptionState',
  default: false,
});

export const discountAmountState = atom<number>({
  key: 'discountAmountState',
  default: 0,
});
