import { useState, useEffect } from "react";

interface AvailableCoupon {
  code: string;
  discountAmount: number;
  selected: boolean;
}

interface UseTempCouponProps {
  availableCoupons: AvailableCoupon[];
  toggleCoupon: (code: string) => void;
}

interface UseTempCouponReturn {
  tempSelectedCoupons: AvailableCoupon[];
  discountPrice: number;
  handleTempToggleCoupon: (code: string) => void;
  handleApplyCoupon: () => void;
}

export const useTempCoupon = ({ availableCoupons, toggleCoupon }: UseTempCouponProps): UseTempCouponReturn => {
  const [tempSelectedCoupons, setTempSelectedCoupons] = useState<AvailableCoupon[]>([]);

  const discountPrice = tempSelectedCoupons.reduce((sum: number, coupon) => sum + coupon.discountAmount, 0);

  const handleTempToggleCoupon = (code: string) => {
    setTempSelectedCoupons((prev) => {
      const isSelected = prev.some((coupon) => coupon.code === code);
      if (isSelected) {
        return prev.filter((coupon) => coupon.code !== code);
      } else {
        if (prev.length >= 2) return prev;
        const couponToAdd = availableCoupons.find((coupon) => coupon.code === code);
        return couponToAdd ? [...prev, couponToAdd] : prev;
      }
    });
  };

  const handleApplyCoupon = () => {
    availableCoupons
      .filter((coupon) => coupon.selected)
      .forEach((coupon) => {
        if (!tempSelectedCoupons.some((temp) => temp.code === coupon.code)) {
          toggleCoupon(coupon.code);
        }
      });

    tempSelectedCoupons.forEach((coupon) => {
      const isCurrentlySelected = availableCoupons.some(
        (available) => available.code === coupon.code && available.selected,
      );
      if (!isCurrentlySelected) {
        toggleCoupon(coupon.code);
      }
    });
  };

  useEffect(() => {
    const selectedCoupons = availableCoupons.filter((coupon) => coupon.selected);
    setTempSelectedCoupons(selectedCoupons);
  }, [availableCoupons]);

  return {
    tempSelectedCoupons,
    discountPrice,
    handleTempToggleCoupon,
    handleApplyCoupon,
  };
};
