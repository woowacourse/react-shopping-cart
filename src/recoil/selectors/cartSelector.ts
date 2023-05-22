import { selector } from 'recoil';
import { cartAtom } from '@recoil/atoms/cartAtom';

export const getCartListTotalPrice = selector({
  key: 'getCartListTotalPrice',
  get: ({ get }) => {
    const cart = get(cartAtom);

    return cart.reduce(
      (accumulator, currentValue) =>
        accumulator + currentValue.product.price * currentValue.quantity,
      0
    );
  },
});
