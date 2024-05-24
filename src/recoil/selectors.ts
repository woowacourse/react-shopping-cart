import { selector } from 'recoil';
import {
  checkedCartItemsState,
  itemQuantityState,
  cartItemsState,
  remoteShippingOptionState,
} from './atoms';
import { CartItem } from '../type';

export const totalCheckedCartItemsState = selector<CartItem[]>({
  key: 'totalCheckedCartItemsState',
  get: ({ get }) => {
    const cartItems = get(cartItemsState);
    const checkedItemIds = get(checkedCartItemsState);

    return cartItems.filter((item) => checkedItemIds.includes(item.id));
  },
});

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

export const shippingCostState = selector<number>({
  key: 'shippingCostState',
  get: ({ get }) => {
    const checkedItemIds = get(checkedCartItemsState);
    const orderAmount = get(orderAmountState);
    const isRemoteShipping = get(remoteShippingOptionState);

    if (orderAmount >= 100000 || checkedItemIds.length < 1) {
      return 0;
    }
    return isRemoteShipping ? 6000 : 3000;
  },
});

export const totalAmountState = selector<number>({
  key: 'totalAmountState',
  get: ({ get }) => {
    const orderAmount = get(orderAmountState);
    const shippingCost = get(shippingCostState);

    return orderAmount + shippingCost;
  },
});
