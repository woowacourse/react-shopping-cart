import { selector } from 'recoil';
import type { CartProduct } from '../../type';
import checkedCartState from '../atoms/checkedCartState';

export const CheckedCartIdList = selector<CartProduct['id'][]>({
  key: 'CheckStateList',
  get: ({ get }) => {
    const cart = get(checkedCartState);
    return cart;
  },
});
