import { CartItemProps } from '../../types/cartItem';

export const cartPrice = {
  itemPrice: (cartItem: CartItemProps) => {
    return cartItem.quantity * cartItem.product.price;
  },

  totalPrice: (cartList: CartItemProps[]) => {
    return cartList.reduce(
      (acc, curr) => acc + curr.product.price * curr.quantity,
      0
    );
  },
};
