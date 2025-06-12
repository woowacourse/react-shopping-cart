import { BASIC_FEE, ISOLATED_AREA_FEE, ISOLATED_AREA_THRESHOLD } from "../constants";

export interface ShippingCalculationParams {
  orderAmount: number;
  isIsolatedAreaSelected: boolean;
  hasShippingCoupon: boolean;
}

export interface ShippingCalculationResult {
  fee: number;
  isFree: boolean;
}

export function calculateShippingFee({
  orderAmount,
  isIsolatedAreaSelected,
  hasShippingCoupon,
}: ShippingCalculationParams): ShippingCalculationResult {
  if (hasShippingCoupon) {
    return {
      fee: 0,
      isFree: true,
    };
  }

  if (orderAmount >= ISOLATED_AREA_THRESHOLD) {
    if (isIsolatedAreaSelected) {
      return {
        fee: ISOLATED_AREA_FEE,
        isFree: false,
      };
    }
    return {
      fee: 0,
      isFree: true,
    };
  }

  const totalFee = BASIC_FEE + (isIsolatedAreaSelected ? ISOLATED_AREA_FEE : 0);

  return {
    fee: totalFee,
    isFree: false,
  };
}

export function canApplyShippingCoupon(orderAmount: number, isIsolatedAreaSelected: boolean): boolean {
  return orderAmount < ISOLATED_AREA_THRESHOLD || (orderAmount >= ISOLATED_AREA_THRESHOLD && isIsolatedAreaSelected);
}
