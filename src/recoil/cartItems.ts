import { atom, selector } from 'recoil';
import { fetchCartItems } from '../api/shoppingCart';
import { selectedCartItemsState } from './selectedCardItems';
import CONDITION from '../constants/Condition';

export const fetchedCartItemsState = selector({
  key: 'fetchedCartItemsState',
  get: async () => {
    return await fetchCartItems();
  },
});

export const cartItemsState = atom({
  key: 'cartItems',
  default: fetchedCartItemsState,
});

export const totalOrderAmountState = selector<number>({
  key: 'totalOrderAmount',
  get: ({ get }) => {
    return get(selectedCartItemsState).reduce((totalOrderAmount, cartItem) => {
      const orderAmount = cartItem.product.price * cartItem.quantity;
      return totalOrderAmount + orderAmount;
    }, 0);
  },
});

export const totalCartItemQuantityState = selector<number>({
  key: 'totalCartItemQuantity',
  get: ({ get }) => {
    return get(selectedCartItemsState).reduce(
      (totalCartItemQuantity, cartItem) => {
        return totalCartItemQuantity + cartItem.quantity;
      },
      0,
    );
  },
});

export const selectedCartItemCountState = selector<number>({
  key: 'selectedCartItemCount',
  get: ({ get }) => {
    return get(selectedCartItemsState).length;
  },
});

export const shippingFeeState = selector<number>({
  key: 'shippingFee',
  get: ({ get }) => {
    const totalOrderAmount = get(totalOrderAmountState);

    return totalOrderAmount >= CONDITION.freeShippingFee ||
      totalOrderAmount === CONDITION.noneSelected
      ? VALUE.freeShippingFee
      : VALUE.shippingFee;
  },
});

export const totalPaymentAmountState = selector<number>({
  key: 'totalPaymentAmount',
  get: ({ get }) => {
    return get(totalOrderAmountState) + get(shippingFeeState);
  },
});
