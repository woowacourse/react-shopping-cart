import { atomFamily, selectorFamily } from 'recoil';
import { cartListState } from './selectors';

const cartItemQuantity = atomFamily<number, number>({
  key: 'cartItemQuantity',
  default: selectorFamily({
    key: 'initialCartItemQuantity',
    get:
      (id) =>
      ({ get }) => {
        const cartList = get(cartListState);
        const item = cartList.find((item) => item.id === id);
        return item ? item.quantity : 0;
      },
  }),
});

export { cartItemQuantity };
