import { selector, useRecoilValue } from 'recoil';
import cartState from './cartState';

const withTotalCheckedCount = selector({
  key: 'cartCountChecked',
  get: ({ get }) => {
    const cart = get(cartState);

    return cart.reduce((acc, cur) => {
      if (cur.checked) return acc + 1;
      return acc;
    }, 0);
  },
});

export default withTotalCheckedCount;

export const useCartTotalCheckedCountReadOnly = () => {
  return { totalCheckedCountReadLOnly: useRecoilValue(withTotalCheckedCount) };
};
