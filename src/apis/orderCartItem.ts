import { CartItem } from "@/type/CartItem";
import { apiPost } from "./apiRequest";

interface OrderCartItemParams {
  cartItems: CartItem[];
}

const orderCartItem = async ({ cartItems }: OrderCartItemParams) => {
  return apiPost(`/order`, undefined, {
    body: JSON.stringify({ cartItems }),
  });
};

export default orderCartItem;
