import { CartItemType } from "../types/response";

export const getOrderCost = (selectedCartItems: CartItemType[]) => {
  return selectedCartItems.reduce((acc, cur) => {
    return acc + cur.quantity * cur.product.price;
  }, 0);
};

export const getDeliveryCost = (orderCost: number) => {
  return orderCost >= 100_000 || orderCost === 0 ? 0 : 3_000;
};
