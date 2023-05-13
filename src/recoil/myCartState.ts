import { DefaultValue, atom, selector, selectorFamily } from 'recoil';

import { MyCart } from '../types/Product';

const myCartState = atom<MyCart>({
  key: 'myCartState',
  default: {},
});

export const cartLengthSelector = selector({
  key: 'cartLengthSelector',
  get: ({ get }) => Object.keys(get(myCartState)).length,
});

export const productCountSelector = selectorFamily<number, number>({
  key: 'productCountSelector',

  get: (productId) => ({ get }) => get(myCartState)[productId] ?? 0,

  set: (productId) => ({ get, set }, newCount) => {
    const newCart = { ...get(myCartState) };

    if (newCount === 0 || newCount instanceof DefaultValue) {
      delete newCart[productId];
    } else {
      newCart[productId] = newCount;
    }

    set(myCartState, newCart);
  }
})

export default myCartState;
