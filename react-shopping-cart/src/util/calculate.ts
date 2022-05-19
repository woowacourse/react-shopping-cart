import { CURRENT_USER } from "constants/index";
import { Carts } from "type";

export const calculatePaymentCost = (data: Carts): number => {
  return data.reduce((acc, cur) => {
    if (cur.user === CURRENT_USER) {
      return acc + Number(cur.price) * Number(cur.quantity);
    }
    return acc;
  }, 0);
};

export const calculateOrderProductsQuantity = (data: Carts): number => {
  return data.reduce((acc, cur) => {
    if (cur.user === CURRENT_USER && cur.checked) {
      return acc + Number(cur.quantity);
    }
    return acc;
  }, 0);
};
