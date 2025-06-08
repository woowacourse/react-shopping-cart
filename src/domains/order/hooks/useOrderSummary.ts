import { useMemo } from "react";
import { useCartSelector } from "../../cart/hooks/useCartState";
import { calculateOptimalTotalDiscount } from "../../coupon/calculations";
import { useCoupon } from "../../coupon/hooks/useCoupon";
import {
  calculateOrderPrice,
  calculateOrderQuantity,
  calculateShippingFee,
  filterSelectedItems,
} from "../calculations";
import { useOrder } from "./useOrder";

const REMOTE_AREA_ADDITIONAL_FEE = 3_000;

const useOrderSummary = () => {
  const items = useCartSelector((state) => state.items);
  const { selectedCoupons } = useCoupon();
  const { isRemoteArea } = useOrder();

  const orderItems = filterSelectedItems(items);
  const orderQuantity = calculateOrderQuantity(orderItems);
  const orderPrice = calculateOrderPrice(orderItems);
  const baseShippingFee = calculateShippingFee(orderPrice);
  const remoteAreaFee = isRemoteArea ? REMOTE_AREA_ADDITIONAL_FEE : 0;
  const finalShippingFee = baseShippingFee + remoteAreaFee;
  const baseTotalPrice = orderPrice + baseShippingFee;

  const totalDiscount = useMemo(
    () =>
      calculateOptimalTotalDiscount(
        selectedCoupons,
        orderItems,
        orderPrice,
        finalShippingFee
      ),
    [selectedCoupons, orderItems, orderPrice, finalShippingFee]
  );

  const finalTotalPrice =
    Math.max(0, orderPrice - totalDiscount) + finalShippingFee;

  return {
    orderItems,
    orderItemCount: orderItems.length,
    hasSelectedItem: orderItems.length > 0,
    orderQuantity,
    orderPrice,
    baseShippingFee,
    remoteAreaFee,
    finalShippingFee,
    baseTotalPrice,
    totalDiscount,
    finalTotalPrice,
  };
};

export default useOrderSummary;
