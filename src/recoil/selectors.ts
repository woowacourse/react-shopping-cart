import { cartItemsState, isCheckedItemIdsState, itemQuantityState } from './atoms';

import { selector } from 'recoil';
import { isCheckedItemIdsState, itemQuantityState, currentCartItemsState } from './atoms';
import { Product } from '../type';

export const orderAmountState = selector<number>({
  key: 'orderAmountState',
  get: ({ get }) => {
    const cartItems = get(currentCartItemsState);
    const isCheckedItemIds = get(isCheckedItemIdsState);

    return cartItems.reduce((acc, cartItem) => {
      if (isCheckedItemIds[cartItem.id] === false) return acc;
      const quantity = get(itemQuantityState(cartItem.id));
      const currentItemAmount = cartItem.product.price * quantity;
      return acc + currentItemAmount;
    }, 0);
  },
});

export const checkedItemState = selector({
  key: 'checkedItemState',
  get: ({ get }) => {
    const cartItems = get(currentCartItemsState);
    const isCheckedItemIds = get(isCheckedItemIdsState);

    const result = cartItems.reduce(
      (arr, item) => {
        if (isCheckedItemIds[item.id] === false) return arr;
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
    const cartItems = get(currentCartItemsState);
    const isCheckedItemIds = get(isCheckedItemIdsState);

    return cartItems.some((item) => isCheckedItemIds[item.id] !== false);
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
