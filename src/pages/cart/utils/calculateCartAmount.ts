import { CartItem } from "../../../shared/types/cartItem";

const calculateCartAmount = (cartItems: CartItem[], checkedIds: number[]) => {
  const cartItemsCount = cartItems.length;
  const cartItemsCheckedCount = checkedIds.length;

  const cartItemsTotalQuantity = cartItems.reduce((acc, item) => {
    if (checkedIds.includes(item.id)) acc += item.quantity;
    return acc;
  }, 0);

  return {
    cartItemsCount,
    cartItemsCheckedCount,
    cartItemsTotalQuantity,
  };
};

export default calculateCartAmount;
