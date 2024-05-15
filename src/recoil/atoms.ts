import { atom, atomFamily } from 'recoil';
import { Products } from '../types/Product';

interface itemDetailsStateType {
  quantity: number;
  price: number;
  isChecked: boolean;
}

export const itemsState = atom<Products[]>({
  key: 'itemsState',
  default: [],
});

export const itemDetailsState = atomFamily<itemDetailsStateType, number>({
  key: 'itemDetailsState',
  default: {
    quantity: 1,
    price: 0,
    isChecked: true,
  },
});
