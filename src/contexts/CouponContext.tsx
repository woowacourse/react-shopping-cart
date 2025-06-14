import { createContext, useState, useMemo, useEffect } from "react";
import { Coupon } from "../types/response";
import useCoupons from "../hooks/useCoupons";

interface CouponContextValue {
  selectedCoupons: Coupon[];
  setSelectedCoupons: (coupons: Coupon[]) => void;
  totalDiscount: number;
}
export const CouponContext = createContext<CouponContextValue | null>(null);

export const CouponProvider = ({ children }: { children: React.ReactNode }) => {
  const { coupons, applyCoupons } = useCoupons();
  const [selectedCoupons, setSelectedCoupons] = useState<Coupon[]>([]);

  useEffect(() => {
    if (coupons.length > 0) {
      const availableCoupons = coupons.filter((coupon) => coupon.isAvailable);
      if (availableCoupons.length === 0) {
        setSelectedCoupons([]); // 선택 해제
        return;
      }

      const best = applyCoupons(availableCoupons);
      setSelectedCoupons(best.appliedCoupons);
    }
  }, [coupons]);

  const totalDiscount = useMemo(() => {
    if (selectedCoupons.length === 0) return 0;
    return applyCoupons(selectedCoupons).totalDiscount;
  }, [selectedCoupons, applyCoupons]);

  return (
    <CouponContext.Provider
      value={{
        selectedCoupons,
        setSelectedCoupons,
        totalDiscount,
      }}
    >
      {children}
    </CouponContext.Provider>
  );
};
