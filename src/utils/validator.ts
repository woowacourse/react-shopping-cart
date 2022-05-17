import { CartState, Product } from 'types';

const isProductInCart = (productId: Product['id'], cart: CartState['cart']) => {
  return cart.filter((product) => product.id === productId).length > 0;
};

export default isProductInCart;
