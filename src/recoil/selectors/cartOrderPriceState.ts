import { selector } from 'recoil';
import cartItemsState from '../atoms/cartItemsState';

const cartOrderPriceState = selector({
  key: 'cartOrderPriceState',
  get: ({ get }) => {
    const cartItems = get(cartItemsState);

    const productsPrice = cartItems
      .filter((cartItem) => !cartItem.unselectedForOrder)
      .reduce((sum, cartItem) => sum + cartItem.quantity * cartItem.product.price, 0);
    const shippingFee = productsPrice > 0 ? 3000 : 0;

    const prices = {
      products: productsPrice,
      shippingFee,
    };

    return {
      ...prices,
      total: Object.values(prices).reduce((sum, current) => sum + current, 0),
    };
  },
});

export default cartOrderPriceState;
