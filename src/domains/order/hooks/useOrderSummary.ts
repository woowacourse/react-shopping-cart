import { useMemo } from "react";
import { useCartSelector } from "../../cart/hooks/useCartState";
import { useCoupon } from "../../coupon/hooks/useCoupon";
import useCouponDiscount from "../../coupon/hooks/useCouponDiscount";
import {
  calculateOrderPrice,
  calculateOrderQuantity,
  calculateShippingFee,
  filterSelectedItems,
} from "../calculations";

interface Props {
  isRemoteArea?: boolean;
}

const useOrderSummary = ({ isRemoteArea = false }: Props = {}) => {
  const items = useCartSelector((state) => state.items);
  const { selectedCoupons } = useCoupon();

  const orderCalculation = useMemo(() => {
    const orderItems = filterSelectedItems(items);
    const orderQuantity = calculateOrderQuantity(orderItems);
    const orderPrice = calculateOrderPrice(orderItems);

    const baseShippingFee = calculateShippingFee(orderPrice);
    const remoteAreaFee = isRemoteArea ? 3000 : 0;
    const finalShippingFee = baseShippingFee + remoteAreaFee;
    const baseTotalPrice = orderPrice + baseShippingFee;

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
    };
  }, [items, isRemoteArea]);

  const { totalDiscount } = useCouponDiscount({
    coupons: selectedCoupons,
    orderItems: orderCalculation.orderItems,
    orderPrice: orderCalculation.orderPrice,
    shippingFee: orderCalculation.finalShippingFee,
  });

  const finalTotalPrice = useMemo(() => {
    return (
      Math.max(0, orderCalculation.orderPrice - totalDiscount) +
      orderCalculation.finalShippingFee
    );
  }, [
    orderCalculation.orderPrice,
    orderCalculation.finalShippingFee,
    totalDiscount,
  ]);

  return {
    ...orderCalculation,
    totalDiscount,
    finalTotalPrice,
  };
};

export default useOrderSummary;
