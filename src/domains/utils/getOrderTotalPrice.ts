import { CartItemType } from "@/apis/cartItems/cartItem.type";

export const getOrderTotalPrice = (orderList: CartItemType[]) => {
  return orderList.reduce((sum, { product, quantity }) => {
    return sum + product.price * quantity;
  }, 0);
};
