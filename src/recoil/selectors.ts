import { selector } from 'recoil';
import { checkedCartItemsState, itemQuantityState, cartItemsState } from './atoms';

export const totalCheckedQuantityState = selector<number>({
  key: 'totalCheckedQuantityState',
  get: ({ get }) => {
    const cartItems = get(cartItemsState);
    const checkedItemIds = get(checkedCartItemsState);

    return cartItems
      .filter((item) => checkedItemIds.includes(item.id))
      .reduce((acc, item) => {
        const quantity = get(itemQuantityState(item.id));
        return acc + quantity;
      }, 0);
  },
});

export const orderAmountState = selector<number>({
  key: 'orderAmountState',
  get: ({ get }) => {
    const cartItems = get(cartItemsState);
    const checkedItemIds = get(checkedCartItemsState);

    return cartItems
      .filter((item) => checkedItemIds.includes(item.id))
      .reduce((acc, item) => {
        const quantity = get(itemQuantityState(item.id));
        return acc + item.product.price * quantity;
      }, 0);
  },
});

export const deliveryFeeState = selector<number>({
  key: 'deliveryFeeState',
  get: ({ get }) => {
    const checkedItemIds = get(checkedCartItemsState);
    const orderAmount = get(orderAmountState);

    return orderAmount >= 100000 || checkedItemIds.length < 1 ? 0 : 3000;
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
