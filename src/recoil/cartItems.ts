import { atom, selector } from 'recoil';

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

export const cartTotalPriceState = selector<number>({
  key: 'cartTotalPriceState',
  get: ({ get }) => {
    const cartItems = get(cartItemsState);
    return cartItems.reduce((acc, cur) => acc + cur.quantity * cur.product.price, 0);
  },
});

export const deliveryPriceState = selector<number>({
  key: 'deliveryPriceState',
  get: ({ get }) => {
    const cartItems = get(cartTotalPriceState);
    return cartItems >= 100000 ? 0 : 3000;
  },
});
