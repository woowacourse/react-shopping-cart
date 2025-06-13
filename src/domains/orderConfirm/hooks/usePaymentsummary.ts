import { useMemo } from "react";

import { CartItemTypes } from "../../shopping-cart/types/cartItem";
import { CouponCode } from "../types/coupon";
import { getDeliveryFee } from "../utils/getDeliveryFee";
import { getDisCountedPrice } from "../utils/getDisCountedPrice";
import { getMaxPriceInCart } from "../utils/getMaxPriceInCart";

interface UsePaymentSummaryParams {
  isExtraDeliveryArea: boolean;
  orderPrice: number;
  twoPlusOneItems: CartItemTypes[];
  selectedCoupons: CouponCode[];
}

/**
 * 주문 금액, 배송비, 할인 금액, 총 금액을 계산하는 훅
 * @param isExtraDeliveryArea - 추가 배송 지역 여부
 * @param selectedCoupons - 선택된 쿠폰 목록
 * @returns {Object} 주문 금액, 배송비, 총 금액
 */
export function usePaymentSummary({
  isExtraDeliveryArea,
  orderPrice,
  twoPlusOneItems,
  selectedCoupons,
}: UsePaymentSummaryParams) {
  const deliveryFee: number = useMemo(
    () => getDeliveryFee({ orderPrice, isExtraDeliveryArea }),
    [orderPrice, isExtraDeliveryArea]
  );

  const discountedPrice = useMemo(
    () =>
      getDisCountedPrice({
        deliveryFee,
        orderPrice,
        maxPriceInSelectedCart: getMaxPriceInCart({
          selectedCartItems: twoPlusOneItems,
        }),
        selectedCoupons,
      }),
    [deliveryFee, orderPrice, twoPlusOneItems, selectedCoupons]
  );

  const totalPrice: number = useMemo(() => {
    return orderPrice + deliveryFee - (discountedPrice || 0);
  }, [orderPrice, deliveryFee, discountedPrice]);

  return {
    deliveryFee,
    totalPrice,
    discountedPrice,
  };
}
