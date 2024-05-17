import { atom, selector } from 'recoil';
import { CartItem } from '../type';
import { fetchCartItems } from '../api/shoppingCart';
import { selectedCartItemState } from './selectedCardItems';

export const fetchedCartItemsState = selector({
  key: 'fetchedCartItemsState',
  get: async ({ get }) => {
    get(refreshCartItemsState);
    const cartItems = await fetchCartItems();
    return cartItems;
  },
});

export const refreshCartItemsState = atom<CartItem[]>({
  key: 'cartItemsState',
  default: [],
});

export const cartItemsCalculatorState = selector({
  key: 'cartItemsCalculatorSelector',
  get: async ({ get }) => {
    const cartItems = get(refreshCartItemsState);

    const selectedCartItems = cartItems.filter((cartItem) =>
      get(selectedCartItemState(cartItem.id)),
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
