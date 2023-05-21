import { atom } from 'recoil';
import type { AtomEffect } from 'recoil';
import type { CartProduct } from '../../types/product';
import { CART_ITEMS_BASE_URL } from '../../constant';

const fetchEffect: AtomEffect<CartProduct[]> = ({ setSelf, trigger }) => {
  const fetchCartItemList = async () => {
    const response = await fetch(CART_ITEMS_BASE_URL);

    // if (response.status !== 200) throw new Error('서버에 장애가 발생했습니다.');

    const cartItemList = await response.json();
    setSelf(cartItemList);
  };

  if (trigger === 'get') {
    fetchCartItemList();
  }
};

const cartState = atom<CartProduct[]>({
  key: 'cartState',
  default: [],
  effects: [fetchEffect],
});

export default cartState;
