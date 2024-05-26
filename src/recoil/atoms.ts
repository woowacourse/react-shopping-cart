import { atom } from 'recoil';
import { RECOIL_KEYS } from '@constants/constants';
import localStorageEffect from '@utils/localStorageEffect';
import { CartItem } from '@type/cartItem';

export const selectedCartItems = atom<CartItem[]>({
  key: RECOIL_KEYS.CART_ITEMS,
  default: [],
  effects: [localStorageEffect<CartItem[]>(RECOIL_KEYS.CART_ITEMS)],
});

export const isolatedRegionStore = atom({
  key: RECOIL_KEYS.ISOLATED_REGION,
  default: false,
});

export const discountAmountStore = atom({
  key: RECOIL_KEYS.DISCOUNT_AMOUNT,
  default: 0,
});
