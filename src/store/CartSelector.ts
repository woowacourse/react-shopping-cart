import { selector, selectorFamily } from 'recoil';
import { CartItem } from '../types';
import { cartState } from './CartState';
import { CART_ITEM_EXISTS } from '../constants';
import { productListState } from './ProductListState';

export type AddToCartSelectorParams = {
  id: number;
  quantity: number;
};

export const productFindByIdSelector = selectorFamily<CartItem | undefined, number>({
  key: 'productFindByIdFamily',
  get: (id: number) => ({ get }) => {
    const cart = get(cartState);
    return cart.find((item) => item.id === id);
  },
});

export const cartBadgeSelector = selector({
  key: 'cartBadgeSelector',
  get: ({ get }) => {
    const cart = get(cartState);
    const selectedProducts = new Set(cart);

    return selectedProducts;
  },
});

export const isSelectedProductSelector = selectorFamily<boolean, number>({
  key: 'isSelectedProductSelector',
  get: (id: number) => ({ get }) => {
    const cart = get(cartState);
    const isSelected = cart.find((item) => item.id === id) ? true : false;

    return isSelected;
  },
});

export const addToCartSelector = selectorFamily<CartItem[], AddToCartSelectorParams>({
  key: 'addToCartSelector',
  get: () => ({ get }) => get(cartState),
  set: ({ id, quantity }) => ({ get, set }) => {
    const cart = get(cartState);
    const productList = get(productListState);
    const cartItemIndex = cart.findIndex((item) => item.id === id);
    const updatedCart =
      cartItemIndex >= CART_ITEM_EXISTS
        ? [
            ...cart.slice(0, cartItemIndex),
            { ...cart[cartItemIndex], quantity: quantity },
            ...cart.slice(cartItemIndex + 1),
          ]
        : [
            ...cart,
            {
              id: id,
              quantity: quantity,
              product: productList.find((item) => item.id === id)!,
            },
          ];
    set(cartState, updatedCart);
  },
});

export const removeProductItemFromCartSelector = selectorFamily<CartItem[], number>({
  key: 'removeProductItemFromCartSelector',
  get: () => ({ get }) => get(cartState),
  set: (id: number) => ({ get, set }) => {
    const cart = get(cartState);
    const cartItemIndex = cart.findIndex((item) => item.id === id);
    if (cartItemIndex >= CART_ITEM_EXISTS) {
      const updatedCart = cart.filter((item) => item.id !== id);
      set(cartState, updatedCart);
    }
  },
});
