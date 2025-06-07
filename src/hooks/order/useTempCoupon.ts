import { useState, useEffect, useMemo } from "react";

interface AvailableCouponType {
  code: string;
  discountAmount: number;
  selected: boolean;
}

interface UseTempCouponProps {
  availableCoupons: AvailableCouponType[];
  updateApplyCoupon: (coupons: AvailableCouponType[]) => void;
}

interface UseTempCouponReturn {
  tempSelectedCoupons: AvailableCouponType[];
  discountPrice: number;
  handleTempToggleCoupon: (code: string) => void;
  applySelectedCoupons: () => void;
}

export const useTempCoupon = ({ availableCoupons, updateApplyCoupon }: UseTempCouponProps): UseTempCouponReturn => {
  const [tempSelectedCoupons, setTempSelectedCoupons] = useState<AvailableCouponType[]>([]);

  const discountPrice = useMemo(
    () =>
      tempSelectedCoupons
        .filter((coupon) => coupon.selected)
        .reduce((sum: number, coupon) => sum + coupon.discountAmount, 0),
    [tempSelectedCoupons],
  );

  const handleTempToggleCoupon = (code: string) => {
    setTempSelectedCoupons((prev) => {
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

  const applySelectedCoupons = () => updateApplyCoupon(tempSelectedCoupons);

  useEffect(() => {
    setTempSelectedCoupons(availableCoupons);
  }, [availableCoupons]);

  return {
    tempSelectedCoupons,
    discountPrice,
    handleTempToggleCoupon,
    applySelectedCoupons,
  };
};
