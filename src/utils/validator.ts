import { CartStoreState, Product } from 'types/index';

const isProductInCart = (
  productId: Product['id'],
  cart: CartStoreState['cart']
) => {
  return cart.some((product) => product.id === productId);
};

export default isProductInCart;
