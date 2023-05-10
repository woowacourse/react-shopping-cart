import { atom, selector } from 'recoil';
import { CartItem } from 'src/types';

export const cartListAtom = atom<CartItem[]>({
  key: 'cartListAtom',
  default: [],
});

export const countCartListSelector = selector({
  key: 'countCartListSelector',
  get: ({ get }) => {
    const cartList = get(cartListAtom);

    return cartList.reduce((acc, cur) => acc + cur.quantity, 0);
  },
});
