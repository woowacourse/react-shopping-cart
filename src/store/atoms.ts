import ORDER_CONDITION from '@/constants/order';
import formatCartItems from '@/services/formatCartItem';
import { atom, selector } from 'recoil';
import { fetchCartItems } from '../api';
import { orderAmountSelector } from './selectors';
import { FormattedCoupon } from '@/types';

export const allCartItemStates = atom({
  key: 'allCartItemStates',
  default: selector({
    key: 'cartItemsSelector',
    get: async () => {
      const cartItems = await fetchCartItems();
      return formatCartItems(cartItems);
    },
  }),
});

export const isFarShippingLocationState = atom({
  key: 'isFarShippingLocationState',
  default: selector({
    key: 'isFarShippingLocationDefault',
    get: ({ get }) => {
      const orderAmount = get(orderAmountSelector);
      return {
        isAvailable: orderAmount < ORDER_CONDITION.FREE_SHIPPING_PRICE,
        isChecked: false,
      };
    },
  }),
});

export const allCouponStates = atom<FormattedCoupon[] | []>({
  key: 'allCoupons',
  default: [],
});
