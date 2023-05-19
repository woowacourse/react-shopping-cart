import { DefaultValue, atom, selector, selectorFamily } from 'recoil';

import { getCartList } from '../api/cartAPI';
import { updateCartItemQuantity } from '../domain/cart';
import { CartItemData } from '../types';

const cartListState = atom<CartItemData[]>({
  key: 'cartList',
  default: [],
  effects: [({ setSelf }) => setSelf(getCartList().then((savedValue) => savedValue ?? []))],
});

const cartIdListState = selector({
  key: 'cartIdList',
  get: ({ get }) => {
    const cartList = get(cartListState);

    return cartList.map((cartItem) => cartItem.product.id);
  },
});

const cartListItemCountState = selector<number>({
  key: 'cartListItemCount',
  get: ({ get }) => get(cartListState).length,
});

const cartItemQuantityState = selectorFamily<number, number>({
  key: 'cartItemQuantity',
  get:
    (productId) =>
    ({ get }) => {
      const cartList = get(cartListState);

      return cartList.find((cartItem) => cartItem.product.id === productId)?.quantity ?? 0;
    },
  set:
    (productId) =>
    ({ set }, quantity) => {
      if (!quantity || quantity instanceof DefaultValue) return;

      set(cartListState, (prevCartList) =>
        updateCartItemQuantity(prevCartList, productId, quantity)
      );
    },
});

const cartListSubTotalState = selector<number>({
  key: 'cartListSubTotal',
  get: ({ get }) => {
    const cartList = get(cartListState);

    return cartList.reduce((acc, curr) => acc + curr.product.price * curr.quantity, 0);
  },
});

export {
  cartIdListState,
  cartListState,
  cartListItemCountState,
  cartItemQuantityState,
  cartListSubTotalState,
};
