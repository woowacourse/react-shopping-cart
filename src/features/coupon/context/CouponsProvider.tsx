import { createContext, useState, ReactNode } from 'react';
import { Coupon } from '../types/coupon';

interface CouponsContextType {
  selectedCoupons: Coupon[];
  selectCoupon: (coupon: Coupon) => void;
  unSelectedCoupon: (couponId: number) => void;
  canSelectCoupon: boolean;
}

export const CouponsContext = createContext<CouponsContextType | undefined>(undefined);

interface CouponsProviderProps {
  children: ReactNode;
}

export const CouponsProvider = ({ children }: CouponsProviderProps) => {
  const [selectedCoupons, setSelectedCoupons] = useState<Coupon[]>([]);

  const selectCoupon = (coupon: Coupon) => {
    setSelectedCoupons((prev) => {
      if (prev.length >= 2 || prev.some((c) => c.id === coupon.id)) return prev;
      return [...prev, coupon];
    });
  };

  const unSelectedCoupon = (couponId: number) => {
    setSelectedCoupons((prev) => prev.filter((coupon) => coupon.id !== couponId));
  };

  const canSelectCoupon = selectedCoupons.length < 2;

  return (
    <CouponsContext.Provider
      value={{
        selectedCoupons,
        selectCoupon,
        unSelectedCoupon,
        canSelectCoupon,
      }}
    >
      {children}
    </CouponsContext.Provider>
  );
};
