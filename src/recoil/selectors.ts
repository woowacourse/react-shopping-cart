import {
  cartItemsState,
  isIslandOrMountain,
  selectedCoupons,
  uncheckedItemIdsState,
} from './atoms';

import { CartItem } from '../type';
import getCouponsAmount from '../utils/getCouponsAmount';
import { selector } from 'recoil';

export const checkedItemsState = selector<CartItem[]>({
  key: 'checkedItemState',
  get: ({ get }) => {
    const cartItems = get(cartItemsState);
    const uncheckedItemIds = get(uncheckedItemIdsState);

    const result = cartItems.reduce((arr, item) => {
      if (uncheckedItemIds.includes(item.id)) return arr;
      arr.push(item);
      return arr;
    }, [] as CartItem[]);

    return result;
  },
});

export const deliveryFeeState = selector<number>({
  key: 'deliveryFeeState',
  get: ({ get }) => {
    const checkedItem = get(checkedItemsState);
    const isAdded = get(isIslandOrMountain);
    const orderAmount = checkedItem.reduce(
      (acc, item) => acc + item.quantity * item.product.price,
      0,
    );
    const defaultCouponFee = orderAmount >= 100000 ? 0 : 3000;
    if (checkedItem.length === 0) return 0;
    if (isAdded) return defaultCouponFee + 3000;
    return defaultCouponFee;
  },
});

export const couponAmountState = selector<number>({
  key: 'couponAmountState',
  get: ({ get }) => {
    const checkedItems = get(checkedItemsState);
    const coupons = get(selectedCoupons);
    const deliveryFee = get(deliveryFeeState);
    return getCouponsAmount(coupons, checkedItems, deliveryFee);
  },
});
