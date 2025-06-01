import { CartItemProps } from '../../types/cartItem';

export const cartPrice = {
  itemPrice: (cartItem: CartItemProps) => {
    return cartItem.quantity * cartItem.product.price;
  },

  totalPrice: (cartList: CartItemProps[], selectedItems: Set<number>) => {
    const filtered = cartList.filter((cartItem) =>
      selectedItems.has(cartItem.id)
    );
    return filtered.reduce(
      (acc, curr) => acc + curr.product.price * curr.quantity,
      0
    );
  },
};
