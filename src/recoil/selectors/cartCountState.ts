import { selector } from 'recoil';
import cartState from '../atoms/cartState';

const cartCountState = selector({
  key: 'cartCountState',
  get: ({ get }) => {
    return get(cartState).length;
  },
});

export default cartCountState;
