import { CartItem } from '../types';

const getOrderPrice = (cartItems: CartItem[], checkedCartIds: number[]) => {
  return cartItems.reduce((total, cartItem) => {
    return checkedCartIds.includes(cartItem.id)
      ? total + cartItem.quantity * cartItem.product.price
      : total;
  }, 0);
};

export default getOrderPrice;
