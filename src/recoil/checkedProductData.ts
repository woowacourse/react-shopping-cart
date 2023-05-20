import { atom, selector } from 'recoil';

import type { CartProduct } from '../types/product';

export const checkedItemAtom = atom<CartProduct[]>({
  key: 'checkedItemState',
  default: [],
});

export const checkedListSelector = selector<number>({
  key: 'checkedListState',
  get: ({ get }) => {
    const checkedItem = get(checkedItemAtom);

    return checkedItem.length;
  },
});
