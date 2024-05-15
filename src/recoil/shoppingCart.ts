import { fetchCartItems } from '@apis/shoppingCart';
import { CheckedStates } from 'appTypes/shoppingCart';
import { selector } from 'recoil';

export const cartItemsState = selector({
  key: 'cartItemsState',
  get: async () => {
    const cartItems = await fetchCartItems();

    const checkedStates: CheckedStates[] = JSON.parse(localStorage.getItem('checkedStates') ?? '[]');

    return cartItems.map((cartItem) => {
      const isChecked = checkedStates.find((checkState) => checkState.id === cartItem.id)?.isChecked ?? false;
      return { ...cartItem, isChecked };
    });
  },
});

export const totalOrderState = selector({
  key: 'totalOrderState',
  get: ({ get }) => {
    const cartItems = get(cartItemsState);

    return cartItems.reduce((acc, cur) => acc + cur.product.price, 0);
  },
});
