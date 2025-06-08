import { useCallback, useState } from "react";

type UsePaymentPriceParams = {
  orderTotalPrice: number;
  deliveryPrice: number;
};

/**
 * 주문 총액, 배송비, 쿠폰 할인을 종합한 결제 금액 계산 커스텀 훅
 *
 * @param {Object} params - 결제 금액 계산 파라미터
 * @param {number} params.orderTotalPrice - 주문 상품 총액
 * @param {number} params.deliveryPrice - 배송비
 *
 * @returns {{
 *   couponDiscount: number,
 *   applyCouponDiscount: (discountAmount: number) => void,
 *   paymentPrice: number
 * }}
 * @property {number} couponDiscount - 적용된 쿠폰 할인액
 * @property {function} applyCouponDiscount - 쿠폰 할인액 설정 함수
 * @property {number} paymentPrice - 최종 결제 금액 (주문 총액 + 배송비 - 쿠폰 할인)
 */
export const usePaymentPrice = ({
  orderTotalPrice,
  deliveryPrice,
}: UsePaymentPriceParams) => {
  const [couponDiscount, setCouponDiscount] = useState(0);

  const applyCouponDiscount = useCallback((discountAmount: number) => {
    setCouponDiscount(discountAmount);
  }, []);

  return {
    couponDiscount,
    applyCouponDiscount,
    paymentPrice: orderTotalPrice + deliveryPrice - couponDiscount,
  };
};
