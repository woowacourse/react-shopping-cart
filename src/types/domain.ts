import type { CartItemType, CouponType } from "./response";

export interface BogoItemInfoType {
  bogoItem: CartItemType;
  bogoQuantity: number;
}

export interface ShowCouponType {
  coupon: CouponType;
  isValid: boolean;
}
