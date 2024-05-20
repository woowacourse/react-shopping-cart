import { atom, selector } from 'recoil';
import { fetchCartItems } from '../api/shoppingCart';
import { selectedCartItemState } from './selectedCardItems';

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

export const cartItemsCalculatorState = selector({
  key: 'cartItemsCalculatorSelector',
  get: async ({ get }) => {
    const cartItems = get(cartItemsState);

    const selectedCartItems = cartItems.filter((cartItem) =>
      get(selectedCartItemState(cartItem.id)),
    );

    const selectedCartItemCount = selectedCartItems.length;

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
      selectedCartItemCount,
      totalCartItemQuantity,
      shippingFee,
      totalPaymentAmount,
    };
  },
});
