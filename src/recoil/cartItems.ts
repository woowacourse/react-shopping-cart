import { atom, atomFamily, selector, selectorFamily } from 'recoil';
import { selectedCartItemsState } from './selectedCardItems';
import { fetchedCartItemsSelector } from './fetch';

export const refreshCartItemsState = atom({
  key: 'refreshCartItemsState',
  default: [],
});

export const cartItemQuantityAdjustSelector = selectorFamily({
  key: `cartItemQuantityAdjust`,
  get:
    (id: number) =>
    ({ get }) => {
      const item = get(fetchedCartItemsSelector).find(
        (cartItem) => cartItem.id === id,
      );
      return item ? item.quantity : 0;
    },
  set:
    (id) =>
    ({ set }, newValue) => {
      set(cartItemQuantityState(id), newValue);
    },
});

export const cartItemQuantityState = atomFamily({
  key: `cartItemQuantityState`,
  default: cartItemQuantityAdjustSelector,
});

//TODO: 여기 좀 정리하자~~~!~!~
export const cartItemsCalculatorState = selector({
  key: 'cartItemsCalculatorSelector',
  get: async ({ get }) => {
    const cartItems = get(fetchedCartItemsSelector);

    const selectedCartItems = cartItems.filter((cartItem) =>
      get(selectedCartItemsState(cartItem.id)),
    );

    const totalCartItemQuantity = selectedCartItems.reduce(
      (totalCartItemQuantity, cartItem) => {
        if (get(cartItemQuantityState(cartItem.id)))
          return (
            totalCartItemQuantity + get(cartItemQuantityState(cartItem.id))
          );
        return totalCartItemQuantity;
      },
      0,
    );

    const totalOrderAmount = selectedCartItems.reduce(
      (totalOrderAmount, cartItem) => {
        const orderAmount =
          cartItem.product.price * get(cartItemQuantityState(cartItem.id));
        return totalOrderAmount + orderAmount;
      },
      0,
    );

    const shippingFee =
      totalOrderAmount >= 100000 || totalOrderAmount === 0 ? 0 : 3000;

    const totalPaymentAmount = totalOrderAmount + shippingFee;

    return {
      totalOrderAmount,
      totalCartItemQuantity,
      selectedCartItemCount: selectedCartItems.length,
      shippingFee,
      totalPaymentAmount,
    };
  },
});
