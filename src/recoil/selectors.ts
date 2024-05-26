import { selector } from 'recoil';
import {
  checkedCartItemIdsState,
  itemQuantityState,
  cartItemsState,
  remoteShippingOptionState,
  discountAmountState,
} from './atoms';
import { CartItem } from '../type';

export const checkedCartItemsState = selector<CartItem[]>({
  key: 'checkedCartItemsState',
  get: ({ get }) => {
    const cartItems = get(cartItemsState);
    const checkedItemIds = get(checkedCartItemIdsState);

    return cartItems.filter((item) => checkedItemIds.includes(item.id));
  },
});

export const totalCheckedQuantityState = selector<number>({
  key: 'totalCheckedQuantityState',
  get: ({ get }) => {
    const checkedCartItems = get(checkedCartItemsState);
    return checkedCartItems.reduce((acc, item) => {
      const quantity = get(itemQuantityState(item.id));
      return acc + quantity;
    }, 0);
  },
});

export const orderAmountState = selector<number>({
  key: 'orderAmountState',
  get: ({ get }) => {
    const checkedCartItems = get(checkedCartItemsState);
    return checkedCartItems.reduce((acc, item) => {
      const quantity = get(itemQuantityState(item.id));
      return acc + item.product.price * quantity;
    }, 0);
  },
});

export const shippingCostState = selector<number>({
  key: 'shippingCostState',
  get: ({ get }) => {
    const checkedItemIds = get(checkedCartItemIdsState);
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
    const discountAmount = get(discountAmountState);
    const shippingCost = get(shippingCostState);

    return orderAmount + shippingCost - discountAmount;
  },
});
