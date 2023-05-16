import { atom, atomFamily, selector } from 'recoil';
import { CartItem } from '../types';

export const $CartIdList = atom<number[]>({
  key: 'CartIdList',
  default: [],
});

export const $CartItemState = atomFamily<CartItem, number>({
  key: 'CartItemState',
  default: id => {
    const initialCart: CartItem = {
      id,
      quantity: 0,
      product: {
        id,
        imageUrl: '',
        name: '',
        price: 0,
      },
    };
    return initialCart;
  },
});

export const $CartTotalPrice = selector<number>({
  key: 'CartTotalPrice',
  get: ({ get }) =>
    get($CartIdList).reduce((acc, id) => {
      const { quantity, product } = get($CartItemState(id));
      return quantity * product.price + acc;
    }, 0),
});

export const $ToastMessageList = atom<string[]>({
  key: 'ToastMessageList',
  default: [],
});
