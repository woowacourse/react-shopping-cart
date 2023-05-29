import { selector, useRecoilValue } from 'recoil';
import cartState from './cartState';

const totalCheckedCountState = selector({
  key: 'cartCountChecked',
  get: ({ get }) => {
    const cart = get(cartState);

    return cart.reduce((acc, cur) => {
      if (cur.checked) return acc + 1;
      return acc;
    }, 0);
  },
});

export default totalCheckedCountState;

export const useCartTotalCheckedCount = () => {
  return { totalCheckedCount: useRecoilValue(totalCheckedCountState) };
};
