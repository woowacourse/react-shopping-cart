import { atom, atomFamily } from 'recoil';
import { Products } from '../types/Product';

export const itemsState = atom<Products[]>({
  key: 'itemsState',
  default: [],
});

interface itemDetailsStateType {
  quantity: number;
  price: number;
}

export const itemDetailsState = atomFamily<itemDetailsStateType, number>({
  key: 'itemDetailsState',
  default: {
    quantity: 1,
    price: 0,
  },
});
