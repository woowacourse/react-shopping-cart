import { FREE_DELIVERY_LIMIT } from "../constants/delivery";

export const getDeliveryPrice = (orderTotalPrice: number) => {
  return orderTotalPrice >= FREE_DELIVERY_LIMIT ? 0 : 3000;
};
