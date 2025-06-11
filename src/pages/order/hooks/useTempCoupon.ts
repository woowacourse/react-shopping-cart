import { useState, useMemo } from "react";
import { AvailableCouponType } from "../../../shared/types/coupon";

interface UseTempCouponProps {
  availableCoupons: AvailableCouponType[];
  updateApplyCoupon: (coupons: AvailableCouponType[]) => void;
}

interface UseTempCouponReturn {
  tempAvailableCoupons: AvailableCouponType[];
  discountPrice: number;
  handleTempToggleCoupon: (code: string) => void;
  applySelectedCoupons: () => void;
}

export const useTempCoupon = ({ availableCoupons, updateApplyCoupon }: UseTempCouponProps): UseTempCouponReturn => {
  const [tempAvailableCoupons, setTempAvailableCoupons] = useState<AvailableCouponType[]>(availableCoupons);

  const discountPrice = useMemo(
    () =>
      tempAvailableCoupons
        .filter((coupon) => coupon.selected)
        .reduce((sum: number, coupon) => sum + coupon.discountAmount, 0),
    [tempAvailableCoupons],
  );

  const handleTempToggleCoupon = (code: string) => {
    setTempAvailableCoupons((prev) => {
      const selectedCount = prev.filter((coupon) => coupon.selected).length;
      return prev.map((coupon) => {
        if (coupon.code === code) {
          if (coupon.selected) {
            return { ...coupon, selected: false };
          } else if (selectedCount < 2) {
            return { ...coupon, selected: true };
          }
        }
        return coupon;
      });
    });
  };

  const applySelectedCoupons = () => updateApplyCoupon(tempAvailableCoupons);

  return {
    tempAvailableCoupons,
    discountPrice,
    handleTempToggleCoupon,
    applySelectedCoupons,
  };
};
