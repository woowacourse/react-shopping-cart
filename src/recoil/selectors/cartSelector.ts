import { selector } from 'recoil';
import { cartAtom } from '@recoil/atoms/cartAtom';
import { calculateSelectCartTotalPrice } from '@utils/cart';

export const getCartListTotalPrice = selector({
  key: 'getCartListTotalPrice',
  get: ({ get }) => {
    const cart = get(cartAtom);

    return calculateSelectCartTotalPrice(cart);
  },
});
