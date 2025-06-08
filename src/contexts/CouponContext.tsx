import { createContext, useContext, useState, useEffect } from "react";
import { Coupon } from "../apis/coupons";
import { useCouponValidation } from "../hooks/useCouponValidation";

interface CouponContextType {
  selectedCoupons: Coupon[];
  setSelectedCoupons: React.Dispatch<React.SetStateAction<Coupon[]>>;
  appliedCoupons: Coupon[];
  setAppliedCoupons: React.Dispatch<React.SetStateAction<Coupon[]>>;
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

  useEffect(() => {
    if (appliedCoupons.length > 0) {
      const validCoupons = getValidCoupons(appliedCoupons);

      if (validCoupons.length !== appliedCoupons.length) {
        setAppliedCoupons(validCoupons);
        setSelectedCoupons(validCoupons);
      }
    }
  }, [appliedCoupons, getValidCoupons]);

  return (
    <CouponContext.Provider
      value={{
        selectedCoupons,
        setSelectedCoupons,
        appliedCoupons,
        setAppliedCoupons,
      }}
    >
      {children}
    </CouponContext.Provider>
  );
};
