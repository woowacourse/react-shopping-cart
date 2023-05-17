import { selector } from 'recoil';
import cartOrderState from '../atoms/cartOrderState';
import cartState from '../atoms/cartState';

const cartOrderPriceState = selector({
  key: 'cartOrderPriceState',
  get: ({ get }) => {
    const cart = get(cartState);
    const cartOrder = get(cartOrderState);

    const cartItems = cart.filter((cartItem) => cartOrder.includes(cartItem.id));

    const productsPrice = cartItems.reduce(
      (sum, cartItem) => sum + cartItem.product.price * cartItem.quantity,
      0,
    );
    const shippingFee = 3000;

    return {
      products: productsPrice,
      shippingFee,
      total: productsPrice + shippingFee,
    };
  },
});

export default cartOrderPriceState;
