import { selector } from 'recoil';
import { isCheckedItemIdsState, cartItemsState, itemQuantityState } from './atoms';

export const orderAmountState = selector<number>({
  key: 'orderAmountState',
  get: ({ get }) => {
    const cartItems = get(cartItemsState);
    const isCheckedItemIds = get(isCheckedItemIdsState);

    return cartItems.reduce((acc, cartItem) => {
      if (!isCheckedItemIds[cartItem.id]) return acc;
      const quantity = get(itemQuantityState(cartItem.id));
      const currentItemAmount = cartItem.product.price * quantity;
      return acc + currentItemAmount;
    }, 0);
  },
});

export const hasCheckedItemsState = selector<boolean>({
  key: 'hasCheckedItemsState',
  get: ({ get }) => {
    const cartItems = get(cartItemsState);
    const isCheckedItemIds = get(isCheckedItemIdsState);

    return cartItems.some((item) => isCheckedItemIds[item.id]);
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
