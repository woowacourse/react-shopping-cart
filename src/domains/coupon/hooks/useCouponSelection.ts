import { useState, useCallback } from "react";
// import { useCoupon } from "./useCoupon";
import useToast from "../../../features/toast/useToast";

const MAX_COUPON_SELECTION = 2;

export const useCouponSelection = () => {
  const { showToast } = useToast();
  // const { coupons } = useCoupon();
  const [selectedCouponIds, setSelectedCouponIds] = useState<number[]>([]);

  const toggleCouponSelection = useCallback(
    (couponId: number) => {
      setSelectedCouponIds((prev) => {
        if (prev.includes(couponId)) {
          return prev.filter((id) => id !== couponId);
        }

        if (prev.length >= MAX_COUPON_SELECTION) {
          showToast({
            message: "쿠폰은 최대 2개까지 적용 가능합니다.",
            type: "error",
          });
          return prev;
        }

        return [...prev, couponId];
      });
    },
    [showToast]
  );

  // const selectedCoupons = useMemo(
  //   () => coupons.filter((coupon) => selectedCouponIds.includes(coupon.id)),
  //   [coupons, selectedCouponIds]
  // );

  // const totalDiscount = useMemo(() => {
  //   return selectedCoupons.reduce((total, coupon) => {
  //     if (coupon.discountType === "fixed" && coupon.discount) {
  //       return total + coupon.discount;
  //     }
  //     return total;
  //   }, 0);
  // }, [selectedCoupons]);

  return {
    toggleCouponSelection,
    isCouponSelected: (id: number) => selectedCouponIds.includes(id),
    hasNoSelectedCoupons: selectedCouponIds.length === 0,
    // totalDiscount,
  };
};
