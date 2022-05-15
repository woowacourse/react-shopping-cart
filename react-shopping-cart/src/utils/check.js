import { CURRENT_USER } from 'constants';

export const isInCart = (productId, carts) =>
  carts.some((cart) => cart.id === `${CURRENT_USER}${productId}`);
