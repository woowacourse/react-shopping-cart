import { atom } from 'recoil';
import { getCartIdList } from '../utils/localStorage';

export const cartIdListState = atom<number[]>({
  key: 'cartIdListState',
  default: getCartIdList(),
});
