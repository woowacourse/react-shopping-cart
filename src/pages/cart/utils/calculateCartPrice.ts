import { CartItem } from "../../../shared/types/cartItem";
import { DEFAULT_DELIVERY_PRICE, FREE_DELIVERY_MINIMUM_ORDER_PRICE } from "../constants";

const calculateCartPrice = (cartItems: CartItem[], checkedIds: number[]) => {
  const orderPrice = cartItems.reduce((acc, item) => {
    if (checkedIds.includes(item.id)) acc += item.quantity * item.product.price;
    return acc;
  }, 0);

  const deliveryPrice = orderPrice < FREE_DELIVERY_MINIMUM_ORDER_PRICE && orderPrice > 0 ? DEFAULT_DELIVERY_PRICE : 0;
  const totalPrice = orderPrice + deliveryPrice;

  return {
    orderPrice,
    deliveryPrice,
    totalPrice,
  };
};

export default calculateCartPrice;
