import { api } from 'apis/products/api';
import { atom, selector, selectorFamily } from 'recoil';
import { CartProduct } from 'types/product';

export const cartState = atom<CartProduct[]>({
  key: 'cartState',
  default: selector({
    key: 'cartState/Default',
    get: () => {
      return api.getCartProducts();
    },
  }),
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

export const cartProductsCountState = selector<number>({
  key: 'cartProductsCountState',
  get: ({ get }) => {
    return get(cartState).length;
  },
});

export const cartProductsCheckedCountState = selector<number>({
  key: 'cartProductsCheckedCountState',
  get: ({ get }) => {
    return get(cartState).filter((cartProduct) => cartProduct.checked === true).length;
  },
});
