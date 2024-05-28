import { CartItem, Coupon } from '../type';
import {
  cartItemsState,
  isIslandOrMountainState,
  selectedCouponsState,
  uncheckedItemIdsState,
} from './atoms';

import POLICES from '../constants/policies';
import { fetchCoupon } from '../apis';
import getCouponsAmount from '../utils/getCouponsAmount';
import { selector } from 'recoil';

export const couponState = selector<Coupon[]>({
  key: 'couponState',
  get: async () => {
    return await fetchCoupon();
  },
});

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
    const isAdded = get(isIslandOrMountainState);
    const orderAmount = checkedItem.reduce(
      (acc, item) => acc + item.quantity * item.product.price,
      0,
    );
    const defaultCouponFee =
      orderAmount >= POLICES.amountForFreeShippingLowerBound ? 0 : POLICES.defaultDeliveryFee;
    if (checkedItem.length === 0) return 0;
    if (isAdded) return defaultCouponFee + POLICES.defaultDeliveryFee;
    return defaultCouponFee;
  },
});

export const couponAmountState = selector<number>({
  key: 'couponAmountState',
  get: ({ get }) => {
    const checkedItems = get(checkedItemsState);
    const coupons = get(selectedCouponsState);
    const deliveryFee = get(deliveryFeeState);
    return getCouponsAmount(coupons, checkedItems, deliveryFee);
  },
});
