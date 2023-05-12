import { selector } from 'recoil';
import cartState from '../atoms/cartState';

const totalQuantityInCart = selector({
  key: 'totalQuantityInCart',
  get: ({ get }) => {
    const cart = get(cartState);

    return cart.reduce((prev, cartItem) => {
      return prev + cartItem.quantity;
    }, 0);
  },
});

export default totalQuantityInCart;
