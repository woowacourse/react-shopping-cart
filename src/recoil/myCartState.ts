import { atom, selector } from 'recoil';

import { MyCart } from '../types/Product';

const myCartState = atom<MyCart>({
  key: 'myCartState',
  default: {},
});

export const makeProductCountSelector = (targetId: number) => {
  return selector({
    key: 'productCountSelector',
    get: ({ get }) => {
      const product = get(myCartState)[targetId];

      return product ? product.count : 0;
    },
  });
};

export const cartLengthSelector = selector({
  key: 'cartLengthSelector',
  get: ({ get }) => Object.keys(get(myCartState)).length,
});

export default myCartState;
