import { selectorFamily } from 'recoil';
import cartState from '../atoms/cartState';

const productQuantityInCart = selectorFamily({
  key: 'productQuantityInCart',
  get:
    (productId: number) =>
    ({ get }) => {
      const cart = get(cartState);

      const product = cart.find(
        (cartItem) => cartItem.product.id === productId,
      );

      if (!product) return 0;

      return product.quantity;
    },
});

export default productQuantityInCart;
