import { selector } from 'recoil';
import { fetchCartItems } from '../api';
import { productQuantityState, isCheckedState } from './atoms';

export const productsState = selector({
  key: 'productsState',
  get: async () => {
    const products = await fetchCartItems();

    return products;
  },
});

export const totalOrderAmountState = selector<number>({
  key: 'totalOrderAmountState',
  get: ({ get }) => {
    const products = get(productsState);
    const totalAmount = products.reduce((accumulator, product) => {
      const isChecked = get(isCheckedState(product.id));
      if (isChecked) {
        const quantity = get(productQuantityState(product.id));
        return accumulator + product.product.price * quantity;
      }
      return accumulator;
    }, 0);

    return totalAmount;
  },
});
