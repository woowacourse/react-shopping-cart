import { DefaultValue, selectorFamily } from 'recoil';
import type { CartItem } from '../../type';
import cartState from '../atoms/cartState';

const cartItemState = selectorFamily<CartItem | null, number>({
  key: 'cartItemState',
  get:
    (productId) =>
    ({ get }) => {
      const cart = get(cartState);
      const cartProduct = cart.find((it) => it.product.id === productId) ?? null;

      return cartProduct;
    },
  set:
    (productId) =>
    ({ get, set }, newCartItem) => {
      const cart = get(cartState);

      const newCart = cart
        .map((it) => (it.product.id === productId ? newCartItem : it))
        .filter((it): it is CartItem => it !== null && !(it instanceof DefaultValue));

      if (
        newCartItem !== null &&
        !(newCartItem instanceof DefaultValue) &&
        cart.every((cartItem) => cartItem.product.id !== productId)
      ) {
        newCart.push(newCartItem);
      }

      set(cartState, newCart);
    },
});

export default cartItemState;
