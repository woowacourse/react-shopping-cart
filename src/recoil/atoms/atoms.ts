import { atom, atomFamily } from 'recoil';
import { fetchCartItem, getCartCounts } from '../../api';

export const cartData = atom<Cart[]>({
  key: 'cartData',
  default: fetchCartItem(),
});

export const cartQuantity = atom<number>({
  key: 'cartQuantity',
  default: getCartCounts(),
});

export const cartItemQuantityState = atomFamily<number, number>({
  key: 'cartItemQuantityState',
  default: async (itemId) => {
    const cartData = await fetchCartItem();
    const cartItem = cartData.find((item: Cart) => item.id === itemId);
    return cartItem ? cartItem.quantity : 0;
  },
});

export const cartItemCheckState = atomFamily<boolean, number>({
  key: 'cartItemCheckState',
  default: false,
});
