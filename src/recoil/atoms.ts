import { atom, atomFamily } from 'recoil';
import { fetchCartItem, getCartCounts } from '../api';

export const cartData = atom<Cart[]>({
  key: 'cartData',
  default: fetchCartItem(),
});

export const cartQuantity = atom<number>({
  key: 'cartQuantity',
  default: getCartCounts(),
});

// TODO: fetchCartItem으로 가져오는게 아니라 cartData로 가져오는 걸로 바꿔보기 (get을 사용하여)
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
