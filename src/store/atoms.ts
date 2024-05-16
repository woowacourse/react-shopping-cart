import { atom, atomFamily, selector } from 'recoil';
import { fetchCartItems } from '../api';

export const productsState = atom({
  key: 'productsState',
  default: selector({
    key: 'productsState/Default',
    get: async () => {
      const products = await fetchCartItems();
      return products;
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
