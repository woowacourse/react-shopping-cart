import {
  DELIVERY_PRICE,
  FREE_DELIVERY_LIMIT,
  FREE_DELIVERY_PRICE,
} from "../constants/delivery";

export const getDeliveryPrice = (orderTotalPrice: number) => {
  return orderTotalPrice >= FREE_DELIVERY_LIMIT
    ? FREE_DELIVERY_PRICE
    : DELIVERY_PRICE;
};
