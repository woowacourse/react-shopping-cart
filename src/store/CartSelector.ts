import { selector, selectorFamily } from 'recoil';
import { CartItem, Product } from '../types';
import { cartState } from './CartState';
import { CART_ITEM_EXISTS, NONE_QUANTITY } from '../constants';
import { productListState } from './ProductListState';
import { setDataInLocalStorage } from '../utils/setDataInLocalStorage';

export type SelectorParams = {
  id: number;
  quantity?: number;
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

    return selectedProducts.size;
  },
});

export const isSelectedProductSelector = selectorFamily<boolean, number>({
  key: 'isSelectedProductSelector',
  get: (id: number) => ({ get }) => {
    const cart = get(cartState);

    return cart.some((item) => item.id === id);
  },
});

export const selectedProductSelector = selectorFamily<Product, number>({
  key: 'selectedProductSelector',
  get: (id: number) => ({ get }) => {
    const productList = get(productListState);
    const selectedProduct = productList.find((item) => item.id === id)!;

    return selectedProduct;
  },
});

export const updateCartSelector = selectorFamily<number, SelectorParams>({
  key: 'addToCartSelector',
  get: ({ id }) => ({ get }): number => {
    const cart = get(cartState);

    return cart.some((item) => item.id === id)
      ? cart.find((item) => item.id === id)!.quantity
      : NONE_QUANTITY;
  },
  set: ({ id, quantity = 0 }) => ({ get, set }) => {
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
    setDataInLocalStorage<CartItem[]>('cart', cart);

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
      setDataInLocalStorage<CartItem[]>('cart', cart);

      set(cartState, updatedCart);
    }
  },
});

export const totalPriceSelector = selector<number>({
  key: 'totalPriceSelector',
  get: ({ get }) => {
    const cart = get(cartState);
    const totalPrice = cart.reduce((total, item) => {
      const quantity = item.quantity;
      const price = item.product.price;

      return total + quantity * price;
    }, 0);

    return totalPrice;
  },
});
