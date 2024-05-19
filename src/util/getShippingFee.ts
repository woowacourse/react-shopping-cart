import {
  FREE_SHIPPING_FEE,
  FREE_SHIPPING_THRESHOLD,
  SHIPPING_FEE,
} from "../constants";

const getShippingFee = (totalPrice: number) => {
  return totalPrice >= FREE_SHIPPING_THRESHOLD
    ? FREE_SHIPPING_FEE
    : SHIPPING_FEE;
};

export default getShippingFee;
