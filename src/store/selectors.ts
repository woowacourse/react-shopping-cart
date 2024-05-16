import { selector, selectorFamily } from 'recoil';
import { isCheckedState, productsState } from './atoms';
import { CartItemType } from '../types';

type AmountType = {
  orderAmount: number;
  deliveryCharge: number;
  totalAmount: number;
};

export const productsIds = selector({
  key: 'productsIds',
  get: ({ get }) => {
    const keys = get(productsState).map((product: CartItemType) => {
      return product.id;
    });

    return keys;
  },
});

export const productQuantityState = selectorFamily<number, number>({
  key: 'productQuantityState',
  get:
    (id: number) =>
    ({ get }) => {
      const products = get(productsState);
      const product = products.find((item) => item.id === id);
      return product ? product.quantity : 0;
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

    const keys = get(productsIds);
    keys.forEach((key) => {
      const value = get(isCheckedState(key));

      if (value === true) {
        const quantity = get(productQuantityState(key));
        totalCount++;
        totalQuantity += quantity;
      }
    });

    return {
      totalCount,
      totalQuantity,
    };
  },
});

// const isCheckedState = selectorFamily({
//   key: 'isCheckedState',
//   get: (id) => ({ get }) => {
//     const storedValue = window.localStorage.getItem(JSON.stringify(id));
//     return storedValue !== null ? JSON.parse(storedValue) : false;
//   },
//   set: (id) => ({ set }, newValue) => {
//     set(isCheckedState(id), newValue);
//     window.localStorage.setItem(JSON.stringify(id), JSON.stringify(newValue));
//   },
// });
