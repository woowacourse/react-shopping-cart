import { CartItem } from "../../types/cartItem";

const calculateCartAmount = (cartItems: CartItem[], checkedIds: Set<number>) => {
  const cartItemsCount = cartItems.length;
  const cartItemsCheckedCount = checkedIds.size;

  const cartItemsTotalQuantity = cartItems.reduce((acc, item) => {
    if (checkedIds.has(item.id)) acc += item.quantity;
    return acc;
  }, 0);

  return {
    cartItemsCount,
    cartItemsCheckedCount,
    cartItemsTotalQuantity,
  };
};

export default calculateCartAmount;
