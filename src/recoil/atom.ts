import { atom } from 'recoil';
import { LOCAL_STORAGE_KEY } from '../constants';
import { getLocalStorage } from '../utils/localStorage';
import type { CartItem, ToastState } from '../types';

export const $CheckedCartIdList = atom<number[]>({
  key: 'CheckStateList',
  default: getLocalStorage<CartItem[]>(LOCAL_STORAGE_KEY.CART_ITEM, []).map(item => item.id),
});

export const $CartIdList = atom<number[]>({
  key: 'CartIdList',
  default: getLocalStorage<CartItem[]>(LOCAL_STORAGE_KEY.CART_ITEM, []).map(item => item.id),
});

// export const $CartItemState = atomFamily<CartItem | null, number | null>({
//   key: 'CartItemState',
//   default: id => {
//     if (id) {
//       const localData = getLocalStorage<CartItem[]>(LOCAL_STORAGE_KEY.CART_ITEM, []);
//       return localData.find(cart => cart.product.id === id) as CartItem;
//     }
//     return null;
//   },
// });

// export const $CartTotalPrice = selector<number>({
//   key: 'CartTotalPrice',
//   get: ({ get }) =>
//     get($CheckedCartIdList).reduce((acc, id) => {
//       const data = get($CartItemState(id));
//       if (data !== null) {
//         const { quantity, product } = data;
//         return quantity * product.price + acc;
//       }
//       return acc;
//     }, 0),
// });

export const $ToastStateList = atom<ToastState[]>({
  key: 'ToastMessageList',
  default: [],
});
