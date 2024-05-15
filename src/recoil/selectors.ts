import { selector } from 'recoil';
import { CartItem } from '../types';
import { cartItemQuantity } from './atoms';
import { fetchCartItems } from '../api';

  key: 'cartListState',
export const cartListState = selector<CartItemType[]>({
  get: async () => {
    const items = await fetchCartItems();
    return items;
  },
});

// 장바구니안에 든거 모든 아이템의 가격
export const cartListTotalPrice = selector({
  key: 'cartListTotalPrice',
  get: ({ get }) => {
    const cartList = get(cartListState);
    const totalPrice = cartList.reduce((acc, cartItem) => {
      const quantity = get(cartItemQuantity(cartItem.id));
      return acc + quantity * cartItem.product.price;
    }, 0);

    if (totalPrice >= 100_000) return totalPrice;
    return totalPrice + 3000;
  },
});

export const shippingFee = selector({
  key: 'shippingFee',
  get: ({ get }) => {
    const totalPrice = get(cartListTotalPrice);

    if (totalPrice >= 100_000) return 0;
    return 3000;
  },
});
