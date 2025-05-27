import { CartItem } from '../types';

const getOrderPrice = (cartItems: CartItem[], checkedCartIds: number[]) => {
  let orderPrice = 0;

  cartItems.forEach((cartItem) => {
    if (checkedCartIds.includes(cartItem.id)) {
      orderPrice += cartItem.quantity * cartItem.product.price;
    }
  });

  return orderPrice;
};

export default getOrderPrice;
