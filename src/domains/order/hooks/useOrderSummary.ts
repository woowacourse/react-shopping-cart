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

    const baseShippingFee = calculateShippingFee(orderPrice); // 장바구니에서만 사용
    const remoteAreaFee = isRemoteArea ? 3000 : 0;
    const finalShippingFee = baseShippingFee + remoteAreaFee; // 산간지역 포함된 배송비 (얘는 쿠폰 적용되어도 그대로 표시됨 = 절대 이 값 자체가 차감되지 않으므로 그냥 최종 배송비임)
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
    shippingFee: orderCalculation.finalShippingFee, // 산간지역까지 포함
  });

  const finalTotalPrice =
    Math.max(0, orderCalculation.orderPrice - totalDiscount) +
    orderCalculation.finalShippingFee;

  return {
    ...orderCalculation,
    totalDiscount,
    finalTotalPrice,
  };
};

export default useOrderSummary;
