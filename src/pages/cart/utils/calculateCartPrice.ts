import { CartItem } from "../../../shared/types/cartItem";

const calculateCartPrice = (cartItems: CartItem[], checkedIds: Set<number>) => {
  const orderPrice = cartItems.reduce((acc, item) => {
    if (checkedIds.has(item.id)) acc += item.quantity * item.product.price;
    return acc;
  }, 0);

  const deliveryPrice = orderPrice < 100000 && orderPrice > 0 ? 3000 : 0;
  const totalPrice = orderPrice + deliveryPrice;

  return {
    orderPrice,
    deliveryPrice,
    totalPrice,
  };
};

export default calculateCartPrice;
