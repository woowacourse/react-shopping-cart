import { SHIPPING_FEE } from "../constants";
import { FreeShippingCoupon } from "../types/type";
import { isValidExpiration } from "./isValidExpiration";

export const calculateFreeShippingDiscount = (
  orderPrice: number,
  coupon: FreeShippingCoupon,
  isRemoteArea: boolean
) => {
  if (!isValidExpiration(coupon.expirationDate)) return 0;
  if (coupon.minimumAmount > orderPrice) return 0;
  return SHIPPING_FEE + (isRemoteArea ? 3000 : 0);
};
