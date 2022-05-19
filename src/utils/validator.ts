import { CartStoreState, Product } from 'types';

const isProductInCart = (
  productId: Product['id'],
  cart: CartStoreState['cart']
) => {
  return cart.filter((product) => product.id === productId).length > 0;
};

export default isProductInCart;
