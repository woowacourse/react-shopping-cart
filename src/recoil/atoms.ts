import { CartItem, Coupon } from '../type';
import { atom, selector } from 'recoil';

import { fetchCartItems } from '../apis';
import parseJsonSafely from '../utils/parseJsonSafely';

const UNCHECKED_ITEM_IDS = 'uncheckedItemIds';

export const cartItemsState = atom<CartItem[]>({
  key: 'cartItemsState',
  default: selector({
    key: 'cartItemsState/Default',
    get: async () => {
      const products = await fetchCartItems();
      return products;
    },
  }),
});

export const uncheckedItemIdsState = atom<number[]>({
  key: 'isCheckedItemIdsState',
  default: [],
  effects: [
    ({ setSelf, onSet }) => {
      const savedValue = localStorage.getItem(UNCHECKED_ITEM_IDS);
      if (savedValue != null) {
        setSelf(parseJsonSafely(savedValue) ?? []);
      }

      onSet((newValue, _, isReset) => {
        isReset
          ? localStorage.removeItem(UNCHECKED_ITEM_IDS)
          : localStorage.setItem(UNCHECKED_ITEM_IDS, JSON.stringify(newValue));
      });
    },
  ],
});

export const selectedCouponsState = atom<Coupon[]>({ key: 'selectedCouponIdsState', default: [] });

export const isIslandOrMountainState = atom<boolean>({
  key: 'isIslandOrMountainState',
  default: false,
});
