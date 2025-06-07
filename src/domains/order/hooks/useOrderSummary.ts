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
    const shippingFee = baseShippingFee + remoteAreaFee;
    const baseTotalPrice = orderPrice + baseShippingFee;

    return {
      orderItems,
      orderItemCount: orderItems.length,
      hasSelectedItem: orderItems.length > 0,
      orderQuantity,
      orderPrice,
      baseShippingFee,
      remoteAreaFee,
      shippingFee,
      baseTotalPrice,
    };
  }, [items, isRemoteArea]);

  const { totalDiscount, discountedPrice, finalShippingFee } =
    useCouponDiscount({
      coupons: selectedCoupons,
      orderItems: orderCalculation.orderItems,
      orderPrice: orderCalculation.orderPrice,
      shippingFee: orderCalculation.shippingFee,
    });

  // FIXME: 무료 배송 쿠폰 할인 계산 중복 문제
  console.log(discountedPrice, finalShippingFee);
  const finalTotalPrice = discountedPrice + finalShippingFee;

  return {
    ...orderCalculation,
    totalDiscount,
    finalShippingFee,
    finalTotalPrice,
  };
};

export default useOrderSummary;
