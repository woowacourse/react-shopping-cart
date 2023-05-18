import { atom, atomFamily, selector } from 'recoil';
import { CartItem } from '../types';
import { getLocalStorage } from '../utils/localStorage';
import { LOCAL_STORAGE_KEY } from '../constants';

export const $CartIdList = atom<number[]>({
  key: 'CartIdList',
  default: getLocalStorage<CartItem[]>(LOCAL_STORAGE_KEY.CART_ITEM, []).map(({ product }) => product.id),
});

export const $CartItemState = atomFamily<CartItem | null, number | null>({
  key: 'CartItemState',
  default: id => {
    if (id) {
      const localData = getLocalStorage<CartItem[]>(LOCAL_STORAGE_KEY.CART_ITEM, []);
      return localData.find(cart => cart.product.id === id) as CartItem;
    }
    return null;
  },
});

export const $CartTotalPrice = selector<number>({
  key: 'CartTotalPrice',
  get: ({ get }) =>
    get($CartIdList).reduce((acc, id) => {
      const { quantity, product } = get($CartItemState(id)) as CartItem;
      return quantity * product.price + acc;
    }, 0),
});

export const $ToastMessageList = atom<string[]>({
  key: 'ToastMessageList',
  default: [],
});
