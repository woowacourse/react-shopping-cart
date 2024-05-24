import { selector } from 'recoil';
import { RECOIL_KEYS, ORDER } from '../constants/constants';
import { discountAmountStore, isolatedRegionStore, selectedCartItems } from './atoms';

export interface PriceInfo {
  order: number;
  shipping: number;
  total: number;
}

export interface IPaymentInfo {
  kindCount: number;
  productCount: number;
  totalPrice: number;
}

export const priceInfoStore = selector<PriceInfo>({
  key: RECOIL_KEYS.PRICE_INFO,
  get: ({ get }) => {
    const selected = get(selectedCartItems);
    const isolatedRegion = get(isolatedRegionStore);
    const discountAmount = get(discountAmountStore);
    const price = selected.reduce((acc, cur) => acc + cur.product.price * cur.quantity, 0);
    const isShippingFree = price >= ORDER.SHIPPING_FREE_PRICE || price === 0;
    const shipping = isShippingFree
      ? 0
      : isolatedRegion
        ? ORDER.SHIPPING_FEE + 3000
        : ORDER.SHIPPING_FEE;
    return {
      order: price,
      shipping,
      total: price + shipping - discountAmount,
    };
  },
});
