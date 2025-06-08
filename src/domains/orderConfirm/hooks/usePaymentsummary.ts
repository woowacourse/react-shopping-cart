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
