import { selector, selectorFamily } from 'recoil';
import { cartState } from '../atoms';

export const productListQuery = selector({
  key: 'ProductList',
  get: async () => {
    const mockData = await fetch('./mockData.json').then((response) =>
      response.json(),
    );

    return mockData.products;
  },
});

export const totalQuantityInCart = selector({
  key: 'TotalQuantityInCart',
  get: ({ get }) => {
    const cart = get(cartState);

    return cart.reduce((prev, cartProduct) => {
      return prev + cartProduct.quantity;
    }, 0);
  },
});

export const productQuantityInCart = selectorFamily({
  key: 'ProductQuantityInCart',
  get:
    (productId: number) =>
    ({ get }) => {
      const cart = get(cartState);

      const product = cart.find(
        (cartProduct) => cartProduct.product.id === productId,
      );

      if (!product) return 0;

      return product.quantity;
    },
});
