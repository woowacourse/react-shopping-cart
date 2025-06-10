import { FREE_SHIPPING_MIN_AMOUNT, SHIPPING_FEE } from "../constants";

export const getShippingFee = (
  orderPrice: number,
  isRemoteArea: boolean = false
) => {
  const standardShippingFee =
    orderPrice >= FREE_SHIPPING_MIN_AMOUNT ? 0 : SHIPPING_FEE;
  const remoteShippingFee = isRemoteArea ? SHIPPING_FEE : 0;

  return standardShippingFee + remoteShippingFee;
};
