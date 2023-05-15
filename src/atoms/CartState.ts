import { atom, atomFamily, selector } from 'recoil';
import { CartProductList } from '../types/productType';

const cartStateInit: CartProductList[] = [];

export const cartState = atom({
  key: 'CartState',
  default: cartStateInit,
});

export const cartStateFamily = atomFamily({
  key: 'CartStateFamily',
  default: (id: number) => ({
    id,
    quantity: 0,
    product: {
      id,
      price: 0,
      name: '',
      imageUrl: '',
    },
  }),
});

export const cartStateLength = selector({
  key: 'CartStateLength',
  get: ({ get }) => {
    const cartStateLength = get(cartState).length;

    return cartStateLength;
  },
});
