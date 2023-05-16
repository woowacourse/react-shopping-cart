import { atom } from 'recoil';
import { getCartIdList } from '../../utils/localStorage';

export const cartListState = atom<number[]>({
  key: 'cartListState',
  default: getCartIdList(),
});
