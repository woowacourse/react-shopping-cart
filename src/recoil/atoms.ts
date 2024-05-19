import { atom, atomFamily } from 'recoil';
import { CartItems, ItemDetailsStateType } from '../types/Item';

export const itemsState = atom<CartItems[]>({
  key: 'itemsState',
  default: [],
});

export const itemDetailsState = atomFamily<ItemDetailsStateType, number>({
  key: 'itemDetailsState',
  default: {
    quantity: 1,
    isChecked: true,
  },
});
