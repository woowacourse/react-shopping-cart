import { selector } from 'recoil';
import { DELIVERY_FEE } from '../../components/OrderInfo';
import cartState from '../atoms/cartState';
import { productFamily } from './productFamily';

const totalPrice = selector<[number, number]>({
  key: 'CartTotalPrice',
  get: ({ get }) => {
    const totalCartItemPrice = get(cartState).reduce((acc, cartItem) => {
      const { quantity, productId } = cartItem;

      if (!productId) return acc;
      if (productId !== null) {
        const product = get(productFamily(productId));
        if (product === null) return acc;
        return quantity * product.price + acc;
      }
      return acc;
    }, 0);

    return [totalCartItemPrice, totalCartItemPrice + DELIVERY_FEE]; // Return an array with both acc and acc + 2500
  },
});

export default totalPrice;
