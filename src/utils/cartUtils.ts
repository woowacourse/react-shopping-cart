import { MAX_CART_QUANTITY, MIN_CART_QUANTITY } from '../views/CarItem/constants/cartConstants';

export const isValidCartQuantity = (quantity: number) => {
  return !(quantity < MAX_CART_QUANTITY) || !(quantity >= MIN_CART_QUANTITY);
};
