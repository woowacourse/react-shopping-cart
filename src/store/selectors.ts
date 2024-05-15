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

export const totalProductQuantity = selector({
  key: 'totalProductQuantity',
  get: ({ get }) => {
    let totalCount = 0;
    let totalQuantity = 0;

    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i) as string;
      const test = localStorage.getItem(key) as string;
      const value = JSON.parse(test);

      if (value === true) {
        const quantity = get(productQuantityState(parseInt(key, 10)));
        totalCount++;
        totalQuantity += quantity;
      }
    }

    return {
      totalCount,
      totalQuantity,
    };
  },
});
