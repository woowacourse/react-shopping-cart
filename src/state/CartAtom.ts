import { atom, selector, selectorFamily } from 'recoil';
import { CartProduct } from 'types/product';

export const cartState = atom<CartProduct[]>({
  key: 'cartState',
  default: [],
  effects: [
    ({ onSet, setSelf }) => {
      onSet((newValue) => {
        if (newValue.every((v) => v.quantity > 0)) return;

        setSelf(newValue.filter((v) => v.quantity > 0));
      });
    },
  ],
});

export const filteredCartProductState = selectorFamily({
  key: 'filteredCartProductState',
  get:
    (id: CartProduct['id']) =>
    ({ get }) => {
      const cart = get(cartState);

      return cart.find((product) => product.id === id);
    },
});

export const cartQuantityState = selector<number>({
  key: 'cartQuantityState',
  get: ({ get }) => {
    return get(cartState).length;
  },
});
