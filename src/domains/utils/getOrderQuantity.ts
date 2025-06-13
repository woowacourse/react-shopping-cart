import { CartItemType } from "@/apis/cartItems/cartItem.type";

export const getOrderQuantity = (orderList: CartItemType[]) => {
  return orderList.reduce((acc, { quantity }) => (acc += quantity), 0);
};
