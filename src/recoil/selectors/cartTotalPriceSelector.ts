import { selector } from 'recoil';
import { cartAtom } from '@recoil/atoms/cartAtom';
import { checkBoxAtom } from '@recoil/atoms/checkBoxAtom';

export const cartTotalPriceSelector = selector({
  key: 'cartTotalPrice',
  get: ({ get }) => {
    const cart = get(cartAtom);
    const checkBox = get(checkBoxAtom);

    const inShoppingCart = cart.filter((product) =>
      checkBox.includes(product.id)
    );

    const totalPrice = inShoppingCart.reduce((accumulator, product) =>accumulator + (product.product.price*product.quantity), 0);

    return totalPrice;
  },
});
