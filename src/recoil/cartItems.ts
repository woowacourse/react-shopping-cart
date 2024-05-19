import { atom, atomFamily, selector, selectorFamily } from 'recoil';
import { fetchCartItems } from '../api/shoppingCart';
import { selectedCartItemsState } from './selectedCardItems';

export const fetchedCartItemsState = selector({
  key: 'cartItemStateSelector',
  get: async ({ get }) => {
    get(refreshCartItemsState);
    const cartItems = await fetchCartItems();
    return cartItems;
  },
});

export const refreshCartItemsState = atom({
  key: 'cartItemsState',
  default: [],
});

export const cartItemQuantityAdjust = selectorFamily({
  key: `cartItemQuantityAdjust`,
  get:
    (id: number) =>
    ({ get }) => {
      const item = get(fetchedCartItemsState).find(
        (cartItem) => cartItem.id === id,
      );
      return item ? item.quantity : 0;
    },
  set:
    (id) =>
    ({ set }, newValue) => {
      set(cartItemQuantity(id), newValue);
    },
});

export const cartItemQuantity = atomFamily({
  key: `cartItemQuantity`,
  default: cartItemQuantityAdjust,
});

export const cartItemsCalculatorState = selector({
  key: 'cartItemsCalculatorSelector',
  get: async ({ get }) => {
    const cartItems = get(fetchedCartItemsState);

    const selectedCartItems = cartItems.filter((cartItem) =>
      get(selectedCartItemsState(cartItem.id)),
    );

    const totalCartItemQuantity = selectedCartItems.reduce(
      (totalCartItemQuantity, cartItem) => {
        return totalCartItemQuantity + cartItem.quantity;
      },
      0,
    );

    const totalOrderAmount = selectedCartItems.reduce(
      (totalOrderAmount, cartItem) => {
        const orderAmount = cartItem.product.price * cartItem.quantity;
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
