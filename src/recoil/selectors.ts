import { CartItem, Product } from '../type';
import { itemQuantityState, uncheckedItemIdsState } from './atoms';

import { fetchCartItems } from '../apis';
import { selector } from 'recoil';

export const cartItemsState = selector<CartItem[]>({
  key: 'cartItemsState',
  get: async () => {
    const cartItems = await fetchCartItems();
    return cartItems;
  },
  set: (_, newValue) => {
    return newValue;
  },
});

export const orderAmountState = selector<number>({
  key: 'orderAmountState',
  get: ({ get }) => {
    const cartItems = get(cartItemsState);
    const uncheckedItemIds = get(uncheckedItemIdsState);

    return cartItems.reduce((acc, cartItem) => {
      if (uncheckedItemIds.includes(cartItem.id)) return acc;
      const quantity = get(itemQuantityState(cartItem.id));
      const currentItemAmount = cartItem.product.price * quantity;
      return acc + currentItemAmount;
    }, 0);
  },
});

export const checkedItemState = selector({
  key: 'checkedItemState',
  get: ({ get }) => {
    const cartItems = get(cartItemsState);
    const uncheckedItemIds = get(uncheckedItemIdsState);

    const result = cartItems.reduce(
      (arr, item) => {
        if (uncheckedItemIds.includes(item.id)) return arr;
        const currentObj = { product: item.product, quantity: get(itemQuantityState(item.id)) };
        arr.push(currentObj);
        return arr;
      },
      [] as { product: Product; quantity: number }[],
    );

    return result;
  },
});

export const hasCheckedItemsState = selector<boolean>({
  key: 'hasCheckedItemsState',
  get: ({ get }) => {
    const cartItems = get(cartItemsState);
    const uncheckedItemIds = get(uncheckedItemIdsState);

    return cartItems.some((item) => !uncheckedItemIds.includes(item.id));
  },
});

export const totalCartItemsCountState = selector<number>({
  key: 'totalCartItemsCountState',
  get: ({ get }) => {
    const checkedItems = get(checkedItemState);
    return checkedItems.length;
  },
});

export const totalProductsCountState = selector<number>({
  key: 'totalProductsCountState',
  get: ({ get }) => {
    const checkedItems = get(checkedItemState);
    return checkedItems.reduce((acc, cur) => acc + cur.quantity, 0);
  },
});

export const deliveryFeeState = selector<number>({
  key: 'deliveryFeeState',
  get: ({ get }) => {
    const hasCheckedItems = get(hasCheckedItemsState);

    const orderAmount = get(orderAmountState);
    return orderAmount >= 100000 || !hasCheckedItems ? 0 : 3000;
  },
});

export const totalAmountState = selector<number>({
  key: 'totalAmountState',
  get: ({ get }) => {
    const orderAmount = get(orderAmountState);
    const deliveryFee = get(deliveryFeeState);
    return orderAmount + deliveryFee;
  },
});
