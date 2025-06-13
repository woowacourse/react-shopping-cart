import { createContext, useContext, useState } from "react";
import { Coupon } from "../apis/coupons";
import { useCouponValidation } from "../hooks/useCouponValidation";

interface CouponContextType {
  selectedCoupons: Coupon[];
  appliedCoupons: Coupon[];
  selectCoupons: (coupons: Coupon[]) => void;
  applyCoupons: (coupons: Coupon[]) => void;
  previewCoupons: (coupons: Coupon[]) => void;
}

interface CouponProviderProps {
  children: React.ReactNode;
}

const CouponContext = createContext<CouponContextType | null>(null);

export const useCouponContext = () => {
  const context = useContext(CouponContext);
  if (!context) {
    throw new Error("useCouponContext must be used within a CouponProvider");
  }
  return context;
};

export const CouponProvider = ({ children }: CouponProviderProps) => {
  const [selectedCoupons, setSelectedCoupons] = useState<Coupon[]>([]);
  const [appliedCoupons, setAppliedCoupons] = useState<Coupon[]>([]);
  const { getValidCoupons } = useCouponValidation();

  const selectCoupons = (coupons: Coupon[]) => {
    setSelectedCoupons(coupons);
  };

  const applyCoupons = (coupons: Coupon[]) => {
    const validCoupons = getValidCoupons(coupons);
    setAppliedCoupons(validCoupons);
    setSelectedCoupons(validCoupons);
  };

  const previewCoupons = (coupons: Coupon[]) => {
    setAppliedCoupons(coupons);
  };

  return (
    <CouponContext.Provider
      value={{
        selectedCoupons,
        appliedCoupons,
        selectCoupons,
        applyCoupons,
        previewCoupons,
      }}
    >
      {children}
    </CouponContext.Provider>
  );
};
