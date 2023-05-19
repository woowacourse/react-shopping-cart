import { DefaultValue, atom, selector, selectorFamily } from 'recoil';

import { getCartList } from '../api/cartAPI';
import { CART_LIST_CHECKBOX_KEY } from '../constants/store';
import { addCartItemQuantity, checkItemInCart, updateCartItemQuantity } from '../domain/cart';
import { CartItemData } from '../types';
import { checkedListState } from './checkbox';

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

      set(cartListState, (prevCartList) => {
        const hasItem = checkItemInCart(prevCartList, productId);

        return hasItem
          ? updateCartItemQuantity(prevCartList, productId, quantity)
          : addCartItemQuantity(prevCartList, productId, quantity);
      });
    },
});

const cartListSubTotalState = selector({
  key: 'cartListSubTotal',
  get: ({ get }) => {
    const cartList = get(cartListState);
    const checkedCartItemList = get(checkedListState(CART_LIST_CHECKBOX_KEY));

    const subTotal = cartList
      .filter((cartItem) => checkedCartItemList.has(cartItem.product.id))
      .reduce((acc, curr) => acc + curr.product.price * curr.quantity, 0);

    return subTotal;
  },
});

export {
  cartIdListState,
  cartListState,
  cartListItemCountState,
  cartItemQuantityState,
  cartListSubTotalState,
};
