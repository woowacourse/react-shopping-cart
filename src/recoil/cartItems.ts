import { atom, atomFamily, selector } from 'recoil';

import LocalStorage from '@/Storage';

export const CART_ITEM = 'CART_ITEM';

export interface CartItemProps {
  id: number;
  quantity: number;
  product: {
    id: number;
    name: string;
    price: number;
    imageUrl: string;
    category: string;
  };
}

export const cartItemsState = atom<CartItemProps[]>({
  key: 'cartItemsState',
  default: [],
});

export const checkedItemsState = atomFamily<boolean, number>({
  key: 'checkedItemsState',
  default: (cartId) => {
    return LocalStorage.getData(CART_ITEM, cartId) ?? true;
  },
});

export const orderTotalPriceState = selector<number>({
  key: 'orderTotalPriceState',
  get: ({ get }) => {
    const cartItems = get(cartItemsState);
    const checkedItems = cartItems.filter((cartItem) => get(checkedItemsState(cartItem.id)));

    return checkedItems.reduce((acc, cur) => acc + cur.quantity * cur.product.price, 0);
  },
});

export const deliveryPriceState = selector<number>({
  key: 'deliveryPriceState',
  get: ({ get }) => {
    const cartItems = get(orderTotalPriceState);
    return cartItems >= 100000 ? 0 : 3000;
  },
});

export const purchaseTotalPriceState = selector<number>({
  key: 'purchaseTotalPriceState',
  get: ({ get }) => {
    const orderTotalPrice = get(orderTotalPriceState);
    const deliveryPrice = get(deliveryPriceState);

    return orderTotalPrice + deliveryPrice;
  },
});
