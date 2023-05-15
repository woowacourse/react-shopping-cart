import { atom, selector } from 'recoil';
import { Cart } from '../types/types';
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist({
  key: 'recoil-persist',
  storage: sessionStorage,
});

export const cartState = atom<Cart[]>({
  key: 'cartState',
  default: [],
  effects_UNSTABLE: [persistAtom],
});

export const cartCountSelector = selector({
  key: 'cartCountSelector',
  get: ({ get }) => {
    const cartList = get(cartState);
    return cartList.length;
  }
});

export const cartQuantitySelector = (id: number) => selector({
  key: `quantitySelector`,
  get: ({ get }) => {
    const cartList = get(cartState);
    const targetCart = cartList.find((cart) => cart.id === id);
    return targetCart?.quantity ?? 0;
  }
})
