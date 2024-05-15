import formatCartItems from '@/services/formatCartItem';
import { atom, selector } from 'recoil';
import { fetchCartItems } from '../api';

export const allCartItemStates = atom({
  key: 'allCartItemStates',
  default: selector({
    key: 'allCartItemStates/Default',
    get: async () => {
      const cartItems = await fetchCartItems();
      const formattedProducts = formatCartItems(cartItems);
      return formattedProducts;
    },
  }),
});

export const isCheckedState = atomFamily<boolean, number>({
  key: 'isCheckedState',
  default: (id: number) => {
    const item = window.localStorage.getItem(JSON.stringify(id));
    return item ? JSON.parse(item) : true;
  },
});
