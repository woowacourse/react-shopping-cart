import {
  DEFAULT_SHIPPING_FEE,
  FREE_SHIPPING_FEE,
  MIN_PRICE_FOR_FREE_SHIPPING,
} from "../constants/shipping";

export function getShippingFee(totalPrice: number) {
  return totalPrice >= MIN_PRICE_FOR_FREE_SHIPPING
    ? FREE_SHIPPING_FEE
    : DEFAULT_SHIPPING_FEE;
}
