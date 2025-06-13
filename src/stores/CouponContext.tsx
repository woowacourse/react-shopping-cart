import { createContext, useState, useEffect, useContext } from "react";
import { CouponType } from "../types/types";
import getCoupon from "../api/getCoupon";

interface CouponContextType {
  coupons: CouponType[];
  isLoading: boolean;
  refetch: () => Promise<void>;
}

const CouponContext = createContext<CouponContextType | null>(null);

export function CouponProvider({ children }: { children: React.ReactNode }) {
  const [coupons, setCoupons] = useState<CouponType[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const fetchCouponData = async () => {
    try {
      setIsLoading(true);
      const couponData = await getCoupon();
      setCoupons(couponData);
    } catch (err) {
      setCoupons([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCouponData();
  }, []);

  const contextValue: CouponContextType = {
    coupons,
    isLoading,
    refetch: fetchCouponData,
  };

  return (
    <CouponContext.Provider value={contextValue}>
      {children}
    </CouponContext.Provider>
  );
}

export function useCouponContext() {
  const context = useContext(CouponContext);
  if (context === null) {
    throw new Error("useCouponContext must be used within a CouponProvider");
  }
  return context;
}
