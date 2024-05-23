import { selector } from 'recoil';
import { KEY, ORDER } from '../constants/constants';
import { selectedCartItems, shippingFeeState } from './atoms';

export interface PriceInfo {
  order: number;
  finalShipping: number;
  total: number;
}

export interface IOrderInfo {
  kindCount: number;
  productCount: number;
  totalPrice: number;
}

export const priceInfoStore = selector<PriceInfo>({
  key: KEY.PRICE_INFO,
  get: ({ get }) => {
    const selectedItems = get(selectedCartItems);
    const price = selectedItems.reduce((acc, cur) => acc + cur.price * cur.quantity, 0);

    const shippingInfo = get(shippingFeeState);
    const pureShipping = shippingInfo.shipping;

    const isShippingFree = price >= ORDER.SHIPPING_FREE_PRICE || shippingInfo.isFree;
    const finalShipping = isShippingFree ? 0 : pureShipping;
    console.log('finalShipping:' + finalShipping);

    return {
      order: price,
      finalShipping,
      total: price + finalShipping,
    };
  },
});

export const orderInfoStore = selector<IOrderInfo>({
  key: KEY.ORDER_INFO,
  get: ({ get }) => {
    const selected = get(selectedCartItems);
    const kindCount = selected.length;
    const productCount = selected.reduce((acc, cur) => acc + cur.quantity, 0);
    const totalPrice = get(priceInfoStore).total;

    return {
      kindCount,
      productCount,
      totalPrice,
    };
  },
});
