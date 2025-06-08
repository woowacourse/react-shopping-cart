import { useMemo } from "react";
import { useCartContext } from "../../common/context/cartProvider";
import { useSelectedCartContext } from "../../common/context/selectedCartProvider";

import { CouponCode } from "../types/coupon";
import { getDeliveryFee } from "../utils/getDeliveryFee";
import { getDisCountedPrice } from "../utils/getDisCountedPrice";
import { getMaxPriceInSelectedCart } from "../utils/getMaxPriceInSelectedCart";
import { CartItemTypes } from "../../shopping-cart/types/cartItem";
import { getOrderPrice } from "../../common/utils/getOrderPrice";

interface UsePaymentSummaryProps {
  isExtraDeliveryArea: boolean;
  selectedCoupons: CouponCode[];
  twoPlusOneApplicableItems: CartItemTypes[];
}

/**
 * 주문 금액, 배송비, 할인 금액, 총 금액을 계산하는 훅
 * @param isExtraDeliveryArea - 추가 배송 지역 여부
 * @param selectedCoupons - 선택된 쿠폰 목록
 * @param twoPlusOneApplicableItems - 2+1 적용 가능한 아이템 목록
 * @returns {Object} 주문 금액, 배송비, 할인 금액, 총 금액
 */
export function usePaymentSummary({
  isExtraDeliveryArea,
  selectedCoupons,
  twoPlusOneApplicableItems,
}: UsePaymentSummaryProps) {
  const { cartItems } = useCartContext();
  const { selectedCartIds } = useSelectedCartContext();

  const orderPrice = useMemo(
    () =>
      getOrderPrice({
        cartItems: cartItems,
        selectedCartIds,
      }),
    [cartItems, selectedCartIds]
  );

  const deliveryFee: number = useMemo(
    () => getDeliveryFee({ orderPrice, isExtraDeliveryArea }),
    [orderPrice, isExtraDeliveryArea]
  );

  const discountedPrice = useMemo(
    () =>
      getDisCountedPrice({
        deliveryFee,
        orderPrice,
        maxPriceInSelectedCart: getMaxPriceInSelectedCart({
          selectedCartItems: twoPlusOneApplicableItems,
        }),
        selectedCoupons,
      }),
    [deliveryFee, orderPrice, twoPlusOneApplicableItems, selectedCoupons]
  );

  const totalPrice = useMemo(
    () => orderPrice + deliveryFee - (discountedPrice || 0),
    [orderPrice, deliveryFee, discountedPrice]
  );

  return {
    deliveryFee,
    orderPrice,
    discountedPrice,
    totalPrice,
  };
}
