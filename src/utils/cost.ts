import { CartItemType } from "../types/response";

export const getOrderCost = (selectedCartItems: CartItemType[]) => {
  return selectedCartItems.reduce((acc, cur) => {
    return acc + cur.quantity * cur.product.price;
  }, 0);
};

export const getDeliveryCost = (
  orderCost: number,
  isExtraShipping: boolean = false
) => {
  const extraShippingCost = isExtraShipping ? 3000 : 0;
  return orderCost > 100000 || orderCost === 0 ? 0 : 3000 + extraShippingCost;
};
