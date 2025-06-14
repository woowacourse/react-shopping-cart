import {
  DELIVERY_COST,
  EXTRA_SHIPPING_COST,
  FREE_SHIPPING_THRESHOLD,
} from "../constants/cost";
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
  const extraShippingCost = isExtraShipping ? EXTRA_SHIPPING_COST : 0;
  return orderCost > FREE_SHIPPING_THRESHOLD || orderCost === 0
    ? 0
    : DELIVERY_COST + extraShippingCost;
};

export const getTotalCost = (
  orderCost: number,
  deliveryCost: number,
  discount: number
) => {
  return orderCost + deliveryCost - discount;
};
