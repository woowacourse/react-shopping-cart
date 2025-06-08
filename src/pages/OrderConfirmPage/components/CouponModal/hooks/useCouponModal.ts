import { useMemo } from "react";
import { CouponData, OrderItem } from "../../../types";
import { validateCouponUsage } from "../../../utils/couponValidation";

interface UseCouponModalParams {
  coupons: CouponData[];
  orderItems: OrderItem[];
  selectedCouponIds: number[];
  isIsolatedAreaSelected: boolean;
}

interface CouponState {
  coupon: CouponData;
  isSelected: boolean;
  isUsable: boolean;
  reason?: string;
  warningMessage?: string;
}

export const useCouponModal = ({
  coupons,
  orderItems,
  selectedCouponIds,
  isIsolatedAreaSelected,
}: UseCouponModalParams) => {
  const orderAmount = useMemo(
    () => orderItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0),
    [orderItems],
  );

  const couponStates = useMemo((): CouponState[] => {
    return coupons.map((coupon) => {
      const validation = validateCouponUsage({
        coupon,
        orderItems,
        orderAmount,
        isIsolatedAreaSelected,
      });

      const isSelected = selectedCouponIds.includes(coupon.id);

      return {
        coupon,
        isSelected,
        isUsable: validation.isValid,
        reason: validation.reason,
        warningMessage: validation.warningMessage,
      };
    });
  }, [coupons, orderItems, orderAmount, isIsolatedAreaSelected, selectedCouponIds]);

  return {
    couponStates,
    orderAmount,
  };
};
