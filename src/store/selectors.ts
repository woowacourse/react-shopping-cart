import { selector, selectorFamily } from 'recoil';
import { isCheckedState, productsState } from './atoms';
import { CartItemType } from '../types';
import { CART_POLICY } from '../constants/cart';

type AmountType = {
  orderAmount: number;
  deliveryCharge: number;
  totalAmount: number;
};

export const productsIdState = selector({
  key: 'productsIdState',
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
    const isCheckedMap = get(isCheckedState);
    const orderAmount = products.reduce((accumulator, product) => {
      const isChecked = isCheckedMap[product.id];
      if (isChecked) {
        const quantity = get(productQuantityState(product.id));
        return accumulator + product.product.price * quantity;
      }
      return accumulator;
    }, 0);

    const deliveryCharge = orderAmount < CART_POLICY.shipping_throughput ? 3000 : 0;
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

    const keys = get(productsIdState);
    const isAllCheckedMap = get(isCheckedState);
    keys.forEach((key) => {
      const isChecked = isAllCheckedMap[key];

      if (isChecked === true) {
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
