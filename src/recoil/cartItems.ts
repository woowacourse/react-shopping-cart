import { atom, selector } from 'recoil';
import { CartItem } from '../type';
import { fetchCartItems } from '../api/shoppingCart';
import { SelectedCartItem } from './selectedAllCardItems';

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

    const totalOrderAmount = cartItems
      .filter((cartItem) => get(SelectedCartItem(cartItem.id)))
      .reduce((totalOrderAmount, cartItem) => {
        const orderAmount = cartItem.product.price * cartItem.quantity;
        return totalOrderAmount + orderAmount;
      }, 0);

    const shippingFee =
      totalOrderAmount >= 100000 || totalOrderAmount === 0 ? 0 : 3000;

    const totalPaymentAmount = totalOrderAmount - shippingFee;

    return {
      totalOrderAmount,
      shippingFee,
      totalPaymentAmount,
    };
  },
});
