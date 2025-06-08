import { ISOLATED_AREA_FEE, ISOLATED_AREA_THRESHOLD } from "../constants";

export interface ShippingCalculationParams {
  orderAmount: number;
  isIsolatedAreaSelected: boolean;
  hasShippingCoupon: boolean;
}

export interface ShippingCalculationResult {
  fee: number;
  description: string;
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
      description: "무료 배송 (쿠폰 적용)",
      isFree: true,
    };
  }

  const isFreeShipping = orderAmount >= 100000;

  if (isFreeShipping) {
    if (isIsolatedAreaSelected) {
      return {
        fee: 3000,
        description: "제주도 추가 배송비",
        isFree: false,
      };
    }
    return {
      fee: 0,
      description: "무료 배송",
      isFree: true,
    };
  }

  const basicFee = 3000;
  const totalFee = basicFee + (isIsolatedAreaSelected ? ISOLATED_AREA_FEE : 0);

  return {
    fee: totalFee,
    description: isIsolatedAreaSelected ? "일반 + 제주도 배송비" : "일반 배송비",
    isFree: false,
  };
}

export function canApplyShippingCoupon(orderAmount: number, isIsolatedAreaSelected: boolean): boolean {
  return orderAmount < ISOLATED_AREA_THRESHOLD || (orderAmount >= ISOLATED_AREA_THRESHOLD && isIsolatedAreaSelected);
}
