import { selector, useRecoilValue } from 'recoil';
import cartState from './cartState';

const cartTotalPriceState = selector({
  key: 'cartTotalPriceState',
  get: ({ get }) => {
    const cart = get(cartState);

    return cart.reduce((acc: number, item) => {
      if (!item.checked) return acc;

      return acc + item.product.price * item.quantity;
    }, 0);
  },
});

export default cartTotalPriceState;

export const useCartTotalPriceReadOnly = () => {
  return { totalPriceReadOnly: useRecoilValue(cartTotalPriceState) };
};
