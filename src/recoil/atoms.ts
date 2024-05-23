import { atom } from 'recoil';
import { KEY, ORDER } from '../constants/constants';
import syncWithLocalStorage from '../utils/syncWithLocalStorage';

export interface SelectedCartItem {
  cartItemId: number;
  name: string;
  quantity: number;
  price: number;
  imageUrl: string;
}

export const selectedCartItems = atom<SelectedCartItem[]>({
  key: KEY.CART_ITEMS,
  default: [],
  effects: [syncWithLocalStorage<SelectedCartItem[]>(KEY.CART_ITEMS)],
});

export interface ItemQuantity {
  id: number;
  quantity: number;
}

export const itemQuantityState = atom<ItemQuantity[]>({
  key: KEY.QUANTITY_STATE,
  default: [],
});

export interface ShippingFee {
  isFree: boolean;
  shipping: number;
}

export const shippingFeeState = atom<ShippingFee>({
  key: KEY.SHIPPING_FEE,
  default: {
    isFree: false,
    shipping: ORDER.BASIC_SHIPPING_FEE,
  },
});
