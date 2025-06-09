import { createContext, useState, ReactNode } from 'react';
import { Coupon } from '../types/coupon';

interface CouponsContextType {
  selectedCoupons: Coupon[];
  addCoupon: (coupon: Coupon) => void;
  removeCoupon: (couponId: number) => void;
  canAddCoupon: boolean;
}

export const CouponsContext = createContext<CouponsContextType | undefined>(undefined);

interface CouponsProviderProps {
  children: ReactNode;
}

export const CouponsProvider = ({ children }: CouponsProviderProps) => {
  const [selectedCoupons, setSelectedCoupons] = useState<Coupon[]>([]);

  const addCoupon = (coupon: Coupon) => {
    setSelectedCoupons((prev) => {
      if (prev.length >= 2 || prev.some((c) => c.id === coupon.id)) return prev;
      return [...prev, coupon];
    });
  };

  const removeCoupon = (couponId: number) => {
    setSelectedCoupons((prev) => prev.filter((coupon) => coupon.id !== couponId));
  };

  const canAddCoupon = selectedCoupons.length < 2;

  return (
    <CouponsContext.Provider
      value={{
        selectedCoupons,
        addCoupon,
        removeCoupon,
        canAddCoupon,
      }}
    >
      {children}
    </CouponsContext.Provider>
  );
};
