import { CURRENT_USER } from 'constants';

export const isInCart = (productId, carts) => {
  return carts.some((cart) => cart.id === `${CURRENT_USER}${productId}`);
};
