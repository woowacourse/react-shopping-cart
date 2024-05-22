import { atom, atomFamily, selector } from 'recoil';
import { recoilPersist } from 'recoil-persist';

import { fetchGetCartItems } from '../api/shoppingCart';

const { persistAtom } = recoilPersist({
  key: 'isCartItemSelected',
  storage: localStorage,
});

export const isCartItemSelectedState = atomFamily<boolean, number>({
  key: 'isCartItemSelected',
  default: true,
  effects_UNSTABLE: [persistAtom],
});

export const cartItemsState = atom({
  key: 'cartItems',
  default: selector({
    key: 'fetchedCartItems',
    get: async () => {
      return await fetchGetCartItems();
    },
  }),
});
