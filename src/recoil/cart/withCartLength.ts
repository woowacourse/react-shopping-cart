import { selector, useRecoilValue } from 'recoil';
import cartState from './cartState';

const withCartLength = selector({
  key: 'withCartLength',
  get: ({ get }) => get(cartState).length,
});

export default withCartLength;

export const useCartLength = () => useRecoilValue(withCartLength);
