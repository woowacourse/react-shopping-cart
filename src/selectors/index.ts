import { selector, selectorFamily } from 'recoil';
import { cartState } from '../atoms';

export const totalQuantityInCart = selector({
  key: 'totalQuantityInCart',
  get: ({ get }) => {
    const cart = get(cartState);

    return cart.reduce((prev, cartItem) => {
      return prev + cartItem.quantity;
    }, 0);
  },
});

export const productQuantityInCart = selectorFamily({
  key: 'productQuantityInCart',
  get:
    (productId: number) =>
    ({ get }) => {
      const cart = get(cartState);

      const product = cart.find(
        (cartItem) => cartItem.product.id === productId,
      );

      if (!product) return 0;

      return product.quantity;
    },
});
