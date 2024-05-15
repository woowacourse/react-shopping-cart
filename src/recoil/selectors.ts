import { selector } from 'recoil';
import { KEYS } from '../constants/constants';
import { selectedCartItems } from './atoms';

export interface PriceInfo {
  order: number;
  shipping: number;
  total: number;
}

export interface IOrderInfo {
  kindCount: number;
  productCount: number;
  totalPrice: number;
}

export const priceInfoStore = selector<PriceInfo>({
  key: KEYS.PRICE_INFO,
  get: ({ get }) => {
    const selected = get(selectedCartItems);
    const price = selected.reduce((acc, cur) => (acc += cur.price * cur.quantity), 0);
    const shipping = price <= 100000 ? 3000 : 0;
    return {
      order: price,
      shipping,
      total: price + shipping,
    };
  },
});

export const orderInfoStore = selector<IOrderInfo>({
  key: KEYS.ORDER_INFO,
  get: ({ get }) => {
    const selected = get(selectedCartItems);
    const kindCount = selected.length;
    const productCount = selected.reduce((acc, cur) => (acc += cur.quantity), 0);
    const totalPrice = get(priceInfoStore).total;
    return {
      kindCount,
      productCount,
      totalPrice,
    };
  },
});
