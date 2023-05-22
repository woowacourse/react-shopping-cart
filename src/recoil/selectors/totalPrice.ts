import { selector } from 'recoil';
import { DELIVERY_FEE } from '../../components/CartPage/OrderInfo';
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

      if (!productId) return acc;
      if (productId !== null) {
        const product = get(productFamily(productId));
        if (product === null) return acc;
        return quantity * product.price + acc;
      }
      return acc;
    }, 0);

    return [totalCartItemPrice, totalCartItemPrice + DELIVERY_FEE];
  },
});

export default totalPrice;
