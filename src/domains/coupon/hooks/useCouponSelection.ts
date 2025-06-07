import { useCallback, useMemo, useState } from "react";
import useToast from "../../../features/toast/useToast";
import { MAX_COUPON_SELECTION } from "../constants";
import { Coupon } from "../types/response";

const useCouponSelection = (coupons: Coupon[]) => {
  const [selectedCouponIds, setSelectedCouponIds] = useState<number[]>([]);
  const { showToast } = useToast();

  const toggleCouponSelection = useCallback(
    (couponId: number) => {
      setSelectedCouponIds((prev) => {
        if (prev.includes(couponId)) {
          return prev.filter((id) => id !== couponId);
        }

        if (prev.length >= MAX_COUPON_SELECTION) {
          showToast({
            message: `쿠폰은 최대 ${MAX_COUPON_SELECTION}개까지 적용 가능합니다.`,
            type: "error",
          });
          return prev;
        }

        return [...prev, couponId];
      });
    },
    [showToast]
  );

  const selectedCoupons = useMemo(
    () => coupons.filter((coupon) => selectedCouponIds.includes(coupon.id)),
    [coupons, selectedCouponIds]
  );

  const hasNoSelectedCoupons = useMemo(
    () => selectedCouponIds.length === 0,
    [selectedCouponIds.length]
  );

  const isCouponSelected = useCallback(
    (id: number) => selectedCouponIds.includes(id),
    [selectedCouponIds]
  );

  return {
    selectedCoupons,
    hasNoSelectedCoupons,
    toggleCouponSelection,
    isCouponSelected,
  };
};

export default useCouponSelection;
