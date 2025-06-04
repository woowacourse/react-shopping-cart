import { FREE_SHIPPING_OVER, SHIPPING_FEE } from "../../constants/priceSetting";

export function calculateShippingFee(totalPrice: number) {
  return totalPrice >= FREE_SHIPPING_OVER ? 0 : SHIPPING_FEE;
}
