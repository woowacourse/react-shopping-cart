import { selector } from 'recoil';
import { fetchCartItems } from '../api';
import { productQuantityState } from './atoms';

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
      const quantity = get(productQuantityState(product.id));
      return accumulator + product.product.price * quantity;
    }, 0);

    return totalAmount;
  },
});
