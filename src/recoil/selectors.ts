import { selector } from 'recoil';
import { KEY, ORDER } from '../constants/constants';
import { selectedCartItems, shippingFeeState, orderDiscountState } from './atoms';

export interface PriceInfo {
  order: number;
  finalShipping: number;
  total: number;
}

export const priceInfoStore = selector<PriceInfo>({
  key: KEY.PRICE_INFO,
  get: ({ get }) => {
    const order = get(orderTotalStore);
    const orderDiscount = get(orderDiscountState); // NOTE: 쿠폰 할인 금액
    const shippingInfo = get(shippingFeeState);

    // NOTE: 배송비가 무료인 경우 최종 배송비 0, 아니면 그대로 적용
    const finalShipping = shippingInfo.isFree ? 0 : shippingInfo.shipping;
    const total = shippingInfo.isFree
      ? order + shippingInfo.shipping - orderDiscount
      : order + finalShipping - orderDiscount;

    return {
      order,
      finalShipping,
      total,
    };
  },
});

export const isOverShippingFeeFreeStore = selector<boolean>({
  key: KEY.IS_OVER_SHIPPING_FEE_FREE,
  get: ({ get }) => {
    const orderTotal = get(orderTotalStore);

    return orderTotal >= ORDER.SHIPPING_FREE_PRICE;
  },
});

export const orderTotalStore = selector({
  key: KEY.ORDER_TOTAL,
  get: ({ get }) => {
    const selectedItems = get(selectedCartItems);
    return selectedItems.reduce((acc, cur) => acc + cur.price * cur.quantity, 0);
  },
});

export interface IOrderInfo {
  kindCount: number;
  productCount: number;
  totalPrice: number;
}

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
