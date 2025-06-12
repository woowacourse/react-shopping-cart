import { createContext, useMemo, useState } from 'react';
import { Coupon } from '../../features/coupon/types/coupon';

interface CouponContextType {
  selectedCoupons: Coupon[];
  updateSelectedCoupons: (coupons: Coupon[]) => void;
}

export const CouponContext = createContext<CouponContextType | undefined>(undefined);

interface CouponProviderProps {
  children: React.ReactNode;
}

export const CouponProvider = ({ children }: CouponProviderProps) => {
  const [selectedCoupons, setSelectedCoupons] = useState<Coupon[]>([]);

  const updateSelectedCoupons = (coupons: Coupon[]) => {
    setSelectedCoupons(coupons);
  };

  const value = useMemo(
    () => ({
      selectedCoupons,

      updateSelectedCoupons,
    }),
    [selectedCoupons]
  );

  return <CouponContext.Provider value={value}>{children}</CouponContext.Provider>;
};
