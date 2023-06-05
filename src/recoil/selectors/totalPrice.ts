import { selector } from 'recoil';
import { DELIVERY_FEES } from '../../constant/delivery';
import cartState from '../atoms/cartState';
import checkedCartState from '../atoms/checkedCartState';
import { productFamily } from './productFamily';

const totalPrice = selector<[number, number]>({
  key: 'CartTotalPrice',
  get: ({ get }) => {
    const totalCartItemPrice = get(checkedCartState).reduce((acc, cartItem) => {
      const cart = get(cartState);
      const cartProduct = cart.find((it) => it.id === cartItem);
      if (!cartProduct) return acc;

      const { quantity, productId } = cartProduct;
      const product = get(productFamily(productId));

      if (product === null) return acc;

      return productId !== null ? quantity * product.price + acc : acc;
    }, 0);

    const finalPrice = totalCartItemPrice + DELIVERY_FEES.STANDARD;

    return [totalCartItemPrice, finalPrice];
  },
});

export default totalPrice;
