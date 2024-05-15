import { CartItemStateType, CartItemType } from '@/types/cart.type';
import { atom, atomFamily } from 'recoil';

import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist({
  key: 'localStorage',
  storage: localStorage,
});

export const cartItemState = atomFamily<CartItemStateType, number>({
  key: 'cartItemState',
  default: (itemId: number) => ({
    id: itemId,
    quantity: 1,
    price: 0,
    isSelected: true,
  }),
  effects_UNSTABLE: [persistAtom],
});

export const cartListState = atom<CartItemType[]>({
  key: 'cartListState',
  default: [
    {
      id: 1,
      quantity: 1,
      product: {
        id: 1,
        name: '',
        price: 0,
        imageUrl: '',
        category: '',
      },
    },
  ],
});
