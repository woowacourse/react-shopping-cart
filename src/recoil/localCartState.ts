import { DefaultValue, atom, selector, selectorFamily } from 'recoil';
import { LocalCart } from '../types/Cart';
import serverCartState from './serverCartState';

const localCartStateSelector = selector<LocalCart>({
  key: 'localCartStateSelector',

  get: ({ get }) => {
    const localCart: LocalCart = {};

    get(serverCartState).forEach(({ id, quantity, product: { price } }) => {
      localCart[id] = { quantity, price };
    });

    return localCart;
  },
});

const localCartState = atom<LocalCart>({
  key: 'localCartState',
  default: localCartStateSelector,
});

export const cartLengthSelector = selector({
  key: 'cartLengthSelector',

  get: ({ get }) => Object.keys(get(localCartState)).length,
});

export const productCountSelector = selectorFamily<number, number>({
  key: 'productCountSelector',

  get:
    (productId) =>
    ({ get }) => {
      const product = get(localCartState)[productId];
      return product ? product.quantity : 0;
    },

  set:
    (productId) =>
    ({ get, set }, newCount) => {
      const newCart = { ...get(localCartState) };

      if (newCount === 0 || newCount instanceof DefaultValue) {
        delete newCart[productId];
      } else {
        newCart[productId] = { ...newCart[productId], quantity: newCount };
      }

      set(localCartState, newCart);
    },
});

export const productPriceSelector = selectorFamily<number, number>({
  key: 'productPriceSelector',

  get:
    (productId) =>
    ({ get }) => {
      const { quantity, price } = get(localCartState)[productId];

      return price ? quantity * price : 0;
    },
});

export default localCartState;
