import { fetchCartItems } from '@apis/shoppingCart';
import { selector } from 'recoil';

export const cartItemsState = selector({
  key: 'cartItemsState',
  get: async () => {
    const cartItems = await fetchCartItems();
    return cartItems;
  },
});

export const totalOrderState = selector({
  key: 'totalOrderState',
  get: ({ get }) => {
    const cartItems = get(cartItemsState);

    return cartItems.reduce((acc, cur) => acc + cur.product.price, 0);
  },
});
