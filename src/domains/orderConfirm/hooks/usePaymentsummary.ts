import { useMemo } from "react";

import { getDeliveryFee } from "../utils/getDeliveryFee";

interface UsePaymentSummaryProps {
  isExtraDeliveryArea: boolean;
  receivedDiscountedPrice: number;
  orderPrice: number;
}

/**
 * 주문 금액, 배송비, 할인 금액, 총 금액을 계산하는 훅
 * @param isExtraDeliveryArea - 추가 배송 지역 여부
 * @param selectedCoupons - 선택된 쿠폰 목록
 * @returns {Object} 주문 금액, 배송비, 총 금액
 */
export function usePaymentSummary({
  isExtraDeliveryArea,
  receivedDiscountedPrice,
  orderPrice,
}: UsePaymentSummaryProps) {
  const deliveryFee: number = useMemo(
    () => getDeliveryFee({ orderPrice, isExtraDeliveryArea }),
    [orderPrice, isExtraDeliveryArea]
  );

  const totalPrice: number = useMemo(() => {
    return orderPrice + deliveryFee - (receivedDiscountedPrice || 0);
  }, [orderPrice, deliveryFee, receivedDiscountedPrice]);

  return {
    deliveryFee,
    totalPrice,
  };
}
