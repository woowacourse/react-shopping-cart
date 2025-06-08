import { useCallback, useState } from "react";
import { REGION_DELIVERY_PRICE } from "@/domains/constants/delivery";
import { getDeliveryPrice } from "@/domains/utils/getDeliveryPrice";

/**
 * 배송비 계산 및 지역 배송 옵션 관리 커스텀 훅
 *
 * @param {number} orderTotalPrice - 배송비 계산에 사용될 주문 총액
 * @returns {{
 *   deliveryPrice: number,
 *   isRegionDelivery: boolean,
 *   toggleRegionDelivery: () => void
 * }}
 * @property {number} deliveryPrice - 계산된 총 배송비 (기본 배송비 + 지역 추가 배송비)
 * @property {boolean} isRegionDelivery - 지역 배송 여부 상태
 * @property {function} toggleRegionDelivery - 지역 배송 옵션 토글 함수
 */
export const useDeliveryPrice = (orderTotalPrice: number) => {
  const [isRegionDelivery, setIsRegionDelivery] = useState(false);

  const toggleRegionDelivery = useCallback(() => {
    setIsRegionDelivery((prev) => !prev);
  }, []);

  const deliveryPrice = getDeliveryPrice(orderTotalPrice);
  return {
    deliveryPrice: isRegionDelivery
      ? deliveryPrice + REGION_DELIVERY_PRICE
      : deliveryPrice,
    isRegionDelivery,
    toggleRegionDelivery,
  };
};
