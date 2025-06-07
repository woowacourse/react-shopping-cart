import { CartItemType } from "@/apis/cartItems/cartItem.type";

export const getMostExpensiveProductPrice = (
  orderList: CartItemType[]
): number => {
  return orderList.map((item) => item.product.price).sort((a, b) => b - a)[0];
};
