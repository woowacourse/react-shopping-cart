import { atom, selector } from 'recoil';
import { CartItem } from '../type';
import { fetchCartItems } from '../api/shoppingCart';
import { SelectedCartItems } from './selectedCardItems';

export const CartItemsSelector = selector({
  key: 'cartItemStateSelector',
  get: async ({ get }) => {
    get(CartItemsState);
    const cartItems = await fetchCartItems();
    return cartItems;
  },
});

export const CartItemsState = atom<CartItem[]>({
  key: 'cartItemsState',
  default: [],
});

export const CartItemsCalculatorSelector = selector({
  key: 'cartItemsCalculatorSelector',
  get: async ({ get }) => {
    const cartItems = get(CartItemsSelector);

    const selectedCartItems = cartItems.filter((cartItem) =>
      get(SelectedCartItems(cartItem.id)),
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
