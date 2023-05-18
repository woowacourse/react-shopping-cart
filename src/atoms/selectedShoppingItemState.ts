import { atom } from 'recoil';

const selectedShoppingItemState = atom<number[]>({
  key: 'selectedShoppingItemState',
  default: [],
});

export default selectedShoppingItemState;
