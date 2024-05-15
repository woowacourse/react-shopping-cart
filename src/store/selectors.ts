import { selector } from 'recoil';
import { fetchCartItems } from '../api';
import { productQuantityState, isCheckedState } from './atoms';

type AmountType = {
  orderAmount: number;
  deliveryCharge: number;
  totalAmount: number;
};

export const productsState = selector({
  key: 'productsState',
  get: async () => {
    const products = await fetchCartItems();

    return products;
  },
});

export const totalOrderAmountState = selector<AmountType>({
  key: 'totalOrderAmountState',
  get: ({ get }) => {
    const products = get(productsState);
    const orderAmount = products.reduce((accumulator, product) => {
      const isChecked = get(isCheckedState(product.id));
      if (isChecked) {
        const quantity = get(productQuantityState(product.id));
        return accumulator + product.product.price * quantity;
      }
      return accumulator;
    }, 0);

    const deliveryCharge = orderAmount < 100000 ? 3000 : 0;
    const totalAmount = orderAmount + deliveryCharge;

    return {
      orderAmount,
      deliveryCharge,
      totalAmount,
    };
  },
});
